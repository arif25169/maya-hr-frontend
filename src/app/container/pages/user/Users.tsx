import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Select, Space, Table, Tooltip } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';

const { Option } = Select;

export default function Users(props) {

    const check = useStoreState((state) => state.user.check);
    const userList = useStoreState((state) => state.user.userList);
    const fetchuserList = useStoreActions((state) => state.user.fetchuserList);
    const createUser = useStoreActions((state) => state.user.createUser);
    const updateUser = useStoreActions((state) => state.user.updateUser);
    const deleteUser = useStoreActions((state) => state.user.deleteUser);
    const fetchAllEmployeeList = useStoreActions((state) => state.hr.fetchAllEmployeeList);
    const allemployeeList = useStoreState((state) => state.hr.allemployeeList);


    useEffect(() => {
        fetchAllEmployeeList();
    }, []);

    useEffect(() => {
        fetchuserList();
    }, [check])
    const [usersaveForm] = Form.useForm();
    const [userUpdateForm] = Form.useForm();
    ///modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [userid, setuserId] = useState<any>();



    const createUserFormSubmit = (value) => {
        createUser(value);
        usersaveForm.resetFields();
    };
    const updateUserFormSubmit = (value) => {

        let postData = {
            "enabled": true,
            "mobileNo": value.mobileNo,
            "nickName": value.nickName,
            "userId": userid,
            "userRoles": value.userRoles
        }

        updateUser(postData);
        setIsModalVisible(false);
    };

    const columns = [

        {
            title: 'Serial',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        }, 
        {
            title: 'Nick Name',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: 'Mobile No',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
        },     
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
        },
        {
            title: 'User Roles',
            render: (text: any, record: any, index) => (
                <span>{record.userRoles.toString()}</span>
            )
        },
        {
            title: 'Action',
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' icon={<EditOutlined />} onClick={() => {
                            setIsModalVisible(true);
                            setuserId(record.userId);
                            userUpdateForm.setFieldsValue({
                                nickName: record.nickName,
                                mobileNo: record.mobileNo,
                                userRoles: record.userRoles,
                            });
                        }}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteUser(record?.userId)}
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
            <Card title="User List" >

                <Form
                    layout="vertical"

                    onFinish={createUserFormSubmit}
                    id="basic-info"
                    form={usersaveForm}
                >

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="employeeId"
                                label="Employee:"
                                className="title-Text"

                            >
                                <Select
                                    placeholder="Select Employee"
                                    className="sessionYearName"
                                    onChange={(value) =>{
                                        let data= allemployeeList?.find((item)=>item.employeeId==value);
                                        usersaveForm.setFieldsValue({
                                            username:data?.mobileNumber,
                                            nickName:data?.employeeName,
                                            mobileNo:data?.personalMbile,
                                        })
                                    }}
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
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="username"
                                label="User Name:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input username" },
                                ]}
                            >
                                <Input type="text" placeholder='User Name' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="nickName"
                                label="Nick Name:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input nick name" },
                                ]}
                            >
                                <Input type="text" placeholder='Nick Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="password"
                                label="Password:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input password" },
                                ]}
                            >
                                <Input type="password" placeholder='Password' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="mobileNo"
                                label="Mobile Number:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please input mobile no" },
                                ]}
                            >
                                <Input type="text" placeholder='Mobile No' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item
                                name="userRoles"
                                label="User Role:"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select user role" },
                                ]}
                            >
                                <Select placeholder='User Roles' style={{ width: "100%" }} allowClear mode="multiple">
                                    <Option value="ROLE_ADMIN">ROLE_ADMIN</Option>
                                    <Option value="ROLE_EMPLOYEE">ROLE_EMPLOYEE</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}></Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}></Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Space size="small" style={{float:"right"}}>
                                <Button type="primary" htmlType="submit" style={{ marginTop:-40, marginBottom:20  }} icon={<SaveOutlined />} >
                                    Save
                                </Button>
                            </Space>
                        </Col>

                    </Row>
                </Form>

                <Table bordered={true} dataSource={userList} columns={columns} />

            </Card>

            <Modal
                title="Edit User"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Update"
                centered
            >
                <Form
                    layout="vertical"

                    onFinish={updateUserFormSubmit}
                    id="update"
                    form={userUpdateForm}
                >
                    <Form.Item
                        name="nickName"
                        label="Nick Name:"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please input nick name" },
                        ]}
                    >
                        <Input type="text" placeholder='Nick Name' />
                    </Form.Item>


                    <Form.Item
                        name="mobileNo"
                        label="Mobile Number:"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please input mobile no" },
                        ]}
                    >
                        <Input type="number" placeholder='Mobile No' />
                    </Form.Item>



                    <Form.Item
                        name="userRoles"
                        label="User Role:"
                        className="title-Text"
                        rules={[
                            { required: true, message: "Please select user role" },
                        ]}
                    >
                        <Select placeholder='User Roles' style={{ width: "100%" }} allowClear mode="multiple">
                            <Option value="ROLE_ADMIN">ROLE_ADMIN</Option>
                            <Option value="ROLE_EMPLOYEE">ROLE_EMPLOYEE</Option>
                        </Select>
                    </Form.Item>



                </Form>

            </Modal>
        </>
    )
}
