import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm} from 'antd'
import { InteractionOutlined} from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';
import { SelectDesignation } from '../../select/SelectDesignation';
import { SelectEmployeeType } from '../../select/SelectEmployeeType';
import ReactExport from "react-export-excel";


// const ExcelFile: any = ReactExport.ExcelFile;
// const ExcelSheet: any = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn: any = ReactExport.ExcelFile.ExcelColumn;

export default function EmployeeDisableList() {
    const fetchEmployeeDisableList = useStoreActions((state) => state.hr.fetchEmployeeDisableList);
    const employeeDisableList = useStoreState((state) => state.hr.employeeDisableList);
    const updateEmployeeDisableInfo = useStoreActions((state) => state.hr.updateEmployeeDisableInfo);
    const [employeeData, setEmployeeData] = useState<any>();

    const tableColumn = [
        {title : 'Employee ID', dataIndex: 'employeeCustomId', key: 'employeeCustomId', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Father Name', dataIndex: 'fatherName', key: 'fatherName', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Mother Name', dataIndex: 'motherName', key: 'motherName', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Gender', dataIndex: 'gender', key: 'gender', showOnResponse: true, showOnDesktop: true, width: 90,},
        {title : 'Marital Status', dataIndex: 'maritalStatus', key: 'maritalStatus', showOnResponse: true, showOnDesktop: true, width: 130,},
        {title : 'Date of Birth', dataIndex: 'dateOfBirth', key: 'dateOfBirth', showOnResponse: true, showOnDesktop: true, width: 120,},
        {title : 'Personal Mobile', dataIndex: 'personalMbile', key: 'personalMbile', showOnResponse: true, showOnDesktop: true, width: 140,},
        {title : 'Joining Date', dataIndex: 'joiningDate', key: 'joiningDate', showOnResponse: true, showOnDesktop: true, width: 140,},
        {title : 'Action', dataIndex: 'employeeId', key: 'employeeId', showOnResponse: true, showOnDesktop: true, width: 120, fixed: 'right', render: (text, record, index) => (
            <div style={{ textAlign: "center" }}>
                <Popconfirm
                        title="Are you Want to make active this employee?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => enableEmployee(record.employeeId)}
                >
                    <Tooltip title="Make Active">
                        <Button type='primary' icon={<InteractionOutlined />} />
                    </Tooltip>
                </Popconfirm>
            </div>
        )},
    ];



    useEffect(function(){
        fetchEmployeeDisableList();
    },[]);

    useEffect(function(){
        setEmployeeData(employeeDisableList);
    },[employeeDisableList]);

    const enableEmployee = (value) => {
        fetchEmployeeById(value);
        
    }

    const fetchEmployeeById = (id) => {
        let dataList:any;
        employeeDisableList.map((item, index) => {
            if (item.employeeId == id) {
                dataList = {
                    bloodGroup: item.bloodGroup,
                    corporateMobile: item.corporateMobile,
                    dateOfBirth: item.dateOfBirth,
                    emergencyContactNo: item.emergencyContactNo,
                    employeeCustomId: item.employeeCustomId,
                    employeeName: item.employeeName,
                    employeeStatus: 1,
                    fatherName: item.fatherName,
                    gender: item.gender,
                    joiningDate: item.joiningDate,
                    maritalStatus: item.maritalStatus,
                    motherName: item.motherName,
                    nationalIdNo: item.nationalIdNo,
                    nationality: item.nationality,
                    numberOfChild: item.numberOfChild,
                    personalMbile: item.personalMbile,
                    photoName: item.photoName,
                    relationWithEmergencyContact: item.relationWithEmergencyContact,
                    employeeId: item.employeeId,
                    employeePhoto: item.employeePhoto,
                    personalEmail: item.personalEmail,
                    companyEmail: item.companyEmail,
                    employeeHodName: item.employeeHodName,
                    employeeHodId: item.employeeHodId,
                    dutyStationName: item.dutyStationName,
                    dutyStationId: item.dutyStationId
                }
            }
        });
        updateEmployeeDisableInfo(dataList);
    }

    console.log('employeeData', employeeData);
    
    
    return (
        <>
            <Card title="Employee Disable List">
                {employeeDisableList.length > 0  &&
                    <>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns:tableColumn,
                                rowKey:"employeeId",
                                dataSource: employeeData,
                                filterData: employeeData,
                                pagination: true,
                                bordered: true,                      
                            }}
                            mobileBreakPoint={768}
                        />
                    </>
                            
                }
            </Card>
        </>
    )
}