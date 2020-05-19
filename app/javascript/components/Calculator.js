import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { InputNumber, Row, Col, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Calculator = (props) => {
  const [calcState, setCalcState] = useState({ neededPower: 0, time: 0, cost: 0 });
  const [visible, setVisible] = useState(false);
  const [chargeId, setChargeId] = useState(null);
  const costCof = props.location.state.cost;
  const power = 2;

  //stop when 100
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

  const payClickHandler = () => {
    axios({
      method: 'post',
      url: `https://chargerswebapi.azurewebsites.net/charge/${props.location.state.user}`,
      data: {
        stationId: props.location.state.station_id,
        amountOfEletrcity: calcState.neededPower
      }
    }).then((response) => {
        setVisible(true);
        setChargeId(response.data)
      })
      .catch((error) => {
      });
  }

  return(
    <div>
      <form className="calculator__wrapper">
        <Row className="calculator">
          <Row className="calculator__row">
            <h2>Рассчитать стоимость</h2>
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
            <button type="button" onClick={payClickHandler} className="btn btn-primary payment_button">Оплатить</button>
          </Row>
        </Row>
      </form>
      <Modal
        visible={visible}
        footer={null}
      >
        <div>
          Платеж прошел, нажмите подробнее что-бы узнать как идет зарядка.
        </div>
        <Link to={
           {
            pathname: `/charge_information/${chargeId}`,
            state: {
              user:  props.location.state.user,
              id: chargeId
            }
          }
        }
        >Подробнее</Link>
      </Modal>
    </div>
  )
}

export default Calculator;
