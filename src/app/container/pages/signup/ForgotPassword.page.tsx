import { Button, Card,Row, Col, Form, Input, Layout, message, Result, Tooltip } from 'antd'
import React, { useState } from 'react'
import logo from "../../../../../src/assets/images/suite_logo.png"
import splash from "../../../../../src/assets/images/3293466.jpg"
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone, FacebookOutlined, InfoCircleOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import containerBG from "../../../../../src/assets/images/container_bg.png"

import OtpInput from 'react-otp-input';
export default function Dashboard(props) {

    const [username, setUsername] = useState<any>('')
    const [otp, setOtp] = useState<any>('')
    const [newPass, setNewPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const fetchsendPasswordRecoveryToken = useStoreActions(state => state.auth.fetchsendPasswordRecoveryToken);
    const sendPasswordRecoveryToken = useStoreState(state => state.auth.sendPasswordRecoveryToken);
    const fetchresetPassword = useStoreActions(state => state.auth.fetchresetPassword);
    const resetPassword = useStoreState(state => state.auth.resetPassword);
    const history  = useHistory()
    function handleSubmit(e) {
        e.preventDefault();
        if (username === '') {
            message.error('Username cannot be blank');
        } else {
            fetchsendPasswordRecoveryToken(username)
        }
    };
    function handleSubmitFinal(e) {
        e.preventDefault();

        if (newPass === confPass) {
            if (newPass.length === 0) {
                message.error("Password cannot be blank");
            } else {
                const payload = {
                    token: otp,
                    password: newPass,
                    userName: username,
                };
                fetchresetPassword(payload);
            }
        } else {
            message.error("Password doesn't match");
        }

    }

    return (
        <>
        <Layout className="login-form-wrapper">
            <div className="container login-form-inner">
                <div className="row border-radius-35">
                    <div className="col-md-5 d-none d-md-block z-index-1">
                        <img src={containerBG} className="img-fluid" />
                    </div>
                    <div className="col-md-7 z-index-1">
                        <div className="login-form-inner-right h-100">
                            {!resetPassword && !sendPasswordRecoveryToken &&
                                <div className="login-form">
                                    <div className="login-title text-center">
                                        <h1>FORGET PASSWORD</h1>
                                        <p>Best Educational Institute Management Software in Bangladesh.</p>
                                    </div>
                                    <Row>
                                        <Col md={24} lg={24} xs={24}>
                                            <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                                                <Input
                                                    name="username"
                                                    placeholder="Your username"
                                                    className="custom-form"
                                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} lg={24} xs={24}>
                                            <div className="text-center">
                                                <Button
                                                    type="primary"
                                                    onClick={(e) => handleSubmit(e)}
                                                    className="submitButton"
                                                >
                                                    Send OTP
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} lg={24} xs={24} className="mb-20">
                                            <div className="text-center">
                                                <div className="signUp-wrapper text-center">
                                                    <span> <Link className="forgetPassword" to="/login">Back Login?</Link></span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="social-wrapper">
                                        <div className="d-flex align-items-center justify-content-start">
                                            <a href="https://www.facebook.com/shebadigitalltd" target="_blank" className="m-0"><FacebookOutlined /></a>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!resetPassword && sendPasswordRecoveryToken &&
                                <div className="login-form">
                                    <Row>
                                        <Col md={24} lg={24} xs={24}>
                                            <Form.Item>
                                                <div className="d-flex justify-content-center ">
                                                    <div className="otp">
                                                        <OtpInput
                                                            value={otp}
                                                            onChange={(e) => setOtp(e)}
                                                            numInputs={4}
                                                            separator={<span style={{ color: "#D9D9D9" }}>-</span>}
                                                            inputStyle={{
                                                                border: '1px solid #D9D9D9',
                                                                borderRadius: '5px'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} lg={24} xs={24}>
                                            <div className="text-center">
                                                <Button
                                                    type="primary"
                                                    onClick={(e) => handleSubmit(e)}
                                                    className="submitButton"
                                                >
                                                    Send OTP
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col md={24} lg={24} xs={24}>
                                                        <Form.Item>
                                                <Input.Password
                                                    iconRender={(visible) =>
                                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                    }
                                                    className="custom-form"
                                                    placeholder="New Password    "
                                                    onChange={(e) => setNewPass(e.target.value)}
                                                    value={newPass}
                                                    
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} lg={24} xs={24}>
                                            <Form.Item>
                                                <Input.Password
                                                    iconRender={(visible) =>
                                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                    }
                                                    className="custom-form"
                                                    placeholder="Confirm Password "
                                                    onChange={(e) => setConfPass(e.target.value)}
                                                    value={confPass}
                                                    
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} lg={24} xs={24}>
                                            <div className="text-center">
                                                <Button
                                                    type="primary"
                                                    className="submitButton"
                                                    onClick={(e) => handleSubmitFinal(e)}
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="social-wrapper">
                                        <div className="d-flex align-items-center justify-content-start">
                                            <a href="https://www.facebook.com/shebadigitalltd" target="_blank" className="m-0"><FacebookOutlined /></a>
                                        </div>
                                    </div>
                                </div>
                            }
                            {resetPassword && sendPasswordRecoveryToken &&
                                <>
                                    <Result
                                        status="success"
                                        title="Your password has been reset successfully"
                                        subTitle="You can now use the new password to login to your account."
                                        extra={[
                                            <Button
                                            type="primary"
                                            className="submitButton"
                                            onClick={() => history.push('/login')}
                                        >
                                            Back to Login
                                        </Button>
                                        ]}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}
