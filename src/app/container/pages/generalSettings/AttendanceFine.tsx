import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, notification, Tabs } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';
import { format } from 'path';
import employeeList from '../employee/CreateEmployee';

export default function AttendanceFine() {

    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = React.useState<any>("1");
    const [attendanceFineForm] = Form.useForm();
    const [attendanceFineSearchForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const fetchAttendanceFineList = useStoreActions((state) => state.generalSetting.fetchAttendanceFineList);
    const saveAttendanceFine = useStoreActions((state) => state.generalSetting.saveAttendanceFine);
    const attendanceFineList = useStoreState((state) => state.generalSetting.attendanceFineList);
    const fetchEmployeeListForAttendanceFine = useStoreActions((state) => state.hr.fetchEmployeeListForAttendanceFine);
    const employeeListForAttendanceFine = useStoreState((state) => state.hr.employeeListForAttendanceFine);
    const updateAttendanceFine = useStoreActions((state) => state.generalSetting.updateAttendanceFine);
    const deleteAttendanceFine = useStoreActions((state) =>  state.generalSetting.deleteAttendanceFine);
    const [attendanceFineId, setAttendanceFineId] = useState<any>();
    const [searchData, setSearchData] = useState<any>();
    const { Option } = Select;

    useEffect(() => {
        let postData:any = {
            department: "",
            designation: "",
            employeeType: ""
        }
        fetchEmployeeListForAttendanceFine(postData)
    }, []);

    const attendanceFineSubmit = (value) => {   
        let employeeId;
        employeeListForAttendanceFine?.map((item:any, index:any) => {
            if(item.employeeCustomId == value.employeeId){
                employeeId = item?.employeeId
            }
        });
        let postData = {
            "attendanceFineId": "",
            "employeeId": employeeId,
            "fineAmount": value.fineAmount,
            "month": value.salaryMonth,
            "numberOfAbsent": value.numberOfAbsent,
            "year": value.year
        }
        saveAttendanceFine(postData);
        attendanceFineForm.resetFields();
    }

    const attendanceUpdateSubmit = (value) => {
        let employeeId;
        employeeListForAttendanceFine?.map((item:any, index:any) => {
            if(item.employeeCustomId == value.employeeIdUpdate){
                employeeId = item?.employeeId
            }
        });
        let dataLoad: any = {
            "attendanceFineId": attendanceFineId,
            "employeeId": employeeId,
            "fineAmount": value.fineAmountUpdate,
            "month": value.salaryMonthUpdate,
            "numberOfAbsent": value.numberOfAbsentUpdate,
            "year": value.yearUpdate
          };
        updateAttendanceFine(dataLoad);
        attendanceFineSearchForm.submit();
        setIsModalVisible(false);
        
    }

    const searchAttendanceList  = (value) => {
        let postData:any = {
            "month" : value.salaryMonth,
            "year" : value.year,
        }
        setSearchData(postData);
        fetchAttendanceFineList(postData);
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
            title: 'Designation',
            dataIndex: 'employeeDesignation',
            key: 'employeeDesignation',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Department',
            dataIndex: 'employeeDepartment',
            key: 'employeeDepartment',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Absent',
            dataIndex: 'numberOfAbsent',
            key: 'numberOfAbsent',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Fine',
            dataIndex: 'fineAmount',
            key: 'fineAmount',
            showOnResponse: true,
            showOnDesktop: true
        },
        {title : 'View Details', dataIndex: 'employeeId', key: 'employeeId', showOnResponse: true, showOnDesktop: true, width: 120, fixed: 'right', render: (text, record, index) => (
            <div style={{ textAlign: "center" }}>
                <Space size="middle">
                    <Tooltip title="View">
                        <Button type='primary' 
                                onClick={() => {
                                    updateForm.setFieldsValue({
                                        employeeIdUpdate: record.employeeCustomId,
                                        yearUpdate: record.year,
                                        salaryMonthUpdate: record.month,
                                        numberOfAbsentUpdate: record.numberOfAbsent,
                                        fineAmountUpdate: record.fineAmount,
                                    });
                                    setAttendanceFineId(record.attendanceFineId)
                                    setIsModalVisible(true);
                                }} 
                                icon={<EditOutlined />} 
                                
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteAttendanceFineSubmit(record?.attendanceFineId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            </div>
        )},
    ];

    const deleteAttendanceFineSubmit = (value) => {
        deleteAttendanceFine(value);
        attendanceFineSearchForm.submit();
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const d = new Date();
    const year = d.getFullYear();

    return (
        <>
            <Card>
                <Row>
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
                                            name="employeeId"
                                            label="Employee"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please select employee" },
                                            ]}
                                        >
                                            <Select placeholder="Select employee" showSearch allowClear filterOption={true}>
                                                {
                                                    employeeListForAttendanceFine.map((item, index) => {
                                                        return(
                                                            <Option key={item?.employeeCustomId} value={item?.employeeCustomId}>{item?.employeeName} - {item?.employeeCustomId}</Option>
                                                        )
                                                    })
                                                }
                                                
                                            </Select>

                                        </Form.Item>
                                    </Col>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 16 }} xl={{ span: 16 }}>
                        
                        <Card title="Attendance Fine List" className='box-shadow-none'>
                            <Form
                                layout="vertical"
                                onFinish={searchAttendanceList}
                                id="basic-info"
                                form={attendanceFineSearchForm}
                            >
                                <Row>
                                    
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
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

                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
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
                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                        <Space size="small">
                                            <Button type="primary" htmlType="submit" style={{ height: 40}} icon={<SearchOutlined />}>
                                                Search
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Form>
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: attendanceFineList,
                                    filterData: attendanceFineList,
                                    pagination: true,
                                    bordered: true,
                                    rowKey: "employeeId",
                                }}
                                mobileBreakPoint={768}
                            />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title="Attendance Fine Update"
                    visible={isModalVisible}
                    //  onOk={handleOk}
                    okButtonProps={{ form: 'update', htmlType: 'submit' }}
                    onCancel={() => setIsModalVisible(false)}
                    cancelText="Close"
                    okText="Update"
                    centered
                    maskClosable={false}
                    footer={null}
                >
                    <Form
                        layout="vertical"
                        onFinish={attendanceUpdateSubmit}
                        id="basic-info"
                        form={updateForm}
                    >
                        <Row gutter={8}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    name="employeeIdUpdate"
                                    label="Employee"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please select employee" },
                                    ]}
                                >
                                    <Select placeholder="Select employee" showSearch allowClear filterOption={true}>
                                        {
                                            employeeListForAttendanceFine.map((item, index) => {
                                                return(
                                                    <Option key={item?.employeeCustomId} value={item?.employeeCustomId}>{item?.employeeName} - {item?.employeeCustomId}</Option>
                                                )
                                            })
                                        }
                                        
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    name="yearUpdate"
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
                                    name="salaryMonthUpdate"
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
                                    name="numberOfAbsentUpdate"
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
                                    name="fineAmountUpdate"
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
                                        Update
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Card>
        </>
    )
}