import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card,  Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Checkbox, Typography, Divider, Modal} from 'antd'
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";



export default function BankInfoUpdate() {

    const { Title } = Typography;
    const [updateForm] = Form.useForm();
    const fetchEmployeeList = useStoreActions((state) => state.hr.fetchEmployeeList);
    const employeeList = useStoreState((state) => state.hr.employeeList);
    const [employeeBankData, setEmployeeBankData] = useState<any>();
    const updateEmployeeBankInfo = useStoreActions((state) => state.hr.updateEmployeeBankInfo);
    const [isModalVisible, setIsModalVisible] = useState<any>(false);

    const updateBankInfo = (value) => {
        let postData = {
            accountName: value?.accountName,
            accountNumber: value?.accountNumber,
            bankName: value?.bankName,
            branchName: value?.branchName,
            employeeId: localStorage.getItem('employeeId')
        }
        updateEmployeeBankInfo(postData);
        updateForm.resetFields();
        setIsModalVisible(false);
        let data:any = {
            department:"",
            designation: "",
            employeeType: ""
        }
        fetchEmployeeList(data);
        let id = localStorage.getItem('employeeId');
        fetchEmployeeById(id);
    }

    useEffect(() => {
        let postData:any = {
            department:"",
            designation: "",
            employeeType: ""
        }
        fetchEmployeeList(postData);
    },[]);

    useEffect(() => {
        let id = localStorage.getItem('employeeId');
        fetchEmployeeById(id);
    }, [employeeList])

    const fetchEmployeeById = (id) => {
        employeeList.map((item, index) => {
            if (item.employeeId == id) {
                let dataList:any = {
                    bankName:item.bankName,
                    branchName:item.branchName,
                    accountName: item.accountName,
                    accountNumber: item.accountNumber,
                    employeeId: item.employeeId
                }     
                setEmployeeBankData(dataList);        
            }
        });
        
    }

    const closeModalMethod = (val) => {
        setIsModalVisible(false);
    }

    const editBankInfoMadal = (value) => {
        setIsModalVisible(true);
        updateForm.setFieldsValue({
            accountName : employeeBankData?.accountName,
            accountNumber: employeeBankData?.accountNumber,
            bankName: employeeBankData?.bankName,
            branchName: employeeBankData?.branchName,
        })
    }

    
  return (
    <>
        <Card title="Bank Information">
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6, offset:12}} lg={{ span: 6, offset:12}} xl={{ span: 6, offset:12}}>
                    <div style={{ float:"right" }}>
                        <Tooltip title="Edit">
                            <Button type='primary'  icon={<EditOutlined />} onClick={() => editBankInfoMadal(employeeBankData?.employeeId)}/>
                        </Tooltip>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                    <Title level={5}>Account Name</Title>
                    <p>{employeeBankData?.accountName}</p>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                    <Title level={5}>Account Number</Title>
                    <p>{employeeBankData?.accountNumber}</p>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                    <Title level={5}>Bank Name</Title>
                    <p>{employeeBankData?.bankName}</p>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                    <Title level={5}>Branch Name</Title>
                    <p>{employeeBankData?.branchName}</p>
                </Col>
            </Row>
        </Card>
        <Modal
            title="Update Bank Information"
            visible={isModalVisible}
            //  onOk={handleOk}
            okButtonProps={{ form: 'update', htmlType: 'submit' }}
            onCancel={(e) => closeModalMethod(e)}
            cancelText="Close"
            okText="Update"
            centered
            maskClosable={false}
        >
            <Form
                id="update"
                layout="vertical"
                onFinish={updateBankInfo}
                form={updateForm}
            >
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}} >
                        <Form.Item
                            name="accountName"
                            label="Account Name"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please write account name" },
                            ]}
                        >
                            <Input placeholder="write account name" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}} >
                        <Form.Item
                            name="accountNumber"
                            label="Account Number"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please write account number" },
                            ]}
                        >
                            <InputNumber placeholder="Write account number" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}} >
                        <Form.Item
                            name="bankName"
                            label="Bank Name"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please write bank name" },
                            ]}
                        >
                            <Input placeholder="Write bank name" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}} >
                        <Form.Item
                            name="branchName"
                            label="Branch Name"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please write branch name" },
                            ]}
                        >
                            <Input placeholder="Write branch name" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </>
  );
};
