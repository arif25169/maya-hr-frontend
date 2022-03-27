import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Descriptions, Modal } from 'antd'
import ReactToPrint from 'react-to-print';
import { SelectDepartment } from '../../select/SelectDepartment';
import { PrinterOutlined } from '@ant-design/icons';

const details= {
    "bankName": "City Bank LTD",
    "branchName": "Dhanmondi",
    "address": "Jigatola, Dhaka-1219",
    "salutation": "Dear Cow",
    "openingParagraph": "Please Make the Payroll transfer from the above Bank Account Number to the below mentioned account number towards employees salaries",
    "subjectContent": "Payment Advise from Sheba Digital Limited (A/C no 19999848489498) for the month of ",
    "lastParagraph": "Kindly acknowledge the Payment Advise as per the above information. Your cooperation will be highly appreciated",
    "signatureTitle": "Authorised Signature",
    "signatureContent1": "Assitant Accountant",
    "signatureContent2": "Accountant",
    "signatureContent3": "Managing Director",
    "salaryMonth": "January",
    "salaryYear": 2022,
    "total": 256200,
    "totalInWord": "Two Lakh FiftySix Thousand Two Hundred  Taka  Only",
    "employeeList": [
      {
        "serial": 1,
        "employeeName": "Arif Hasan",
        "employeeCustomId": "70001",
        "designation": "Engineer",
        "bankName": "City Bank",
        "branchName": "Banani",
        "bankAccountNo": "147852369",
        "netPay": 54900
      },
      {
        "serial": 2,
        "employeeName": "Miraj Hossain",
        "employeeCustomId": "70002",
        "designation": "Engineer",
        "bankName": "City Bank",
        "branchName": "Banani",
        "bankAccountNo": "145236958745",
        "netPay": 54900
      },
      {
        "serial": 3,
        "employeeName": "Nasir Abdulla",
        "employeeCustomId": "70003",
        "designation": "Engineer",
        "bankName": "City Bank",
        "branchName": "Banani",
        "bankAccountNo": "145236958745896",
        "netPay": 73200
      },
      {
        "serial": 4,
        "employeeName": "Riad Mohammad",
        "employeeCustomId": "70004",
        "designation": "Engineer",
        "bankName": "City Bank",
        "branchName": "Banani",
        "bankAccountNo": "147852587412588",
        "netPay": 73200
      }
    ]
  }

