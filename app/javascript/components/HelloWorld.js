import React from "react"
import PropTypes from "prop-types"
const HelloWorld = (props) => {
  return (
    <>
      Greeting: {props.greeting} 
    </>
  );
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
