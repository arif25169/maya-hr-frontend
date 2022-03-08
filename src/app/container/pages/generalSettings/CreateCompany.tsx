import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, TimePicker} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { SelectDistrict } from '../../select/SelectDistrict';
import { SelectThana } from '../../select/SelectThana';

export default function CreateCompany() {
    
    const [createForm] = Form.useForm();
    const thanaListFetch = useStoreActions((state) => state.common.thanaListFetch);
    const [fileDetails, setFileDetails] = useState<any>();
    const setSaveCompany = useStoreActions((state) => state.generalSetting.setSaveCompany)
    const createCompany = (value) => {
        let postdata:any = {
            address: value.address,
            adminMobile: value.mobile,
            adminName: value.adminName,
            companyEmail: value.email,
            companyName: value.companyName,
            hotlineNo: value.hotlineNo,
            logoName: fileDetails?.name,
            parentCompanyId: 1001,
            phoneNo: value.phone,
            thanaId: value.thana,
            websiteLink: value.website
        }
        setSaveCompany(postdata);
        createForm.resetFields();
    }

    const onchangeFile = (val) => {
        setFileDetails(val.target.files[0])        
    }

    const fetchThanaByDistricID = (val) => {
        thanaListFetch(val);
    }

    return (
        <>
            <Card title="Create Company">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10}} lg={{ span: 10}} xl={{ span: 10}} >
                        <Form
                            
                            onFinish={createCompany}
                            form={createForm}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="companyName"
                                        label="Company Name"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write company name" },
                                        ]}
                                    >
                                        <Input placeholder="write company name" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="adminName"
                                        label="Admin Name"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write admin name" },
                                        ]}
                                    >
                                        <Input placeholder="write admin name" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write email" },
                                        ]}
                                    >
                                        <Input placeholder="write email" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write address" },
                                        ]}
                                    >
                                        <Input placeholder="write address" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="district"
                                        label="District"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select district" },
                                        ]}
                                    >
                                        <SelectDistrict onChange={(e) => fetchThanaByDistricID(e)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="thana"
                                        label="Thana"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select thana" },
                                        ]}
                                    >
                                        <SelectThana />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="mobile"
                                        label="Mobile"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write mobile number" },
                                        ]}
                                    >
                                        <Input placeholder="write mobile number" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="phone"
                                        label="Phone"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write phone number" },
                                        ]}
                                    >
                                        <Input placeholder="write phone number" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="hotlineNo"
                                        label="Hotline No."
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write hotline number" },
                                        ]}
                                    >
                                        <Input placeholder="write hotline number" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="website"
                                        label="Website"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write website address" },
                                        ]}
                                    >
                                        <Input placeholder="write website address" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="photoUpload"
                                        label="Photo Upload"
                                        className="title-Text"
                                    >
                                        <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Space size="small" style={{ float: "right" }} >
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                            Save
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    )
}