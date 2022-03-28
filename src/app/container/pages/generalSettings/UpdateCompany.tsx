import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, TimePicker, notification, Typography, Divider} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { SelectDistrict } from '../../select/SelectDistrict';
import { SelectThana } from '../../select/SelectThana';
import { login } from '../../../http/auth/auth';

export default function UpdateCompany() {
    
    const { Text, Title } = Typography;
    const [updateForm] = Form.useForm();
    const thanaListFetch = useStoreActions((state) => state.common.thanaListFetch);
    const fetchCompanyInfo = useStoreActions((state) =>  state.generalSetting.fetchCompanyInfo);
    const companyInfo = useStoreState((state) => state.generalSetting.companyInfo);
    const updateCompanyInfo = useStoreActions((state) => state.generalSetting.updateCompanyInfo);
    const [imageFileContent, setimageFileContent] = useState<any>();
    const [imageFileSave, setimageFileSave] = useState<any>('');
    const [imageFileName, setimageFileName] = useState<any>(undefined);
    const [districName, setDistricName] = useState<any>();
    const [thanaName, setThanaName] = useState<any>();

    const [updateThanaId, setUpdateThanaId] = useState<any>();

    useEffect(() => {
        fetchCompanyInfo();
    }, []);

    useEffect(() => {
        updateForm.setFieldsValue({
            address: companyInfo?.address,
            mobile: companyInfo?.adminMobile,
            adminName: companyInfo?.adminName,
            email: companyInfo?.companyEmail,
            companyName: companyInfo?.companyName,
            hotlineNo: companyInfo?.hotlineNo,
            districtName: companyInfo?.districtId,
            thanaId: companyInfo?.thanaId,
            thanaName: companyInfo?.thanaId,
            phone: companyInfo?.phoneNo,
            website: companyInfo?.websiteLink
        });
        setDistricName(companyInfo?.districtId);
         setThanaName(companyInfo?.thanaId);

    },[companyInfo])


    const updateCompany = (value) => {
        let postdata:any = {
            address: value.address,
            adminMobile: value.mobile,
            adminName: value.adminName,
            companyEmail: value.email,
            companyId: companyInfo.companyId,
            companyName: value.companyName,
            hotlineNo: value.hotlineNo,
            logoFileContent: imageFileContent,
            logoFileSave: imageFileSave,
            logoName: imageFileName,
            parentCompanyId: 1001,
            phoneNo: value.phone,
            thanaId: value.thanaName,
            websiteLink: value.website,
        }
        console.log('postdata', postdata);
        
        updateCompanyInfo(postdata);
        // updateForm.resetFields();
        // fetchCompanyInfo();
    }

    const clearFileInput = (ctrl) => {
        try {
          ctrl.value = null;
        } catch (ex) { }
        if (ctrl.value) {
          ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
        }
      }

    const onchangeFile = (e) => {
        e.preventDefault();
        const reader:any = new FileReader();
        const file = e.target.files[0];
        if (file?.size > 600000) {
        // file.target.value = null;
        clearFileInput(document.getElementById("imgfile"));
        setimageFileSave(false);
        setimageFileContent('');
        setimageFileName(undefined);
        notification.error({message : 'Image size should be less than 600KB'});
        return;
        };
        if (reader !== undefined && file !== undefined) {
        setimageFileSave(true);

        reader.onloadend = () => {
            setimageFileName(file.name)
            setimageFileContent(reader.result.split(',')[1])
        }
        reader.readAsDataURL(file);
        }       
    }

    const fetchThanaByDistricID = (val) => {
        thanaListFetch(val);
        setDistricName(val);
    }

    const ochangeThana = (e) => {
        setUpdateThanaId(e);
        setThanaName(e);
    }
    
    const editCompanyInfoMadal = (val) => {
        
    }

    return (
        <>
            <Card title="Update Company">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}} >
                        <Form
                            layout="vertical"
                            onFinish={updateCompany}
                            form={updateForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                    <Form.Item
                                        name="districtName"
                                        label="District"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select district" },
                                        ]}
                                    >
                                        <SelectDistrict selected={districName} onChange={(e) => fetchThanaByDistricID(e)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                    <Form.Item
                                        name="thanaName"
                                        label="Thana"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select thana" },
                                        ]}
                                    >
                                        <SelectThana selected={thanaName}  onChange={(e) => ochangeThana(e)}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                    <Form.Item
                                        name="photoUpload"
                                        label="Photo Upload"
                                        className="title-Text"
                                    >
                                        <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                    <Space size="small" style={{ float: "right" }} >
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                            Update
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