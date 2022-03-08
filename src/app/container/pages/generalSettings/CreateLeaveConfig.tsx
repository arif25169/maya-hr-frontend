import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';

export default function CreateLeaveConfig() {
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const leaveCategoryList = useStoreState((state) => state.generalSetting.leaveCategoryList);
    const fetchleaveCategoryList = useStoreActions((state) => state.generalSetting.fetchleaveCategoryList);

    const leaveConfigList = useStoreState((state) => state.generalSetting.leaveConfigList);
    const fetchleaveConfigList = useStoreActions((state) => state.generalSetting.fetchleaveConfigList);
    const createLeaveConfig = useStoreActions((state) => state.generalSetting.createLeaveConfig);
    const updateLeaveConfig = useStoreActions((state) => state.generalSetting.updateLeaveConfig);
    const deleteLeaveConfig = useStoreActions((state) => state.generalSetting.deleteLeaveConfig);

    useEffect(() => {
        fetchleaveCategoryList();
        fetchCompanyDepartmentList();
        fetchleaveConfigList();
    }, [])


    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
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


    const createLeaveCategoryForm = (value) => {
        if (selectedRowKeys.length === 0) {
            message.error('Please select at least one leave category');
            return;
        }
        let payload = {
            "departmentId": value?.departmentId,
            "leaveConfigRequestList": selectedValue.map(item => {
                return {
                    "leaveCategoryId": item.leaveCategoryId,
                    "leaveQuantity": item.leaveQuantity === undefined ? 0 : item.leaveQuantity
                }
            })

        }
        createLeaveConfig(payload);
        setselectedRowKeys([]);
        setselectedValue([]);
        setTableData(tableData.map(item => { item.leaveQuantity = undefined; return item }));
        createForm.resetFields();
    }
    const updateSubmitForm = (value) => {
        value.leaveConfigId = id;
        updateLeaveConfig(value);
        updateForm.resetFields();
        setIsModalVisible(false);
    }
    const [id, setId] = useState<any>()

    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        setTableData(leaveCategoryList);
    }, [leaveCategoryList]);

    const columns = [
        { title: 'Leave Category', dataIndex: 'leaveCategoryName', key: 'leaveCategoryName', showOnResponse: true, showOnDesktop: true },
        {
            title: 'Number Of Leave',
            dataIndex: 'leaveQuantity',
            key: 'leaveQuantity',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <InputNumber
                    min={0}
                    value={record.leaveQuantity}
                    onChange={onchangeQuantity("leaveQuantity", record, index)}
                    placeholder="Leave Quantity"
                ></InputNumber>
            ),
        },
    ];

    const onchangeQuantity: any =
        (key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e;
            setTableData(newData);
        };

    const columns2 = [
        { title: 'Leave Category Name', dataIndex: 'leaveCategoryName', key: 'leaveCategoryName', showOnResponse: true, showOnDesktop: true },
        { title: 'Department Name', dataIndex: 'departmentName', key: 'departmentName', showOnResponse: true, showOnDesktop: true },
        { title: 'Number Of Leave', dataIndex: 'leaveQuantity', key: 'leaveQuantity', showOnResponse: true, showOnDesktop: true },
        {
            title: 'Action',
            key: 'ss',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' icon={<EditOutlined />} onClick={() => {
                            updateForm.setFieldsValue({
                                leaveQuantity: record.leaveQuantity,
                            });
                            setIsModalVisible(true);
                            setId(record.leaveConfigId);

                        }} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteLeaveConfig(record?.leaveConfigId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        }
    ];


    return (
        <>
            <Card title="Leave Config">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 10 }} xl={{ span: 10 }} >
                        <Form
                            layout="vertical"

                            onFinish={createLeaveCategoryForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 3 }} lg={{ span: 3 }} xl={{ span: 3 }}>

                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 16 }} xl={{ span: 16 }}>
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

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns: columns,
                                            rowKey: "leaveCategoryId",
                                            dataSource: tableData,
                                            filterData: tableData,
                                            pagination: true,
                                            bordered: true,
                                            rowSelection: rowSelection,
                                        }}
                                        mobileBreakPoint={768}
                                    />
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Space size="small" style={{ float: "right", marginTop: -20 }} >
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                            Save
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 14 }} xl={{ span: 14 }} >
                        <div style={{ marginTop: 95 }}>
                            {/* //need fix for mobile display */}
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: columns2,
                                    rowKey: "leaveConfigId",
                                    dataSource: leaveConfigList,
                                    filterData: leaveConfigList,
                                    pagination: true,
                                    bordered: true,
                                }}
                                mobileBreakPoint={768}
                            />
                        </div>

                    </Col>
                </Row>

            </Card>
            <Modal
                title="Update Category"
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
                    onFinish={updateSubmitForm}
                    form={updateForm}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="leaveQuantity"
                                label="Leave Quantity"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input serial" },
                                ]}
                            >
                                <Input placeholder="Leave Quanity" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}