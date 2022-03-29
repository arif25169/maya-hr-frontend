import React, { useRef, useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Descriptions, DatePicker } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, PrinterOutlined, SaveOutlined, SearchOutlined, SettingOutlined, UngroupOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';
import { Excel } from 'antd-table-saveas-excel';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import { moneyFormat } from '../../../../utils/utils';

const { Option } = Select;

const d = new Date();
const year = d.getFullYear();


// Print Media
const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
    const { details } = props;

    let len = 0;


    let additionsLen = details?.additions.length;
    let deductionslen = details?.deductions.length;
    if (additionsLen > deductionslen) {
        len = additionsLen;
    } else {
        len = deductionslen;
    }

    let earDed = new Array(len).fill('');

    return (
        <div className='print-sourcex' ref={ref} style={{ fontSize: 11, padding: 40 }} >
            <br /> <br />
            <div>
                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: 14 }}>{details?.companyName}</span> <br />
                    <span> {details?.companyAddress}</span>    <br /> <br />
                    <span style={{ fontWeight: 'bold', fontSize: 14 }}>Salary Slip</span> <br />
                    <span> For the month of: {details?.salaryMonth}, {details?.salaryYear}</span>
                </div>
            </div>
            <br />
            <table style={{ width: "100%" }} className="paysalary1">
                <tbody>
                    <tr style={{ border: '1px solid', paddingLeft: 2 }}>
                        <td style={{ width: "25%" }}>Employee Name</td>
                        <td style={{ width: "25%", textAlign: 'center', }}>{details?.employeeName}</td>
                        <td style={{ width: "25%" }}>Date of Joining</td>
                        <td style={{ textAlign: 'center', width: "25%" }} >{details?.joiningDate}</td>
                    </tr>
                    <tr style={{ border: '1px solid', paddingLeft: 2 }}>
                        <td style={{ width: "25%" }}>Employee Code</td>
                        <td style={{ width: "25%", textAlign: 'center', }} >{details?.employeeCustomId}</td>
                        <td style={{ width: "25%" }} >Salary Month-Working Days</td>
                        <td style={{ textAlign: 'center', width: "25%" }}>{details?.salaryMonthWorkingDays}</td>
                    </tr>
                    <tr style={{ border: '1px solid', paddingLeft: 2 }}>
                        <td style={{ width: "25%" }}>Designation</td>
                        <td style={{ width: "25%", textAlign: 'center', }}>{details?.designation}</td>
                        <td style={{ width: "25%" }}>Salary Month-Days Attended</td>
                        <td style={{ textAlign: 'center', width: "25%" }}>{details?.salaryMonthAttended}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div style={{ display: 'flex' }}>
                <table style={{ width: "50%" }} className="paysalary">
                    <tbody>
                        <tr style={{ border: '1px solid' }}>
                            <th colSpan={2}>Earnings</th>
                        </tr>

                        {earDed.map((item, index) => (

                            details?.additions?.[index] !== undefined ? <tr >
                                <td style={{ paddingLeft: 2, width: "50%" }}>{moneyFormat(details?.additions[index].salaryHead)}</td>
                                <td style={{ textAlign: "right", width: "50%" }}>{moneyFormat(details?.additions[index].amount)}</td>
                            </tr> : <tr>
                                <td style={{ color: "#fff", width: "50%" }}>text</td>
                                <td style={{ color: "#fff", width: "50%" }}>text</td>
                            </tr>

                        ))}
                        <tr style={{ fontWeight: 'bold' }}>
                            <td style={{ paddingLeft: 2, width: "50%" }}>Total</td>
                            <td style={{ textAlign: "right", width: "50%" }} >{moneyFormat(details?.totalAddition)}</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{ width: "50%" }} className="paysalary1">
                    <tbody>
                        <tr style={{ border: '1px solid', borderLeft: "none" }}>
                            <th colSpan={2}>Deductions</th>
                        </tr>

                        {earDed.map((item, index) => (

                            details?.deductions?.[index] !== undefined ? <tr>
                                <td style={{ paddingLeft: 2, width: "50%" }}>{moneyFormat(details?.deductions[index].salaryHead)}</td>
                                <td style={{ textAlign: "right", width: "50%" }}>{moneyFormat(details?.deductions[index].amount)}</td>
                            </tr> : <tr>
                                <td style={{ color: "#fff", width: "50%" }}>text</td>
                                <td style={{ color: "#fff", width: "50%" }}>text</td>
                            </tr>

                        ))}
                        <tr style={{ fontWeight: 'bold', }}>
                            <td style={{ paddingLeft: 2, width: "50%" }}>Total</td>
                            <td style={{ textAlign: "right", width: "50%" }} >{moneyFormat(details?.totalDeduction)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table style={{ width: "100%" }} className="paysalary1">
                <tbody>
                    <tr style={{ border: '1px solid', borderTop: "none", fontWeight: 'bold', background: "#ddd" }}>
                        <th>Net Salary: {moneyFormat(details?.netSalary)}</th>
                    </tr>
                </tbody>
            </table>
            <br />
            <table style={{ width: "100%" }} className="paysalary1">
                <tbody>
                    <tr style={{ fontWeight: 'bold', }}>
                        <th colSpan={4}>Payment Information</th>
                    </tr>
                    <tr style={{ border: '1px solid', paddingLeft: 2 }}>
                        <td style={{ width: "25%" }}>Payment Type: {details?.paymentType} </td>
                        <td style={{ width: "25%", textAlign: 'center', }}>{details?.paymentType === "Cash" ? <span style={{ color: "#fff" }}>Dummy</span> : <>{details?.paymentType} No. {details?.paymentNo}</>}</td>
                        <td style={{ width: "25%" }}>{details?.paymentType} Date</td>
                        <td style={{ textAlign: 'center', width: "25%" }}>{details?.paymentDate}</td>
                    </tr>
                    {details?.paymentType !== "Cash" &&
                        <tr style={{ border: '1px solid', paddingLeft: 2 }}>
                            <td style={{ width: "25%" }}>Name of Bank </td>
                            <td style={{ width: "25%", textAlign: 'center', }} >{details?.bankName}</td>
                            <td style={{ width: "25%" }} >Branch Name</td>
                            <td style={{ width: "25%", textAlign: 'center', }}>{details?.branchName}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div style={{ marginTop: 80, display: "flex", justifyContent: "space-evenly" }}>
                <strong>Prepared by</strong>
                <strong>Checked by</strong>
                <strong>Recommended by</strong>
                <strong>Approved by</strong>
            </div>

        </div>
    );
});
// Print Media

