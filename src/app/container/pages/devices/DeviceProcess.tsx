import React, { useEffect, useRef } from 'react'
import moment from 'moment';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Descriptions, Modal } from 'antd'
import { SelectShift } from '../../select/SelectShift';


export default function DeviceProcess() {

    const fetchCompanyShiftList = useStoreActions((state) => state.common.fetchCompanyShiftList);
    useEffect(() => {
        fetchCompanyShiftList();
    }, [])

    const deviceprocess = useStoreActions((state) => state.attendance.deviceprocess);
    const [form] = Form.useForm();
    const submitForm = (val) => {
        val.date=  moment(val?.date).format("YYYY-MM-DD");
        deviceprocess(val);
    }


    return (
        <>
            <Card title="Device Process">
                <Form layout="vertical" onFinish={submitForm} id='create-class' form={form} >
                    <Row gutter={15} >
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Form.Item
                                name="shiftId"
                                label="Shift"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select shift" },
                                ]}
                            >
                                <SelectShift  />
                            </Form.Item>
                            </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item
                                name="date"
                                label="Date:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select date" },
                                ]}
                            >
                                 <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={2} xl={2}>

                            <Space size="small"  >
                                <Button type="primary" htmlType="submit" >
                                    Process
                                </Button>
                            </Space>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                    </Row>
                </Form>
   
            </Card>

        </>
    )
}