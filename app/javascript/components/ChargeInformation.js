import React, { useState, useEffect } from 'react';
import { Progress, Row, Col } from 'antd';
import axios from 'axios';

const ChargeInformation = (props) => {
  const [chargeState, setChargeState] = useState({ percent: 0.1 })
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getActualInfo();
  }, [])

  const getActualInfo = () => {
    axios.get(`http.kek.wait`)
      .then((result) => {
          setIsLoaded(true);
          setItems(result.items);
          setTimeout(function() { getActualInfo(); }, 1000);
        })
      .catch((error) => {
          setIsLoaded(true);
          setTimeout(function() { getActualInfo(); }, 10000);
        });
  }
  return (
    <div className="container charge_information">
      <Row className="charge_information__title">
        Идет зарядка
      </Row>
      <Row className="charge_information__info-block">
        <Col className="charge_information__info-block--text">
          <Row className="my-2">
            <Col>
              <div>Начато в: 20.05.28 15.40</div>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <div>Заряжено: 5 из 1000 кВатт</div>
            </Col>
          </Row>
          </Col>
        <Col>
          <Row className="charge_information__progress-bar">
            <Col>
              <Progress type="circle" percent={chargeState.percent} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>Зарядная станция: Зарядная станция на Невском</div>
        </Col>
      </Row>
    </div>
  );
}

export default ChargeInformation;