import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, EyeFilled, SaveOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';
import { SelectDesignation } from '../../select/SelectDesignation';
import { SelectEmployeeType } from '../../select/SelectEmployeeType';
import { SelectBanks } from '../../select/SelectBanks';


export default function EmployeeIdUpdate() {

    const [form] = Form.useForm();
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchCompanyDesignationList = useStoreActions((state) => state.common.fetchCompanyDesignationList);
    const fetchEmployeeByDepartment = useStoreActions((state) => state.hr.fetchEmployeeByDepartment3);
    const employeeListByDepartment = useStoreState((state) => state.hr.employeeListByDepartment3);
    const employeeCustomIdUpdate = useStoreActions((state) => state.payroll.employeeCustomIdUpdate);

    useEffect(function () {
        fetchCompanyDepartmentList();
        fetchCompanyDesignationList();
    }, []);

    const [updateForm] = Form.useForm();

    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        setTableData(employeeListByDepartment.map((item, index) => ({ ...item, index: index })));
    }, [employeeListByDepartment]);



    const tableColumn = [
        {
            title: 'Employee Id',
            dataIndex: 'employeeCustomId',
            key: 'employeeCustomId', showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <>
                        <Input placeholder='Account Name' value={record.employeeCustomId} onChange={onchangeValue("employeeCustomId", record, record.index)} />
                    </>
                )

            }
        },
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true, },
        { title: 'Designation', dataIndex: 'designationName', key: 'designationName', showOnResponse: true, showOnDesktop: true, },
        { title: 'Mobile Number', dataIndex: 'personalMbile', key: 'personalMbile', showOnResponse: true, showOnDesktop: true, },
    ];
    const onchangeValue: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e.target.value;
            setTableData(newData);
        }, [tableData]);

    const [data, setData] = useState<any>({});

    const submitFrom = (value) => {
        setData(value.department);
        fetchEmployeeByDepartment(value.department);
    }

    const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
    const [selectedValue, setselectedValue] = useState<any>([]);

    const onSelectChange = (selectedRowKeys, value) => {
        setselectedRowKeys(selectedRowKeys);
        setselectedValue(value);
        // console.log(value)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const onSubmit = () => {
        let postData = selectedValue.map((item: any) => ({
            "employeeId": item.employeeId,
            "employeeCustomId": item.employeeCustomId,
        }));
        employeeCustomIdUpdate(postData);
        setselectedRowKeys([]);
        setselectedValue([]);
        updateForm.resetFields();
        setTimeout(() => {
            fetchEmployeeByDepartment(data);
        }, 1000);
    }

    return (
        <>
            <Card title="Employee Id Update">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12, offset: 8 }} xl={{ span: 12, offset: 8 }}>
                        <Form
                            layout="vertical"
                            id="employeeListSearch"
                            form={form}
                            onFinish={submitFrom}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 126 }}>
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
                {employeeListByDepartment.length > 0 &&
                    <>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns: tableColumn,
                                rowKey: "employeeId",
                                dataSource: tableData,
                                filterData: tableData,
                                pagination: true,
                                bordered: true,
                                rowSelection: rowSelection,
                            }}
                            mobileBreakPoint={768}
                        />
                        <Space size={"middle"} style={{ float: 'right' }}>
                            <Button type='primary' icon={<SaveOutlined />} onClick={
                                () => {
                                    if (selectedRowKeys?.length == 0) {
                                        message.error("Please select employee");
                                        return;
                                    }
                                    onSubmit();
                                }
                            }>Save</Button>
                        </Space>
                    </>
                }
            </Card>

        </>
    )
}