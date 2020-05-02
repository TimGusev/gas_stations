import React from 'react';
import { Row, Col } from 'antd';

const ProfileInfo = ({user}) => {
  return(
    <div className="profile_info">
      <Row className="profile_info__title">
        <Col>
          <h2>Мой профиль</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          Почта: 
        </Col>
        <Col>
          { user.email }
        </Col>
      </Row>
      <Row>
        <Col>
          Имя: 
        </Col>
        <Col>
          { user.username }
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="#">Изменить профиль</a>
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="#">Сменить пароль</a>
        </Col>
      </Row>
    </div>
  )
}

export default ProfileInfo;