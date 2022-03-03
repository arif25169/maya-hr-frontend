import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table} from 'antd'
import moment from 'moment';
import { SelectGender } from '../../select/SelectGender';
import { SelectThana } from '../../select/SelectThana';
import { SelectDistrict } from '../../select/SelectDistrict';

export default function employeeList() {

    const { Step } = Steps;
    const [form] = Form.useForm();
    const {Option} = Select;
    const [current, setCurrent] = React.useState(1);

    const steps = [
    {
        title: 'Personal',
        content: 'First-content',
    },
    {
        title: 'Contact',
        content: 'Second-content',
    },
    {
        title: 'Official',
        content: 'Third-content',
    },
    {
        title: 'Bank',
        content: '',
    },
    {
        title: 'Employee',
        content: 'Fifth-content',
    },
    {
        title: 'Education',
        content: 'Sixth-content',
    },
    {
        title: 'Traning',
        content: 'Seventh-content',
    },
    ];

    const educationTableColumn = [
        {
            title: 'Lavel',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Select placeholder="select level">
                    <Option value="-3">PSC/5 pass</Option>
                    <Option value="-2">JSC/JDC/8 pass</Option>
                    <Option value="1">Secondary</Option>
                    <Option value="2">Higher Secondary</Option>
                    <Option value="3">Diploma</Option>
                    <Option value="4">Bachelor/Honors</Option>
                    <Option value="5">Masters</Option>
                    <Option value="6">PhD (Doctor of Philosophy)</Option>
                </Select>
            ),
        },
        {
            title: 'Name of Examination',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Select placeholder="select exam">
                    <Option value="SSC">SSC</Option>
                    <Option value="O Level">O Level</Option>
                    <Option value="Dakhil (Madrasah)">Dakhil (Madrasah)</Option>
                    <Option value="SSC (Vocational)">SSC (Vocational)</Option>
                    <Option value="others">Other</Option>
                </Select>
            ),
        },
        {
            title: 'Year of Study',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Select placeholder="select year">
                    <Option value="2022">2022</Option>
                    <Option value="2021">2021</Option>
                    <Option value="2020">2020</Option>
                    <Option value="2021">2021</Option>
                    <Option value="2019">2019</Option>
                </Select>
            ),
        },
        {
            title: 'Group Subject',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Input placeholder='write group subject' />
            ),
        },
        {
            title: 'Division/Class/Grade',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Select placeholder="select Division/Class/Grade">
                    <Option value="15">First Division/Class</Option>
                    <Option value="14">Second  Division/Class</Option>
                    <Option value="13">Third Division/Class</Option>
                    <Option value="11">Grade</Option>
                    <Option value="12">Appeared</Option>
                    <Option value="10">Enrolled</Option>
                    <Option value="9">Awarded</Option>
                    <Option value="0">Do not mention</Option>
                    <Option value="8">Pass</Option>
                </Select>
            ),
        },
        {
            title: 'Grade',
            children: [
                {
                    title: 'GPA/CGPA',
                    dataIndex: '',
                    key: '',
                    width: 100
                },
                {
                    title: 'out of',
                    dataIndex: '',
                    key: '',
                    width: 100
                },
            ],
          },
          {
              title: 'Board',
              dataIndex: '',
              key: '',
              render: (text, record, index) => (
                <Select>
                    <Option value="6">Barishal</Option>
                    <Option value="5">Chattogram</Option>
                    <Option value="3">Cumilla</Option>
                    <Option value="1">Dhaka</Option>
                    <Option value="10">Dinajpur</Option>
                    <Option value="4">Jashore</Option>
                    <Option value="11">Mymensingh</Option>
                    <Option value="2">Rajshahi</Option>
                    <Option value="7">Sylhet</Option>
                    <Option value="8">Madrasah</Option>
                    <Option value="9">Technical</Option>
                    <Option value="12">BOU</Option>
                </Select>
              ),
          },
          {
            title: 'Year of passing',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Input placeholder='write year of passing' />
            ),
        },
        {
            title: 'Published year',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Input placeholder='write published year' />
            ),
        },
    ]

    const traningTableColumn = [
        {
            title: 'Traning Name',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Instiute Name',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Duration',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Instiute Name',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
            ),
        }
    ]

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onchangeFile = (e) => {

    }

    const personalInfoForm = (
        <Row>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="firstName"
                        label="First Name"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please write first Name" },
                        ]}
                    >
                    <Input placeholder="enter first name" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="lastName"
                        label="Last Name"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please write last Name" },
                        ]}
                    >
                    <Input placeholder="enter last name" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="fatherName"
                        label="Father Name"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please write father Name" },
                        ]}
                    >
                    <Input placeholder="enter father name" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="motherName"
                        label="Mother Name"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please write mother Name" },
                        ]}
                    >
                    <Input placeholder="enter mother name" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="dob"
                        label="Date of Birth"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select date of birth" },
                        ]}
                    >
                    <DatePicker placeholder="enter date of birth name" style={{ width: '100%' }} format={"DD/MM/YYYY"}/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="gender"
                        label="Gender"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select gender" },
                        ]}
                    >
                    <SelectGender/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="maratialStatus"
                        label="Maratial Status"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select maratial status" },
                        ]}
                    >
                    <Select placeholder="select maritial status">
                        <Option value="marride">Marride</Option>
                        <Option value="unMarride">Unmarride</Option>
                        <Option value="divorced">Divorced</Option>
                        <Option value="widowed">Widowed</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                    name="photoUpload"
                    label="Photo Upload"
                    className="title-Text"
                >
                    <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                </Form.Item>
            </Col>
        </Row>
    )

    const contactInfoForm = (
        <Row>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="address"
                        label="Address"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please write address" },
                        ]}
                    >
                    <Input placeholder="enter address" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="district"
                        label="District"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select district" },
                        ]}
                    >
                    <SelectDistrict />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
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
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="postcode"
                        label="Post Code"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please enter postcode" },
                        ]}
                    >
                    <InputNumber placeholder="enter postcode" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="mobile"
                        label="Mobile Number"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please enter mobile number" },
                        ]}
                    >
                    <InputNumber placeholder="enter mobile number" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="emailAddress"
                        label="Email Address"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please enter email address" },
                        ]}
                    >
                    <Input type="email" placeholder="enter email address" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="emergencyContact"
                        label="Emergency Contact"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please enter emergency contact" },
                        ]}
                    >
                    <Input type="email" placeholder="enter emergency contact" />
                </Form.Item>
            </Col>
        </Row>
    )

    const officialInfoForm = (
        <Row>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="employeeType"
                    label="Employee Type"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please select employee type" },
                    ]}
                >
                    <Select placeholder="Select employee type" >
                        <Option value="demo">Demo employee type</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="depatment"
                    label="Department"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please select department" },
                    ]}
                >
                    <Select placeholder="Select department" >
                        <Option value="demo">Demo department</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="designation"
                    label="Designation"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please select designation" },
                    ]}
                >
                    <Select placeholder="Select designation" >
                        <Option value="demo">Demo designation</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="employeeGrade"
                    label="Employee Grade"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please select employee grade" },
                    ]}
                >
                    <Select placeholder="Select employee grade" >
                        <Option value="demo">Demo employee grade</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="joingDate"
                        label="Joining Date"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select date of joining" },
                        ]}
                    >
                    <DatePicker placeholder="enter date of joining" style={{ width: '100%' }} format={"DD/MM/YYYY"}/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="shift"
                        label="Shift"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select shift" },
                        ]}
                    >
                    <Select placeholder="Select shift" >
                        <Option value="demo">Demo shift</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                        name="workingDays"
                        label="Working Days"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select days" },
                        ]}
                    >
                    <Select placeholder="Select days" mode="multiple">
                        <Option value="sunday">Sunday</Option>
                        <Option value="monday">Monday 2</Option>
                        <Option value="tuesday">Tuesday</Option>
                        <Option value="wednesday">Wednesday</Option>
                        <Option value="thursday">Thursday</Option>
                        <Option value="friday">Friday</Option>
                        <Option value="saturday">Saturday</Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    )

    const bankInfo = (
        <Row>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="bankName"
                    label="Bank Name"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please write bank name" },
                    ]}
                >
                    <Input placeholder="enter bank name" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="branchName"
                    label="Branch Name"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please write branch name" },
                    ]}
                >
                    <Input placeholder="enter branch name" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="accounthName"
                    label="Account Name"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please write account name" },
                    ]}
                >
                    <Input placeholder="enter account name" />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} >
                <Form.Item
                    name="accounthNumber"
                    label="Account Number"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please write account number" },
                    ]}
                >
                    <InputNumber placeholder="enter account number" />
                </Form.Item>
            </Col>
        </Row>
    )

    const employeeInfoForm = (
        <Row>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                    name="resumeUpload"
                    label="Resume Upload"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please upload resume" },
                    ]}
                >
                    <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                    name="offerLetterUpload"
                    label="Offer Letter Upload"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please upload offer letter" },
                    ]}
                >
                    <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                    name="joiningLetterUpload"
                    label="Joining Letter Upload"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please upload joining letter" },
                    ]}
                >
                    <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                    name="contractLetterUpload"
                    label="Contract Letter Upload"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please upload contract letter" },
                    ]}
                >
                    <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                    name="idProofUpload"
                    label="ID Proof Upload"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please upload ID proof" },
                    ]}
                >
                    <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                <Form.Item
                    name="otherDocumentUpload"
                    label="Other Document Upload"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please upload other document" },
                    ]}
                >
                    <Input type="file" value={''} onChange={(e) => onchangeFile(e)} />
                </Form.Item>
            </Col>
        </Row>
    )

    const educationInfoForm = (
        <Row>
            <Col span={24}>
                <Table
                    columns={educationTableColumn}
                    // dataSource={tableRowStore}
                    bordered={true}
                    pagination={false}
                    className="p-datatable-responsive-demo"
                />
            </Col>
        </Row>
    )

    const traningInfoForm = (
        <Row>
            <Col span={24}>
                <Table
                    columns={traningTableColumn}
                    // dataSource={tableRowStore}
                    bordered={true}
                    pagination={false}
                    className="p-datatable-responsive-demo"
                />
            </Col>
        </Row>
    )
    
    const personalInfoSubmit = (value) => {
        console.log('value', value.examName);
        next()
    }

    return (
        <>
            <Card title="Create Employee">
                <Form
                    layout="vertical"
                    id="createEmployee"
                    form={form}
                    onFinish={personalInfoSubmit}
                >
                    <Col span={24}>
                        <Steps current={current} >
                            {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        {current == 0 ? 
                            <div className="steps-content">
                                {personalInfoForm}
                            </div>
                        : ''}

                        {current == 1 ? 
                            <div className="steps-content">
                                {contactInfoForm}
                            </div>
                        : ''}

                        {current == 2 ? 
                            <div className="steps-content">
                                {officialInfoForm}
                            </div>
                        : ''}

                        {current == 3 ? 
                            <div className="steps-content">
                                {bankInfo}
                            </div>
                        : ''}

                        {current == 4 ? 
                            <div className="steps-content">
                                {employeeInfoForm}
                            </div>
                        : ''}

                        {current == 5 ? 
                            <div className="steps-content mb-20">
                                {educationInfoForm}
                            </div>
                        : ''}
                        
                        {current == 6 ? 
                            <div className="steps-content mb-20">
                                {traningInfoForm}
                            </div>
                        : ''}

                        <div className="steps-action" style={{ float: "right" }}>
                            {current === steps.length - 1 && (
                                <Button type="primary" className='mt-0' >
                                Done
                            </Button>
                            )}
                            {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()} className='mt-0'>
                                Previous
                            </Button>
                            )}
                            {current < steps.length - 1 && (
                            <Button type="primary" htmlType="submit" className='mt-0' >
                                Next
                            </Button>
                            )}
                        </div>
                    </Col>
                </Form>
            </Card>
        </>
    )
}