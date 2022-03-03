import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, TimePicker} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import moment from 'moment';

export default function CreateShift() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [fromTimeForUpdate, setFromTimeForUpdate] = useState<any>();
    const [toTimeForUpdate, setToTimeForUpdate] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const format = 'HH:mm';
    const [shiftId, setShiftId] = useState<any>();
    const [startTime, setStartTime] = useState<any>();
    const [endTime, setEndTime] = useState<any>();
    const [startTimeUpdate, setStartTimeUpdate] = useState<any>();
    const [endTimeUpdate, setEndTimeUpdate] = useState<any>();
    const fetchShiftList = useStoreActions((state) => state.generalSetting.fetchShiftList);
    const shiftList = useStoreState((state) =>  state.generalSetting.shiftList);
    const saveShift = useStoreActions((state) => state.generalSetting.saveShift);
    const updateShift = useStoreActions((state) =>  state.generalSetting.updateShift);
    const deleteShift = useStoreActions((state) => state.generalSetting.deleteShift);
    useEffect(function() {
        fetchShiftList();
    }, []);

    const createShiftForm = (value) => {
        let postdata:any = {
            shiftEndTime : endTime,
            shiftId : 0,
            shiftName : value.shiftName,
            shiftSerial :value.serial,
            shiftStartTime : startTime
          }
        saveShift(postdata);
    }
    const updateSubmitForm = (value) => {
     
       let postData:any = {
         shiftEndTime : endTimeUpdate,
         shiftId : shiftId,
         shiftName : value.updateShift,
         shiftSerial : value.updateSerial,
         shiftStartTime : startTimeUpdate
      }
      updateShift(postData);
      setIsModalVisible(false);
        
    }

    const shiftDeleteSubmit = (value) => {
        deleteShift(value);
    }

    const columns  = [
        {title : 'SL No.', dataIndex: 'shiftSerial', key: 'shiftSerial', showOnResponse: true, showOnDesktop: true},
        {title : 'Shift Name', dataIndex: 'shiftName', key: 'shiftName', showOnResponse: true, showOnDesktop: true},
        {title : 'From Time', dataIndex: 'shiftStartTime', key: 'shiftStartTime', showOnResponse: true, showOnDesktop: true},
        {title : 'To Time', dataIndex: 'shiftEndTime', key: 'shiftEndTime', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true)
                                    updateForm.setFieldsValue({
                                        updateSerial: record.shiftSerial,
                                        updateShift: record.shiftName,
                                    });
                                    setStartTimeUpdate(record.shiftStartTime);
                                    setEndTimeUpdate(record.shiftEndTime);
                                    setShiftId(record.shiftId);
                                }} 
                                icon={<EditOutlined />} 
                                
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => shiftDeleteSubmit(record.shiftId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger  icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },
    ]
    
    const onchangeStartValue: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value)
    };

    const onchangeEndValue: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value)
    };

    const onchangeStartValueUpate: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTimeUpdate(e.target.value)
    };

    const onchangeEndValueUpate: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTimeUpdate(e.target.value)
    };

    return (
        <>
            <Card title="Create Shift">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createShiftForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="serial"
                                        label="Serial"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write serial" },
                                        ]}
                                    >
                                        <InputNumber placeholder="write serial" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="shiftName"
                                        label="Shift"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write shift" },
                                        ]}
                                    >
                                        <Input placeholder="write shift" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="fromTime"
                                        label="From Date"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write from date" },
                                        ]}
                                    >
                                        <div className='ant-picker' style={{ width: "100%" }}>
                                            <div className="ant-picker-input">
                                                <input type="time" id='startTime' className="form-control" onChange={(e) => onchangeStartValue(e)} style={{ width: "100%" }} />
                                            </div>
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="toTime"
                                        label="To Date"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write to date" },
                                        ]}
                                    >
                                        <div className='ant-picker' style={{ width: "100%" }}>
                                            <div className="ant-picker-input">
                                                <input type="time" id='endTime' onChange={(e) => onchangeEndValue(e)} className="form-control" style={{ width: "100%" }} />
                                            </div>
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4, offset: 20 }} lg={{ span: 4, offset: 20 }} xl={{ span: 4, offset: 20 }}>
                                    <Space size="small" style={{ float: "right" }} >
                                        <Button type="primary" className='mt-0' htmlType="submit" icon={<SaveOutlined />} >
                                            Save
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row className='mt-30'>
                    <Col span={24}>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns:columns,
                                rowKey:"serial",
                                dataSource: shiftList,
                                filterData: shiftList,
                                pagination: true,
                                bordered: true,                           
                            }}
                            mobileBreakPoint={768}
                        />
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Update Designation"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Update"
                centered
                maskClosable={false}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={updateSubmitForm}
                    form={updateForm}
                >
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="updateSerial"
                                label="Serial"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write serial" },
                                ]}
                            >
                                <InputNumber placeholder="write serial" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="updateShift"
                                label="Shift"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write shift" },
                                ]}
                            >
                                <Input placeholder="write shift" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="fromTimeUpdate"
                                label="From Date"
                                className="title-Text"
                            >
                                {startTimeUpdate}
                                <div className='ant-picker' style={{ width: "100%" }}>
                                    <div className="ant-picker-input">
                                        <input type="time" id='startTimeUpdate' className="form-control" onChange={(e) => onchangeStartValueUpate(e)} style={{ width: "100%" }} />
                                    </div>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="toTimeUpdate"
                                label="To Date"
                                className="title-Text"
                            >
                                {endTimeUpdate}
                                <div className='ant-picker' style={{ width: "100%" }}>
                                    <div className="ant-picker-input">
                                        <input type="time" id='startTimeUpdate' className="form-control" onChange={(e) => onchangeEndValueUpate(e)} style={{ width: "100%" }} />
                                    </div>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}