export default function SalarySlip() {
    const salaryProcessList = useStoreState((state) => state.payroll.salaryProcessList2);
    const fetchsalaryProcessList = useStoreActions((state) => state.payroll.fetchsalaryProcessList2);
    const viewForSalaryPayment = useStoreState((state) => state.payroll.viewForSalaryPayment);
    const fetchviewForSalaryPayment = useStoreActions((state) => state.payroll.fetchviewForSalaryPayment);
    const payEmployeeSalary = useStoreActions((state) => state.payroll.payEmployeeSalary);



    /////////////

    const columns: any = [
        {
            title: 'Employee Id',
            dataIndex: 'customEmployeeId',
            key: 'customEmployeeId',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Grade',
            dataIndex: 'salaryGrade',
            key: 'salaryGrade',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Basic Salary',
            dataIndex: 'basicSalary',
            key: 'netSalary',
            showOnResponse: true,
            showOnDesktop: true
        },

        salaryProcessList?.salaryHeadAdditionName1 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName1,
            dataIndex: 'salaryHeadAdditionAmount1',
            key: 'salaryHeadAdditionAmount1',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName2 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName2,
            dataIndex: 'salaryHeadAdditionAmount2',
            key: 'salaryHeadAdditionAmount2',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName3 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName3,
            dataIndex: 'salaryHeadAdditionAmount3',
            key: 'salaryHeadAdditionAmount3',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName4 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName4,
            dataIndex: 'salaryHeadAdditionAmount4',
            key: 'salaryHeadAdditionAmount4',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName5 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName5,
            dataIndex: 'salaryHeadAdditionAmount5',
            key: 'salaryHeadAdditionAmount5',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName6 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName6,
            dataIndex: 'salaryHeadAdditionAmount6',
            key: 'salaryHeadAdditionAmount6',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName7 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName7,
            dataIndex: 'salaryHeadAdditionAmount7',
            key: 'salaryHeadAdditionAmount7',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName8 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName8,
            dataIndex: 'salaryHeadAdditionAmount8',
            key: 'salaryHeadAdditionAmount8',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName9 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName9,
            dataIndex: 'salaryHeadAdditionAmount9',
            key: 'salaryHeadAdditionAmount9',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadAdditionName10 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName10,
            dataIndex: 'salaryHeadAdditionAmount10',
            key: 'salaryHeadAdditionAmount10',
            showOnResponse: true,
            showOnDesktop: true
        },
        salaryProcessList?.salaryHeadDeductionName1 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName1,
            dataIndex: 'salaryHeadDeductionAmount1',
            key: 'salaryHeadDeductionAmount1',
            showOnResponse: true,
            showOnDesktop: true,

        },
        salaryProcessList?.salaryHeadDeductionName2 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName2,
            dataIndex: 'salaryHeadDeductionAmount2',
            key: 'salaryHeadDeductionAmount2',
            showOnResponse: true,
            showOnDesktop: true,

        },
        salaryProcessList?.salaryHeadDeductionName3 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName3,
            dataIndex: 'salaryHeadDeductionAmount3',
            key: 'salaryHeadDeductionAmount3',
            showOnResponse: true,
            showOnDesktop: true,

        },
        salaryProcessList?.salaryHeadDeductionName4 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName4,
            dataIndex: 'salaryHeadDeductionAmount4',
            key: 'salaryHeadDeductionAmount4',
            showOnResponse: true,
            showOnDesktop: true,

        },
        salaryProcessList?.salaryHeadDeductionName5 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName5,
            dataIndex: 'salaryHeadDeductionAmount5',
            key: 'salaryHeadDeductionAmount5',
            showOnResponse: true,
            showOnDesktop: true,

        },

        {
            title: 'Gross Salary',
            dataIndex: 'grossSalary',
            key: 'grossSalary',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Net Salary',
            dataIndex: 'netSalary',
            key: 'netSalary',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Payment Details', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Payment Details">
                        <Button type='primary'
                            onClick={() => {
                                setsalaryRecordId(record.salaryRecordId)
                                setIsModalVisible(true);
                            }}
                            icon={<UngroupOutlined />}

                        />
                    </Tooltip>


                </Space>
            ),
        },
        {
            title: 'Payment View', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Payment View">
                        <Button type='primary'
                            onClick={() => {
                                fetchviewForSalaryPayment(record.salaryRecordId)
                                setIsModalVisible2(true);
                            }}
                            icon={<EyeOutlined />}

                        />
                    </Tooltip>


                </Space>
            ),
        },

    ];


    const [salaryRecordId, setsalaryRecordId] = useState<any>('');

    const [tableData, setTableData] = useState<any>([]);
    useEffect(() => {
        setTableData(salaryProcessList?.employeeList);
    }, [salaryProcessList]);

    const [form] = Form.useForm();
    const [paymentform] = Form.useForm();

    const onProcess = (value) => {
        fetchsalaryProcessList(value);

    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const submitForm = (value) => {
        value.salaryRecordId = salaryRecordId;
        value.paymentDate = moment(value?.paymentDate).format("YYYY-MM-DD"),
            payEmployeeSalary(value);
        paymentform.resetFields();
        setIsModalVisible(false);
    }

    const [paymentType, setPaymentType] = useState<any>("");
    const [paymentNo, setpaymentNo] = useState<any>(null);

    const componentRef: any = useRef();
    return (
        <Card title="Salary Slip">
            <Form
                layout="vertical"
                id="sForm"
                form={form}
                onFinish={onProcess}
            >
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>  </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item
                            name="salaryYear"
                            label="Salary Year"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please select year" },
                            ]}
                        >
                            <Select placeholder="Select year">
                                <Option key={year - 1} value={year - 1}>{year - 1}</Option>
                                <Option key={year} value={year}>{year}</Option>
                                <Option key={year + 1} value={year + 1}>{year + 1}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item
                            name="salaryMonth"
                            label="Salary Month"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please select month" },
                            ]}
                        >
                            <Select placeholder="Select month">
                                <Option key="1" value="January">January</Option>
                                <Option key="2" value="February">February</Option>
                                <Option key="3" value="March">March</Option>
                                <Option key="4" value="April">April</Option>
                                <Option key="5" value="May">May</Option>
                                <Option key="6" value="June">June</Option>
                                <Option key="7" value="July">July</Option>
                                <Option key="8" value="August">August</Option>
                                <Option key="9" value="September">September</Option>
                                <Option key="10" value="October">October</Option>
                                <Option key="11" value="November">November</Option>
                                <Option key="12" value="December">December</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Space size={'middle'} >
                            <Button type='primary' htmlType='submit' icon={<SearchOutlined />}> Search</Button>
                        </Space>
                    </Col>

                </Row>
                <Row className="m-t-mo-30">
                    <Col span="24">
                        <div className="datatable-responsive-demo">
                            {tableData?.length > 0 &&
                                <>
                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns,
                                            dataSource: tableData,
                                            filterData: tableData,
                                            pagination: true,
                                            bordered: true,
                                            rowKey: "customEmployeeId",

                                        }}
                                        mobileBreakPoint={768}
                                    />
                                    {/* 
                                    <Space style={{ float: "right" }}>
                                        <Button
                                            style={{
                                                marginBottom: 20,
                                            }}
                                            onClick={() => {
                                                const excel = new Excel();
                                                excel
                                                    .addSheet('test')
                                                    .addColumns(columns)
                                                    .addDataSource(tableData, {
                                                        str2Percent: true,
                                                    })
                                                    .saveAs(`Salary Process View of ${form.getFieldValue('salaryMonth')}-${form.getFieldValue('salaryYear')}.xlsx`);
                                            }}
                                        >
                                            Download Excel
                                        </Button>
                                    </Space> */}

                                </>
                            }
                        </div>
                    </Col>
                </Row>
            </Form>
            <Modal
                title="Payment"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Save"
                centered
                width={'50%'}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={submitForm}
                    form={paymentform}
                >
                    <Descriptions
                        // title="User Info"
                        bordered
                        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="Paymemt Type" >
                            <Form.Item
                                name="paymentType"
                                // label="Paymemt Type"
                                className="title-Text"
                                style={{ marginTop: 20 }}
                                rules={[
                                    { required: true, message: "Please select payment type" },
                                ]}
                            >
                                <Select placeholder='Payment Type' value={paymentType} onChange={(e) => setPaymentType(e)} >
                                    <Select.Option value="Cheque">Cheque</Select.Option>
                                    <Select.Option value="Payment Advise">Payment Advise</Select.Option>
                                    <Select.Option value="Cash">Cash</Select.Option>
                                </Select>
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label={`${paymentType} No`} >
                            <Form.Item
                                name="paymentNo"
                                // label="Paymemt Type"
                                className="title-Text"
                                style={{ marginTop: 20 }}
                            >
                                <Input placeholder="Payment No" disabled={paymentType === "Cash" ? true : false} />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label={'Payemnt Date'} >
                            <Form.Item
                                name="paymentDate"
                                // label="Date of Birth"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select date" },
                                ]}
                            >
                                <DatePicker placeholder="Payment Date" style={{ width: '100%' }} format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Descriptions.Item>
                    </Descriptions>
                </Form>
            </Modal>
            <Modal
                title="Payment"
                visible={isModalVisible2}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible2(false)}
                cancelText="Close"
                okText="Save"
                centered
                width={'50%'}
                footer={null}
            >
                <ReactToPrint
                    trigger={() => <Button type='primary' icon={<PrinterOutlined />}>Print</Button>}
                    content={() => componentRef.current}
                />
                <ComponentToPrint ref={componentRef} details={viewForSalaryPayment} />
            </Modal>

        </Card>
    )

}