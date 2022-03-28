import React, { useEffect, useState } from 'react';
import { Button, Card, Col, List, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Descriptions } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsiveNoSearch';




export default function SalaryGradeConfigureList() {
    const salaryGradeConfigurationList = useStoreState((state) => state.payroll.salaryGradeConfigurationList);
    const fetchsalaryGradeConfigurationList = useStoreActions((state) => state.payroll.fetchsalaryGradeConfigurationList);
    const updateAdditionSalaryGradeConfiguration = useStoreActions((state) => state.payroll.updateAdditionSalaryGradeConfiguration);
    const updateDeductionSalaryGradeConfiguration = useStoreActions((state) => state.payroll.updateDeductionSalaryGradeConfiguration);
    const deleteAdditionSalaryGradeConfiguration = useStoreActions((state) => state.payroll.deleteAdditionSalaryGradeConfiguration);
    const deleteDeductionSalaryGradeConfiguration = useStoreActions((state) => state.payroll.deleteDeductionSalaryGradeConfiguration);

    useEffect(() => {
        fetchsalaryGradeConfigurationList();
    }, [])

    console.log(salaryGradeConfigurationList)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [configId, setconfigId] = useState<any>(null);


    const additioncolumns = [
        {
            title: 'Salary Head',
            dataIndex: 'salaryHeadName',
            key: 'salaryHeadName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Action',
            key: 'configId',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' icon={<EditOutlined />} onClick={() => {
                            updateFormAddition.setFieldsValue({
                                amount: record.amount,
                            });
                            setIsModalVisible(true);
                            setconfigId(record.configId);

                        }} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteAdditionSalaryGradeConfiguration(record?.configId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        }

    ];

    const deductioncolumns = [
        {
            title: 'Salary Head',
            dataIndex: 'salaryHeadName',
            key: 'salaryHeadName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Action',
            key: 'configId',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' icon={<EditOutlined />} onClick={() => {
                            updateFormDeduction.setFieldsValue({
                                amount: record.amount,
                            });
                            setIsModalVisible2(true);
                            setconfigId(record.configId);

                        }} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteDeductionSalaryGradeConfiguration(record?.configId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        }
    ];
    const [updateFormAddition] = Form.useForm();
    const [updateFormDeduction] = Form.useForm();

    const updateSubmitFormAddition = (value) => {
        value.configId = configId;
        updateAdditionSalaryGradeConfiguration(value);
        setIsModalVisible(false);
        updateFormAddition.resetFields();
    }

    const updateSubmitFormDeduction = (value) => {
        value.configId = configId;
        updateDeductionSalaryGradeConfiguration(value);
        setIsModalVisible2(false);
        updateFormDeduction.resetFields();
    }

    return (
        <>
            <List
                bordered
                dataSource={salaryGradeConfigurationList}
                renderItem={(item: any, index) => (
                    <Card>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                <Descriptions
                                    // title="User Info"
                                    bordered
                                    style={{ marginBottom: 10 }}
                                    column={{ xxl: 4, xl: 4, lg: 4, md: 1, sm: 1, xs: 1 }}
                                >
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Salary Grade Name"><span style={{ fontWeight: "normal" }}>{item?.salaryGradeName}</span></Descriptions.Item>
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Basic Salary"><span style={{ fontWeight: "normal" }}>{item?.basic}</span></Descriptions.Item>
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Net Salary"><span style={{ fontWeight: "normal" }}>{item?.netSalary}</span></Descriptions.Item>
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Gross Salary"><span style={{ fontWeight: "normal" }}>{item?.grossSalary}</span></Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                <Card title="Addition List">

                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns: additioncolumns,
                                            dataSource: item?.salaryHeadAdditionConfigurations,
                                            filterData: item?.salaryHeadAdditionConfigurations,
                                            pagination: false,
                                            bordered: true,
                                            rowKey: "configId",

                                            style: { maxHeight: 300, overflow: 'auto' }
                                        }}
                                        mobileBreakPoint={768}
                                    />
                                </Card>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>

                                <Card title="Deduction List">

                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns: deductioncolumns,
                                            dataSource: item?.salaryHeadDeductionConfigurations,
                                            filterData: item?.salaryHeadDeductionConfigurations,
                                            pagination: false,
                                            bordered: true,
                                            rowKey: "salaryHeadDeductionId",
                                            style: { maxHeight: 300, overflow: 'auto' }
                                        }}
                                        mobileBreakPoint={768}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                )}
            />
            <Modal
                title="Update"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Update"
                centered
                destroyOnClose
                maskClosable={false}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={updateSubmitFormAddition}
                    form={updateFormAddition}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="amount"
                                label="Amount"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input amount" },
                                ]}
                            >
                                <InputNumber placeholder="Amount" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                title="Update2"
                visible={isModalVisible2}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible2(false)}
                cancelText="Close"
                okText="Update"
                centered
                destroyOnClose
                maskClosable={false}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={updateSubmitFormDeduction}
                    form={updateFormDeduction}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="amount"
                                label="Amount"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input amount" },
                                ]}
                            >
                                <InputNumber placeholder="Amount" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

        </>
    )

}