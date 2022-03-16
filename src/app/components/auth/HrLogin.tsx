import { Alert, Form, Input, Button, Checkbox, Layout, Row, Col, Tooltip, Spin } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { InfoCircleOutlined, UserOutlined, LoadingOutlined, HomeOutlined, MailOutlined, PhoneOutlined, KeyOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import logo from "../../../../src/assets/images/suite_logo.png";
import containerBG from "../../../../src/assets/images/container_bg.png";
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
// const FormItem = Form.Item;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const search = window.location.search;

export function HrLogin() {
    // const authFailed = false;
    // const authFailedMessage = '';
    const authenticate = useStoreActions(state => state.auth.authenticate);
    const authenticate2 = useStoreActions(state => state.auth.authenticate2);
    const setBusy = useStoreActions(state => state.auth.setBusy);

    const error = useStoreState(state => state.auth.error);
    const isBusy = useStoreState(state => state.auth.busy);
    const user = useStoreState(state => state.auth.user);
    let rememberChoice: boolean = true;

    if (user) {
        return <Redirect to="/" />
    }

    const onRememberChange = (event) => {
        rememberChoice = event.target.checked;
    }

    const handleSubmit = async (payload) => {
        setBusy(true);
        payload.remember = rememberChoice;
        authenticate(payload);
    };

    const style = {
        container: {
            position: 'absolute' as 'absolute',
            background: '#ecf0f1',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    };
    useLayoutEffect(() => {
        setBusy(true);
    }, []);
    useEffect(() => {
        const params = new URLSearchParams(search);
        const username = params.get('username');
        const password = params.get('password');
        let payload = {
            username: username,
            password: password,
            remember: true
        }
        authenticate2(payload);
    }, []);

    return (
        // <Layout style={style.container} className="login-form-wrapper">
        <>
            {isBusy ?
                <div className='loadFirst'>
                    <div style={{ textAlign: 'center' }}>
                        <Spin indicator={antIcon} />  <br />
                        <span>Please wait while we connect you to your account...</span>
                    </div>

                </div>
                :
                <Layout className="login-form-wrapper">
                    <div className="container login-form-inner">
                        <div className="row border-radius-35">
                            <div className="col-md-5 d-none d-md-block z-index-1">
                                <img src={containerBG} className="img-fluid" />
                            </div>
                            <div className="col-md-7 z-index-1">
                                <div className="login-form-inner-right h-100">
                                    <div className="login-form">
                                        <div className="login-title text-center">
                                            <h1>Login</h1>
                                            {/* <p>Best Educational Institute Management Software in Bangladesh.</p> */}
                                        </div>
                                        <Form name="login" onFinish={handleSubmit}>
                                            <Form.Item name='username' rules={[{ required: true, message: 'Please input your username or email!' }]}>
                                                <Input
                                                    name="username"
                                                    className="custom-form"
                                                    placeholder="Your username"
                                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                                    suffix={
                                                        <Tooltip title="username">
                                                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                        </Tooltip>
                                                    }
                                                />
                                            </Form.Item>

                                            <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                                                <Input.Password
                                                    name="password"
                                                    className="custom-form"
                                                    placeholder="Password"
                                                    prefix={<KeyOutlined className="site-form-item-icon" />}
                                                    suffix={
                                                        <Tooltip title="password">
                                                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                        </Tooltip>
                                                    }
                                                />
                                            </Form.Item>

                                            <Row>
                                                <Col md={24} lg={24} xs={24} className="mb-20">
                                                    <div className="text-center">
                                                        <Checkbox checked onChange={onRememberChange}>Remember me</Checkbox>
                                                        <div className="signUp-wrapper text-center">
                                                            <span> <Link className="forgetPassword" to="/forgot-password">Forgot Password?</Link></span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={24} lg={24} xs={24}>
                                                    <div className="text-center">
                                                        <Button type="primary" className="submitButton" htmlType="submit" disabled={isBusy}>
                                                            {isBusy ? <Spin indicator={antIcon} /> : 'Login'}
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {
                                                error ? <Alert style={{ marginTop: '20px' }} message={error} type="error" /> : null
                                            }

                                        </Form>
                                        <div className="social-wrapper">
                                            <div className="d-flex align-items-center justify-content-start">
                                                <a href="https://www.facebook.com/shebadigitalltd" target="_blank" className="m-0"><FacebookOutlined /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            }
        </>

    );
}
