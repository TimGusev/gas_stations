import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import axios from 'axios';
import { Spin } from 'antd';



const defaultMapState = {
  center: [55.751574, 37.573856],
  zoom: 5,
};

const coordinates = [
  [55.684758, 37.738521],
  [57.684758, 39.738521]
];

const customBalloon = (coordinate) => {
  
  useEffect(() => {
    axios.get(`http.kek.wait`)
      .then(res => {
        console.log("wtf")
      })
      .catch(()=> set )
  });
}

const HelloWorld = (props) => {
  const [balloonProps, setBalloonProps] = useState({});
  const [mapState, setMapState] = useState(defaultMapState);
  const handlePlaceMarkClick = useCallback(
    (e, coordinate) => {
      setMapState({center: coordinate, zoom: 17})
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
                    hasBalloon: false,  
                  } 
                }
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
