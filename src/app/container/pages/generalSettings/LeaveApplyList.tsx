import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton, } from 'antd'
import { DeleteOutlined, EditOutlined, PrinterOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import 'react-multi-date-picker/styles/colors/green.css';
import ReactToPrint from 'react-to-print';

const { Option } = Select;
const format = "YYYY-MM-DD";
var year = (new Date().getFullYear()) * 1;


// Print Media
const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
    const {details, info} = props;
    return (
        <div className='print-source' ref={ref}  >
            <>
                <br />
                <div
                    style={{
                        height: "294mm",
                        width: "207mm",
                        marginLeft: "auto",
                        marginRight: "auto",
                        border: "2px solid",
                        borderWidth: 2,
                        boxShadow: "0px 0px 0px 2px rgba(120,120,120,0.75)",
                        fontFamily: '"Times New Roman"',
                        fontSize: 17,
                        fontWeight: 200,
                        position:'relative'
                    }}
                >
                    <div style={{position:'absolute', right:60, top:20}}>
                    <img src={"data:image/png;base64," + info?.logoName} alt='' width={100}/>
                    </div>
                    <div style={{ paddingLeft: 60, paddingRight: 60 }}>
                        <div style={{ marginTop: 60, textAlign: "center" }}>
                            <span style={{ fontSize: 22, fontWeight: "bold" }}>
                                {info?.companyName}
                            </span>{" "}
                            <br />
                            <span>Leave Application Form</span>
                        </div>
                        <span style={{ float: "right", marginRight: 10 }}>Date. {details.applyDate}</span> <br />{" "}
                        <br /> <br />
                        <div
                            style={{
                                display: "grid",
                                fontWeight: "bold",
                                gridTemplateColumns: "270px 280px 200px"
                            }}
                        >
                            <span>
                                Name: <span style={{ fontWeight: 100 }}>{details.employeeName}</span>
                            </span>
                            <span>
                                Designation:{" "}
                                <span style={{ fontWeight: 100 }}>{details.employeeDesignation}</span>
                            </span>
                            <span>
                                ID No: <span style={{ fontWeight: 100 }}>{details.employeeCustomId}</span>
                            </span>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                fontWeight: "bold",
                                gridTemplateColumns: "270px 280px",
                                marginTop: 20,
                                marginBottom: 10
                            }}
                        >
                            <span>
                                Department: <span style={{ fontWeight: 100 }}> {details.department} </span>
                            </span>
                            <span>
                                Date of Joining: <span style={{ fontWeight: 100 }}> {details.dateOfJoining} </span>
                            </span>
                        </div>
                        <p style={{ fontSize: 16 }}>
                            Duration of leave:{" "}
                            <span style={{ marginLeft: 5 }}>
                                from  &nbsp;<u className="dottedUnderline"><u className="dottedUnderlinehide">Here is</u>{details.fromDate} <u className="dottedUnderlinehide">Here is</u></u> &nbsp; to &nbsp;{" "}
                                <u className="dottedUnderlinehide">Here is</u><u className="dottedUnderline">{details.toDate} </u><u className="dottedUnderlinehide">Here is</u> &nbsp; for &nbsp;
                                <u className="dottedUnderline"> {details.totalLeave} </u> &nbsp;Day(s){" "}
                            </span>{" "}
                        </p>
                        <div style={{ fontSize: 15 }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span>Nature of leave: </span> &nbsp;
                                {details?.companyLeaveCategories?.map((item, i)=> (
                                    <><input className="ch1xyz" type="checkbox" key={i} checked={details?.leaveCategoryName===item?true:false} /> &nbsp;{item} &nbsp;</>
                                ))}
                            </div>
                        </div>
                        <p></p>
                        <div style={{ display: "grid", gridTemplateColumns: "390px 300px" }}>
                            <span>Charge handed over to (for the leave period only):</span>
                            <span>
                                Name: <u className="dottedUnderline">{details.replacementEmployeeName}</u>
                            </span>
                        </div>
                        <p />
                        <p></p>
                        <div style={{ display: "grid", gridTemplateColumns: "390px 300px" }}>
                            <span>
                                Designation:{" "}
                                <u className="dottedUnderline"> {details.replacementEmployeeDesignation}</u>
                            </span>
                            <span style={{ minWidth: 50 }}>
                                Signature:{" "}
                                <u className="dottedUnderlinehide" style={{ color: "#fff" }}>
                                    Here is your signature 
                                </u>
                            </span>
                        </div>
                        <p />
                        <p></p>
                        <div style={{ marginTop: "-5px" }}>
                            <span>
                                Address while on leave:{" "}
                                <u className="dottedUnderline">{details.addressDuringLeave}</u>
                            </span>
                            <span style={{ marginLeft: 15 }}>
                                Tel: <u className="dottedUnderline">{details.contactNo}</u>
                            </span>
                        </div>
                        <p />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                marginTop: 35
                            }}
                        >
                            <div>
                                -------------------------- <br />
                                Employee Signature
                            </div>
                            <div>
                                --------------------------
                                <br />
                                HOD / Section Head
                            </div>
                        </div>
                        <br />
                        <div style={{ marginBottom: "-7px" }}>
                            <hr style={{ borderTop: "0.1em", borderColor: "black" }} />
                        </div>
                        <div style={{ float: "right", backgroundColor: "#8C8C8C" }}>
                            For Office use only
                        </div>{" "}
                        <br />
                        <div style={{ marginBottom: 8 }}>
                            <u className="dottedUnderline">Leave Position:</u>
                        </div>
                        <div>
                            <table style={{ borderCollapse: "collapse", width: "100%", fontSize:"15px" }} border={1}>
                                <thead>
                                    <tr>
                                        <th style={{width:"20%"}}>Leave Name</th>
                                        <th style={{width:"22%"}} >Leave Entitlement</th>
                                        <th style={{width:"20%"}}>Leave Availed</th>
                                        <th style={{width:"20%"}}>Leave Balance</th>
                                        <th style={{width:"18%"}}>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details?.leavesPositions?.map((item, i)=>(
                                    <tr key={i} style={{textAlign:"center"}}>
                                    <td>{item.leaveName}</td>
                                    <td>{item.leaveEntitlement}</td>
                                    <td>{item.leaveAvailed}</td>
                                    <td>{item.leaveBalance}</td>
                                    <td></td>
                                </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div style={{ marginTop: 30, marginBottom: "-6px" }}>
                            <hr style={{ borderTop: "0.1em", borderColor: "black" }} />
                        </div>
                        <div style={{ float: "right", backgroundColor: "#8C8C8C" }}>
                            For Concerned Personnel only
                        </div>
                        <br /> 
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                marginTop: 35
                            }}
                        >
                            <div>
                                -------------------------- <br />
                                Asst. Manager - HR
                            </div>
                            <div>
                                --------------------------
                                <br />
                                General Manager
                            </div>
                        </div>
                        <br /> 
                        <div
                            style={{ border: "1px solid black", textAlign: "center", fontSize: 15 }}
                        >
                            Copy: Employee File
                        </div>
                    </div>
                </div>

            </>

            <div style={{marginTop:40}}>
                <br />
                <div
                    style={{
                        height: "294mm",
                        width: "207mm",
                        marginLeft: "auto",
                        marginRight: "auto",
                        border: "2px solid",
                        borderWidth: 2,
                        boxShadow: "0px 0px 0px 2px rgba(120,120,120,0.75)",
                        fontFamily: '"Times New Roman"',
                        fontSize: 17,
                        fontWeight: 200,
                        position:'relative'
                    }}
                >
                    <div style={{position:'absolute', right:60, top:20}}>
                    <img src={"data:image/png;base64," + info?.logoName} alt='' width={100}/>
                    </div>
                    <div style={{ paddingLeft: 60, paddingRight: 60 }}>
                        <div style={{ marginTop: 60, textAlign: "center" }}>
                            <span style={{ fontSize: 22, fontWeight: "bold" }}>
                                {info?.companyName}
                            </span>{" "}
                            <br />
                            <span>Leave Application Form</span>
                        </div>
                        <span style={{ float: "right", marginRight: 10 }}>Date. {details.applyDate}</span> <br />{" "}
                        <br /> <br />
                        <div
                            style={{
                                display: "grid",
                                fontWeight: "bold",
                                gridTemplateColumns: "270px 280px 200px"
                            }}
                        >
                            <span>
                                Name: <span style={{ fontWeight: 100 }}>{details.employeeName}</span>
                            </span>
                            <span>
                                Designation:{" "}
                                <span style={{ fontWeight: 100 }}>{details.employeeDesignation}</span>
                            </span>
                            <span>
                                ID No: <span style={{ fontWeight: 100 }}>{details.employeeCustomId}</span>
                            </span>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                fontWeight: "bold",
                                gridTemplateColumns: "270px 280px",
                                marginTop: 20,
                                marginBottom: 10
                            }}
                        >
                            <span>
                                Department: <span style={{ fontWeight: 100 }}> {details.department} </span>
                            </span>
                            <span>
                                Date of Joining: <span style={{ fontWeight: 100 }}> {details.dateOfJoining} </span>
                            </span>
                        </div>
                        <p style={{ fontSize: 16 }}>
                            Duration of leave:{" "}
                            <span style={{ marginLeft: 5 }}>
                                from  &nbsp;<u className="dottedUnderline"><u className="dottedUnderlinehide">Here is</u>{details.fromDate} <u className="dottedUnderlinehide">Here is</u></u> &nbsp; to &nbsp;{" "}
                                <u className="dottedUnderlinehide">Here is</u><u className="dottedUnderline">{details.toDate} </u><u className="dottedUnderlinehide">Here is</u> &nbsp; for &nbsp;
                                <u className="dottedUnderline"> {details.totalLeave} </u> &nbsp;Day(s){" "}
                            </span>{" "}
                        </p>
                        <div style={{ fontSize: 15 }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span>Nature of leave: </span> &nbsp;
                                {details?.companyLeaveCategories?.map((item, i)=> (
                                    <><input className="ch1xyz" type="checkbox" key={i} checked={details?.leaveCategoryName===item?true:false} /> &nbsp;{item} &nbsp;</>
                                ))}
                            </div>
                        </div>
                        <p></p>
                        <div style={{ display: "grid", gridTemplateColumns: "390px 300px" }}>
                            <span>Charge handed over to (for the leave period only):</span>
                            <span>
                                Name: <u className="dottedUnderline">{details.replacementEmployeeName}</u>
                            </span>
                        </div>
                        <p />
                        <p></p>
                        <div style={{ display: "grid", gridTemplateColumns: "390px 300px" }}>
                            <span>
                                Designation:{" "}
                                <u className="dottedUnderline"> {details.replacementEmployeeDesignation}</u>
                            </span>
                            <span style={{ minWidth: 50 }}>
                                Signature:{" "}
                                <u className="dottedUnderlinehide" style={{ color: "#fff" }}>
                                    Here is your signature 
                                </u>
                            </span>
                        </div>
                        <p />
                        <p></p>
                        <div style={{ marginTop: "-5px" }}>
                            <span>
                                Address while on leave:{" "}
                                <u className="dottedUnderline">{details.addressDuringLeave}</u>
                            </span>
                            <span style={{ marginLeft: 15 }}>
                                Tel: <u className="dottedUnderline">{details.contactNo}</u>
                            </span>
                        </div>
                        <p />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                marginTop: 35
                            }}
                        >
                            <div>
                                -------------------------- <br />
                                Employee Signature
                            </div>
                            <div>
                                --------------------------
                                <br />
                                HOD / Section Head
                            </div>
                        </div>
                        <br />
                        <div style={{ marginBottom: "-7px" }}>
                            <hr style={{ borderTop: "0.1em", borderColor: "black" }} />
                        </div>
                        <div style={{ float: "right", backgroundColor: "#8C8C8C" }}>
                            For Office use only
                        </div>{" "}
                        <br />
                        <div style={{ marginBottom: 8 }}>
                            <u className="dottedUnderline">Leave Position:</u>
                        </div>
                        <div>
                            <table style={{ borderCollapse: "collapse", width: "100%", fontSize:"15px" }} border={1}>
                                <thead>
                                    <tr>
                                        <th style={{width:"20%"}}>Leave Name</th>
                                        <th style={{width:"22%"}} >Leave Entitlement</th>
                                        <th style={{width:"20%"}}>Leave Availed</th>
                                        <th style={{width:"20%"}}>Leave Balance</th>
                                        <th style={{width:"18%"}}>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details?.leavesPositions?.map((item, i)=>(
                                    <tr key={i} style={{textAlign:"center"}}>
                                    <td>{item.leaveName}</td>
                                    <td>{item.leaveEntitlement}</td>
                                    <td>{item.leaveAvailed}</td>
                                    <td>{item.leaveBalance}</td>
                                    <td></td>
                                </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div style={{ marginTop: 30, marginBottom: "-6px" }}>
                            <hr style={{ borderTop: "0.1em", borderColor: "black" }} />
                        </div>
                        <div style={{ float: "right", backgroundColor: "#8C8C8C" }}>
                            For Concerned Personnel only
                        </div>
                        <br /> 
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                marginTop: 35
                            }}
                        >
                            <div>
                                -------------------------- <br />
                                Asst. Manager - HR
                            </div>
                            <div>
                                --------------------------
                                <br />
                                General Manager
                            </div>
                        </div>
                        <br /> 
                        <div
                            style={{ border: "1px solid black", textAlign: "center", fontSize: 15 }}
                        >
                            Copy: Office File
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
});
// Print Media

