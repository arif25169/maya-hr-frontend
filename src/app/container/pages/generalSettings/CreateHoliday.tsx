import { Button, Card, Col, DatePicker, Form, Input, Modal, Popconfirm, Row, Space, Table, Tooltip } from 'antd'
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { DeleteOutlined, EditOutlined, FilePdfOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';




export default function CreateHoliday(props) {

    const holidayList = useStoreState((state) => state.generalSetting.holidayList);
    const fetchholidayList = useStoreActions((state) => state.generalSetting.fetchholidayList);
    const createHoliday = useStoreActions((state) => state.generalSetting.createHoliday);
    const updateHoliday = useStoreActions((state) => state.generalSetting.updateHoliday);
    const deleteHoliday = useStoreActions((state) => state.generalSetting.deleteHoliday);

    useEffect(() => {
        fetchholidayList();
    }, [])

    console.log(holidayList)

    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState<any>(false);


    const saveFormSubmit = (value) => {
        let postData = {
            holidayName: value.holidayName,
            serial: value.serial,
            holidayStartDate: moment(value?.holidayStartDate).format("YYYY-MM-DD"),
            holidayEndDate: moment(value?.holidayEndDate).format("YYYY-MM-DD")
        };
        createHoliday(postData);
        createForm.resetFields();
    };

    const updateFormSubmit = (value) => {
        let postData = {
            holidayName: value.holidayName,
            serial: value.serial,
            holidayId: id,
            holidayStartDate: moment(value?.holidayStartDate).format("YYYY-MM-DD"),
            holidayEndDate: moment(value?.holidayEndDate).format("YYYY-MM-DD")
        };
        updateHoliday(postData);
        setIsModalVisible(false)
        updateForm.resetFields();
    };

    const [id, setId] = useState<any>()
    const columns = [

        {
            title: 'Serial',
            dataIndex: 'serial',
            key: 'serial',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Holiday Name',
            dataIndex: 'holidayName',
            key: 'holidayName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Start Date',
            dataIndex: 'holidayStartDate',
            key: 'holidayStartDate',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'End Date',
            dataIndex: 'holidayEndDate',
            key: 'holidayEndDate',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary'
                            onClick={() => {
                                setIsModalVisible(true);
                                setId(record.holidayId);
                                updateForm.setFieldsValue({
                                    holidayName: record.holidayName,
                                    holidayStartDate: moment(record.holidayStartDate,),
                                    holidayEndDate: moment(record.holidayEndDate,),
                                    serial: record.serial,
                                });
                            }}
                            icon={<EditOutlined />}

                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteHoliday(record?.holidayId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },

    ]



    return (
        <>
            <Card title="Create Holiday" >
                <Form
                    layout="vertical"
                    onFinish={saveFormSubmit}
                    id="basic-info"
                    form={createForm}
                >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}> </Col>

                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="serial"
                                label="Serial"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input serial" },
                                ]}
                            >
                                <Input placeholder="Serial No" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="holidayName"
                                label="Holiday Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write holiday name" },
                                ]}
                            >
                                <Input placeholder='Holiday Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="holidayStartDate"
                                label="Start Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please enter from date" },
                                ]}
                            >

                                <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="holidayEndDate"
                                label="End Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please enter to date" },
                                ]}
                            >

                                <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
                            <Button type="primary" htmlType="submit" style={{ height: 40, marginTop: 30 }} icon={<SaveOutlined />}>
                                Save
                            </Button>

                        </Col>
                    </Row>
                </Form>
                <Row className='mt-30'>
                    <Col span={24}>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns: columns,
                                rowKey: "holidayId",
                                dataSource: holidayList,
                                filterData: holidayList,
                                pagination: true,
                                bordered: true,
                            }}
                            mobileBreakPoint={768}
                        />
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Update Holiday"
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
                    onFinish={updateFormSubmit}
                    form={updateForm}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="serial"
                                label="Serial"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input serial" },
                                ]}
                            >
                                <Input placeholder="Serial No" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="holidayName"
                                label="Holiday Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write holiday name" },
                                ]}
                            >
                                <Input placeholder='Holiday Name' />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="holidayStartDate"
                                label="Start Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please enter from date" },
                                ]}
                            >

                                <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="holidayEndDate"
                                label="End Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please enter to date" },
                                ]}
                            >

                                <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
