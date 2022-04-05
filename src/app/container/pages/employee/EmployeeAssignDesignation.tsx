import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, EyeFilled, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';
import { SelectDesignation } from '../../select/SelectDesignation';
import { SelectEmployeeType } from '../../select/SelectEmployeeType';


export default function EmployeeAssignDesignation() {

    const [form] = Form.useForm();
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchCompanyDesignationList = useStoreActions((state) => state.common.fetchCompanyDesignationList);
    const fetchEmployeeByDepartment = useStoreActions((state) => state.hr.fetchEmployeeByDepartment);
    const employeeListByDepartment = useStoreState((state) => state.hr.employeeListByDepartment);
    const assignDesignation = useStoreActions((state) => state.payroll.assignDesignation);


    const [updateForm] = Form.useForm();

    ///modal
    const [isModalVisible, setIsModalVisible] = useState(false);


    const tableColumn = [
        { title: 'Employee Id', dataIndex: 'employeeCustomId', key: 'employeeCustomId', showOnResponse: true, showOnDesktop: true, },
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true, },
        { title: 'Designation', dataIndex: 'designationName', key: 'designationName', showOnResponse: true, showOnDesktop: true, },

    ];

    useEffect(function () {
        fetchCompanyDepartmentList();
        fetchCompanyDesignationList();
    }, []);

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
    const onSubmit = (value) => {
        let postData: any = {
            "employeeIds": selectedValue.map((item: any) => item.employeeId),
            "designationId": value.designationId
        }
        assignDesignation(postData);
        setIsModalVisible(false);
        setselectedRowKeys([]);
        setselectedValue([]);
        updateForm.resetFields();
        setTimeout(() => {
            fetchEmployeeByDepartment(data);
        }, 1000);
    }

    return (
        <>
            <Card title="Assign Designation">
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
                                dataSource: employeeListByDepartment,
                                filterData: employeeListByDepartment,
                                pagination: true,
                                bordered: true,
                                rowSelection: rowSelection,
                            }}
                            mobileBreakPoint={768}
                        />
                        <Space size={"middle"} style={{ float: 'right' }}>
                            <Button type='primary' icon={<SettingOutlined />} onClick={
                                () => {
                                    if (selectedRowKeys?.length == 0) {
                                        message.error("Please select employee");
                                        return;
                                    }
                                    setIsModalVisible(true);
                                }
                            }>Assign</Button>
                        </Space>
                    </>
                }
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
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={onSubmit}
                    form={updateForm}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="designationId"
                                label="Designation"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Select designation" },
                                ]}
                            >
                                <SelectDesignation />
                            </Form.Item>
                        </Col>


                    </Row>
                </Form>
            </Modal>
        </>
    )
}