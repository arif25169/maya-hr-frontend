import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Divider, Popconfirm, Typography, notification } from 'antd'
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { monitorEventLoopDelay } from 'perf_hooks';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
let url: any = import.meta.env.VITE_APP_API_ROOT
async function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export default function EmployeeWorkExperience() {

    const dateFormat = "yyyy-MM-DD";
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [showEmployeeWorkExperienceFrom, setShowTrainingFrom] = useState<any>(false);
    const [addButtonDisable, setAddButtonDisable] = useState<any>(false);
    const saveWorkExperienceInfo = useStoreActions((state) => state.hr.saveWorkExperienceInfo);
    const fetchWorkExperienceInfoList = useStoreActions((state) => state.hr.fetchWorkExperienceInfoList);
    const workExperienceInfoList = useStoreState((state) => state.hr.workExperienceInfoList);
    const deleteWorkExperienceInfo = useStoreActions((state) => state.hr.deleteWorkExperienceInfo);
    const [isWorkExperienceModalVisible, setWorkExperienceInfoIsModalVisible] = useState<any>(false);
    const [employeeTrainingListRefineData, setWorkExperienceRefineData] = useState<any>();
    const updateWorkExperienceInfo = useStoreActions((state) => state.hr.updateWorkExperienceInfo);
    const [previousWorkId, setPreviousWorkId] = useState<any>("");

    useEffect(() => {
        fetchWorkExperienceInfoList(localStorage.getItem('employeeId'))
    }, []);

    const employeeWorkExperienceSubmit = (value) => {
        let postdata: any = {
            "companyBusiness": value.companyBusiness,
            "department": value.department,
            "designation": value.designation,
            "employeeId": localStorage.getItem('employeeId'),
            "employmentPeriodFrom": moment(value.employmentPeriodFrom).format('YYYY-MM-DD'),
            "employmentPeriodTo": moment(value.employmentPeriodTo).format('YYYY-MM-DD'),
            "previousCompanyAddress": value.previousCompanyAddress,
            "previousCompanyName": value.previousCompanyName,
            "previousWorkId": previousWorkId,
            "responsibility": value.responsibility,
        }
        saveWorkExperienceInfo(postdata);
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

    const deleteWorkExperience = (value) => {
        deleteWorkExperienceInfo(value);
    }

    const closeModalMethod = (e) => {
        updateForm.resetFields();
        setWorkExperienceInfoIsModalVisible(false);
    }

    const updateWorkExperienceSubmit = (value) => {
        let data: any = {
            "companyBusiness": value?.companyBusinessUpdate,
            "department": value?.departmentUpdate,
            "designation": value?.designationUpdate,
            "employmentPeriodFrom": moment(value.employmentPeriodFromUpdate).format('YYYY-MM-DD'),
            "employmentPeriodTo": moment(value.employmentPeriodToUpdate).format('YYYY-MM-DD'),
            "previousCompanyAddress": value.previousCompanyAddressUpdate,
            "previousCompanyName": value.previousCompanyNameUpdate,
            "previousWorkId": previousWorkId,
            "responsibility": value.responsibilityUpdate
          }
        updateWorkExperienceInfo(data);
        setWorkExperienceInfoIsModalVisible(false);
    }

    const editWorkExperienceModal = (val) => {
        setWorkExperienceInfoIsModalVisible(true);
        let dataList: any = {};
        workExperienceInfoList.map((item, index) => {
            if (item.previousWorkId == val) {
                let dataInfo: any = {
                    companyBusiness: item.companyBusiness,
                    department: item.department,
                    designation: item.designation,
                    employmentPeriodFrom: item.employmentPeriodFrom,
                    employmentPeriodTo: item.employmentPeriodTo,
                    previousCompanyAddress: item.previousCompanyAddress,
                    previousCompanyName: item.previousCompanyName,
                    responsibility: item.responsibility
                }
                Object.assign(dataList, dataInfo);
                setPreviousWorkId(item.previousWorkId)
            }
        });
        updateForm.setFieldsValue({
            companyBusinessUpdate: dataList.companyBusiness,
            departmentUpdate: dataList.department,
            designationUpdate: dataList.designation,
            employmentPeriodFromUpdate: moment(dataList.employmentPeriodFrom, 'YYYY'),
            employmentPeriodToUpdate: moment(dataList.employmentPeriodTo, 'YYYY'),
            previousCompanyNameUpdate: dataList.previousCompanyName,
            previousCompanyAddressUpdate: dataList.previousCompanyAddress,
            responsibilityUpdate: dataList.responsibility,
        });

        setWorkExperienceRefineData(dataList);
    }



    return (
        <>
            <Card title="Work Experience Info">
                <>
                    {workExperienceInfoList ? (
                        workExperienceInfoList.map((item, index) => (
                            <>
                                <Row>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={3}>Working Experience {(index + 1)}</Title>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6, offset: 12 }} lg={{ span: 6, offset: 12 }} xl={{ span: 6, offset: 12 }}>
                                        <div style={{ float: "right" }}>
                                            <Tooltip title="Edit">
                                                <Button type='primary' icon={<EditOutlined />} onClick={() => editWorkExperienceModal(item?.previousWorkId)} />
                                            </Tooltip>
                                            &nbsp;
                                            <Popconfirm
                                                title="Are you sure to delete this?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => deleteWorkExperience(item?.previousWorkId)}
                                            >
                                                <Tooltip title="Delete">
                                                    <Button danger icon={<DeleteOutlined />} />
                                                </Tooltip>
                                            </Popconfirm>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 0, }} />
                                <Row>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Previous Company Name</Title>
                                        <p>{item?.previousCompanyName}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Company Business</Title>
                                        <p>{item?.companyBusiness}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Designation</Title>
                                        <p>{item?.designation}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Department</Title>
                                        <p>{item?.department}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Employment Period From</Title>
                                        <p>{item.employmentPeriodFrom}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Employment Period To</Title>
                                        <p>{item?.employmentPeriodTo}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Responsibility</Title>
                                        <p>{item?.responsibility}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Previous Company Address</Title>
                                        <p>{item?.previousCompanyAddress}</p>
                                    </Col>
                                </Row>
                            </>
                        ))
                    ) : (
                        ""
                    )}
                </>
                {showEmployeeWorkExperienceFrom == true ?
                    <>
                        <Divider />
                        <Form
                            layout="vertical"
                            id="educationInformation"
                            form={form}
                            onFinish={employeeWorkExperienceSubmit}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="companyBusiness"
                                        label="Company Business"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Company Business" },
                                        ]}
                                    >
                                        <Input placeholder="Write Company Business" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="department"
                                        label="Department"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Department" },
                                        ]}
                                    >
                                        <Input placeholder="Write Department" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="designation"
                                        label="Designation"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Designation" },
                                        ]}
                                    >
                                        <Input placeholder="Write Designation" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="employmentPeriodFrom"
                                        label="Employment Period From"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Select Period From" },
                                        ]}
                                    >
                                        <DatePicker style={{ width: "100%" }} format={dateFormat}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="employmentPeriodTo"
                                        label="Employment Period To"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Select Period To" },
                                        ]}
                                    >
                                        <DatePicker style={{ width: "100%" }} format={dateFormat}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="previousCompanyName"
                                        label="Previous Company Name"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Previous Company Name" },
                                        ]}
                                    >
                                        <Input placeholder="Write Previous Company Name" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="previousCompanyAddress"
                                        label="Previous Company Address"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Previous Company Address" },
                                        ]}
                                    >
                                        <Input placeholder="Write Previous Company Address" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="responsibility"
                                        label="Responsibility"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Responsibility" },
                                        ]}
                                    >
                                        <Input placeholder="Write Responsibility" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
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
                <Button type="primary" icon={<PlusOutlined />} onClick={() => trainingInfoFormShowHide()} disabled={addButtonDisable == true ? true : false}>
                    Add Working Experience (If Required)
                </Button>
                <Modal
                    title="Update Work Experience Information"
                    visible={isWorkExperienceModalVisible}
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
                        onFinish={updateWorkExperienceSubmit}
                        form={updateForm}
                    >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="companyBusinessUpdate"
                                    label="Company Business"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Company Business" },
                                    ]}
                                >
                                    <Input placeholder="Write Company Business" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="departmentUpdate"
                                    label="Department"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Department" },
                                    ]}
                                >
                                    <Input placeholder="Write Department" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="designationUpdate"
                                    label="Designation"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Designation" },
                                    ]}
                                >
                                    <Input placeholder="Write Designation" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="employmentPeriodFromUpdate"
                                    label="Employment Period From"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Period From" },
                                    ]}
                                >
                                    <DatePicker style={{ width: "100%" }} format={dateFormat}/>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="employmentPeriodToUpdate"
                                    label="Employment Period To"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Period To" },
                                    ]}
                                >
                                    <DatePicker style={{ width: "100%" }} format={dateFormat}/>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="previousCompanyNameUpdate"
                                    label="Previous Company Name"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Previous Company Name" },
                                    ]}
                                >
                                    <Input placeholder="Write Previous Company Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="previousCompanyAddressUpdate"
                                    label="Previous Company Address"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Previous Company Address" },
                                    ]}
                                >
                                    <Input placeholder="Write Previous Company Address" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="responsibilityUpdate"
                                    label="Responsibility"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Responsibility" },
                                    ]}
                                >
                                    <Input placeholder="Write Responsibility" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Card>
        </>
    )
}