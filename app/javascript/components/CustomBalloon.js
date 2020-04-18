import React from "react";
import PropTypes from "prop-types";
import { Spin, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const CustomBalloon = ({station, handler}) => {
  return(
    <div className="balloon">
      <Row className="balloon__wrapper">
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
      </Row>
    </div>
  )  
}

export default CustomBalloon