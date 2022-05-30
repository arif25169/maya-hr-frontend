import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';

var year = (new Date().getFullYear()) * 1;
const { Option } = Select;
export default function GovtHolidayList() {
    const deletegovtHolidayList = useStoreActions((state) => state.attendance.deletegovtHolidayList);
    const fetchgovtHolidayList = useStoreActions((state) => state.attendance.fetchgovtHolidayList);
    const govtHolidayList = useStoreState((state) => state.attendance.govtHolidayList);
    const [onsubmitForm] = Form.useForm();
    const loading = useStoreState((state) => state.attendance.loading);

    const [yearx, setYear] = useState<any>('');
    const createSubmitForm = (value) => {
        setYear(value.year);
        fetchgovtHolidayList(value);
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'holyDay',
            key: 'holyDay',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Day',
            dataIndex: 'holydayName',
            key: 'holydayName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                        onConfirm={() => {deletegovtHolidayList({id:record?.holydayId, year:yearx})}}
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
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 12, offset:  8}} xl={{ span: 12, offset:  8}}>
                    <Form
                        layout="vertical"
                        id="sessionInfo"
                        onFinish={createSubmitForm}
                        form={onsubmitForm}
                    >
                        <Row>

                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                                <Form.Item
                                    name="year"
                                    label="Year"
                                    className="title-Text"
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
                                <Space size="small" >
                                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                                        Search
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
                        {govtHolidayList?.length > 0 &&
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: govtHolidayList,
                                    filterData: govtHolidayList,
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