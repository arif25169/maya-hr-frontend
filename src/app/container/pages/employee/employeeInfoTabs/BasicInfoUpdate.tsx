import { EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Checkbox, Typography, Divider, Modal, Avatar, notification } from 'antd'
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import moment from 'moment';

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

export default function BasicInfoUpdate() {

    const { Title } = Typography;
    const { Option } = Select;
    const [updateForm] = Form.useForm();
    const fetchEmployeeList = useStoreActions((state) => state.hr.fetchEmployeeList);
    const employeeList = useStoreState((state) => state.hr.employeeList);
    const [employeeData, setEmployeeData] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const updateEmployeeBasicInfo = useStoreActions((state) => state.hr.updateEmployeeBasicInfo);
    const fetchAllEmployeeList = useStoreActions((state) => state.hr.fetchAllEmployeeList);
    const allemployeeList = useStoreState((state) => state.hr.allemployeeList);

    useEffect(() => {
        fetchAllEmployeeList();
    }, []);

    const updateBasicInfo = (value) => {
        let id = localStorage.getItem('employeeId');
        let dataList: any = {
            bloodGroup: value.bloodGroup,
            corporateMobile: value.corporateMobile,
            dateOfBirth: moment(value.dateofBirth).format('YYYY-MM-DD'),
            emergencyContactNo: value.emergencyContactNo,
            employeeCustomId: employeeData.employeeCustomId,
            employeeId: id,
            employeeName: value.employeeName,
            employeeStatus: 0,
            fatherName: value.fatherName,
            gender: value.gender,
            joiningDate: moment(value.joiningDate).format('YYYY-MM-DD'),
            maritalStatus: value.maritalStatus,
            motherName: value.motherName,
            nationalIdNo: value.nationalIdNo,
            nationality: value.nationality,
            numberOfChild: value.numberOfChild,
            personalMbile: value.personalMbile,
            companyEmail: value.companyEmail,
            personalEmail: value.personalEmail,
            photoName: employeeData.photoName,
            relationWithEmergencyContact: value.relationWithEmergencyContact,
            employeeHod: value.employeeHodId,
            "employeePhoto":employeePhoto,
            "employeePhotoContent":employeePhotoContent,
            "employeePhotoFileSave": employeePhotoFileSave,
        }
        updateEmployeeBasicInfo(dataList);
        updateForm.resetFields();
        let postData: any = {
            department: "",
            designation: "",
            employeeType: ""
        }
        fetchEmployeeList(postData);
        fetchEmployeeById(id);
        clearFileInput(document.getElementById("upload-file"));
        setIsFile(false);
        setattachmentFileName('');
        setattachmentFileName('');
        setIsModalVisible(false);
    }

    useEffect(() => {
        let postData: any = {
            department: "",
            designation: "",
            employeeType: ""
        }
        fetchEmployeeList(postData);
    }, []);

    useEffect(() => {
        let id = localStorage.getItem('employeeId');
        fetchEmployeeById(id);
    }, [employeeList])

    const fetchEmployeeById = (id) => {
        employeeList.map((item, index) => {
            if (item.employeeId == id) {
                let dataList: any = {
                    bloodGroup: item.bloodGroup,
                    corporateMobile: item.corporateMobile,
                    dateOfBirth: item.dateOfBirth,
                    emergencyContactNo: item.emergencyContactNo,
                    employeeCustomId: item.employeeCustomId,
                    employeeName: item.employeeName,
                    employeeStatus: item.employeeStatus,
                    fatherName: item.fatherName,
                    gender: item.gender,
                    joiningDate: item.joiningDate,
                    maritalStatus: item.maritalStatus,
                    motherName: item.motherName,
                    nationalIdNo: item.nationalIdNo,
                    nationality: item.nationality,
                    numberOfChild: item.numberOfChild,
                    personalMbile: item.personalMbile,
                    photoName: item.photoName,
                    relationWithEmergencyContact: item.relationWithEmergencyContact,
                    employeeId: item.employeeId,
                    employeePhoto: item.employeePhoto,
                    personalEmail: item.personalEmail,
                    companyEmail: item.companyEmail,
                    employeeHodName: item.employeeHodName,
                    employeeHodId: item.employeeHodId,
                }
                setEmployeeData(dataList);
            }
        });

    }

    const editBasicInfoMadal = (value) => {
        setIsModalVisible(true);
        updateForm.setFieldsValue({
            employeeName: employeeData?.employeeName,
            fatherName: employeeData?.fatherName,
            motherName: employeeData?.motherName,
            dateofBirth: moment(employeeData?.dateOfBirth, 'YYYY-MM-DD'),
            gender: employeeData?.gender,
            maritalStatus: employeeData?.maritalStatus,
            nationalIdNo: employeeData?.nationalIdNo,
            numberOfChild: employeeData?.numberOfChild,
            personalMbile: employeeData?.personalMbile,
            corporateMobile: employeeData?.corporateMobile,
            emergencyContactNo: employeeData?.emergencyContactNo,
            relationWithEmergencyContact: employeeData?.relationWithEmergencyContact,
            bloodGroup: employeeData?.bloodGroup,
            nationality: employeeData?.nationality,
            joiningDate: moment(employeeData?.joiningDate, 'YYYY-MM-DD'),
            personalEmail: employeeData.personalEmail,
            companyEmail: employeeData.companyEmail,
            employeeHodId: employeeData.employeeHodId,
        })
    }

    const closeModalMethod = (val) => {
        setIsModalVisible(false);
    }


    const [employeePhotoFileSave, setIsFile] = useState<boolean>(false);
    const [employeePhotoContent, setfileContent] = useState<any>('');
    const [employeePhoto, setattachmentFileName] = useState<any>('');

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

    }

    return (
        <>
            <Card title="Basic Information">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', alignContent: "center" }}>
                                    <Avatar size={64}  src={"data:image/png;base64," + employeeData?.employeePhoto} />
                                    <Title style={{ marginLeft: 10 }} level={3}>{employeeData?.employeeName}</Title>
                                </div>

                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6, offset: 12 }} lg={{ span: 6, offset: 12 }} xl={{ span: 6, offset: 12 }}>
                                <div style={{ float: "right" }}>
                                    <Tooltip title="Edit">
                                        <Button type='primary' icon={<EditOutlined />} onClick={() => editBasicInfoMadal(employeeData?.employeeId)} />
                                    </Tooltip>
                                </div>
                            </Col>
                        </Row>
                        <Divider style={{ marginTop: 0, }} />
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Employee Custom ID</Title>
                                <p>{employeeData?.employeeCustomId}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Father Name </Title>
                                <p>{employeeData?.fatherName}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Mother Name </Title>
                                <p>{employeeData?.motherName}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Date of Birth</Title>
                                <p>{employeeData?.dateOfBirth}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Blood Group</Title>
                                <p>{employeeData?.bloodGroup}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Employee Status</Title>
                                <p>{employeeData?.employeeStatus}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Gender</Title>
                                <p>{employeeData?.gender}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Marital Status</Title>
                                <p>{employeeData?.maritalStatus}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>National ID No</Title>
                                <p>{employeeData?.nationalIdNo}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Nationality</Title>
                                <p>{employeeData?.nationality}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Number Of Child</Title>
                                <p>{employeeData?.numberOfChild}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Personal Mobile</Title>
                                <p>{employeeData?.personalMbile}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Company Mobile</Title>
                                <p>{employeeData?.corporateMobile}</p>
                            </Col>                            
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Personal Email</Title>
                                <p>{employeeData?.personalEmail}</p>
                            </Col>                           
                             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Company Email</Title>
                                <p>{employeeData?.companyEmail}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Emergency Contact No</Title>
                                <p>{employeeData?.emergencyContactNo}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Relation With Emergency Contact</Title>
                                <p>{employeeData?.relationWithEmergencyContact}</p>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Joining Date</Title>
                                <p>{employeeData?.joiningDate}</p>
                            </Col>                           
                             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                <Title level={5}>Employee HOD</Title>
                                <p>{employeeData?.employeeHodName}</p>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Card>
            <Modal
                title="Update Basic Information"
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
                    id='update'
                    layout="vertical"
                    onFinish={updateBasicInfo}
                    form={updateForm}
                >
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="employeeName"
                                label="Employee Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write employee name" },
                                ]}
                            >
                                <Input placeholder="Write employee name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="fatherName"
                                label="Father Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write employee father name" },
                                ]}
                            >
                                <Input placeholder="Write employee father name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="motherName"
                                label="Mother Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write employee mother name" },
                                ]}
                            >
                                <Input placeholder="Write employee mother name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="dateofBirth"
                                label="Date of Birth"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select date of birth" },
                                ]}
                            >
                                <DatePicker format={'YYYY-MM-DD'} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="bloodGroup"
                                label="Blood Group"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select blood Group" },
                                ]}
                            >
                                <Select>
                                    <Option key="1" value="A+">A+</Option>
                                    <Option key="2" value="A-">A-</Option>
                                    <Option key="2" value="B+">B+</Option>
                                    <Option key="2" value="B-">B-</Option>
                                    <Option key="2" value="AB+">AB+</Option>
                                    <Option key="2" value="AB-">AB-</Option>
                                    <Option key="2" value="O+">O+</Option>
                                    <Option key="2" value="O-">O-</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select gender" },
                                ]}
                            >
                                <Select>
                                    <Option key="1" value="Male">Male</Option>
                                    <Option key="2" value="Female">Female</Option>
                                    <Option key="2" value="Others">Others</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="maritalStatus"
                                label="Marital Status"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select marital status" },
                                ]}
                            >
                                <Select>
                                    <Option key="1" value="Married">Married</Option>
                                    <Option key="2" value="Non-Married">Non-Married</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="nationality"
                                label="Nationality"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write Nationality" },
                                ]}
                            >
                                <Input placeholder="Write nationality" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="nationalIdNo"
                                label="National ID No"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write employee NID" },
                                ]}
                            >
                                <Input placeholder="Write employee NID number" />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="numberOfChild"
                                label="Number Of Child"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write employee number of child" },
                                ]}
                            >
                                <InputNumber placeholder="Write employee number of child" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="personalMbile"
                                label="Personal Mobile"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write employee personal number" },
                                ]}
                            >
                                <InputNumber placeholder='Employee personal number' />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="personalEmail"
                                label="Personal Email"
                                className="title-Text"
                                initialValue={''}
                            >
                                <Input placeholder='Employee personal Email' />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="corporateMobile"
                                label="Company Mobile"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write company mobile" },
                                ]}
                            >
                                <InputNumber placeholder='Employee company mobile' />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="companyEmail"
                                label="Company Email"
                                className="title-Text"
                                initialValue={''}
                            >
                                <Input placeholder='Employee company Email' />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="emergencyContactNo"
                                label="Emergency Contact No"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write emergency number;" },
                                ]}
                            >
                                <InputNumber placeholder='Employee emergency number' />
                            </Form.Item>

                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="relationWithEmergencyContact"
                                label="Relation With Emergency Contact"
                                className='title-Text'
                                rules={[
                                    { required: true, message: "Please write relation with emergency contact;" },
                                ]}
                            >
                                <Input placeholder='write relation' />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="joiningDate"
                                label="Joining Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select joining date" },
                                ]}
                            >
                                <DatePicker format={'YYYY-MM-DD'} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                    <Form.Item
                                        name="employeeHodId"
                                        label="Employee HOD:"
                                        className="title-Text"
                                    >
                                        <Select
                                            placeholder="Select Employee"
                                            id="employeess"
                                            showSearch
                                            filterOption={(input, option:any) =>
                                                option !== undefined &&
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                              }
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                            <div >
                                <div className="ant-col ant-form-item-label"><label className="ant-form-item" >Upload Photo</label></div>
                                <input style={{ borderColor: "#03D665" }} className='ant-input' type="file" accept="image/jpeg,image/gif,image/png," id="upload-file" onChange={uploadPdf} />
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
