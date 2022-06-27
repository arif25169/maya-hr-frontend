import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
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

export default function TrainingInfo() {

    const dateFormat = "YYYY";
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [showTrainingFrom, setShowTrainingFrom] = useState<any>(false);
    const [addButtonDisable, setAddButtonDisable] = useState<any>(false);
    const saveEmployeeTrainingInfo = useStoreActions((state) => state.hr.saveEmployeeTrainingInfo);
    const fetchEmployeeTrainingInfoList = useStoreActions((state) => state.hr.fetchEmployeeTrainingInfoList);
    const employeeTrainingInfoList = useStoreState((state) => state.hr.employeeTrainingInfoList);
    const deleteEmployeeTrainingInfo = useStoreActions((state) => state.hr.deleteEmployeeTrainingInfo);
    const [isTrainingModalVisible, setTrainingInfoIsModalVisible] = useState<any>(false);
    const [employeeTrainingListRefineData, setEmployeeTrainingListRefineData] = useState<any>();
    const updateEmployeeTraningInfo = useStoreActions((state) => state.hr.updateEmployeeTraningInfo);
    const downloadHrTraining = useStoreActions((state) => state.hr.downloadHrTraining);


    useEffect(() => {
        fetchEmployeeTrainingInfoList(localStorage.getItem('employeeId'))
    }, []);

    const trainingInformationSubmit = (value) => {
        let postdata: any = {
            country: value.countryName,
            duration: value.duration,
            employeeId: localStorage.getItem('employeeId'),
            instituteName: value.institute,
            location: value.location,
            topicsCovered: value.topicsCovered,
            trainingTitle: value.trainingTitle,
            trainingYear: moment(value.trainingYear).year(),
            "trainingCertificate": trainingCertificate,
            "trainingCertificateContent": trainingCertificateContent,
            "trainingCertificateFileSave": trainingCertificateFileSave,
        }
        saveEmployeeTrainingInfo(postdata);
        clearFileInput(document.getElementById("upload-file"));
        setIsFile(false);
        setattachmentFileName('');
        setattachmentFileName('');
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
        setTrainingInfoIsModalVisible(false);
    }

    const updateTrainingInfoSubmit = (value) => {
        let data: any = {
            country: value.countryNameUpdate,
            duration: value.durationUpdate,
            employeeId: localStorage.getItem('employeeId'),
            instituteName: value.instituteUpdate,
            location: value.locationUpdate,
            topicsCovered: value.topicsCoveredUpdate,
            trainingId: employeeTrainingListRefineData.trainingId,
            trainingTitle: value.trainingTitleUpdate,
            trainingYear: moment(value.trainingYearUpdate).year(),
            "trainingCertificate": trainingCertificateUpdate,
            "trainingCertificateContent": trainingCertificateContentUpdate,
            "trainingCertificateFileSave": trainingCertificateFileSaveUpdate,
        }
        updateEmployeeTraningInfo(data);
        clearFileInput(document.getElementById("upload-file2"));
        setIsFileUpdate(false);
        setattachmentFileNameUpdate('');
        setattachmentFileNameUpdate('');
        setTrainingInfoIsModalVisible(false);
    }

    const editTrainingInfoMadal = (val) => {
        setTrainingInfoIsModalVisible(true);
        let dataList: any = {};
        employeeTrainingInfoList.map((item, index) => {
            if (item.trainingId == val) {
                let dataInfo: any = {
                    country: item.country,
                    duration: item.duration,
                    instituteName: item.instituteName,
                    location: item.location,
                    topicsCovered: item.topicsCovered,
                    trainingId: item.trainingId,
                    trainingTitle: item.trainingTitle,
                    trainingYear: item.trainingYear
                }
                Object.assign(dataList, dataInfo);
            }
        });
        updateForm.setFieldsValue({
            trainingTitleUpdate: dataList.trainingTitle,
            countryNameUpdate: dataList.country,
            topicsCoveredUpdate: dataList.topicsCovered,
            trainingYearUpdate: moment(dataList.trainingYear, 'YYYY'),
            instituteUpdate: dataList.instituteName,
            durationUpdate: dataList.duration,
            locationUpdate: dataList.location,
        });

        setEmployeeTrainingListRefineData(dataList);
    }

    const [trainingCertificateFileSave, setIsFile] = useState<boolean>(false);
    const [trainingCertificateContent, setfileContent] = useState<any>('');
    const [trainingCertificate, setattachmentFileName] = useState<any>('');

    function clearFileInput(ctrl) {
        try {
            ctrl.value = null;
        } catch (ex) { }
        if (ctrl.value) {
            ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
        }
    }
    const uploadPdf = (file: any) => {
        if (file.target.files[0]?.size > 2000000) {
            notification.error({ message: 'PDF size should be less than 2MB' })
            // file.target.value = null;
            clearFileInput(document.getElementById("upload-file"));
            setIsFile(false);
            setfileContent('');
            setattachmentFileName('');
            return;
        };

        getBase64(file.target.files[0], (imageUrl) => {
            setattachmentFileName(file.target.files[0].name);
            setfileContent(imageUrl.split(',')[1]);
            setIsFile(true);
        })
    };

    const [trainingCertificateFileSaveUpdate, setIsFileUpdate] = useState<boolean>(false);
    const [trainingCertificateContentUpdate, setfileContentUpdate] = useState<any>('');
    const [trainingCertificateUpdate, setattachmentFileNameUpdate] = useState<any>('');


    const uploadPdfUpdate = (file: any) => {
        if (file.target.files[0]?.size > 2000000) {
            notification.error({ message: 'PDF size should be less than 2MB' })
            // file.target.value = null;
            clearFileInput(document.getElementById("upload-file"));
            setIsFileUpdate(false);
            setfileContentUpdate('');
            setattachmentFileNameUpdate('');
            return;
        };

        getBase64(file.target.files[0], (imageUrl) => {
            setattachmentFileNameUpdate(file.target.files[0].name);
            setfileContentUpdate(imageUrl.split(',')[1]);
            setIsFileUpdate(true);
        })
    };


    return (
        <>
            <Card title="Training Info">
                <>
                    {employeeTrainingInfoList ? (
                        employeeTrainingInfoList.map((item, index) => (
                            <>
                                <Row>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={3}>Training {(index + 1)}</Title>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6, offset: 12 }} lg={{ span: 6, offset: 12 }} xl={{ span: 6, offset: 12 }}>
                                        <div style={{ float: "right" }}>
                                            <Tooltip title="Edit">
                                                <Button type='primary' icon={<EditOutlined />} onClick={() => editTrainingInfoMadal(item?.trainingId)} />
                                            </Tooltip>
                                            &nbsp;
                                            <Popconfirm
                                                title="Are you sure to delete this?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => deleteTrainingInfo(item?.trainingId)}
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
                                        <Title level={5}>Training Title</Title>
                                        <p>{item?.trainingTitle}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Country</Title>
                                        <p>{item?.country}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Topics Covered</Title>
                                        <p>{item?.topicsCovered}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Training Year</Title>
                                        <p>{item?.trainingYear}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Institute</Title>
                                        <p>{item.instituteName}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Duration</Title>
                                        <p>{item?.duration}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Title level={5}>Location</Title>
                                        <p>{item?.location}</p>
                                    </Col>
                                    {(item?.trainingCertificate !== '' && item?.trainingCertificate !== null) &&
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                            <Title level={5}>Document</Title>
                                            <p>
                                                <Button type='primary'
                                                    onClick={() => {
                                                        downloadHrTraining(item?.trainingId)
                                                    }}
                                                    icon={<DownloadOutlined />}

                                                />
                                            </p>
                                        </Col>
                                    }
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="trainingYear"
                                        label="Training Year"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Select Training Year" },
                                        ]}
                                    >
                                        <DatePicker picker="year" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="duration"
                                        label="Duration"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Duration" },
                                        ]}
                                    >
                                        <Input placeholder="Write Duration" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="location"
                                        label="Location"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Location" },
                                        ]}
                                    >
                                        <Input placeholder="Write Location" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <div >
                                        <div className="ant-col ant-form-item-label"><label className="ant-form-item" >Upload Document (PDF)</label></div>
                                        <input style={{ borderColor: "#03D665" }} className='ant-input' type="file" accept="application/pdf" id="upload-file" onChange={uploadPdf} />
                                    </div>

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
                    Add Training (If Required)
                </Button>
                <Modal
                    title="Update Training Information"
                    visible={isTrainingModalVisible}
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
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="trainingYearUpdate"
                                    label="Training Year"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Training Year" },
                                    ]}
                                >
                                    <DatePicker picker="year" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
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
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="durationUpdate"
                                    label="Duration"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Duration" },
                                    ]}
                                >
                                    <Input placeholder="Write Duration" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <Form.Item
                                    name="locationUpdate"
                                    label="Location"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Location" },
                                    ]}
                                >
                                    <Input placeholder="Write Location" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                <div >
                                    <div className="ant-col ant-form-item-label"><label className="ant-form-item" >Upload Document (PDF)</label></div>
                                    <input style={{ borderColor: "#03D665" }} className='ant-input' type="file" accept="application/pdf" id="upload-file2" onChange={uploadPdfUpdate} />
                                </div>

                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Card>
        </>
    )
}