import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, EyeFilled, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { SelectDepartment } from '../../select/SelectDepartment';
import { SelectDesignation } from '../../select/SelectDesignation';
import { SelectEmployeeType } from '../../select/SelectEmployeeType';
import { SelectBanks } from '../../select/SelectBanks';


export default function EmployeeBankInfo() {

    const [form] = Form.useForm();
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchCompanyDesignationList = useStoreActions((state) => state.common.fetchCompanyDesignationList);
    const fetchEmployeeByDepartment = useStoreActions((state) => state.hr.fetchEmployeeByDepartment2);
    const employeeListByDepartment = useStoreState((state) => state.hr.employeeListByDepartment2);
    const updateBank = useStoreActions((state) => state.payroll.updateBank);


    const [updateForm] = Form.useForm();

    ///modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        setTableData(employeeListByDepartment.map((item, index)=>({...item,index:index})));
    }, [employeeListByDepartment]);

    const [allbank, setAllbank] = useState<any>('');
    const [allbankCheck, setAllbankCheck] = useState<any>(false);
    const [allbranch, setAllBranch] = useState<any>('');
    const [allbranchCheck, setAllbranchCheck] = useState<any>(false);


    const tableColumn = [
        { title: 'Employee Id', dataIndex: 'employeeCustomId', key: 'employeeCustomId', showOnResponse: true, showOnDesktop: true, },
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true, },
        {
            title: 'Account Name',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <>
                        <Input placeholder='Account Name' value={record.accountName}  onChange={onchangeValue("accountName", record, record.index)} />
                    </>
                )

            }
        },        
        {
            title: 'Account Number',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <>
                        <Input placeholder='Account Number' value={record.accountNumber}  onChange={onchangeValue("accountNumber", record, record.index)} />
                    </>
                )

            }
        },
        {
            title: () => {
                return <div>
                    <label className="ant-form-item" title="Select Bank">Bank Name</label>
                    <div style={{ display: 'flex', alignContent: "center", justifyContent: "space-between", alignItems: "center" }}>
                        <SelectBanks style={{ width: "90%" }} onChange={e=>setAllbank(e)} />
                        <Tooltip title="Click here for all field">
                            <Checkbox checked={allbankCheck} disabled={allbank===''?true:false} onClick={bankCheck} ></Checkbox>
                        </Tooltip>
                    </div>
                </div>
            },

            dataIndex: 'bankName', key: 'bankName', showOnResponse: true, showOnDesktop: true, render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>
                    <SelectBanks selected={record.bankName} onChange={onchangeValueSelect("bankName", record, record.index)} style={{ width: "100%" }} />
                </div>

            )
        },
        {
            title: () => {
                return <div>
                    <label className="ant-form-item" title="Select Branch">Branch Name</label>
                    <div style={{ display: 'flex', alignContent: "center", justifyContent: "space-between", alignItems: "center" }}>
                        <Input  style={{ width: "90%" }} onChange={e=>setAllBranch(e.target.value)} placeholder='Branch Name'/>
                        <Tooltip title="Click here for all field">
                            <Checkbox checked={allbranchCheck} onClick={brnachCheck} disabled={allbranch===''?true:false}></Checkbox>
                        </Tooltip>
                    </div>
                </div>
            },

            dataIndex: 'branchName', key: 'branchName', showOnResponse: true, showOnDesktop: true, render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>
                    <Input value={record.branchName}  onChange={onchangeValue("branchName", record, record.index)}placeholder='Branch Name'/>
                </div>

            )
        },

    ];
    const onchangeValue: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e.target.value;
            setTableData(newData);
        }, [tableData]);    
        
        const onchangeValueSelect: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e;
            setTableData(newData);
        }, [tableData]);

    const bankCheck = (val)=>{
        setAllbankCheck(val.target.checked)
        if (val.target.checked) {
            const newData = tableData.map(item=>{
                item.bankName=allbank;
                return item;
            })
           setTableData(newData)
        }        
        if (!val.target.checked) {
            const newData = tableData.map(item=>{
                item.bankName=null;
                return item;
            })
           setTableData(newData)
        }
    }    
    
    const brnachCheck = (val)=>{
        setAllbranchCheck(val.target.checked)
        if (val.target.checked) {
            const newData = tableData.map(item=>{
                item.branchName=allbranch;
                return item;
            })
           setTableData(newData)
        }        
        if (!val.target.checked) {
            const newData = tableData.map(item=>{
                item.branchName=null;
                return item;
            })
           setTableData(newData)
        }
    }

    useEffect(function () {
        fetchCompanyDepartmentList();
        fetchCompanyDesignationList();
    }, []);

    const [data, setData] = useState<any>({});

    const submitFrom = (value) => {
        setAllBranch('');
        setAllbank('');
        setAllbankCheck(false);
        setAllbranchCheck(false)
        setData(value.department);
        fetchEmployeeByDepartment(value.department);
    }

    const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
    const [selectedValue, setselectedValue] = useState<any>([]);

    const onSelectChange = (selectedRowKeys, value) => {
        setselectedRowKeys(selectedRowKeys);
        setselectedValue(value);
        // console.log(value)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const onSubmit = () => {
        let postData = selectedValue.map((item: any) => ({
            "employeeId": item.employeeId,
            "bankName": item.bankName,
            "branchName": item.branchName,
            "accountName": item.accountName,
            "accountNumber": item.accountNumber,
        }));
        updateBank(postData);
        setIsModalVisible(false);
        setselectedRowKeys([]);
        setselectedValue([]);
        updateForm.resetFields();
        setAllBranch('');
        setAllbank('');
        setAllbankCheck(false);
        setAllbranchCheck(false)
        setTimeout(() => {
            fetchEmployeeByDepartment(data);
        }, 1000);
    }

    return (
        <>
            <Card title="Update Employe Bank Information">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12, offset: 8 }} xl={{ span: 12, offset: 8 }}>
                        <Form
                            layout="vertical"
                            id="employeeListSearch"
                            form={form}
                            onFinish={submitFrom}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 126 }}>
                                    <Form.Item
                                        name="department"
                                        label="Department"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Select department" },
                                        ]}
                                    >
                                        <SelectDepartment />
                                    </Form.Item>
                                </Col>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Space size="small" >
                                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                                            Search
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                {employeeListByDepartment.length > 0 &&
                    <>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns: tableColumn,
                                rowKey: "employeeId",
                                dataSource: tableData,
                                filterData: tableData,
                                pagination: true,
                                bordered: true,
                                rowSelection: rowSelection,
                            }}
                            mobileBreakPoint={768}
                        />
                        <Space size={"middle"} style={{ float: 'right' }}>
                            <Button type='primary' icon={<SettingOutlined />} onClick={
                                () => {
                                    if (selectedRowKeys?.length == 0) {
                                        message.error("Please select employee");
                                        return;
                                    }
                                    onSubmit();
                                }
                            }>Assign</Button>
                        </Space>
                    </>
                }
            </Card>
            <Modal
                title="Update"
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
                    onFinish={onSubmit}
                    form={updateForm}
                >
                    <Row>

                        <Col span={24}>
                            <Form.Item
                                name="bankName"
                                label="Bank"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Select Bank" },
                                ]}
                            >
                                <SelectBanks />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="branchName"
                                label="Branch Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Branch Name" },
                                ]}
                            >
                                <Input placeholder='Branch Name' />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </>
    )
}