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

export default function LeaveApplyList() {
    const applicantApplyList = useStoreState((state) => state.generalSetting.applicantApplyList);
    const fetchapplicantApplyList = useStoreActions((state) => state.generalSetting.fetchapplicantApplyList);
    const deleteLeaveApplication = useStoreActions((state) => state.generalSetting.deleteLeaveApplication);
    const [form] = Form.useForm();

    const [fyear, setfyear]= useState<any>();

    const searchData = (val) => {
        // console.log(val)
        setfyear(val.year)
        fetchapplicantApplyList(val.year)
    };

    useEffect(()=>{
        setfyear(year)
        fetchapplicantApplyList(year)
    },[])

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

                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteLeaveApplication({delid:record.applyId, year:fyear})}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 6 }} xl={{ span:6 }}>
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
        </>
    )

}