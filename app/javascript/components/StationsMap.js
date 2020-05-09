import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import axios from 'axios';
import _ from "underscore";
import CustomBalloon from "./CustomBalloon"

const defaultMapState = {
  center: [55.751574, 37.573856],
  zoom: 8,
};

const StationsMap = ({ user }) => {
  const [balloonProps, setBalloonProps] = useState({});
  const [mapState, setMapState] = useState(defaultMapState);
  const [coordinates, setCoordinates] = useState([]);

  const handlePlaceMarkClick = useCallback(
    (coordinate) => {
      setMapState({center: [coordinate.latitude, coordinate.longitude], zoom: 5 });

      axios.get(`https://chargerswebapi.azurewebsites.net/stations/${coordinate.id}`).then((res) => {
          setBalloonProps(res.data)
        }).catch((error) => {
          console.log("Ошибка при получении данных о конкретной станции")
        })
    }
  )
  
  useEffect(() => {
    axios.get("https://chargerswebapi.azurewebsites.net/map/stations").then((response) => { 
        setCoordinates(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const handleCloseButtonClick = useCallback(() => setBalloonProps({}), []);

  return (
    <div>
      <YMaps>
        <Map 
          state={mapState}
          options={{ minZoom: 4, maxZoom: 17 }}
          className="map" 
          onClick={() => setBalloonProps({})}
        >
          {
            coordinates.map(coordinate => 
              <Placemark 
                geometry={[coordinate.latitude, coordinate.longitude]}  
                options={
                  {
                    hasBalloon: false,
                    iconLayout: 'default#image',
                    iconImageHref: "https://res.cloudinary.com/dscq2kq9y/image/upload/v1589052594/station_p2wb1p.png",
                    iconImageSize: [88, 88],
                    iconImageOffset: [-44, -88]  
                  } 
                }
                modules={['geoObject.addon.balloon']} 
                onClick={ () => handlePlaceMarkClick(coordinate) }
              />
            )
          }
          { !_.isEmpty(balloonProps) && <CustomBalloon station={balloonProps} user={user} handler={handleCloseButtonClick}/> }
          <ZoomControl state={mapState}/>
        </Map>
      </YMaps>
    </div>
  );
}

StationsMap.propTypes = {
  userId: PropTypes.number
};
export default StationsMap
