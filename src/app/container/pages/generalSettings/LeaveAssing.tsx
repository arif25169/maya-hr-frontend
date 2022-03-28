import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, notification} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';
import { format } from 'path';

export default function LeaveAssing() {
    
    const [assignForm] = Form.useForm();
    const { Option } = Select;
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchEmployeeListByDepartmentId = useStoreActions((state) =>  state.generalSetting.fetchEmployeeListByDepartmentId);
    const employeeListByDepartmentId = useStoreState((state) => state.generalSetting.employeeListByDepartmentId);
    const fetchLevelListByDepartmentId = useStoreActions((state) => state.generalSetting.fetchLeavelListByDepartmentId);
    const leavelListByDepartmentId = useStoreState((state) => state.generalSetting.leavelListByDepartmentId);
    const [leaveConfigList, setLeaveConfigList] = useState<any>();
    const [departmentId, setDepartmentId] = useState<any>();
    const [employeeId, setEmployeeId] = useState<any>();
    const [leaveConfigRequestList, setLeaveConfigRequestList] = useState<any>([]);
    const [selectedLeaveList, setSelectedLeaveList] = useState([]);
    const [selectedLeaveValueList, setSelectedLeaveValueList] = useState([]);
    const saveLeaveAssign = useStoreActions((state) => state.generalSetting.saveLeaveAssign);
    const columns  = [
        {title : 'Leave Category Name', dataIndex: 'leaveCategoryName', key: 'departmentSerial', showOnResponse: true, showOnDesktop: true},
        {title : 'Number of Leave', dataIndex: 'leaveConfigId', key: 'leaveConfigId', showOnResponse: true, showOnDesktop: true, 
            render: (text: any, record: any, index) => (
                <div>
                    <InputNumber value={record?.leaveQuantity} placeholder='Write number of leave' onChange={onchangeValue("leaveQuantity", record, record?.index)}/>
                </div>
            )
        },
    ]

    const onchangeValue: any =
    useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = [...leaveConfigList];
        newData[index][key] = e;
        setLeaveConfigList(newData);
    },[leaveConfigList]);



    const onChangeDepartment = (value) => {
        setDepartmentId(value);
        fetchEmployeeListByDepartmentId(value);
        fetchLevelListByDepartmentId(value);
    }

    useEffect(() => {
        setLeaveConfigList(leavelListByDepartmentId.map((item, index) => ({...item, index: index})));
    }, [leavelListByDepartmentId])

    useEffect(() => {
        fetchCompanyDepartmentList();
    }, []);

    const onSelectChangeLeaveCinfig = (selectedRowKeys, value) => {
        setSelectedLeaveList(selectedRowKeys);
        setSelectedLeaveValueList(value);
    };


    const lecateConfigSelection = {
        selectedLeaveList,
        onChange: onSelectChangeLeaveCinfig,
    };

    const saveData = () => {
        if(selectedLeaveList.length > 0){
            let configRequestList:any = [];
            selectedLeaveValueList.map((item:any, index) => {
                let list:any = {
                    leaveCategoryId : item?.leaveConfigId,
                    leaveQuantity : item?.leaveQuantity,
                }
                configRequestList.push(list);
            }); 

            let data:any = {
                employeeIds : employeeId,
                leaveConfigRequestList : configRequestList
            }
            saveLeaveAssign(data);
            setLeaveConfigList([]);
            assignForm.resetFields();
        }else{
            notification.error({ message: 'Select Row First' });
        }   
    }

    return (
        <>
            <Card title="Leave Assign">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, offset: 6  }} lg={{ span: 12, offset: 6  }} xl={{ span: 12, offset: 6  }} >
                        <Form
                            layout="vertical"
                            form={assignForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Form.Item
                                        name="department"
                                        label="Department Name"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select depatment name" },
                                        ]}
                                    >
                                        <SelectDepartment onChange={(e) => onChangeDepartment(e)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Form.Item
                                        name="employee"
                                        label="Employee"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select employee" },
                                        ]}
                                    >
                                        <Select style={{ width: "100%" }} placeholder="Select Employee" mode="multiple" onChange={(e) => setEmployeeId(e)}>
                                        {employeeListByDepartmentId ? (
                                            employeeListByDepartmentId.map((type, idx) => (
                                            <Option key={type.employeeId} value={type.employeeId}>
                                                {type.employeeName}
                                            </Option>
                                            ))
                                        ) : (
                                            <Option value="fetching">Fetching Employee</Option>
                                        )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                {leaveConfigList &&
                    leaveConfigList.length > 0 ?
                    <>
                        <Row className='mt-30'>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20, offset: 2  }} lg={{ span: 20, offset: 2  }} xl={{ span: 20, offset: 2  }} >
                                <TableView
                                    antTableProps={{
                                        showHeader: true,
                                        columns:columns,
                                        rowKey:"leaveConfigId",
                                        dataSource: leaveConfigList,
                                        filterData: leaveConfigList,
                                        pagination: true,
                                        bordered: true,
                                        rowSelection:lecateConfigSelection,                           
                                    }}
                                    mobileBreakPoint={768}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-30'>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20, offset: 2  }} lg={{ span: 20, offset: 2  }} xl={{ span: 20, offset: 2  }} >
                                <div style={{ float: "right" }}>
                                    <Button type='primary' onClick={saveData} icon={<SaveOutlined />}>Save</Button>
                                </div>
                            </Col>
                        </Row>
                    </>
                :''}
            </Card>
        </>
    )
}