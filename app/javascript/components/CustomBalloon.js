import React from "react";
import PropTypes from "prop-types";
import { Spin, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CustomBalloon = ({station, handler, user}) => {
  const addressAttributes = [
    station.address.country,
    station.address.region,
    station.address.city,
    station.address.street,
    station.address.house
  ];

  return(
    <div className="balloon">
      <div className="balloon__title--wrapper">
        <span className="balloon__title">
          { station.name }
        </span>
        <CloseOutlined className="balloon__button--close" onClick={handler}/>
      </div>
      <Row>
        <Col className="balloon__properties">
          <span className="balloon__properties--title">
            Адрес
          </span>
          <span className="balloon__properties--body">
            { addressAttributes.filter(Boolean).join(', ') }
          </span>
        </Col>
      </Row>
      <Row>
        <Col className="balloon__properties">
          <span className="balloon__properties--title">
            Цена за 1 киловатт
          </span>
          <span className="balloon__properties--body">
            { station.cost }
          </span>
        </Col>
      </Row>
      <Row>
        <Col className="balloon__properties">
          <span className="balloon__properties--title">
            Статус
          </span>
          <span className="balloon__properties--body">
            { station.status }
          </span>
        </Col>
      </Row>
      <Row className="balloon__charge_container">
        { user ? 
            (<Col className="balloon__charge-button">
              <Link 
                to={
                  {
                    pathname: '/calculator',
                    state: {
                      cost: station.cost,
                      power: station.power,
                      user:  user,
                      station_id: station.id
                    }
                  }
                }
                className="btn btn-success"
              >
                Зарядиться
              </Link>
            </Col>) : (
            <Col className="balloon__charge-warning">
              <span>
                Войдите в личный кабинет, чтобы заряжаться удалённо
              </span>
            </Col>
          )
        }
      </Row>
    </div>
  )  
}

export default CustomBalloon;