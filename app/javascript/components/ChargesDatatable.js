import React, { useEffect, useState } from "react";

import { Progress, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ProfileInfo from './ProfileInfo';

const ChargesDatatable = ({ user }) => {
  const [chargeState, setChargeState] = useState({ percent: 0.1 })
  const [isLoaded, setIsLoaded] = useState(false);
      
  const data = [
    { id: 1, title: 'Conan the Barbarian', status: 'charging', percent: 20 },
    { id: 2, title: 'Conan', status: 'done', percent: 100 }
  ];
  
  const columns = [
    {
      name: 'Станция',
      selector: 'title',
      maxWidth: "350px"
    },
    {
      name: 'Статус',
      selector: 'status',
      cell: (row) => <Progress size="small" percent={row.percent} />,
      maxWidth: "150px"
    },
    {
      name: 'Действия',
      cell: (row) => <Link to={`/charge_information/${row.id}`}>Подробнее</Link>
    }
  ];

  useEffect(() => {
  }, [])

  return (
    <Row className="container">
      <Col xs={9}>
        <ProfileInfo user={user}/>
      </Col>
      <Col xs={15}>
        <DataTable
          data={data}
          columns={columns}
          className="charge_datatable"
          title="Мои зарядки"
        />
      </Col>
    </Row>
  );
}

export default ChargesDatatable;