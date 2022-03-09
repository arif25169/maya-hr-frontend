import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Divider, Popconfirm, Typography} from 'antd'
import moment from 'moment';
import { DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { monitorEventLoopDelay } from 'perf_hooks';
import Modal from 'antd/lib/modal/Modal';

export default function TrainingInfo() {

    const { Title } = Typography;
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [showTrainingFrom, setShowTrainingFrom] = useState<any>(false); 
    const [addButtonDisable, setAddButtonDisable] = useState<any>(false);
    const saveEmployeeTrainingInfo = useStoreActions((state) => state.hr.saveEmployeeTrainingInfo);
    const fetchEmployeeTrainingInfoList = useStoreActions((state) => state.hr.fetchEmployeeTrainingInfoList);
    const employeeTrainingInfoList = useStoreState((state) => state.hr.employeeTrainingInfoList);
    const deleteEmployeeTrainingInfo = useStoreActions((state) => state.hr.deleteEmployeeTrainingInfo);
    const [isModalVisible, setIsModalVisible] = useState<any>(false);

    useEffect(() => {
        fetchEmployeeTrainingInfoList(localStorage.getItem('employeeId'))
    }, []);

    const trainingInformationSubmit = (value) => {
        let postdata:any = {
            country: value.countryName,
            duration: value.duration,
            employeeId: localStorage.getItem('employeeId'),
            instituteName: value.institute,
            location: value.location,
            topicsCovered: value.topicsCovered,
            trainingTitle: value.trainingTitle,
            trainingYear:moment(value.trainingYear).year()
        }
        saveEmployeeTrainingInfo(postdata);
        onClickCancel();
    } 

    const trainingInfoFormShowHide = () => {
        setShowTrainingFrom(true);
        setAddButtonDisable(true);
    }

    const onClickCancel = () => {
        setShowTrainingFrom(false);
        setAddButtonDisable(false);
    }

    const deleteTrainingInfo = (value) => {
        deleteEmployeeTrainingInfo(value);
    }

    const closeModalMethod = (e) => {
        updateForm.resetFields();
        setIsModalVisible(false);
    }

    const updateTrainingInfoSubmit = () => {

    }

    const editTrainingInfoMadal = (val) => {
        setIsModalVisible(true);
        
    }

    return (
        <>
            <Card title="Training Info">
                <>
                    {employeeTrainingInfoList ? (
                        employeeTrainingInfoList.map((item, index) => (
                            <>
                                <Row>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={3}>Academic {(index + 1)}</Title>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6, offset:12}} lg={{ span: 6, offset:12}} xl={{ span: 6, offset:12}}>
                                        <div style={{ float:"right" }}>
                                            <Tooltip title="Edit">
                                                <Button type='primary'  icon={<EditOutlined />} onClick={() => editTrainingInfoMadal(item?.trainingId)}/>
                                            </Tooltip>
                                            &nbsp;
                                            <Popconfirm
                                                title="Are you sure to delete this?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => deleteTrainingInfo(item?.trainingId)}
                                            >
                                            <Tooltip title="Delete">
                                                <Button danger  icon={<DeleteOutlined />} />
                                            </Tooltip>
                                        </Popconfirm>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 0, }}/>
                                <Row>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Training Title</Title>
                                        <p>{item?.trainingTitle}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Country</Title>
                                        <p>{item?.country}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Topics Covered</Title>
                                        <p>{item?.topicsCovered}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Training Year</Title>
                                        <p>{item?.trainingYear}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Institute</Title>
                                        <p>{item.instituteName}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Duration</Title>
                                        <p>{item?.duration}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Location</Title>
                                        <p>{item?.location}</p>
                                    </Col>
                                </Row>
                            </>
                        ))
                    ) : (
                        ""
                    )}       
                </>
                {showTrainingFrom == true ?
                    <>
                        <Divider />
                    <Form
                        layout="vertical"
                        id="educationInformation"
                        form={form}
                        onFinish={trainingInformationSubmit}
                    >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="trainingTitle"
                                    label="Training Title"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Training Title" },
                                    ]}
                                >
                                    <Input placeholder="Write Training Title" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="countryName"
                                    label="Country Name"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Country Name" },
                                    ]}
                                >
                                    <Input placeholder="Write Country Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="topicsCovered"
                                    label="Topics Covered"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Topics Covered" },
                                    ]}
                                >
                                    <Input placeholder="Write Topics Covered" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="trainingYear"
                                    label="Training Year"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Training Year" },
                                    ]}
                                >
                                    <DatePicker picker="year" style={{ width: "100%" }}/>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="institute"
                                    label="Institute"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Institute" },
                                    ]}
                                >
                                    <Input placeholder="Write Instiute" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="duration"
                                    label="Duration"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Duration" },
                                    ]}
                                >
                                    <InputNumber placeholder="Write Duration" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="location"
                                    label="location"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Location" },
                                    ]}
                                >
                                    <Input placeholder="Write Location" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}}>
                                <Space size="small" style={{ float: "right" }} >
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                        Save
                                    </Button>
                                    <Button type="primary" danger onClick={() => onClickCancel()}>
                                        Cancel
                                    </Button>
                                </Space>
                            </Col>
                            
                        </Row>
                    </Form>
                    </>
                : ""}
                <Button type="primary"  icon={<PlusOutlined />} onClick={() => trainingInfoFormShowHide()} disabled={addButtonDisable == true ? true : false}>
                    Add Training (If Required)
                </Button>
                <Modal
                    title="Update Training Information"
                    visible={isModalVisible}
                    //  onOk={handleOk}
                    okButtonProps={{ form: 'update', htmlType: 'submit' }}
                    onCancel={(e) => closeModalMethod(e)}
                    cancelText="Close"
                    okText="Update"
                    centered
                    maskClosable={false}
                    width={1000}
                >
                    <Form
                        layout="vertical"
                        id="update"
                        onFinish={updateTrainingInfoSubmit}
                        form={updateForm}
                    >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span: 8}} xl={{ span: 8}}>
                                <Form.Item
                                    name="trainingTitleUpdate"
                                    label="Training Title"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Training Title" },
                                    ]}
                                >
                                    <Input placeholder="Write Training Title" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span: 8}} xl={{ span: 8}}>
                                <Form.Item
                                    name="countryNameUpdate"
                                    label="Country Name"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Country Name" },
                                    ]}
                                >
                                    <Input placeholder="Write Country Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span: 8}} xl={{ span: 8}}>
                                <Form.Item
                                    name="topicsCoveredUpdate"
                                    label="Topics Covered"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Topics Covered" },
                                    ]}
                                >
                                    <Input placeholder="Write Topics Covered" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span: 8}} xl={{ span: 8}}>
                                <Form.Item
                                    name="trainingYearUpdate"
                                    label="Training Year"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Training Year" },
                                    ]}
                                >
                                    <DatePicker picker="year" style={{ width: "100%" }}/>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span: 8}} xl={{ span: 8}}>
                                <Form.Item
                                    name="instituteUpdate"
                                    label="Institute"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Institute" },
                                    ]}
                                >
                                    <Input placeholder="Write Instiute" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span: 8}} xl={{ span: 8}}>
                                <Form.Item
                                    name="durationUpdate"
                                    label="Duration"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Duration" },
                                    ]}
                                >
                                    <InputNumber placeholder="Write Duration" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span: 8}} xl={{ span: 8}}>
                                <Form.Item
                                    name="locationUpdate"
                                    label="location"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Location" },
                                    ]}
                                >
                                    <Input placeholder="Write Location" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Card>
        </>
    )
}