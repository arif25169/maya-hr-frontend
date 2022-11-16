import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Descriptions, notification } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsiveSimple';
import { SelectPayrollGrade } from '../../../select/SelectPayrollGrade';
import { moneyFormat } from '../../../../utils/utils';
import { SelectEmployee } from '../../../select/SelectEmployee';


export default function SalaryGradeConfigureAdd() {
    const salaryHeadListAddition = useStoreState((state) => state.payroll.salaryHeadListAddition);
    const fetchsalaryHeadListAddition = useStoreActions((state) => state.payroll.fetchsalaryHeadListAddition);
    const salaryHeadListDeduction = useStoreState((state) => state.payroll.salaryHeadListDeduction);
    const fetchsalaryHeadListDeduction = useStoreActions((state) => state.payroll.fetchsalaryHeadListDeduction);
    const salaryGradeList = useStoreState((state) => state.payroll.salaryGradeList);
    const fetchsalaryGradeList = useStoreActions((state) => state.payroll.fetchsalaryGradeList);
    const viewSingleSalryConfiguration = useStoreState((state) => state.hr.viewSingleSalryConfiguration);
    const fetchviewSingleSalryConfiguration = useStoreActions((state) => state.hr.fetchviewSingleSalryConfiguration);



    const saveSalaryGradeConfiguration = useStoreActions((state) => state.hr.saveSalaryGradeConfiguration);

    const [saveForm] = Form.useForm();

    useEffect(() => {
        fetchsalaryGradeList();
        fetchsalaryHeadListAddition();
        fetchsalaryHeadListDeduction();
    }, []);


    const tableColumn = [
        { title: 'Salary Head', dataIndex: 'salaryHeadName', key: 'salaryHeadName', showOnResponse: true, showOnDesktop: true, width: 130, },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', showOnResponse: true, showOnDesktop: true, width: 130, },
    ]

    const createSubmitForm = (value) => {
        let checkAddition= tableAddition.reduce((acc, obj) => acc + obj.percentage, 0);
        let checkDeduction= tableDeduction.reduce((acc, obj) => acc + obj.percentage, 0);
        if (checkAddition!==100){
            notification.error({message:"Addition amount and grade amount should be equal"});
            return;
        }
        if (checkDeduction>100){
            notification.error({message:"Please check deduction value"});
            return;
        }

        let salaryHeadAdditionList = tableAddition.filter(item=>item.amount>0).map(item=>{
            return {
                "salaryHeadId": item.salaryHeadAdditionId,
                "amount": item.amount
            }
        })        
        let salaryHeadDeductionList = tableDeduction.filter(item=>item.amount>0).map(item=>{
            return {
                "salaryHeadId": item.salaryHeadDeductionId,
                "amount": item.amount
            }
        })
        let payload = {
            "basicAmount": value.basicAmountMinimum,
            "employeeId": value.employeeId,
            "salaryGradeId": value.salaryGradeId,
            "salaryHeadAdditionList": salaryHeadAdditionList,
            "salaryHeadDeductionList":salaryHeadDeductionList
          }
        saveSalaryGradeConfiguration({payload:payload, id:value.employeeId});
        setTableAddition(salaryHeadListAddition?.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        setTableDeduction(salaryHeadListDeduction.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        setAmount(0);
        setfinalAmount(0);
        setAmountmax(0);
        setGrossAmount(0);
        setNetamount(0)
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
    const [amountmax, setAmountmax] = useState<any>(0);
    const [finalAmount, setfinalAmount] = useState<any>(0);
    const [grossAmount, setGrossAmount] = useState<any>(0);
    const [netAmount, setNetamount] = useState<any>(0);

    const onchangeGrade = (value) => {
        const items = salaryGradeList.find((item) => item.salaryGradeId === value);
        setTableAddition(salaryHeadListAddition?.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        setTableDeduction(salaryHeadListDeduction.map((item) => ({ ...item, percentage: 0, amount: 0 })));
        saveForm.setFieldsValue({ basicAmountMinimum: items.basicAmountMinimum })
        saveForm.setFieldsValue({ basicAmountMaximum: items.basicAmountMaximum })
        setAmount(items?.basicAmountMinimum);
        setfinalAmount(items?.basicAmountMinimum);
        setAmountmax(items?.basicAmountMaximum);
        setGrossAmount(0);
        setNetamount(0)
        saveForm.setFieldsValue({ grossAmount: 0, netAmount: 0 });
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
                    disabled={finalAmount === 0 ? true : false}
                    onChange={onchangePercentageAddition("percentage", record, index)}
                    value={record.percentage === 0 ? null : record.percentage}
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
                    disabled={finalAmount === 0 ? true : false}
                    max={finalAmount}
                    onChange={onchangeAmountAddition("amount", record, index)}
                    formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")}
                    value={record.amount === 0 ? null : record.amount}
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
            newData[index]['amount'] = ((e as any) / 100) * finalAmount;
            setTableAddition(newData);
            saveForm.setFieldsValue({ grossAmount: (newData.reduce((acc, obj) => acc + obj.amount, 0)) })
            saveForm.setFieldsValue({ netAmount:  (newData.reduce((acc, obj) => acc + obj.amount, 0)) - (tableDeduction.reduce((acc, obj) => acc + obj.amount, 0)) })
            // setGrossAmount(newData.reduce((acc,obj)=>acc+obj.amount,0))
        }, [tableAddition]);

    const onchangeAmountAddition: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableAddition];
            newData[index][key] = e;
            newData[index]['percentage'] = (((e as any) * 100) / finalAmount).toFixed(2);
            setTableAddition(newData);
            saveForm.setFieldsValue({ grossAmount:  (newData.reduce((acc, obj) => acc + obj.amount, 0)) })
            saveForm.setFieldsValue({ netAmount: (newData.reduce((acc, obj) => acc + obj.amount, 0)) - (tableDeduction.reduce((acc, obj) => acc + obj.amount, 0)) })
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
                    disabled={finalAmount === 0 ? true : false}
                    onChange={onchangePercentageDeduction("percentage", record, index)}
                    value={record.percentage === 0 ? null : record.percentage}
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
                    disabled={finalAmount === 0 ? true : false}
                    max={finalAmount}
                    onChange={onchangeAmountDeduction("amount", record, index)}
                    value={record.amount === 0 ? null : record.amount}
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
            newData[index]['amount'] = ((e as any) / 100) * finalAmount;
            setTableDeduction(newData);
            saveForm.setFieldsValue({ grossAmount: (tableAddition.reduce((acc, obj) => acc + obj.amount, 0)) })
            saveForm.setFieldsValue({ netAmount:  (tableAddition.reduce((acc, obj) => acc + obj.amount, 0)) - (newData.reduce((acc, obj) => acc + obj.amount, 0)) })
        }, [tableDeduction]);

    const onchangeAmountDeduction: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableDeduction];
            newData[index][key] = e;
            newData[index]['percentage'] = (((e as any) * 100) / finalAmount).toFixed(2);
            setTableDeduction(newData);
            saveForm.setFieldsValue({ grossAmount:  (tableAddition.reduce((acc, obj) => acc + obj.amount, 0)) })
            saveForm.setFieldsValue({ netAmount: (tableAddition.reduce((acc, obj) => acc + obj.amount, 0)) - (newData.reduce((acc, obj) => acc + obj.amount, 0)) })
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

    const [selectedRowKeys3, setselectedRowKeys3] = useState<any>([]);
    const [selectedValue3, setselectedValue3] = useState<any>([]);

    const onSelectChange3 = (selectedRowKeys3, value3) => {
        setselectedRowKeys2(selectedRowKeys3);
        setselectedValue2(value3);
        // console.log(value)
    };

    const rowSelection3 = {
        selectedRowKeys: selectedRowKeys3,
        onChange: onSelectChange3,
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
                    

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                    <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span:8 }} xl={{ span: 8 }}>
                        <Form.Item
                            name="employeeId"
                            label="Select Employee"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please select employee" },
                            ]}
                        >
                            <SelectEmployee onChange={e => fetchviewSingleSalryConfiguration(e)} />
                        </Form.Item>

                    </Col>
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

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                        <Form.Item
                            name="basicAmountMinimum"
                            label="Grade Amount"
                            className="title-Text"
                        >
                            <InputNumber min={amount} max={amountmax} onChange={e => { setfinalAmount(e); saveForm.setFieldsValue({ grossAmount: 0, netAmount: 0 }); setTableAddition(salaryHeadListAddition?.map((item) => ({ ...item, percentage: 0, amount: 0 }))); setTableDeduction(salaryHeadListDeduction.map((item) => ({ ...item, percentage: 0, amount: 0 }))); }} formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")} placeholder="Grade Amount" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}></Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8}} xl={{ span: 8 }}>
                        <Form.Item
                            name="grossAmount"
                            label="Gross Amount"
                            className="title-Text"
                        >
                            <InputNumber readOnly disabled placeholder="Gross Amount" value={grossAmount} />
                        </Form.Item>
                    </Col>                         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                        <Form.Item
                            name="netAmount"
                            label="Net Amount"
                            className="title-Text"
                        >
                            <InputNumber readOnly disabled placeholder="Net Amount" value={netAmount} />
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                            <Form.Item
                                name="basicAmountMaximum"
                                label="Basic Amount(Maximum)"
                                className="title-Text"
                            >
                                <InputNumber disabled readOnly formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")} placeholder="Basic Amount(Maximum)" />
                            </Form.Item>
                        </Col> */}

                </Row>

                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                <>
                                    <strong>Addition List</strong>
                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns: additioncolumns,
                                            dataSource: tableAddition,
                                            filterData: tableAddition,
                                            pagination: false,
                                            bordered: true,
                                            rowKey: "salaryHeadAdditionId",
                                            style: { maxHeight: 300, overflow: 'auto' }
                                        }}
                                        mobileBreakPoint={768}
                                    />
                                </>
                            </Col>

                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                <br />
                                <>
                                    <strong>Deduction List</strong>
                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns: deductioncolumns,
                                            dataSource: tableDeduction,
                                            filterData: tableDeduction,
                                            pagination: false,
                                            bordered: true,
                                            rowKey: "salaryHeadDeductionId",
                                            style: { maxHeight: 300, overflow: 'auto' }
                                        }}
                                        mobileBreakPoint={768}
                                    />
                                </>
                            </Col>
                        </Row>
                        <Space size="small" style={{ float: 'right' }}>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                Save
                            </Button>
                        </Space>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                        {viewSingleSalryConfiguration != null &&
                            <>
                                <Descriptions
                                    bordered
                                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                                >
                                    <Descriptions.Item label={<strong>Id</strong>}>{viewSingleSalryConfiguration?.customEmployeeId}</Descriptions.Item>
                                    <Descriptions.Item label={<strong>Name</strong>}>{viewSingleSalryConfiguration?.employeeName}</Descriptions.Item>
                                    <Descriptions.Item label={<strong>Department</strong>}>{viewSingleSalryConfiguration?.departmentName}</Descriptions.Item>
                                    <Descriptions.Item label={<strong>Designation</strong>}>{viewSingleSalryConfiguration?.designation}</Descriptions.Item>
                                    <Descriptions.Item label={<strong>Grade</strong>}>{viewSingleSalryConfiguration?.salaryGradeName}</Descriptions.Item>
                                    <Descriptions.Item label={<strong>Grade Salary</strong>}>{moneyFormat(viewSingleSalryConfiguration?.basicSalary)}</Descriptions.Item>
                                    <Descriptions.Item label={<strong>Gross Salary</strong>}>{moneyFormat(viewSingleSalryConfiguration?.grossSalary)}</Descriptions.Item>
                                    <Descriptions.Item label={<strong>Net Salary</strong>}>{moneyFormat(viewSingleSalryConfiguration?.netSalary)}</Descriptions.Item>
                                </Descriptions>
                                <br />
                                <strong>Addition List: </strong>
                                <TableView
                                    antTableProps={{
                                        showHeader: true,
                                        columns: tableColumn,
                                        dataSource: viewSingleSalryConfiguration?.additionList,
                                        filterData: viewSingleSalryConfiguration?.additionList,
                                        pagination: false,
                                        bordered: true,
                                        rowKey: "salaryHeadId",
                                    }}
                                    mobileBreakPoint={768}
                                />
                                <br />
                                <strong>Deduction List:</strong>
                                <TableView
                                    antTableProps={{
                                        showHeader: true,
                                        columns: tableColumn,
                                        dataSource: viewSingleSalryConfiguration?.deductionList,
                                        filterData: viewSingleSalryConfiguration?.deductionList,
                                        pagination: false,
                                        bordered: true,
                                        rowKey: "salaryHeadId",
                                    }}
                                    mobileBreakPoint={768}
                                />
                            </>
                        }
                    </Col>
                </Row>
            </Form>



        </>
    )

}