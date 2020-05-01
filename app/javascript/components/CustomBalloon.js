import React from "react";
import PropTypes from "prop-types";
import { Spin, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CustomBalloon = ({station, handler, user}) => {
  return(
    <div className="balloon">
      <Row>
        <Col className="balloon__title--wrapper">
          <span className="balloon__title">
            { station.title }
          </span>
          <CloseOutlined className="balloon__button--close" onClick={handler}/>
        </Col>
      </Row>
      <Row>
        <Col className="balloon__properties">
          <span className="balloon__properties--title">
            Адрес
          </span>
          <span className="balloon__properties--body">
            { station.address }
          </span>
        </Col>
      </Row>
      <Row>
        <Col className="balloon__properties">
          <span className="balloon__properties--title">
            Мощность
          </span>
          <span className="balloon__properties--body">
            { station.power }
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
                      power: station.power,
                      user:  user
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