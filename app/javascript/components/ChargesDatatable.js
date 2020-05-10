import React, { useEffect, useState } from "react";

import { Progress, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ProfileInfo from './ProfileInfo';

const ChargesDatatable = ({ user }) => {
  const [chargeState, setChargeState] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
      

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://chargerswebapi.azurewebsites.net/charge/${user.id}`,
    }).then((response) => { 
        setChargeState(response.data);
      })
      .catch((error) => {
        console.log("ошибка при получении зарядок")
      });
  }, []);

  const columns = [
    {
      name: 'Станция',
      selector: 'stationName',
      maxWidth: "350px"
    },
    {
      name: 'Статус',
      selector: 'status',
      cell: (row) => <Progress size="small" percent={(row.currentAmountOfElectricity / row.totalAmountOfElectricity * 100)} />,
      maxWidth: "150px"
    },
    {
      name: 'Действия',
      cell: (row) => <Link to={
        {
          pathname: `/charge_information/${row.id}`,
          state: {
            user:  user.id,
            id: row.id
          }
        }
      }>Подробнее</Link>
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
          data={chargeState}
          columns={columns}
          className="charge_datatable"
          title="Мои зарядки"
        />
      </Col>
    </Row>
  );
}

export default ChargesDatatable;