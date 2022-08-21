import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, notification } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../../contents/AntTableResponsive';
const { Option } = Select;

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

export default function EmployeeAtachments() {

    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const [departmentId, setDepartmentId] = useState<any>();
    const saveEmployeeAttachmentInfo = useStoreActions((state) => state.hr.saveEmployeeAttachmentInfo);
    const fetchattachmentList = useStoreActions((state) => state.hr.fetchattachmentList);
    const deleteAttachment = useStoreActions((state) => state.hr.deleteAttachment);
    const attachmentList = useStoreState((state) => state.hr.attachmentList);



    useEffect(function () {
        let id = localStorage.getItem('employeeId');
        fetchattachmentList(id);
    }, [])

    const updateSubmitForm = (value) => {
        let postdata: any = {
            departmentId: departmentId,
            departmentSerial: value.serialtUpdate,
            departmentName: value.departmentUpdate
        }
        setIsModalVisible(false);
    }



    const columns = [
        { title: 'Attachment Title', dataIndex: 'attachmentTitle', key: 'attachmentTitle', showOnResponse: true, showOnDesktop: true },
        {
            title: 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="View">
                        <Button type='primary'
                            onClick={() => {
                                window.open(record.attachmentFilePath+"?access_token="+encodeURIComponent(localStorage.getItem("tok") as any), '_blank', 'noopener,noreferrer')
                            }}
                            icon={<EyeOutlined />}

                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                     onConfirm={() => deleteAttachment(record)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const [isFile, setIsFile] = useState<boolean>(false);
    const [attachmentFileContent, setfileContent] = useState<any>('');
    const [attachmentFileName, setattachmentFileName] = useState<any>('');

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

    const createDepartmentForm = (value) => {
        // console.log(value);
        // console.log(isFile);
        let id = localStorage.getItem('employeeId');
        if (isFile === false) {
            notification.error({ message: 'Please upload a file' })
            return;
        } else {
            let payload = {
                "attachmentDescription": value.attachmentDescription,
                "attachmentFileContent": attachmentFileContent,
                "attachmentFileName": attachmentFileName,
                "attachmentTitle": value.attachmentTitle,
                "employeeId": id
            }
            saveEmployeeAttachmentInfo(payload);
            clearFileInput(document.getElementById("upload-file"));
            setIsFile(false);
            setattachmentFileName('');
            setattachmentFileName('');
            createForm.resetFields();
        }
    }

    return (
        <>
            <Card title="Employee Attachemts">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16, offset: 4 }} lg={{ span: 16, offset: 8 }} xl={{ span: 16, offset: 8 }} >
                        <Form
                            layout="vertical"
                            onFinish={createDepartmentForm}
                            form={createForm}
                        >
                            <Row>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Form.Item
                                        name="attachmentTitle"
                                        label="Attachment For"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select type of attachement" },
                                        ]}
                                    >
                                        <Select placeholder="Select Attachemt For">
                                            <Option key="1" value="Passport or NID">Passport or NID</Option>
                                            <Option key="2" value="TIN Certificate">TIN Certificate</Option>
                                            <Option key="3" value="Police Clearance">Police Clearance</Option>
                                            <Option key="4" value="CV or Resume">CV or Resume</Option>
                                            <Option key="5" value="Others Documents_1">Others Documents_1</Option>
                                            <Option key="6" value="Others Documents_2">Others Documents_2</Option>

                                            <Option key="7" value="Offer of Employment">Offer of Employment</Option>
                                            <Option key="8" value="Medical Report">Medical Report</Option>
                                            <Option key="9" value="Appointment Letter">Appointment Letter</Option>
                                            <Option key="10" value="Personal Data Form">Personal Data Form</Option>
                                            <Option key="11" value="Certificate">Certificate</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}></Col>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Form.Item
                                        name="attachmentDescription"
                                        label="Attachment Description"
                                        className="title-Text"
                                        initialValue={''}
                                    >
                                        <Input.TextArea placeholder="Attachemnt Description" style={{ height: 100 }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}></Col>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                    <div >
                                        <div className="ant-col ant-form-item-label"><label className="ant-form-item-required" >Upload Document (PDF)</label></div>
                                        <input style={{ borderColor: "#03D665" }} className='ant-input' type="file" accept="application/pdf" id="upload-file" onChange={uploadPdf} />
                                    </div>
                                </Col>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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
                <Row className='mt-30'>
                    <Col span={24}>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns: columns,
                                rowKey: "serial",
                                dataSource: attachmentList,
                                filterData: attachmentList,
                                pagination: true,
                                bordered: true,
                            }}
                            mobileBreakPoint={768}
                        />
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Update Department"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Update"
                centered
                maskClosable={false}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={updateSubmitForm}
                    form={updateForm}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="serialtUpdate"
                                label="Serial"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write serial" },
                                ]}
                            >
                                <InputNumber placeholder="write serial" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="departmentUpdate"
                                label="Department"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write department" },
                                ]}
                            >
                                <Input placeholder="write department name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}