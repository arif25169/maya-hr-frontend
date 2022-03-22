import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';


export default function HeadAddition() {
    const salaryHeadListAddition = useStoreState((state) => state.payroll.salaryHeadListAddition);
    const fetchsalaryHeadListAddition = useStoreActions((state) => state.payroll.fetchsalaryHeadListAddition);
    const addSalaryHeadAddition = useStoreActions((state) => state.payroll.addSalaryHeadAddition);
    const updateSalaryHeadAddition = useStoreActions((state) => state.payroll.updateSalaryHeadAddition);
    const deleteSalaryHeadAddition = useStoreActions((state) => state.payroll.deleteSalaryHeadAddition);

    const [saveForm] = Form.useForm();
    const [updateForm] = Form.useForm();

    ///modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateId, setUpdateid] = useState<any>();

    useEffect(() => {
        fetchsalaryHeadListAddition();
    }, [])

    const createSubmitForm = (value) => {
        addSalaryHeadAddition(value);
        saveForm.resetFields();
    }

    /////////////

    const updateSubmitForm = (value) => {
        value.salaryHeadAdditionId = updateId;
        updateSalaryHeadAddition(value);
        setIsModalVisible(false);
        updateForm.resetFields();
    }

    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'salaryHeadSerial',
            key: 'salaryHeadSerial',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Salary Head Name',
            dataIndex: 'salaryHeadName',
            key: 'salaryHeadName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            showOnResponse: true,
            showOnDesktop: true
        },

        {
            title: 'Action',
            key: 'salaryHeadAdditionId',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' icon={<EditOutlined />} onClick={() => {
                            updateForm.setFieldsValue({
                                // salaryHeadSerial: record.salaryHeadSerial,
                                salaryHeadName: record.salaryHeadName,
                                note: record.note,
                            });
                            setIsModalVisible(true);
                            setUpdateid(record.salaryHeadAdditionId);

                        }} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteSalaryHeadAddition(record?.salaryHeadAdditionId)}
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
        <Card title="Addition">
            <Row>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 24, offset:2 }} xl={{ span: 24, offset:2}}>
                    <Form
                        layout="vertical"
                        id="sessionInfo"
                        onFinish={createSubmitForm}
                        form={saveForm}
                    >
                        <Row>
                            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Form.Item
                                    name="salaryHeadSerial"
                                    label="Serial No"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please input serial no" },
                                    ]}
                                >
                                    <Input placeholder="Serial No" />
                                </Form.Item>
                            </Col> */}
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Form.Item
                                    name="salaryHeadName"
                                    label="Head Name"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please input amount" },
                                    ]}
                                >
                                    <Input placeholder="Head Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Form.Item
                                    name="note"
                                    label="Note"
                                    className="title-Text"
                                // rules={[
                                //     { required: true, message: "Please write serial number" },
                                // ]}
                                >
                                    <Input placeholder="Note" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 2 }} xl={{ span: 2 }}>
                                <Space size="small" >
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                        Save
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="m-t-mo-30">
                <Col span="24">
                    <div className="datatable-responsive-demo">
                        {salaryHeadListAddition?.length > 0 &&
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: salaryHeadListAddition,
                                    filterData: salaryHeadListAddition,
                                    pagination: true,
                                    bordered: true,
                                    rowKey: "id",
                                }}
                                mobileBreakPoint={768}
                            />
                        }
                    </div>
                </Col>
            </Row>
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
                    onFinish={updateSubmitForm}
                    form={updateForm}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="salaryHeadSerial"
                                label="Serial No"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input serial no" },
                                ]}
                            >
                                <Input placeholder="Grade Name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="salaryHeadName"
                                label="Head Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input amount" },
                                ]}
                            >
                                <Input placeholder="Head Name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="note"
                                label="Note"
                                className="title-Text"
                            // rules={[
                            //     { required: true, message: "Please write serial number" },
                            // ]}
                            >
                                <Input placeholder="Note" />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </Card>
    )

}