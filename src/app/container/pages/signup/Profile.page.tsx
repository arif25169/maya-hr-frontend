import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions } from '../../../store/hooks/easyPeasy';


export default function Dashboard(props) {

    const setPageTitle = () => {
        var pageTitleEle = document.getElementById('pageTitle');
        var pageTitle = 'Profile'
        return pageTitleEle ? pageTitleEle.innerHTML = pageTitle : ''
    }
    useEffect(() => {
        setPageTitle();
    }, []);

    const postpasswordChange = useStoreActions(state => state.auth.postpasswordChange);

    const [prevPass, setprevPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confPass, setConfPass] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (newPass === confPass) {
            if (newPass.length === 0) {
                notification['error']({
                    message: 'Password',
                    description: "Password cannot be blank",
                });

            } else {
                const payload = {
                    currentPassword: prevPass,
                    newPassword: newPass,
                };
                postpasswordChange(payload);
                setprevPass('');
                setNewPass('');
                setConfPass('');
            }
        } else {
            notification['error']({
                message: 'Password',
                description: "Password doesn't match",
            });
        }
    }


    return (
        <>
            <style>
                {`
                .ant-col.ant-form-item-control .ant-input {
                    border: 1px solid #ffffff !important;
                }
            `}
            </style>
            <Row gutter={15} >
                <Col xs={24} sm={24} md={24} lg={9} xl={9}></Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                    <Card title="Change Password" style={{ marginTop: "15px", }} >
                        <Form layout="vertical">
                            <Form.Item label="Previous Password ">
                                <Input.Password
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                    placeholder="Previous Password "
                                    onChange={(e) => setprevPass(e.target.value)}
                                    value={prevPass}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>

                            <Form.Item label={"New Password"}>
                                <Input.Password
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                    placeholder="New Password    "
                                    onChange={(e) => setNewPass(e.target.value)}
                                    value={newPass}
                                    style={{ width: "100%", }}
                                />
                            </Form.Item>
                            <Form.Item label="Confirm Password ">
                                <Input.Password
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                    placeholder="Confirm Password "
                                    onChange={(e) => setConfPass(e.target.value)}
                                    value={confPass}
                                    style={{ width: "100%", }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={(e) => handleSubmit(e)}
                                    style={{ width: "100%", }}
                                >
                                    Submit
            </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={9} xl={9}></Col>
            </Row>
        </>
    )
}