// Print Media
const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
    const {bankAdviseListView} = props;

    console.log(bankAdviseListView);
    return (
        <div className='print-sourcex' ref={ref} >
            <blockquote className="rich-text-component css-1x02zh0 eu4oa1w0" style={{padding:20,}}>
                <p className="css-17ugqld e1wnkr790">
                </p><p className="rich-text-component css-ex6hny e1wnkr790">[Your name]<br />[Your address]<br />[Your city, state and zip code]
                </p>
                <p className="rich-text-component css-ex6hny e1wnkr790"><span className="css-qrwco2 eu4oa1w0">[</span><span className="css-qrwco2 eu4oa1w0">Date</span><span className="css-qrwco2 eu4oa1w0">]</span></p>
                <p className="rich-text-component css-ex6hny e1wnkr790">[Hiring manager's name]<br />[Hiring manager's title]<br />[Company
                    name]<br />[Company address]<br />[Company city, state and zip code]</p>
                <p className="rich-text-component css-ex6hny e1wnkr790">Dear [Hiring manager's name],</p>
                <p className="rich-text-component css-ex6hny e1wnkr790">I'm writing to express my interest in the position of [job
                    title] at [company]. [Explain how you heard about the job and name your contact if you were referred by someone
                    within the company.] I believe my [skills and qualifications] make me an ideal fit for this job.*</p>
                <p className="rich-text-component css-ex6hny e1wnkr790">[Use the second paragraph to elaborate on how you would help the
                    company. Reference specific campaigns or projects when possible.]</p>
                <p className="rich-text-component css-ex6hny e1wnkr790">[Use the third paragraph to summarize your key qualifications.
                    Elaborate on your most important accomplishments and include details that you were unable to provide in the more
                    concise format of your resume.]</p>
                <table style={{ width: "100%", fontSize:11 }} className="bankAdviseLetter">
                    <tr style={{background:"#ddd", textAlign:"center"}}>
                        <th style={{width:'4%'}}>SL</th>
                        <th style={{width:'20%'}}>Employee's Name</th>
                        <th style={{width:'10%'}}>ID</th>
                        <th style={{width:'15%'}}>Designation</th>
                        <th style={{width:'15%'}}>Bank Name</th>
                        <th style={{width:'15%'}}>Branch Name</th>
                        <th style={{width:'10%'}}>Bank Account No</th>
                        <th style={{width:'10%'}}>Net Pay</th>
                    </tr>
                    {bankAdviseListView.employeeList.map((item, index) => (
                        <tr key={index}>
                            <td style={{textAlign:"center"}}>{item.serial}</td>
                            <td>{item.employeeName}</td>
                            <td style={{textAlign:"center"}}>{item.employeeCustomId}</td>
                            <td style={{textAlign:"center"}}>{item.designation}</td>
                            <td style={{textAlign:"center"}}>{item.bankName}</td>
                            <td style={{textAlign:"center"}}>{item.branchName}</td>
                            <td style={{textAlign:"center"}}>{item.bankAccountNo}</td>
                            <td style={{textAlign:"right"}}>{item.netPay}</td>
                        </tr>
                    ))}
                    <tfoot>
                        <tr>
                            <td colSpan={7}><strong>Total Net payable</strong></td>
                            <td style={{textAlign:"right"}}>{bankAdviseListView?.total}</td>
                        </tr>                       
                        <tr>
                            <td colSpan={8}><strong>Amount (In Words):</strong> {bankAdviseListView?.totalInWord}</td>
                        </tr>
                    </tfoot>
                </table>
                <p className="rich-text-component css-ex6hny e1wnkr790">[Use the fourth paragraph to briefly explain why you want to
                    work for this company. Mention the additional documents included with your cover letter, and express your
                    excitement about moving forward in the hiring process.]</p>
                <p className="rich-text-component css-ex6hny e1wnkr790"><span className="css-qrwco2 eu4oa1w0">Sincerely,</span><br />[Your
                    name]</p>
                <p />
            </blockquote>


        </div>
    );
});
// Print Media

const { TextArea } = Input;
const currentyear = new Date().getFullYear();
const optionsYear = [
    { value: currentyear - 1, label: currentyear - 1 },
    { value: currentyear, label: currentyear },
    { value: currentyear + 1, label: currentyear + 1 }
];

const optionsMonth = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" }

]
export default function BankAdviseView() {

    const fetchbankAdviseListView = useStoreActions((state) => state.payroll.fetchbankAdviseListView);
    const bankAdviseListView = useStoreState((state) => state.payroll.bankAdviseListView);

    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    useEffect(() => {
        fetchCompanyDepartmentList()
    }, [])

    const [form] = Form.useForm();
    const submitForm = (val) => {
        fetchbankAdviseListView(val);
    }

    const componentRef: any = useRef();

    return (
        <>
            <Card title="Bank Advise View">
                <Form layout="vertical" onFinish={submitForm} id='create-class' form={form} >
                    <Row gutter={15} >
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
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
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item
                                name="salaryYear"
                                label="Year:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select Year" },
                                ]}
                            >
                                <Select allowClear placeholder="Select Year" options={optionsYear} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>

                            <Form.Item
                                name="salaryMonth"
                                label="Month:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select month" },
                                ]}
                            >
                                <Select allowClear placeholder="Select Month" options={optionsMonth} />
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}>

                            <Space size="small"  >
                                <Button type="primary" htmlType="submit" >
                                    Search
                                </Button>
                            </Space>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                    </Row>
                </Form>
                {details !== null &&
                    <>
                        <ReactToPrint
                            trigger={() => <Button type='primary' icon={<PrinterOutlined />}>Print</Button>}
                            content={() => componentRef.current}
                        />
                        <ComponentToPrint ref={componentRef} bankAdviseListView={details} />
                    </>
                }
            </Card>

        </>
    )
}