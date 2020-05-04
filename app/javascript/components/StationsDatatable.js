import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { Tabs, Button, Modal, Form, Input, InputNumber, Alert } from 'antd';
import axios from 'axios';

const StationsDatatable = () => {
  const data = [
    {id: 1, name: "fff", cost: 56, power: 56, address: { latitude: 40, longitude:30 }, status: 0 }, 
    {id: 2, name: "aaa", cost: 56, power: 56, address: { latitude: 40, longitude:30 }, status: 1 }
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [stations, setStations] = useState([]);
  const [newRender, setNewRender] = useState(false);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [formProps, setFormProps] = useState(null);
  const [redFormProps, setRedFormProps] = useState(null);
  const [redModalVisible, setRedModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [isObjectLoaded, setIsObjectLoaded] = useState(false);
  const [unRegistratedStations, setUnRegistratedStations] = useState([]);
  const [isUnregistratedLoaded, setIsUnregistratedLoaded] = useState(true);
  
  useEffect(() => {
    if (isObjectLoaded) return;

    axios({
      method: 'get',
      url: "https://chargerswebapi.azurewebsites.net/stations",
    }).then((response) => { 
        setStations(response.data);
        setIsObjectLoaded(true);
      })
      .catch((error) => {
        console.log("ошибка при получении станций")
        setIsObjectLoaded(true);
      });

  }, [isObjectLoaded]);

  useEffect(() => {
    if (isUnregistratedLoaded) return;

    axios({
      method: 'get',
      url: "https://chargerswebapi.azurewebsites.net/unregistered/stations",
    }).then((response) => { 
        console.log(response.data)
        setUnRegistratedStations(response.data);
        setIsUnregistratedLoaded(true);
      })
      .catch((error) => {
        console.log("ошибка при получении незаристрированных станций")
        setIsUnregistratedLoaded(true);
      });
  }, [isUnregistratedLoaded]);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleCancelClick = () => {
    setModalVisible(false);  
  }

  const handleRedCancelClick = () => {
    setRedModalVisible(false);  
  }

  const addRedClickHandler = (row, e) => {
    setError(false);
    setRedFormProps(row);
    setRedModalVisible(true);
  }

  const onRedFinish = (values) => {
    axios({
      method: 'patch',
      url: `https://chargerswebapi.azurewebsites.net/stations/${redFormProps.id}`,
      data: values
    }).then(() => { 
        stations.map(el => {
          var found = [redFormProps].find(s => s["id"] === el["id"]);
          
          if (found) {
            Object.assign(el, values);
          }
          
          return el;
        });
        setRedFormProps(null);
        setRedModalVisible(false);
      })
      .catch((error) => {setError(true)});
  };
  const deleteButtonClickHandler = () => {
    axios({
      method: 'post',
      url: "https://chargerswebapi.azurewebsites.net/stations/remove",
      data: selectedRows.map(el => el.id) 
    })
      .then(() => {
          setStations(stations.filter(item => !selectedRows.includes(item)));
          state.selectedRows = []
        } 
      )
      .catch((error) => console.log("ошибка при удалении"));
    setToggleCleared(!toggleCleared);
  };

  const addButtonClickHandler = () => {
    setIsUnregistratedLoaded(false);
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
      url: `https://chargerswebapi.azurewebsites.net/stations/${formProps}`,
      data: values
    }).then(() => {
        setUnRegistratedStations(unRegistratedStations.filter(item => item.id != formProps));
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

  const columns = [
    {
      name: 'id',
      selector: 'id',
      maxWidth: "50px"
    },
    {
      name: 'Название',
      selector: 'name',
      maxWidth: "250px"
    },
    {
      name: 'Мощность',
      selector: 'power',
      maxWidth: "50px"
    },
    {
      name: 'Цена за 1 кВ',
      selector: 'cost',
      maxWidth: "120px",
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
      cell: (row) => <Button key="change" onClick={(e) => addRedClickHandler(row, e)}>Редактировать</Button>
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
      selector: 'latitude',
      maxWidth: "50px",
    },
    {
      name: 'Долгота',
      selector: 'longitude',
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
            data={unRegistratedStations}
            columns={newStationColumns}
            title="Недобавленные станции"
            actions={new_actions}
            progressPending={!isUnregistratedLoaded}
          /> 
        ) : (
          <DataTable
            data={stations}
            columns={columns}
            selectableRows
            selectableRowsHighlight
            contextActions={contextActions}
            actions={actions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            progressPending={!isObjectLoaded}
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
            name="cost"
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
        title="Редактирование станции"
        visible={redModalVisible}
        onCancel={handleRedCancelClick}
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
          onFinish={onRedFinish}
          initialValues={redFormProps}
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
            name="cost"
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
              Редактировать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default StationsDatatable;