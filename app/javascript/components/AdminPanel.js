import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { Tabs, Button } from 'antd';
import axios from 'axios';
import PeopleDatatable from './PeopleDatatable';
import StatiosDatatable from './StationsDatatable';

const { TabPane } = Tabs;

const AdminPanel = ({users}) => {
  return(
    <Tabs defaultActiveKey="1" className="container">
      <TabPane tab="Пользователи" key="1">
        <PeopleDatatable users={users}/>
      </TabPane>
      <TabPane tab="Станции" key="2">
        <StatiosDatatable />
      </TabPane>
    </Tabs>
  )
}

export default AdminPanel;