import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import axios from 'axios';
import _ from "underscore";
import CustomBalloon from "./CustomBalloon"

const defaultMapState = {
  center: [55.751574, 37.573856],
  zoom: 5,
};

const coordinates = [
  [55.684758, 37.738521],
  [57.684758, 39.738521]
];

const StationsMap = ({ user }) => {
  const [balloonProps, setBalloonProps] = useState({});
  const [mapState, setMapState] = useState(defaultMapState);
  const handlePlaceMarkClick = useCallback(
    (coordinate) => {
      setMapState({center: coordinate, zoom: 17})

      axios.get(`http.kek.wait`)
        .then((res) => {
          console.log("wtf")
        })
        .catch(setBalloonProps({ 
          "title": "Электрозаправочная станция № 1", 
          "status": "Доступна",
          "power": "75 Квт / ч", 
          "address": "Московская область, Москва, ул. Поллесская 56" 
        }))
    },
    []
  )
  
  const handleCloseButtonClick = useCallback(() => setBalloonProps({}), []);

  return (
    <div>
      <YMaps>
        <Map 
          state={mapState}
          className="map" 
          onClick={() => setBalloonProps({})}
        >
          {
            coordinates.map(coordinate => 
              <Placemark 
                geometry={coordinate}  
                options={
                  {
                    hasBalloon: false,  
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
