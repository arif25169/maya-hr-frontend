import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, notification } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';

const currentyear = new Date().getFullYear();
const optionsYear = [
    { value: currentyear - 1, label: currentyear - 1 },
    { value: currentyear, label: currentyear },
    { value: currentyear + 1, label: currentyear + 1 }
];
export default function LeaveAssignList() {

    const [form] = Form.useForm();
    const { Option } = Select;
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchleaveAssignListByDepartment = useStoreActions((state) => state.generalSetting.fetchleaveAssignListByDepartment);
    const leaveAssignListByDepartment = useStoreState((state) => state.generalSetting.leaveAssignListByDepartment);

    const columns = [
        { title: 'Id', dataIndex: 'customEmployeeId', key: 'customEmployeeId', showOnResponse: true, showOnDesktop: true },
        { title: 'Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Designation', dataIndex: 'designation', key: 'designation', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave', dataIndex: 'leave', key: 'leave', showOnResponse: true, showOnDesktop: true },
    ]

    const onSubmit = (values) => {
        fetchleaveAssignListByDepartment(values);
    }
    useEffect(() => {
        fetchCompanyDepartmentList();
    }, []);

    const [year, setYear] = useState<any>('');

    return (
        <>
            <>
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 14, offset: 6 }} xl={{ span: 14, offset: 6 }} >
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={onSubmit}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 11 }} xl={{ span: 11 }}>
                                    <Form.Item
                                        name="year"
                                        label="Select Year:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select Year" },
                                        ]}
                                    >
                                        <Select allowClear placeholder="Select Year" options={optionsYear} onChange={(e) => setYear(e)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 11 }} xl={{ span: 11 }}>
                                    <Form.Item
                                        name="departmentId"
                                        label="Select Deparment"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select depatment name" },
                                        ]}
                                    >
                                        <SelectDepartment />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 2 }} xl={{ span: 2 }}>
                                    <Space size="large" >
                                        <Button type="primary" className='mt-5' htmlType="submit" icon={<SearchOutlined />} >
                                            Search
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                {leaveAssignListByDepartment.length > 0 &&
                    <>
                        <Row className='mt-30'>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20, offset: 2 }} lg={{ span: 20, offset: 2 }} xl={{ span: 20, offset: 2 }} >
                                <TableView
                                    antTableProps={{
                                        showHeader: true,
                                        columns: columns,
                                        rowKey: "leaveConfigId",
                                        dataSource: leaveAssignListByDepartment,
                                        filterData: leaveAssignListByDepartment,
                                        pagination: true,
                                        bordered: true,
                                    }}
                                    mobileBreakPoint={768}
                                />
                            </Col>
                        </Row>
                    </>
                }
            </>
        </>
    )
}