import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateDutyStation() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [dutyid, setid] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const savedutyStation = useStoreActions((state) => state.generalSetting.savedutyStation);
    const fetchdutyStationList = useStoreActions((state) => state.generalSetting.fetchdutyStationList);
    const dutyStationList = useStoreState((state) => state.generalSetting.dutyStationList);
    const updatedutyStation = useStoreActions((state) => state.generalSetting.updatedutyStation);
    const deletedutyStation = useStoreActions((state) => state.generalSetting.deletedutyStation);

    useEffect(function() {
        fetchdutyStationList();
    }, []);


    const createEmployeeTypeForm = (value) => {
        let postData:any = {
            dutyStationName: value.dutyStationName,
            dutyStationAddress: value.dutyStationAddress,
        }
        savedutyStation(postData);
        createForm.resetFields();
    }
    const updateSubmitForm = (value) => {
        let postData:any = {
            dutyStationId: dutyid,
            dutyStationName: value.dutyStationName,
            dutyStationAddress: value.dutyStationAddress,
        }
        updatedutyStation(postData);
        setIsModalVisible(false);
    }

    const deleteId = (value) => {
        deletedutyStation(value);
    }


    const columns  = [
        {title : 'Duty Station Name', dataIndex: 'dutyStationName', key: 'dutyStationName', showOnResponse: true, showOnDesktop: true},
        {title : 'Duty Station Address', dataIndex: 'dutyStationAddress', key: 'dutyStationAddress', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true)
                                    updateForm.setFieldsValue({
                                        dutyStationName: record.dutyStationName,
                                        dutyStationAddress: record.dutyStationAddress,
                                    });
                                    setid(record.dutyStationId);
                                }} 
                                icon={<EditOutlined />} 
                                
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteId(record.dutyStationId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger  icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },
    ]


    return (
        <>
            <Card title="Duty Station">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16, offset: 4  }} lg={{ span: 24, offset: 4  }} xl={{ span: 24, offset: 4  }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createEmployeeTypeForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="dutyStationName"
                                        label="Duty Station Name"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write duty station name" },
                                        ]}
                                    >
                                        <Input placeholder="Duty Station Name" />
                                    </Form.Item>
                                </Col>                                
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="dutyStationAddress"
                                        label="Duty Station Address"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write duty station address" },
                                        ]}
                                    >
                                        <Input placeholder="Duty Station Name" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                    <Space size="small" >
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
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
                                dataSource: dutyStationList,
                                filterData: dutyStationList,
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
                                name="dutyStationName"
                                label="Duty Station Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write duty station name" },
                                ]}
                            >
                              <Input placeholder="Duty Station Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="dutyStationAddress"
                                label="Duty Station Address"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write duty station address" },
                                ]}
                            >
                               <Input placeholder="Duty Station Address" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}