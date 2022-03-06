import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm} from 'antd'
import { DeleteOutlined, EditOutlined, EyeFilled, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';
import { SelectDesignation } from '../../select/SelectDesignation';
import { SelectEmployeeType } from '../../select/SelectEmployeeType';
import { userStore } from '../../../store/states/user/user';
import { v4 as uuidv4 } from "uuid";

export default function EmployeeList() {

    const [form] = Form.useForm();
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchCompanyDesignationList = useStoreActions((state) => state.common.fetchCompanyDesignationList);
    const fetchCompanyEmployeeList = useStoreActions((state) => state.common.fetchCompanyEmployeeList);
    const fetchCompanyShiftList = useStoreActions((state) => state.common.fetchCompanyShiftList);
    const fetchEmployeeList = useStoreActions((state) => state.hr.fetchEmployeeList);
    const employeeList = useStoreState((state) => state.hr.employeeList);
    const tableColumn = [
        {title : 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true, width: 140,},
        {title : 'Father Name', dataIndex: 'employeeCustomId', key: 'employeeCustomId', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Mother Name', dataIndex: 'motherName', key: 'motherName', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Gender', dataIndex: 'gender', key: 'gender', showOnResponse: true, showOnDesktop: true, width: 90,},
        {title : 'Marital Status', dataIndex: 'maritalStatus', key: 'maritalStatus', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Date of Birth', dataIndex: 'dateOfBirth', key: 'dateOfBirth', showOnResponse: true, showOnDesktop: true, width: 120,},
        {title : 'Personal Mobile', dataIndex: 'personalMbile', key: 'personalMbile', showOnResponse: true, showOnDesktop: true, width: 140,},
        {title : 'Corporate Mobile', dataIndex: 'corporateMobile', key: 'corporateMobile', showOnResponse: true, showOnDesktop: true, width: 150,},
        {title : 'Emegency Contact No.', dataIndex: 'emergencyContactNo', key: 'emergencyContactNo', showOnResponse: true, showOnDesktop: true, width: 180,},
        {title : 'Relation of Emrg. Contact No', dataIndex: 'relationWithEmergencyContact', key: 'relationWithEmergencyContact', showOnResponse: true, showOnDesktop: true, width: 220,},
        {title : 'National ID', dataIndex: 'nationalIdNo', key: 'nationalIdNo', showOnResponse: true, showOnDesktop: true, width: 110,},
        {title : 'Number of Child', dataIndex: 'numberOfChild', key: 'numberOfChild', showOnResponse: true, showOnDesktop: true, width: 140,},
        {title : 'Nationality', dataIndex: 'nationality', key: 'nationality', showOnResponse: true, showOnDesktop: true, width: 120,},
        {title : 'Blood Group', dataIndex: 'bloodGroup', key: 'bloodGroup', showOnResponse: true, showOnDesktop: true, width: 120,},
        {title : 'Joining Date', dataIndex: 'joiningDate', key: 'joiningDate', showOnResponse: true, showOnDesktop: true, width: 140,},
        {title : 'Action', dataIndex: 'employeeId', key: 'employeeId', showOnResponse: true, showOnDesktop: true, render: (text, record, index) => (
            <Tooltip title="Edit">
                <Button type='primary' 
                        onClick={() => {
                            pageRedirect(record.employeeId)
                        }} 
                        icon={<EyeFilled />} 
                        
                />
            </Tooltip>
        )},
    ];

    useEffect(function(){
        fetchCompanyDepartmentList();
        fetchCompanyDesignationList();
        fetchCompanyEmployeeList();
        fetchCompanyShiftList();
    },[]);

    const submitFrom = (value) => {
        console.log('submitFrom', value);
        let postData:any = {
            department: value.department,
            designation: value.designation,
            employeeType: value.employeeType
        }
        
        fetchEmployeeList(postData);
    }

    const pageRedirect = (value) => {
        console.log('value', value);
        let employeeId = value;
        localStorage.setItem('employeeId', employeeId);
        window.location.href = '/employee-information';
    }
    
    return (
        <>
            <Card title="Employee List">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20, offset: 2 }} lg={{ span: 20, offset: 2 }} xl={{ span: 20, offset: 2 }}>
                        <Form
                            layout="vertical"
                            id="employeeListSearch"
                            form={form}
                            onFinish={submitFrom}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="department"
                                        label="Department"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Select department" },
                                        ]}
                                    >
                                        <SelectDepartment />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="designation"
                                        label="Designation"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Select designation" },
                                        ]}
                                    >
                                        <SelectDesignation />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="employeeType"
                                        label="Employee Type"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Select employee type" },
                                        ]}
                                    >
                                        <SelectEmployeeType />
                                        
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Space size="small" >
                                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                                            Search
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                {employeeList.length > 0  &&

                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns:tableColumn,
                                rowKey:"employeeId",
                                dataSource: employeeList,
                                filterData: employeeList,
                                pagination: true,
                                bordered: true,                        
                            }}
                            mobileBreakPoint={768}
                        />
   
                }
            </Card>
        </>
    )
}