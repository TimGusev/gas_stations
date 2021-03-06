import React, { useState, useEffect, useRef } from 'react';
import { Progress, Row, Col } from 'antd';
import axios from 'axios';
import Moment from 'react-moment';

const ChargeInformation = (props) => {
  const [chargeState, setChargeState] = useState({})
  const [isLoaded, setIsLoaded] = useState(false);
  const content = useRef(null);

  useEffect(() => {
    getActualInfo();
  }, [])

  const getActualInfo = () => {
    if(!content.current) return;

    axios(
      {
        method: "get",
        url: `https://chargerswebapi.azurewebsites.net/charge/${props.location.state.user}/${props.location.state.id}`,
        crossDomain: true
      }
      ).then((result) => {
          setChargeState(result.data);
          if(result.data.currentAmountOfElectricity / result.data.totalAmountOfElectricity * 100 >= 100) return;
          setTimeout(function() { getActualInfo(); }, 1000);
        })
      .catch((error) => {
          setTimeout(function() { getActualInfo(); }, 1000);
        });
  }
  return (
    <div ref={content} className="container charge_information">
      <Row className="charge_information__title">
        { chargeState.isCompleted ? "Зарядка завершена" : "Идет зарядка"}
      </Row>
      <Row className="charge_information__info-block">
        <Col className="charge_information__info-block--text">
          <Row className="my-2">
            <Col>
              <div>
                <span>Начато в: </span>
                <Moment format="HH:mm DD/MM/YYYY">
                  { chargeState.startedAt }
                </Moment>
              </div>
            </Col>
          </Row>
          { chargeState.isCompleted && (
            <Row className="my-2">
              <Col>
                <div>
                  <span>Закончено в: </span>
                  <Moment format="HH:mm DD/MM/YYYY">
                    { chargeState.finishedAt }
                  </Moment>
                </div>
              </Col>
            </Row>)
          }
          <Row className="my-2">
            <Col>
              <div>Заряжено: {chargeState.currentAmountOfElectricity} из {chargeState.totalAmountOfElectricity} кВатт</div>
            </Col>
          </Row>
          </Col>
        <Col>
          <Row className="charge_information__progress-bar">
            <Col>
              <Progress type="circle" percent={Math.round(chargeState.currentAmountOfElectricity / chargeState.totalAmountOfElectricity *100)} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ChargeInformation;
