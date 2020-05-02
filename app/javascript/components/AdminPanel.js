import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { Tabs, Button } from 'antd';
import axios from 'axios';

const { TabPane } = Tabs;

const AdminPanel = ({users}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const deleteButtonClickHandler = () => {
    axios({
      method: 'post',
      url: "http://localhost:3000/admin/delete",
      data: { selectedRows }
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const updateButtonClickHandler = () => {
    axios({
      method: 'patch',
      url: "localhost:3000/admin",
      data: { users: selectedRows }
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
    
  const actions = [
    <Button className="mx-1" key="make" onClick={updateButtonClickHandler}>Сделать админом</Button>, 
    <Button className="mx-1" key="drop" onClick={updateButtonClickHandler}>Забрать админа</Button>,
    <Button className="mx-1" key="delete" onClick={deleteButtonClickHandler}>Удалить</Button>,
  ]  
  const columns = [
    {
      name: 'id',
      selector: 'id',
      maxWidth: "50px"
    },
    {
      name: 'Почта',
      selector: 'email',
      maxWidth: "350px"
    },
    {
      name: 'Имя',
      selector: 'username',
      maxWidth: "350px"
    },
    {
      name: 'Админ',
      maxWidth: "50px",
      cell: (row) => row.admin ? "Да" : "Нет" 
    },
  ];
  return(
    <Tabs defaultActiveKey="1" className="container">
      <TabPane tab="Пользователи" key="1">
        <DataTable
          data={users}
          columns={columns}
          selectableRows
          selectableRowsHighlight
          contextActions={actions}
          onSelectedRowsChange={handleRowSelected}
        />
      </TabPane>
      <TabPane tab="Станции" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
}

export default AdminPanel;