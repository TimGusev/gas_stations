import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { Tabs, Button, Modal, Form, Input, InputNumber, Alert } from 'antd';
import axios from 'axios';

const StationsDatatable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [stations, setStations] = useState([]);
  const [newRender, setNewRender] = useState(false);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [formProps, setFormProps] = useState(null);
  const [redModalVisible, setRedModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleCancelClick = () => {
    setModalVisible(false);  
  }

  const handleRedCancelClick = () => {
    setRedModalVisible(false);  
  }
  const deleteButtonClickHandler = () => {
    // axios({
    //   method: 'post',
    //   url: "http://localhost:3000/admin/delete",
    //   data: { selectedRows, authenticity_token: token },
    //   headers: { "X-CSRFToken": token }
    // })
    //   .then(() => {
    //       setCurrentUsers(currentUsers.filter(item => !selectedRows.includes(item)));
    //       state.selectedRows = []
    //     } 
    //   )
    //   .catch((error) => console.log(error));
    // setToggleCleared(!toggleCleared);
  };

  const addButtonClickHandler = () => {
    setNewRender(true);
  };

  const backButtonClickHandler = () => {
    setNewRender(false);
  };

  const addClickHandler = (row, e) => {
    setError(false);
    setFormProps(row.id);
    setModalVisible(true);
  };

  const onFinish = (values) => {
    axios({
      method: 'post',
      url: "kek.w",
      data: values
    }).then(() => { 
        setFormProps(null);
        setModalVisible(false);
      })
      .catch((error) => {setError(true)});
  };
    
  const contextActions = [
    <Button key="delete" onClick={deleteButtonClickHandler}>Удалить</Button>
  ];

  const actions = [
    <Button key="add" onClick={addButtonClickHandler}>Добавить</Button>
  ];

  const new_actions = [
    <Button key="back" onClick={backButtonClickHandler}>К добавленным станциям</Button>
  ];

  const data = [
    {id: 1, name: "fff", power: 56, address: { latitude: 40, longitude:30 }, status: 0 }, 
    {id: 2, name: "aaa", power: 56, address: { latitude: 40, longitude:30 }, status: 1 }
  ];


  const columns = [
    {
      name: 'id',
      selector: 'id',
      maxWidth: "50px"
    },
    {
      name: 'Название',
      selector: 'name',
      maxWidth: "350px"
    },
    {
      name: 'Мощность',
      selector: 'power',
      maxWidth: "50px"
    },
    {
      name: 'Широта',
      selector: 'address.latitude',
      maxWidth: "50px",
    },
    {
      name: 'Долгота',
      selector: 'address.longitude',
      maxWidth: "50px",
    },
    {
      name: 'Cостояние',
      selector: 'status',
      maxWidth: "50px",
    },
    {
      maxWidth: "50px",
      cell: (row) => <Button key="change" onClick={(e) => addClickHandler(row, e)}>Редактировать</Button>
    }
  ];

  const newStationColumns = [
    {
      name: 'id',
      selector: 'id',
      maxWidth: "50px"
    },
    {
      name: 'Широта',
      selector: 'address.latitude',
      maxWidth: "50px",
    },
    {
      name: 'Долгота',
      selector: 'address.longitude',
      maxWidth: "50px",
    },
    { 
      maxWidth: "50px",
      cell: (row) => <Button key="add" onClick={(e) => addClickHandler(row, e)}>Добавить</Button>
    }
  ];
  return(
    <div>
      {
        newRender ? (
          <DataTable
            data={data}
            columns={newStationColumns}
            title="Недобавленные станции"
            actions={new_actions}
          /> 
        ) : (
          <DataTable
            data={data}
            columns={columns}
            selectableRows
            selectableRowsHighlight
            contextActions={contextActions}
            actions={actions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
          />
        )
      }
      <Modal
          title="Добавление новой станции"
          visible={modalVisible}
          onCancel={handleCancelClick}
          footer={null}
          destroyOnClose
      >
        {
          error && <div className="alert alert-danger" role="alert">
            Что-то пошло не так. Попробуйте позже!
          </div>
        }
        <Form
          layout={"vertical"}
          onFinish={onFinish}
        >
          <Form.Item
            label="Название"
            name="name"
            rules={[
              {
                required: true,
                message: 'Дайте станции название',
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Мощность"
            name="power"
            rules={[
              {
                required: true,
                message: 'Задайте мощность',
              }
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Цена за 1 Кв"
            name="const"
            rules={[
              {
                required: true,
                message: 'Задайте цену',
              }
            ]}
          >
            <InputNumber min={1.0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Редоктирование станции"
        visible={redModalVisible}
        onCancel={handleCancelClick}
        footer={null}
        destroyOnClose
      >
        {
          error && <div className="alert alert-danger" role="alert">
            Что-то пошло не так. Попробуйте позже!
          </div>
        }
        <Form
          layout={"vertical"}
          onFinish={onFinish}
        >
          <Form.Item
            label="Название"
            name="name"
            rules={[
              {
                required: true,
                message: 'Дайте станции название',
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Мощность"
            name="power"
            rules={[
              {
                required: true,
                message: 'Задайте мощность',
              }
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Цена за 1 Кв"
            name="const"
            rules={[
              {
                required: true,
                message: 'Задайте цену',
              }
            ]}
          >
            <InputNumber min={1.0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default StationsDatatable;