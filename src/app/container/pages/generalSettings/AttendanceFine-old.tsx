import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, notification, Tabs } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';

export default function AttendanceFine() {

    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = React.useState<any>("1");
    const [attendanceFineForm] = Form.useForm();
    const [staffFormUpdate] = Form.useForm();
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const saveAttendanceFine = useStoreActions((state) => state.generalSetting.saveAttendanceFine);
    
    const fetchEmployeeListForattendanceTimeConfig = useStoreActions((state) => state.generalSetting.fetchEmployeeListForattendanceTimeConfig);
    const employeeListForattendanceTimeConfig = useStoreState((state) => state.generalSetting.employeeListForattendanceTimeConfig);
    
    const updateAttendanceTimeConfiguration = useStoreActions((state) => state.generalSetting.updateAttendanceTimeConfiguration);
    const fetchattendanceTimeConfigurationListByDepartmentWise = useStoreActions((state) => state.generalSetting.fetchattendanceTimeConfigurationListByDepartmentWise);
    const deleteAttendanceTimeConfiguration = useStoreActions((state) => state.generalSetting.deleteAttendanceTimeConfiguration);
    const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
    const [selectedValue, setselectedValue] = useState<any>([]);
    const { Option } = Select;
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

    const attendanceFineSubmit = (value) => {
        const employeeId = localStorage.getItem('employeeId')
        console.log('employeeId', employeeId);
        
        let postData = {
            "attendanceFineId": "",
            "employeeId": employeeId,
            "fineAmount": value.fineAmount,
            "month": value.salaryMonth,
            "numberOfAbsent": value.numberOfAbsent,
            "year": value.year
        }
        console.log('postData',postData);
        
        // saveAttendanceFine(postData);
    }
    const staffUpdateSubmit = (value) => {
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
 

    const [dep, setDep] = useState<any>();


    const [isModalVisible, setIsModalVisible] = useState(false);

    const d = new Date();
    const year = d.getFullYear();

    return (
        <>
            <Card title="Attendance Fine">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 16 }} xl={{ span: 16 }}>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                        <Card title="Attendance Fine Config" className='box-shadow-none'>
                            <Form
                                layout="vertical"
                                onFinish={attendanceFineSubmit}
                                id="basic-info"
                                form={attendanceFineForm}
                            >
                                <Row gutter={8}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            name="year"
                                            label="Year"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please select year" },
                                            ]}
                                        >
                                            <Select placeholder="Select year">
                                                <Option key={year - 1} value={year - 1}>{year - 1}</Option>
                                                <Option key={year} value={year}>{year}</Option>
                                                <Option key={year + 1} value={year + 1}>{year + 1}</Option>
                                            </Select>

                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            name="salaryMonth"
                                            label="Salary Month"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please select month" },
                                            ]}
                                        >
                                            <Select placeholder="Select month">
                                                <Option key="1" value="January">January</Option>
                                                <Option key="2" value="February">February</Option>
                                                <Option key="3" value="March">March</Option>
                                                <Option key="4" value="April">April</Option>
                                                <Option key="5" value="May">May</Option>
                                                <Option key="6" value="June">June</Option>
                                                <Option key="7" value="July">July</Option>
                                                <Option key="8" value="August">August</Option>
                                                <Option key="9" value="September">September</Option>
                                                <Option key="10" value="October">October</Option>
                                                <Option key="11" value="November">November</Option>
                                                <Option key="12" value="December">December</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            name="numberOfAbsent"
                                            label="Number of Absent"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please write number of absent" },
                                            ]}
                                        >
                                            <Input placeholder="Number of Absent"  />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            name="fineAmount"
                                            label="Fine Amount"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please write fine amount" },
                                            ]}
                                        >
                                            <Input placeholder="Fine Amount"  />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Space size="small" style={{  float: "right" }}>
                                            <Button type="primary" htmlType="submit" style={{ height: 40, marginTop:0 }} icon={<SaveOutlined />}>
                                                Save
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
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