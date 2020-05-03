import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { Tabs, Button } from 'antd';
import axios from 'axios';

const PeopleDatatable = ({ users }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentUsers, setCurrentUsers] = useState(users);
  const [toggleCleared, setToggleCleared] = useState(false);
  const token = $('meta[name="csrf-token"]').attr('content');
  
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const updateSelctedAdmins = (admin) => {
    currentUsers.map(el => {
      var found = selectedRows.find(s => s["id"] === el["id"]);
      if (found) {
        el.admin = admin;
      }
      return el;
    });
  }

  const deleteButtonClickHandler = () => {
    axios({
      method: 'post',
      url: "http://localhost:3000/admin/delete",
      data: { selectedRows, authenticity_token: token },
      headers: { "X-CSRFToken": token }
    })
      .then(() => {
          setCurrentUsers(currentUsers.filter(item => !selectedRows.includes(item)));
          state.selectedRows = []
        } 
      )
      .catch((error) => console.log(error));
    setToggleCleared(!toggleCleared);
  };

  const makeAdminButtonClickHandler = () => {
    axios({
      method: 'post',
      url: "http://localhost:3000/admin/make_admin",
      data: { admin: selectedRows.filter((obj) => obj.id), authenticity_token: token },
      headers: { "X-CSRFToken": token }
    })
      .then(updateSelctedAdmins(true))
      .catch((error) => console.log(error));
      setToggleCleared(!toggleCleared);
  };

  const dropAdminButtonClickHandler = () => {
    axios({
      method: 'post',
      url: "http://localhost:3000/admin/drop_admin",
      data: { admin: selectedRows.filter((obj) => obj.id), authenticity_token: token },
      headers: { "X-CSRFToken": token }
    })
      .then(updateSelctedAdmins(false))
      .catch((error) => console.log(error));
      setToggleCleared(!toggleCleared);
  };
    
  const actions = [
    <Button className="mx-1" key="make" onClick={makeAdminButtonClickHandler}>Сделать админом</Button>, 
    <Button className="mx-1" key="drop" onClick={dropAdminButtonClickHandler}>Забрать админа</Button>,
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
    <DataTable
      data={currentUsers}
      columns={columns}
      selectableRows
      selectableRowsHighlight
      contextActions={actions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
    />
  )
}

export default PeopleDatatable;