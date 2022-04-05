import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Descriptions, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default function BankAdviseContent() {

    const fetchbankAdviseContentView = useStoreActions((state) => state.payroll.fetchbankAdviseContentView);
    const saveBankAdviseContent = useStoreActions((state) => state.payroll.saveBankAdviseContent);
    const bankAdviseContentView = useStoreState((state) => state.payroll.bankAdviseContentView);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        fetchbankAdviseContentView()
    }, [])

    const [form] = Form.useForm();
    const submitForm = (val) => {
        saveBankAdviseContent(val);
        setIsModalVisible(false);
    }
    return (
        <>
            <Card title="Bank Advise Conetnt">
                <Descriptions
                    // title="User Info"
                    bordered
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Bank Name">{bankAdviseContentView?.bankName}</Descriptions.Item>
                    <Descriptions.Item label="Branch Name">{bankAdviseContentView?.branchName}</Descriptions.Item>
                    <Descriptions.Item label="Address">{bankAdviseContentView?.address}</Descriptions.Item>
                    <Descriptions.Item label="Salutation">{bankAdviseContentView?.salutation}</Descriptions.Item>
                    <Descriptions.Item label="Subject">{bankAdviseContentView?.subjectContent}</Descriptions.Item>
                    <Descriptions.Item label="Opening Paragraph">{bankAdviseContentView?.openingParagraph}</Descriptions.Item>
                    <Descriptions.Item label="Last Paragraph">{bankAdviseContentView?.lastParagraph}</Descriptions.Item>
                    <Descriptions.Item label="Signature Title">{bankAdviseContentView?.signatureTitle}</Descriptions.Item>
                    <Descriptions.Item label="Signature Content-1">{bankAdviseContentView?.signatureContent1}</Descriptions.Item>
                    <Descriptions.Item label="Signature Content-2">{bankAdviseContentView?.signatureContent2}</Descriptions.Item>
                    <Descriptions.Item label="Signature Content-3">{bankAdviseContentView?.signatureContent3}</Descriptions.Item>
                </Descriptions>
                <Space size={"large"} style={{ float: "right", marginTop: 10 }}>
                    <Button type='primary' onClick={() => { form.setFieldsValue(bankAdviseContentView); setIsModalVisible(true) }} icon={<EditOutlined />}>Edit</Button>
                </Space>
            </Card>
            <Modal
                title="Edit"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Update"
                centered
                width={'50%'}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={submitForm}
                    form={form}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="bankName"
                                label="Bank Name"
                                className="title-Text"
                            >
                                <Input placeholder="Bank Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="branchName"
                                label="Branch Name"
                                className="title-Text"
                            >
                                <Input placeholder="Branch Name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="address"
                                label="Address"
                                className="title-Text"
                            >
                                <Input.TextArea placeholder="Address"></Input.TextArea>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="salutation"
                                label="Salutation"
                                className="title-Text"
                            >
                                <Input placeholder="Salutation" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="subjectContent"
                                label="Subject Content"
                                className="title-Text"
                            >
                                <TextArea placeholder="Subject Content" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="openingParagraph"
                                label="Opening Paragraph"
                                className="title-Text"
                            >
                                <TextArea placeholder="Opening Paragraph" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="lastParagraph"
                                label="Last Paragraph"
                                className="title-Text"
                            >
                                <TextArea placeholder="Last Paragraph" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="signatureTitle"
                                label="Signature Title"
                                className="title-Text"
                            >
                                <Input placeholder="Signature Title" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="signatureContent1"
                                label="Signature Content1"
                                className="title-Text"
                            >
                                <Input placeholder="Signature Content1" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="signatureContent2"
                                label="Signature Content2"
                                className="title-Text"
                            >
                                <Input placeholder="Signature Content2" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="signatureContent3"
                                label="Signature Content3"
                                className="title-Text"
                            >
                                <Input placeholder="Signature Content3" />
                            </Form.Item>
                        </Col>


                    </Row>
                </Form>
            </Modal>
        </>
    )
}