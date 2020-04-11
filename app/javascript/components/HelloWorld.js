import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import axios from 'axios';



const defaultMapState = {
  center: [55.751574, 37.573856],
  zoom: 5,
};

const coordinates = [
  [55.684758, 37.738521],
  [57.684758, 39.738521]
];

const HelloWorld = (props) => {
  const [mapState, setMapState] = useState(defaultMapState);
  const handlePlaceMarkClick = useCallback(
   (e, coordinate) => {
    e.originalEvent.target.properties._data = { balloonContent: "loading" }
    setMapState({center: coordinate, zoom: 17})
    
    axios.get(`http.kek.wait`)
      .then(res => {
        console.log("wtf")
      })
      .catch(()=> e.originalEvent.target.properties._data = { balloonContent: coordinate } )
    },
   []
  )
  
  return (
    <div>
      <YMaps>
        <Map state={mapState} style={{width: "900px", height: "900px"}}>
          {
            coordinates.map(coordinate => 
              <Placemark 
                geometry={coordinate}  
                options={
                  { 
                    hideIconOnBalloonOpen: false,
                    openEmptyBalloon: true,
                  } 
                }
                properties={"1,2,3"}
                modules={['geoObject.addon.balloon']} 
                onClick={ (e) => handlePlaceMarkClick(e, coordinate) }
              />
            )
          }
        </Map>
      </YMaps>
    </div>
  );
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