export default function LeaveApplyList() {
    const applicantApplyList = useStoreState((state) => state.generalSetting.applicantApplyList);
    const fetchapplicantApplyList = useStoreActions((state) => state.generalSetting.fetchapplicantApplyList);
    const leaveApplicationFormView = useStoreState((state) => state.generalSetting.leaveApplicationFormView);
    const fetchleaveApplicationFormView = useStoreActions((state) => state.generalSetting.fetchleaveApplicationFormView);
    const setleaveApplicationFormView = useStoreActions((state) => state.generalSetting.setleaveApplicationFormView);
    const deleteLeaveApplication = useStoreActions((state) => state.generalSetting.deleteLeaveApplication);
    const companyInfo = useStoreState((state) => state.generalSetting.companyInfo);
    const [form] = Form.useForm();

    const [fyear, setfyear] = useState<any>();

    const searchData = (val) => {
        // console.log(val)
        setfyear(val.year)
        fetchapplicantApplyList(val.year)
    };

    useEffect(() => {
        setfyear(year)
        fetchapplicantApplyList(year)
    }, [])

    const columns = [
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Apply Date', dataIndex: 'applyDate', key: 'applyDate', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave Category', dataIndex: 'leaveCategoryName', key: 'leaveCategoryName', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave Application Dates', dataIndex: 'leaveApplicationDates', key: 'leaveApplicationDates', showOnResponse: true, showOnDesktop: true },
        { title: 'Replacement Employee Name', dataIndex: 'replacementEmployeeName', key: 'replacementEmployeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Contact No', dataIndex: 'contactNo', key: 'contactNo', showOnResponse: true, showOnDesktop: true },
        { title: 'Reason For Leave', dataIndex: 'reasonForLeave', key: 'reasonForLeave', showOnResponse: true, showOnDesktop: true },
        { title: 'Address During Leave', dataIndex: 'addressDuringLeave', key: 'addressDuringLeave', showOnResponse: true, showOnDesktop: true },
        { title: 'Application Status', dataIndex: 'applicationStatusString', key: 'applicationStatusString', showOnResponse: true, showOnDesktop: true },
        {
            title: 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Print">
                        <Button type='primary' icon={<PrinterOutlined />} onClick={() => { fetchleaveApplicationFormView(record.applyId) }} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteLeaveApplication({ delid: record.applyId, year: fyear })}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const componentRef: any = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (leaveApplicationFormView !== null) {
            setIsModalVisible(true)
        }
    }, [leaveApplicationFormView])

    return (
        <>
            <div>
                <Form
                    layout="vertical"
                    id="sessionYearInfo"
                    onFinish={searchData}
                    form={form}
                >
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 7 }} xl={{ span: 7 }}>

                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                            <Form.Item
                                name="year"
                                label="Year"
                                className="title-Text"
                                initialValue={year}
                                rules={[
                                    { required: true, message: "Please select year" },
                                ]}
                            >
                                <Select placeholder="Select Year" allowClear>
                                    <Option value={year - 1}>{year - 1}</Option>
                                    <Option value={year}>{year}</Option>
                                    <Option value={year + 1}>{year + 1}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>

                            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                                Search
                            </Button>

                        </Col>
                    </Row>
                </Form>
                {applicantApplyList?.length > 0 &&
                    <TableView
                        antTableProps={{
                            showHeader: true,
                            columns: columns,
                            rowKey: "customEmployeeId",
                            dataSource: applicantApplyList,
                            filterData: applicantApplyList,
                            pagination: true,
                            bordered: true
                        }}
                        mobileBreakPoint={768}
                    />
                }
            </div>

            <Modal
                title="Print"
                visible={isModalVisible}
                //  onOk={handleOk}
                onCancel={() => { setIsModalVisible(false); setleaveApplicationFormView(null) }}
                destroyOnClose
                maskClosable={false}
                footer={null}
                cancelText="Close"
                // okText="Update"
                width={"20%"}
                centered
            >
                <ReactToPrint
                    trigger={() => <Button type='primary' icon={<PrinterOutlined />}>Print</Button>}
                    content={() => componentRef.current}
                />
                <ComponentToPrint ref={componentRef} details={leaveApplicationFormView} info={companyInfo} /> <br /> <br />
                <span> <span style={{color:"red"}}>*</span> Page size should be A4</span>
            </Modal>


        </>
    )

}