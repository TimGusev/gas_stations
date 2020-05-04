import React, { useState, useEffect } from 'react';
import { Progress, Row, Col } from 'antd';
import axios from 'axios';

const ChargeInformation = (props) => {
  const [chargeState, setChargeState] = useState({})
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getActualInfo();
  }, [])

  const getActualInfo = () => {
    axios.get(`https://chargerswebapi.azurewebsites.net/charge/${props.location.state.user}/${props.location.state.id}`)
      .then((result) => {
          setChargeState(result.data);
          setTimeout(function() { getActualInfo(); }, 1000);
        })
      .catch((error) => {
          console.log("here is misteke")
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
              <div>Начато в: {chargeState.startedAt}</div>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <div>Заряжено: {chargeState.currentAmountOfElectricity} из {chargeState.totalAmountOfElectricity} кВатт</div>
            </Col>
          </Row>
          </Col>
        <Col>
          <Row className="charge_information__progress-bar">
            <Col>
              <Progress type="circle" percent={chargeState.currentAmountOfElectricity / chargeState.totalAmountOfElectricity *100} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ChargeInformation;