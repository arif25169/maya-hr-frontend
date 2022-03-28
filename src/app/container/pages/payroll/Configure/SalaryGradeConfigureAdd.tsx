import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';
import { SelectPayrollGrade } from '../../../select/SelectPayrollGrade';


export default function SalaryGradeConfigureAdd() {
    const salaryHeadListAddition = useStoreState((state) => state.payroll.salaryHeadListAddition);
    const fetchsalaryHeadListAddition = useStoreActions((state) => state.payroll.fetchsalaryHeadListAddition);
    const salaryHeadListDeduction = useStoreState((state) => state.payroll.salaryHeadListDeduction);
    const fetchsalaryHeadListDeduction = useStoreActions((state) => state.payroll.fetchsalaryHeadListDeduction);
    const salaryGradeList = useStoreState((state) => state.payroll.salaryGradeList);
    const fetchsalaryGradeList = useStoreActions((state) => state.payroll.fetchsalaryGradeList);


    const saveSalaryGradeConfiguration = useStoreActions((state) => state.payroll.saveSalaryGradeConfiguration);

    const [saveForm] = Form.useForm();

    useEffect(() => {
        fetchsalaryGradeList();
        fetchsalaryHeadListAddition();
        fetchsalaryHeadListDeduction();
    }, [])

    const createSubmitForm = (value) => {
        // console.log(value)
        let salaryHeadAdditionList = selectedValue.map(item => {
            return {
                "salaryHeadId": item.salaryHeadAdditionId,
                "amount": item.amount
            }
        });
        let salaryHeadDeductionList = selectedValue2.map(item => {
            return {
                "salaryHeadId": item.salaryHeadDeductionId,
                "amount": item.amount
            }
        });
        let payload = {
            "salaryGradeId": value.salaryGradeId,
            "salaryHeadAdditionList": salaryHeadAdditionList,
            "salaryHeadDeductionList": salaryHeadDeductionList
        };

        saveSalaryGradeConfiguration(payload);
        setTableAddition(salaryHeadListAddition?.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        setTableDeduction(salaryHeadListDeduction.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        setselectedRowKeys([]);
        setselectedRowKeys2([]);
        setselectedValue([]);
        setselectedValue2([]);
        saveForm.resetFields();
    }

    /////////////
    const [tableAddition, setTableAddition] = useState<any>([]);
    const [tableDeduction, setTableDeduction] = useState<any>([]);

    useEffect(() => {
        setTableAddition(salaryHeadListAddition?.map((item) => ({ ...item, percentage: 0, amount: 0 })));
    }, [salaryHeadListAddition]);

    useEffect(() => {
        setTableDeduction(salaryHeadListDeduction.map((item) => ({ ...item, percentage: 0, amount: 0 })));
    }, [salaryHeadListDeduction])
    /////////////


    const [amount, setAmount] = useState<any>(0);

    const onchangeGrade = (value) => {
        const items = salaryGradeList.find((item) => item.salaryGradeId === value);
        setTableAddition(salaryHeadListAddition?.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        setTableDeduction(salaryHeadListDeduction.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        setAmount(items?.basicAmount);
    };



    const additioncolumns = [
        {
            title: 'Salary Head Name',
            dataIndex: 'salaryHeadName',
            key: 'salaryHeadName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            key: 'percentage',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <InputNumber
                    min={0}
                    max={100}
                    disabled={amount === 0 ? true : false}
                    onChange={onchangePercentageAddition("percentage", record, index)}
                    value={record.percentage===0?null:record.percentage}
                    placeholder="Percentage"
                    addonAfter="%"
                ></InputNumber>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <InputNumber
                    min={0}
                    disabled={amount === 0 ? true : false}
                    max={amount}
                    onChange={onchangeAmountAddition("amount", record, index)}
                    formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")}
                    value={record.amount===0?null:record.amount}
                    placeholder="Amount"
                    addonAfter="TK"
                ></InputNumber>
            ),
        },
    ];

    const onchangePercentageAddition: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableAddition];
            newData[index][key] = e;
            newData[index]['amount'] = ((e as any) / 100) * amount;
            setTableAddition(newData);
        }, [tableAddition]);

    const onchangeAmountAddition: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableAddition];
            newData[index][key] = e;
            newData[index]['percentage'] = (((e as any) * 100) / amount).toFixed(2);
            setTableAddition(newData);
        }, [tableAddition]);
    const deductioncolumns = [
        {
            title: 'Salary Head Name',
            dataIndex: 'salaryHeadName',
            key: 'salaryHeadName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            key: 'percentage',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <InputNumber
                    min={0}
                    max={100}
                    disabled={amount === 0 ? true : false}
                    onChange={onchangePercentageDeduction("percentage", record, index)}
                    value={record.percentage===0?null:record.percentage}
                    placeholder="Percentage"
                    addonAfter="%"
                ></InputNumber>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <InputNumber
                    min={0}
                    disabled={amount === 0 ? true : false}
                    max={amount}
                    onChange={onchangeAmountDeduction("amount", record, index)}
                    value={record.amount===0?null:record.amount}
                    formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")}
                    placeholder="Amount"
                    addonAfter="TK"
                ></InputNumber>
            ),
        },
    ];
    const onchangePercentageDeduction: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableDeduction];
            newData[index][key] = e;
            newData[index]['amount'] = ((e as any) / 100) * amount;
            setTableDeduction(newData);
        }, [tableDeduction]);
    const onchangeAmountDeduction: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableDeduction];
            newData[index][key] = e;
            console.log(e)
            newData[index]['percentage'] = (((e as any) * 100) / amount).toFixed(2);
            setTableDeduction(newData);
        }, [tableDeduction]);

    const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
    const [selectedValue, setselectedValue] = useState<any>([]);

    const onSelectChange = (selectedRowKeys, value) => {
        setselectedRowKeys(selectedRowKeys);
        setselectedValue(value);
        // console.log(value)
    };

    const rowSelection = {
        getCheckboxProps: (record) => {
            return {
                disabled: amount === 0,
            };
        },
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const [selectedRowKeys2, setselectedRowKeys2] = useState<any>([]);
    const [selectedValue2, setselectedValue2] = useState<any>([]);

    const onSelectChange2 = (selectedRowKeys2, value2) => {
        setselectedRowKeys2(selectedRowKeys2);
        setselectedValue2(value2);
        // console.log(value)
    };

    const rowSelection2 = {
        getCheckboxProps: (record) => {
            return {
                disabled: amount === 0,
            };
        },
        selectedRowKeys: selectedRowKeys2,
        onChange: onSelectChange2,
    };
    return (
        <>
            <Form
                layout="vertical"
                id="sessionInfo"
                onFinish={createSubmitForm}
                form={saveForm}
            >
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 8 }} xl={{ span: 24, offset: 8 }}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="salaryGradeId"
                                label="Select Grade"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select grade" },
                                ]}
                            >
                                <SelectPayrollGrade onChange={onchangeGrade} />
                            </Form.Item>
                            {amount > 0 && <p style={{ marginTop: 10, fontWeight: "bold", color: 'red' }}>Basic Salary: {amount}</p>}
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                        <Card title="Addition List">
                            {amount === 0 && <p style={{ textAlign: "right", color: "red" }}>* Please select grade to update value</p>}
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: additioncolumns,
                                    dataSource: tableAddition,
                                    filterData: tableAddition,
                                    pagination: false,
                                    bordered: true,
                                    rowKey: "salaryHeadAdditionId",
                                    rowSelection: rowSelection,
                                    style: { maxHeight: 300, overflow: 'auto' }
                                }}
                                mobileBreakPoint={768}
                            />
                        </Card>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>

                        <Card title="Deduction List">
                            {amount === 0 && <p style={{ textAlign: "right", color: "red" }}>* Please select grade to update value</p>}
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: deductioncolumns,
                                    dataSource: tableDeduction,
                                    filterData: tableDeduction,
                                    pagination: false,
                                    bordered: true,
                                    rowKey: "salaryHeadDeductionId",
                                    rowSelection: rowSelection2,
                                    style: { maxHeight: 300, overflow: 'auto' }
                                }}
                                mobileBreakPoint={768}
                            />
                        </Card>
                    </Col>
                </Row>
                <Space size="small" style={{ float: 'right' }}>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                        Save
                    </Button>
                </Space>
            </Form>



        </>
    )

}