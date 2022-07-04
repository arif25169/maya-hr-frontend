import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { SearchOutlined, SwitcherOutlined } from '@ant-design/icons';
import {  useHistory } from "react-router-dom";

export default function CompanyJump() {

    const [searchInstituteForm] = Form.useForm();
    const goToCompany = useStoreActions((state)=> state.generalSetting.goToCompany);
    const companyInfo = useStoreState((state) => state.generalSetting.companyInfo);
    
    const searchInstitute = (value) => {
        goToCompany(value.comapnyId);
    };
    const history = useHistory();
  
    useEffect(()=>{
        if (companyInfo?.roleList?.includes('ROLE_SUPER_ADMIN')) {
			console.log("ok")
		} else {
            history.push('/error-page')
        }
    },[])


    return(
        <>
           <Card title="Go To">
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 12, offset: 6 }} xl={{ span: 12, offset: 6 }}>
                        <Form
                            layout="vertical"
                            id="comapnyId"
                            onFinish={searchInstitute}
                            form={searchInstituteForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>

                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                    <Form.Item
                                        name="comapnyId"
                                        label="Company ID"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please input company id" },
                                        ]}
                                    >
                                       <InputNumber placeholder="Company id" /> 
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>

                                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                                        Search
                                    </Button>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
           </Card>
        </>
    )
}