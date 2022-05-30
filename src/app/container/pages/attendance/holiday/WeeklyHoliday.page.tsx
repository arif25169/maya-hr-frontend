import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';
import { SelectWeekDays } from '../../../select/SelectWeekDays';



export default function WeeklyHoliday() {
    const createHolidayList = useStoreActions((state) => state.attendance.createHolidayList);
    const deleteHolidayList = useStoreActions((state) => state.attendance.deleteHolidayList);
    const fetchweeklyHolidayList = useStoreActions((state) => state.attendance.fetchweeklyHolidayList);
    const weeklyHolidayList = useStoreState((state) => state.attendance.weeklyHolidayList);
    const [createForm] = Form.useForm();
    const loading = useStoreState((state) => state.attendance.loading);
    useEffect(() => {
        fetchweeklyHolidayList();
    }, [])

    const createSubmitForm = (value) => {
        createHolidayList(value);
        createForm.resetFields();
    }

    const columns = [
        {
            title: 'Holiday Name',
            dataIndex: 'holydayName',
            key: 'holydayName',
            showOnResponse: true,
            showOnDesktop: true
        },

        {
            title: 'Action',
            key: 'holydayId',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">

                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteHolidayList(record?.holydayId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        }
    ];
    return (
        <>
            <Row>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 12, offset: 8 }} xl={{ span: 12, offset: 8 }}>
                    <Form
                        layout="vertical"
                        id="sessionInfo"
                        onFinish={createSubmitForm}
                        form={createForm}
                    >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                                <Form.Item
                                    name="dayName"
                                    label="Select Day"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please select day" },
                                    ]}
                                >
                                    <SelectWeekDays />
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
            <Skeleton loading={loading} paragraph={{ rows: 10 }} />
            <Row className="m-t-mo-30">
                <Col span="24">
                    <div className="datatable-responsive-demo">
                        {weeklyHolidayList?.length > 0 &&
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: weeklyHolidayList,
                                    filterData: weeklyHolidayList,
                                    pagination: true,
                                    bordered: true,
                                    rowKey: "holydayId",
                                }}
                                mobileBreakPoint={768}
                            />
                        }
                    </div>
                </Col>
            </Row>

        </>
    )

}