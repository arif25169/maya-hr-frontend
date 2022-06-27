import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton, } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import 'react-multi-date-picker/styles/colors/green.css';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
const { Option } = Select;
const format = "YYYY-MM-DD";
var year = (new Date().getFullYear()) * 1;

export default function LeaveApply() {
    const leaveCategoryList = useStoreState((state) => state.generalSetting.leaveCategoryList);
    const fetchleaveCategoryList = useStoreActions((state) => state.generalSetting.fetchleaveCategoryList);
    const applicantApplyList = useStoreState((state) => state.generalSetting.applicantApplyList);
    const fetchapplicantApplyList = useStoreActions((state) => state.generalSetting.fetchapplicantApplyList);
    const fetchAllEmployeeList = useStoreActions((state) => state.hr.fetchAllEmployeeList);
    const allemployeeList = useStoreState((state) => state.hr.allemployeeList);

    useEffect(() => {
        fetchleaveCategoryList();
        fetchAllEmployeeList();
    }, []);

    const leaveApply = useStoreActions((state) => state.generalSetting.leaveApply);

    const [createForm] = Form.useForm();

    const createSubmitForm = (value) => {

        let leaveApplicationDates = dates?.map(item => item.format());
        let payload = {
            "leaveApplicationDates": leaveApplicationDates,
            "leaveCategoryId": value.leaveCategoryId,
            "replacementEmployeeId": value.replacementEmployeeId,
            "totalLeave": leaveApplicationDates?.length
        }
        leaveApply(payload);
        createForm.resetFields();

    }
    const [dates, setDates] = useState<any>([]);
    const [form] = Form.useForm();

    const searchData = (val) => {
        // console.log(val)
        fetchapplicantApplyList(val.year)
    };

    useEffect(()=>{
        fetchapplicantApplyList(year)
    },[])

    const columns = [
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Apply Date', dataIndex: 'applyDate', key: 'applyDate', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave Category', dataIndex: 'leaveCategoryName', key: 'leaveCategoryName', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave Application Dates', dataIndex: 'leaveApplicationDates', key: 'leaveApplicationDates', showOnResponse: true, showOnDesktop: true },
        { title: 'Replacement Employee Name', dataIndex: 'replacementEmployeeName', key: 'replacementEmployeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Application Status', dataIndex: 'applicationStatusString', key: 'applicationStatusString', showOnResponse: true, showOnDesktop: true },
    ];
    return (
        <>
            <Card title="Apply Leave">
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 24, offset: 2 }} xl={{ span: 24, offset: 2 }}>
                        <Form
                            layout="vertical"
                            onFinish={createSubmitForm}
                            form={createForm}
                        // style={{ height: 500 }}
                        >
                            <Row gutter={8}>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="leaveApplicationDates"
                                        label="Select Date(s)"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select date" },
                                        ]}
                                    >
                                        <DatePicker
                                            value={dates}
                                            onChange={setDates}
                                            multiple
                                            sort
                                            placeholder='Select Dates'
                                            format={format}
                                            calendarPosition="bottom-center"
                                            plugins={[<DatePanel />]}
                                            className="green"
                                            style={{ minHeight: 40, borderRadius: 0, borderColor: '#03D665', width: document.getElementById('employeess') !== null ? document?.getElementById('employeess')?.offsetWidth : 250 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        name="leaveCategoryId"
                                        label="Leave Category:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select leave category" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Leave Category"
                                            id="leaveCategoryIdx"
                                        >
                                            {leaveCategoryList ? (
                                                leaveCategoryList.map((type, idx) => (
                                                    <Option key={type.leaveCategoryId} value={type.leaveCategoryId}>
                                                        {type.leaveCategoryName}
                                                    </Option>
                                                ))
                                            ) : (
                                                <Option value="fetching">Fetching Category</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        name="replacementEmployeeId"
                                        label="Replacement Employee:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select employee" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Employee"
                                            id="employeess"
                                        >
                                            {allemployeeList ? (
                                                allemployeeList.map((type, idx) => (
                                                    <Option key={type.employeeId} value={type.employeeId}>
                                                        {type.employeeName}
                                                    </Option>
                                                ))
                                            ) : (
                                                <Option value="fetching">Fetching Employee</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>



                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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


            </Card>
            <Card title="Applied Leave List">
                <Form
                    layout="vertical"
                    id="sessionYearInfo"
                    onFinish={searchData}
                    form={form}
                >
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>

                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
            </Card>
        </>
    )

}