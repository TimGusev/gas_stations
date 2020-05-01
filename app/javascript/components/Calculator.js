import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { InputNumber, Row, Col } from 'antd';

const Calculator = (props) => {
  const [calcState, setCalcState] = useState({ neededPower: 0, time: 0, cost: 0 });
  const costCof = 0.03;
  const power = 75;

  const onTimeChange = useCallback(
    (value) => {
      setCalcState({ neededPower: value * power, cost: value * power / costCof, time: value });
    },
    [],
  );

  const onPowerChange = useCallback(
    (value) => {
      setCalcState({ neededPower: value, cost: value / costCof, time: value / power });
    },
    [],
  );

  const onCostChange = useCallback(
    (value) => {
      setCalcState({ neededPower: value / costCof, cost: value, time: value / costCof / power });
    },
    [],
  );
  
  return(
    <form className="calculator__wrapper">
      <Row className="calculator">
        <Row className="calculator__row">
          <h2>Расчитать стоимость</h2>
        </Row>
        <Row className="calculator__row">
          <Col className="calculator__field">
            <span className="calculator__field--title">
              Всего энергии
            </span>
            <InputNumber
              value={calcState.neededPower}
              onChange={onPowerChange}
              precision={2}
              className="calculator__field--input"
            />
          </Col>
          <Col className="calculator__field">
            <span className="calculator__field--title">
              Время
            </span>
            <InputNumber
              value={calcState.time}
              onChange={onTimeChange}
              precision={2}
              className="calculator__field--input"
            />
          </Col>
          <Col className="calculator__field">
            <span className="calculator__field--title">
              Стоимость
            </span>
            <InputNumber
              value={calcState.cost}
              onChange={onCostChange}
              precision={2}
              className="calculator__field--input"
            />
          </Col>
        </Row>
        <Row className="payment_button__wrapper">
          <button type="submit" className="btn btn-primary payment_button">Оплатить</button>
        </Row>
      </Row>
    </form>
  )
}

export default Calculator;