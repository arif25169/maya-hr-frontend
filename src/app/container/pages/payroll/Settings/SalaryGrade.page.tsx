import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';


export default function SalaryGrade() {
    const salaryGradeList = useStoreState((state) => state.payroll.salaryGradeList);
    const fetchsalaryGradeList = useStoreActions((state) => state.payroll.fetchsalaryGradeList);
    const saveSalaryGrade = useStoreActions((state) => state.payroll.saveSalaryGrade);
    const updateSalaryGrade = useStoreActions((state) => state.payroll.updateSalaryGrade);
    const deleteSalaryGrade = useStoreActions((state) => state.payroll.deleteSalaryGrade);

    const [saveForm] = Form.useForm();
    const [updateForm] = Form.useForm();

    ///modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateId, setUpdateid] = useState<any>();

    useEffect(() => {
        fetchsalaryGradeList();
    }, [])

    const createSubmitForm = (value) => {
        console.log(value)
        saveSalaryGrade(value);
        saveForm.resetFields();
    }

    /////////////

    const updateSubmitForm = (value) => {
        value.salaryGradeId = updateId;
        updateSalaryGrade(value);
        setIsModalVisible(false);
        updateForm.resetFields();
    }

    const columns = [
        {
            title: 'Grade Name',
            dataIndex: 'gradeName',
            key: 'gradeName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Basic Amount',
            dataIndex: 'basicAmount',
            key: 'basicAmount',
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
            key: 'ss',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' icon={<EditOutlined />} onClick={() => {
                            updateForm.setFieldsValue({
                                gradeName: record.gradeName,
                                basicAmount: record.basicAmount,
                                note: record.note,
                            });
                            setIsModalVisible(true);
                            setUpdateid(record.salaryGradeId);

                        }} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteSalaryGrade(record?.salaryGradeId)}
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
        <Card title="Grade">
            <Row>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 24, offset:2 }} xl={{ span: 24, offset:2}}>
                    <Form
                        layout="vertical"
                        id="sessionInfo"
                        onFinish={createSubmitForm}
                        form={saveForm}
                    >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Form.Item
                                    name="gradeName"
                                    label="Grade Name"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please write grade name" },
                                    ]}
                                >
                                    <Input placeholder="Grade Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Form.Item
                                    name="basicAmount"
                                    label="Basic Amount"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please input amount" },
                                    ]}
                                >
                                    <Input placeholder="Basic Amount" />
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
                        {salaryGradeList?.length > 0 &&
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: salaryGradeList,
                                    // filterData: salaryGradeList,
                                    pagination: true,
                                    bordered: true,
                                    rowKey: "key",
                                    //rowKey:record => record.salaryGradeId
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
                                name="gradeName"
                                label="Grade Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write grade name" },
                                ]}
                            >
                                <Input placeholder="Grade Name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="basicAmount"
                                label="Basic Amount"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input amount" },
                                ]}
                            >
                                <Input placeholder="Basic Amount" />
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