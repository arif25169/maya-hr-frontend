//CreateEmployeeByExcel
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Upload} from 'antd'
import moment from 'moment';
import { SelectGender } from '../../select/SelectGender';
import { SelectThana } from '../../select/SelectThana';
import { SelectDistrict } from '../../select/SelectDistrict';
import { SelectDepartment } from '../../select/SelectDepartment';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { SelectDesignation } from '../../select/SelectDesignation';
import { SelectEmployeeType } from '../../select/SelectEmployeeType';
import { SelectShift } from '../../select/SelectShift';
import xlsxParser from 'xlsx-parse-json';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateEmployeeByExcel() {

    const [form] = Form.useForm();
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchCompanyDesignationList = useStoreActions((state) => state.common.fetchCompanyDesignationList);
    const fetchCompanyEmployeeList = useStoreActions((state) => state.common.fetchCompanyEmployeeList);
    const fetchCompanyShiftList = useStoreActions((state) => state.common.fetchCompanyShiftList);
    const saveEmployeeFromExcell = useStoreActions((state) => state.generalSetting.saveEmployeeFromExcell)
    const [fileList, setFileList] = useState<any>([]);
    const [tableRowStore, setTableRowStore] = useState([]);
    useEffect(function(){
        fetchCompanyDepartmentList();
        fetchCompanyDesignationList();
        fetchCompanyEmployeeList();
        fetchCompanyShiftList();
    },[]);

    const onChangeFile = ({ fileList: newFileList }) => {
        newFileList[0].status = "done"
        xlsxParser
            .onFileSelection(newFileList[0]?.originFileObj)
            .then(data => {
                console.log('data', data);
                
                let temp = data?.['Sheet1']?.map(function (item, index) {
                    return {
                        key: index,
                        bloodGroup: item['Blood Group'],
                        corporateMobile: item['Corporate Mobile'],
                        dateOfBirth: item['Date date Of Birth'],
                        emergencyContactNo: item['Emergency Contact No'],
                        employeeCustomId: "",
                        employeeName: item['Employee Name'],
                        fatherName: item['Father Name'],
                        gender: item['Gender'],
                        joiningDate: item['Joining Date'],
                        maritalStatus: item['Marital Status'],
                        motherName: item['Mother Name'],
                        nationalIdNo: item['National ID No'],
                        nationality: item['Nationality'],
                        numberOfChild: item['Number Of Child'],
                        personalMbile: item['Personal Mbile'],
                        photoName: "",
                        relationWithEmergencyContact: item['Relation of Emrg. Contact No']                        
                    }
                })
                setTableRowStore(temp);
            });

    };

    const columns = [
        {title : 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true},
        {title : 'Father Name', dataIndex: 'fatherName', key: 'fatherName', showOnResponse: true, showOnDesktop: true},
        {title : 'Mother Name', dataIndex: 'motherName', key: 'motherName', showOnResponse: true, showOnDesktop: true},
        {title : 'Gender', dataIndex: 'gender', key: 'gender', showOnResponse: true, showOnDesktop: true},
        {title : 'Marital Status', dataIndex: 'maritalStatus', key: 'maritalStatus', showOnResponse: true, showOnDesktop: true},
        {title : 'Date Of Birth', dataIndex: 'dateOfBirth', key: 'dateOfBirth', showOnResponse: true, showOnDesktop: true},
        {title : 'Personal Mobile', dataIndex: 'personalMbile', key: 'personalMbile', showOnResponse: true, showOnDesktop: true},
        {title : 'Corporate Mobile', dataIndex: 'corporateMobile', key: 'corporateMobile', showOnResponse: true, showOnDesktop: true},
        {title : 'Emergency Contact No', dataIndex: 'emergencyContactNo', key: 'emergencyContactNo', showOnResponse: true, showOnDesktop: true},
        {title : 'Relation of Emrg. Contact No', dataIndex: 'relationWithEmergencyContact', key: 'relationWithEmergencyContact', showOnResponse: true, showOnDesktop: true},
        {title : 'National ID No', dataIndex: 'nationalIdNo', key: 'nationalIdNo', showOnResponse: true, showOnDesktop: true},
        {title : 'Number Of Child', dataIndex: 'numberOfChild', key: 'numberOfChild', showOnResponse: true, showOnDesktop: true},
        {title : 'Nationality', dataIndex: 'nationality', key: 'nationality', showOnResponse: true, showOnDesktop: true},
        {title : 'Blood Group', dataIndex: 'bloodGroup', key: 'bloodGroup', showOnResponse: true, showOnDesktop: true},
        {title : 'Joining Date', dataIndex: 'joiningDate', key: 'joiningDate', showOnResponse: true, showOnDesktop: true},
    ]

    const submitFrom = (value) => {
        let postdata:any = {
            departmentId: value.department,
            designationId: value.designation,
            employeeBasicRequestList: tableRowStore,
            employeeTypeId: value.employeeType,
            shiftId: value.shift
          }
          
          saveEmployeeFromExcell(postdata);
          setTableRowStore([]);
    }

    return (
        <>
            <Card title="Create Employee">
                <Form
                    layout="vertical"
                    id="CreateEmployeeByExcel"
                    form={form}
                    onFinish={submitFrom}
                >
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item
                                name="shift"
                                label="Shift"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Select Shift" },
                                ]}
                            >
                                <SelectShift />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Space size="small">
                            <div className='mt-30 mt-mo-0'>
                                    <Upload
                                        listType="text"
                                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        fileList={fileList}
                                        onChange={onChangeFile}
                                        style={{ maxWidth: 220 }}

                                    >
                                        {fileList.length < 1 && <><Button icon={<UploadOutlined />}>Upload Excel File</Button></>}
                                    </Upload>
                                </div>
                            </Space>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Space size="small" style={{ float: "right" }} >
                                <Button type="primary" onClick={() => window.open('https://res.cloudinary.com/dnyoqhb7g/raw/upload/v1616406742/Student-excel/student_admission_custom_id.xlsx', '_blank')}>Sample File</Button>
                            </Space>
                        </Col>
                    </Row>
                    {tableRowStore.length > 0 ? 
                        <Row className='mt-30'>
                            <Col span={24}>
                                <TableView
                                    antTableProps={{
                                        showHeader: true,
                                        columns:columns,
                                        rowKey:"key",
                                        dataSource: tableRowStore,
                                        filterData: tableRowStore,
                                        pagination: true,
                                        bordered: true,                           
                                    }}
                                    mobileBreakPoint={768}
                                />
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Space className='mt20' size="small" style={{ float: "right" }} >
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                            Save
                                        </Button>
                                    </Space>
                                </Col>
                        </Row>
                    : ''}
                </Form>
            </Card>
        </>
    )
}