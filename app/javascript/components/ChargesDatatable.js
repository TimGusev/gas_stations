import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Progress, Row, Col } from 'antd';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const ChargesDatatable = (username) => {
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
      maxWidth: "250px"
    },
    {
      name: 'Статус',
      selector: 'status',
      cell: (row) => <Progress size="small" percent={row.percent} />,
      maxWidth: "150px"
    }
  ];

  useEffect(() => {
  }, [])

  return (
    <DataTable
      data={data}
      columns={columns}
      className="charge_datatable"
    />
  );
}

export default ChargesDatatable;