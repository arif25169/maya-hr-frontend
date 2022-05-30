import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, notification, Tabs } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';

export default function StaffTimeConfig() {

    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = React.useState<any>("1");
    const [staffForm] = Form.useForm();
    const [staffFormUpdate] = Form.useForm();
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchEmployeeListForattendanceTimeConfig = useStoreActions((state) => state.generalSetting.fetchEmployeeListForattendanceTimeConfig);
    const employeeListForattendanceTimeConfig = useStoreState((state) => state.generalSetting.employeeListForattendanceTimeConfig);
    const saveEmployeeAttendanceTimeConfig = useStoreActions((state) => state.generalSetting.saveEmployeeAttendanceTimeConfig);
    const updateAttendanceTimeConfiguration = useStoreActions((state) => state.generalSetting.updateAttendanceTimeConfiguration);
    const fetchattendanceTimeConfigurationListByDepartmentWise = useStoreActions((state) => state.generalSetting.fetchattendanceTimeConfigurationListByDepartmentWise);
    const deleteAttendanceTimeConfiguration = useStoreActions((state) => state.generalSetting.deleteAttendanceTimeConfiguration);
    const attendanceTimeConfigurationListByDepartmentWise = useStoreState((state) => state.generalSetting.attendanceTimeConfigurationListByDepartmentWise);
    const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
    const [selectedValue, setselectedValue] = useState<any>([]);

    useEffect(function () {
        fetchCompanyDepartmentList();
    }, []);

    const onSelectChange = (selectedRowKeys, value) => {
        setselectedRowKeys(selectedRowKeys);
        setselectedValue(value);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    useEffect(() => {
        fetchEmployeeListForattendanceTimeConfig();
    }, []);

    const staffSubmit = (value) => {
        let employeeId: any = [];
        selectedValue.map((item, index) => {
            employeeId.push(item.employeeId)
        })
        let dataLoad: any = {
            "dayNames": value.dayNames,
            "delayTime": value.delayTime,
            "employeeIds": employeeId,
            "inTime": value.inTime,
            "outTime": value.outTime
        }
        if (employeeId.length > 0) {
            saveEmployeeAttendanceTimeConfig(dataLoad);
        } else {
            notification.error({ message: 'Row select first' })
        }
    }
    const staffUpdateSubmit = (value) => {
        console.log(value)
        let dataLoad: any = {
            "delayTime": value.delayTime,
            "inTime": value.inTime,
            "outTime": value.outTime,
            "attendanceTimeConfigId":attendanceTimeConfigId
        };
        console.log(dataLoad)
        updateAttendanceTimeConfiguration(dataLoad);
        setIsModalVisible(false);
        setTimeout(() => {
            fetchattendanceTimeConfigurationListByDepartmentWise(dep);
        }, 1000);

    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'employeeCustomId',
            key: 'employeeCustomId',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Department',
            dataIndex: 'departmentName',
            key: 'departmentName',
            showOnResponse: true,
            showOnDesktop: true
        }
    ];

    const [attendanceTimeConfigId, setattendanceTimeConfigId] = useState<any>('');
    const cocfigurationColumns = [
        {
            title: 'ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Day Name',
            dataIndex: 'dayName',
            key: 'dayName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'In Time',
            dataIndex: 'inTime',
            key: 'inTime',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Out Time',
            dataIndex: 'outTime',
            key: 'outTime',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Delay Time',
            dataIndex: 'delayTime',
            key: 'delayTime',
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
                                setattendanceTimeConfigId(record.attendanceTimeConfigId);
                                staffFormUpdate.setFieldsValue({
                                    inTime: record.inTime?.slice(0, -3),
                                    outTime: record.outTime?.slice(0, -3),
                                    delayTime: record.delayTime?.slice(0, -3),
                                });
                                setIsModalVisible(true);
                            }}
                            icon={<EditOutlined />}

                        />
                    </Tooltip>


                </Space>
            ),
        },
    ];

    const onChangeTabs = (e) => {
        setActiveTab(e);
    };

    const [form] = Form.useForm();
    const [dep, setDep] = useState<any>();

    const submitForm = (val) => {
        setDep(val);
        fetchattendanceTimeConfigurationListByDepartmentWise(val);
    };

    const deleteConfig = () => {
        if (selectedRowKeys.length === 0) {
            message.error('Select row first');
            return
        };
        let dataLoad: any = selectedValue.map(item => item.attendanceTimeConfigId).join(',');
        deleteAttendanceTimeConfiguration(dataLoad);
        setselectedRowKeys([]);
        setselectedRowKeys([]);
        setTimeout(() => {
            fetchattendanceTimeConfigurationListByDepartmentWise(dep);
        }, 1000);

    };

    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <>
            <Card title="Employee Attendance Time Configuration">
                <Tabs defaultActiveKey="1" onChange={(e) => onChangeTabs(e)} type="card">
                    <TabPane tab="Attendance Config" key="1">
                        {activeTab === "1" &&
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Card title="Employee List" className='box-shadow-none'>
                                        <TableView
                                            antTableProps={{
                                                showHeader: true,
                                                columns,
                                                dataSource: employeeListForattendanceTimeConfig,
                                                filterData: employeeListForattendanceTimeConfig,
                                                pagination: true,
                                                bordered: true,
                                                rowKey: "employeeId",
                                                rowSelection: rowSelection,
                                            }}
                                            mobileBreakPoint={768}
                                        />
                                    </Card>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Card title="Time and Day" className='box-shadow-none'>
                                        <Form
                                            layout="vertical"
                                            onFinish={staffSubmit}
                                            id="basic-info"
                                            form={staffForm}
                                        >
                                            <Row gutter={8}>
                                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                                    <Form.Item
                                                        name="inTime"
                                                        label="In Time"
                                                        className="title-Text"
                                                        rules={[
                                                            { required: true, message: "Please select in time" },
                                                        ]}
                                                    >
                                                        <Input placeholder="In Time" type={'time'} />

                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                                    <Form.Item
                                                        name="outTime"
                                                        label="Out Time"
                                                        className="title-Text"
                                                        rules={[
                                                            { required: true, message: "Please select out time" },
                                                        ]}
                                                    >
                                                        <Input placeholder="Out Time" type={'time'} />

                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                                    <Form.Item
                                                        name="delayTime"
                                                        label="Delay Time"
                                                        className="title-Text"
                                                        rules={[
                                                            { required: true, message: "Please select delay time" },
                                                        ]}
                                                    >
                                                        <Input placeholder="Delay Time" type={'time'} />

                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                                                    <Form.Item
                                                        name="dayNames"
                                                        label="Select Day(s)"
                                                        className="title-Text"
                                                        rules={[
                                                            { required: true, message: "Please select day(s)" },
                                                        ]}
                                                    >
                                                        <Select placeholder='Select Days' mode='multiple'>
                                                            <Select.Option value="Saturday">Saturday</Select.Option>
                                                            <Select.Option value="Sunday">Sunday</Select.Option>
                                                            <Select.Option value="Monday">Monday</Select.Option>
                                                            <Select.Option value="Tuesday">Tuesday</Select.Option>
                                                            <Select.Option value="Wednesday">Wednesday</Select.Option>
                                                            <Select.Option value="Thursday">Thursday</Select.Option>
                                                            <Select.Option value="Friday">Friday</Select.Option>
                                                        </Select>

                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                                    <Space size="small" >
                                                        <Button type="primary" htmlType="submit" style={{ height: 40 }} icon={<SaveOutlined />}>
                                                            Save
                                                        </Button>
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </Col>
                            </Row>
                        }
                    </TabPane>
                    <TabPane tab="Configuration List" key="2">
                        {activeTab === "2" &&
                            <>
                                <Card title="Staff Attendance Configuration List" className='box-shadow-none'>
                                    <Form layout="vertical" onFinish={submitForm} id='create-class' form={form} >
                                        <Row gutter={15} >
                                            <Col xs={24} sm={24} md={24} lg={8} xl={8}></Col>

                                            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                                <Form.Item
                                                    name="departmentId"
                                                    label="Department"
                                                    className="title-Text"
                                                    rules={[
                                                        { required: true, message: "Please select department" },
                                                    ]}
                                                >
                                                    <SelectDepartment />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={2} xl={2}>

                                                <Space size="small"  >
                                                    <Button type="primary" htmlType="submit" >
                                                        Search
                                                    </Button>
                                                </Space>

                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                                        </Row>
                                    </Form>
                                    <Row className='m-t-30'>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>

                                            {attendanceTimeConfigurationListByDepartmentWise?.length > 0 &&
                                                <>
                                                    <TableView
                                                        antTableProps={{
                                                            showHeader: true,
                                                            columns: cocfigurationColumns,
                                                            dataSource: attendanceTimeConfigurationListByDepartmentWise,
                                                            filterData: attendanceTimeConfigurationListByDepartmentWise,
                                                            pagination: true,
                                                            bordered: true,
                                                            rowKey: "attendanceTimeConfigId",
                                                            rowSelection: rowSelection,
                                                        }}
                                                        mobileBreakPoint={768}
                                                    />
                                                    <Space size={"middle"} style={{ float: "right" }}>
                                                        <Button type='primary' icon={<DeleteOutlined />} onClick={deleteConfig}>Delete</Button>
                                                    </Space>
                                                </>
                                            }

                                        </Col>
                                    </Row>
                                </Card>
                            </>

                        }
                    </TabPane>
                </Tabs>
            </Card>
            <Modal
                title="Update"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Update"
                centered
                maskClosable={false}
                width={"50%"}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={staffUpdateSubmit}
                    id="basic-info"
                    form={staffFormUpdate}
                >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <Form.Item
                                name="inTime"
                                label="In Time"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select in time" },
                                ]}
                            >
                                <Input placeholder="In Time" type={'time'} />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <Form.Item
                                name="outTime"
                                label="Out Time"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select out time" },
                                ]}
                            >
                                <Input placeholder="Out Time" type={'time'} />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <Form.Item
                                name="delayTime"
                                label="Delay Time"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select delay time" },
                                ]}
                            >
                                <Input placeholder="Delay Time" type={'time'} />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <Space size="small" >
                                <Button type="primary" htmlType="submit" style={{ height: 40 }} icon={<SaveOutlined />}>
                                    Update
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}