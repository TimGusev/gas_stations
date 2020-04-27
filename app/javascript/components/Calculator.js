import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { InputNumber } from 'antd';
import 'antd/dist/antd.css';

const Calculator = (props) => {
  const { power, user } = props.location.state;
  const [calcState, setCalcState] = useState({ neededPower: 0, time: 0 });

  const onTimeChange = useCallback(
    (value) => {
      console.log(value);
    },
    [],
  );
  
  return(
    <div>
      <InputNumber
        onChange={onTimeChange}
      />
      <InputNumber
        value={calcState.time}
      />
    </div>
  )
}

export default Calculator;