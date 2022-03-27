import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Descriptions, Modal } from 'antd'
import ReactToPrint from 'react-to-print';
import { SelectDepartment } from '../../select/SelectDepartment';
import { PrinterOutlined } from '@ant-design/icons';


// Print Media
const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
    const { bankAdviseListView, year, month } = props;

    return (
        <div className='print-sourcex' ref={ref} >
            <blockquote className="rich-text-component css-1x02zh0 eu4oa1w0" style={{ padding: 20, height: 842 }}>
                <br /> <br /> <br />
                <p className="rich-text-component css-ex6hny e1wnkr790">
                    To<br />
                    Manager<br />
                    {bankAdviseListView?.bankName}<br />
                    {bankAdviseListView?.branchName}<br />
                    {bankAdviseListView?.address}<br /></p>
                <p className="rich-text-component css-ex6hny e1wnkr790"><strong>Subject: {bankAdviseListView?.subjectContent} {month}, {year} </strong> </p>
                <p className="rich-text-component css-ex6hny e1wnkr790">
                    {bankAdviseListView?.salutation}, <br />
                    Please make the payroll transfer from the above Bank Account Number to the below mentioned account number towards employees salaries:
                </p>

                <table style={{ width: "100%", fontSize: '11px' }} className="bankAdviseLetter">
                    <tr style={{ background: "#ddd", textAlign: "center" }}>
                        <th style={{ width: '4%' }}>SL</th>
                        <th style={{ width: '18%' }}>Employee's Name</th>
                        <th style={{ width: '10%' }}>ID</th>
                        <th style={{ width: '15%' }}>Designation</th>
                        <th style={{ width: '14%' }}>Bank Name</th>
                        <th style={{ width: '15%' }}>Branch Name</th>
                        <th style={{ width: '14%' }}>Bank Account No</th>
                        <th style={{ width: '10%' }}>Net Pay</th>
                    </tr>
                    {bankAdviseListView.employeeList.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.serial}</td>
                            <td>{item.employeeName}</td>
                            <td style={{ textAlign: "center" }}>{item.employeeCustomId}</td>
                            <td style={{ textAlign: "center" }}>{item.designation}</td>
                            <td style={{ textAlign: "center" }}>{item.bankName}</td>
                            <td style={{ textAlign: "center" }}>{item.branchName}</td>
                            <td style={{ textAlign: "center" }}>{item.bankAccountNo}</td>
                            <td style={{ textAlign: "right" }}>{item.netPay}</td>
                        </tr>
                    ))}
                    <tfoot>
                        <tr>
                            <td className="printText"  colSpan={7}><strong>Total Net Payable</strong></td>
                            <td className="printText" style={{ textAlign: "right" }}>{bankAdviseListView?.total}</td>
                        </tr>
                        <tr>
                            <td className="printText" colSpan={8}><strong>Amount (In Words):</strong> {bankAdviseListView?.totalInWord}</td>
                        </tr>
                    </tfoot>
                </table>
                <br />
                <span className="printText"> Kindly acknowledge the payment Advise as per the above information. Your cooperation will be highly appreciated.</span> 
                <br />
                <span className="printText">Authorised Signature</span>:
                <br />
                <table style={{ width: "100%", fontSize: '11px', textAlign: "center" }} className="bankAdviseLetter">
                    <tr style={{ color: "#fff", height: 40 }}>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>{bankAdviseListView?.signatureContent1}</td>
                        <td>{bankAdviseListView?.signatureContent2}</td>
                        <td>{bankAdviseListView?.signatureContent3}</td>
                    </tr>
                </table>
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

    const [month, setMonth] = useState<any>('');
    const [year, setYear] = useState<any>('');
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
                                <Select allowClear placeholder="Select Year" options={optionsYear} onChange={(e) => setYear(e)} />
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
                                <Select allowClear placeholder="Select Month" options={optionsMonth} onChange={(e) => setMonth(e)} />
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
                {bankAdviseListView !== null &&
                    <>
                        <ReactToPrint
                            trigger={() => <Button type='primary' icon={<PrinterOutlined />}>Print</Button>}
                            content={() => componentRef.current}
                        />
                        <ComponentToPrint ref={componentRef} bankAdviseListView={bankAdviseListView} month={month} year={year} />
                    </>
                }
            </Card>

        </>
    )
}