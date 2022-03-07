import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';

const cleanObject = (input) => {
    if (typeof input === 'object' && input !== null) {
        if (Array.isArray(input)) {
            return input.map(cleanObject)
                .filter(item => item !== null && item !== undefined)
        }

        return Object.fromEntries(
            Object.entries(input)
                .map(([key, val]) => [key, cleanObject(val)])
                .filter(([k, v]) => v !== null && v !== undefined)
        );

    }

    return input;
};

const { Option } = Select;

const d = new Date();
const year = d.getFullYear();

export default function SalaryProcess() {
    const salarySheetViews = useStoreState((state) => state.payroll.salarySheetViews);
    const fetchsalarySheetViews = useStoreActions((state) => state.payroll.fetchsalarySheetViews);
    const saveSalaryProcess = useStoreActions((state) => state.payroll.saveSalaryProcess);

    useEffect(() => {
        fetchsalarySheetViews();
    }, []);

    /////////////

    const columns: any = [
        {
            title: 'Employee Id',
            dataIndex: 'employeeId',
            key: 'employeeId',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Basic Salary',
            dataIndex: 'basicSalary',
            key: 'netSalary',
            showOnResponse: true,
            showOnDesktop: true
        },

        salarySheetViews?.salaryHeadAdditionName1 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName1,
            dataIndex: 'salaryHeadAdditionAmount1',
            key: 'salaryHeadAdditionAmount1',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName2 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName2,
            dataIndex: 'salaryHeadAdditionAmount2',
            key: 'salaryHeadAdditionAmount2',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName3 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName3,
            dataIndex: 'salaryHeadAdditionAmount3',
            key: 'salaryHeadAdditionAmount3',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName4 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName4,
            dataIndex: 'salaryHeadAdditionAmount4',
            key: 'salaryHeadAdditionAmount4',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName5 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName5,
            dataIndex: 'salaryHeadAdditionAmount5',
            key: 'salaryHeadAdditionAmount5',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName6 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName6,
            dataIndex: 'salaryHeadAdditionAmount6',
            key: 'salaryHeadAdditionAmount6',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName7 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName7,
            dataIndex: 'salaryHeadAdditionAmount7',
            key: 'salaryHeadAdditionAmount7',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName8 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName8,
            dataIndex: 'salaryHeadAdditionAmount8',
            key: 'salaryHeadAdditionAmount8',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName9 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName9,
            dataIndex: 'salaryHeadAdditionAmount9',
            key: 'salaryHeadAdditionAmount9',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName10 !== "" && {
            title: salarySheetViews?.salaryHeadAdditionName10,
            dataIndex: 'salaryHeadAdditionAmount10',
            key: 'salaryHeadAdditionAmount10',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadDeductionName1 !== "" && {
            title: salarySheetViews?.salaryHeadDeductionName1,
            dataIndex: 'salaryHeadDeductionAmount1',
            key: 'salaryHeadDeductionAmount1',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <InputNumber min={0} value={record?.salaryHeadDeductionAmount1} onChange={onchangeValue("salaryHeadDeductionAmount1", record, index)}></InputNumber>
                )
            }
        },
        salarySheetViews?.salaryHeadDeductionName2 !== "" && {
            title: salarySheetViews?.salaryHeadDeductionName2,
            dataIndex: 'salaryHeadDeductionAmount2',
            key: 'salaryHeadDeductionAmount2',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <InputNumber min={0} value={record?.salaryHeadDeductionAmount2} onChange={onchangeValue("salaryHeadDeductionAmount2", record, index)}></InputNumber>
                )
            }
        },
        salarySheetViews?.salaryHeadDeductionName3 !== "" && {
            title: salarySheetViews?.salaryHeadDeductionName3,
            dataIndex: 'salaryHeadDeductionAmount3',
            key: 'salaryHeadDeductionAmount3',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <InputNumber min={0} value={record?.salaryHeadDeductionAmount3} onChange={onchangeValue("salaryHeadDeductionAmount3", record, index)}></InputNumber>
                )
            }
        },
        salarySheetViews?.salaryHeadDeductionName4 !== "" && {
            title: salarySheetViews?.salaryHeadDeductionName4,
            dataIndex: 'salaryHeadDeductionAmount4',
            key: 'salaryHeadDeductionAmount4',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <InputNumber min={0} value={record?.salaryHeadDeductionAmount4} onChange={onchangeValue("salaryHeadDeductionAmount4", record, index)}></InputNumber>
                )
            }
        },
        salarySheetViews?.salaryHeadDeductionName5 !== "" && {
            title: salarySheetViews?.salaryHeadDeductionName5,
            dataIndex: 'salaryHeadDeductionAmount5',
            key: 'salaryHeadDeductionAmount5',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <InputNumber min={0} value={record?.salaryHeadDeductionAmount5} onChange={onchangeValue("salaryHeadDeductionAmount5", record, index)}></InputNumber>
                )
            }
        },
        {
            title: 'Net Salary',
            dataIndex: 'netSalary',
            key: 'netSalary',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Gross Salary',
            dataIndex: 'grossSalary',
            key: 'grossSalary',
            showOnResponse: true,
            showOnDesktop: true
        },
    ];

    const [tableData, setTableData] = useState<any>([]);
    useEffect(() => {
        setTableData(salarySheetViews?.employeeList);
    }, [salarySheetViews]);

    const onchangeValue: any = useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = [...tableData];
        newData[index][key] = e;
        let salaryHeadDeductionAmount = data?.salaryHeadDeductionAmount1 + data?.salaryHeadDeductionAmount2 + data?.salaryHeadDeductionAmount3 + data?.salaryHeadDeductionAmount4 + data?.salaryHeadDeductionAmount5;
        newData[index]['grossSalary'] = data?.netSalary - salaryHeadDeductionAmount;
        setTableData(newData);
    }, [tableData]);

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
    };

    
    const [form] = Form.useForm();
    const onProcess = (value) => {
        if (selectedRowKeys.length === 0) {
            message.error("Please select at least one row");
            return;
        };
        let payLoad = selectedValue?.map((item: any) => {
            return {
                "basicSalary": item.basicSalary,
                "employeeId": item.employeeId,
                "grossSalary": item.grossSalary,
                "netSalary": item.netSalary,
                "salaryGradeId": item.salaryGradeId,
                "salaryHeadAdditionList": [
                    item?.salaryHeadAdditionAmount1 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount1,
                            "salaryHeadId": item?.salaryHeadAdditionId1
                        } : null,

                    item?.salaryHeadAdditionAmount2 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount2,
                            "salaryHeadId": item?.salaryHeadAdditionId2
                        } : null,

                    item?.salaryHeadAdditionAmount3 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount3,
                            "salaryHeadId": item?.salaryHeadAdditionId3
                        } : null,

                    item?.salaryHeadAdditionAmount4 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount4,
                            "salaryHeadId": item?.salaryHeadAdditionId4
                        } : null,

                    item?.salaryHeadAdditionAmount5 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount5,
                            "salaryHeadId": item?.salaryHeadAdditionId5
                        } : null,

                    item?.salaryHeadAdditionAmount6 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount6,
                            "salaryHeadId": item?.salaryHeadAdditionId6
                        } : null,

                    item?.salaryHeadAdditionAmount7 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount7,
                            "salaryHeadId": item?.salaryHeadAdditionId7
                        } : null,

                    item?.salaryHeadAdditionAmount8 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount8,
                            "salaryHeadId": item?.salaryHeadAdditionId8
                        } : null,

                    item?.salaryHeadAdditionAmount9 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount9,
                            "salaryHeadId": item?.salaryHeadAdditionId9
                        } : null,

                    item?.salaryHeadAdditionAmount10 > 0 ?
                        {
                            "amount": item?.salaryHeadAdditionAmount10,
                            "salaryHeadId": item?.salaryHeadAdditionId10
                        } : null,


                ],
                "salaryHeadDeductionList": [
                    item?.salaryHeadDeductionAmount1 > 0 ?
                        {
                            "amount": item?.salaryHeadDeductionAmount1,
                            "salaryHeadId": item?.salaryHeadDeductionId1
                        } : null,
                    item?.salaryHeadDeductionAmount2 > 0 ?
                        {
                            "amount": item?.salaryHeadDeductionAmount2,
                            "salaryHeadId": item?.salaryHeadDeductionId2
                        } : null,
                    item?.salaryHeadDeductionAmount3 > 0 ?
                        {
                            "amount": item?.salaryHeadDeductionAmount3,
                            "salaryHeadId": item?.salaryHeadDeductionId3
                        } : null,
                    item?.salaryHeadDeductionAmount4 > 0 ?
                        {
                            "amount": item?.salaryHeadDeductionAmount4,
                            "salaryHeadId": item?.salaryHeadDeductionId4
                        } : null,
                    item?.salaryHeadDeductionAmount5 > 0 ?
                        {
                            "amount": item?.salaryHeadDeductionAmount5,
                            "salaryHeadId": item?.salaryHeadDeductionId5
                        } : null,

                ]
            };
        })

        let finalPayLoad = {
            "employeeList": cleanObject(payLoad),
            "salaryMonth": value.salaryMonth,
            "salaryYear": value.salaryYear,
        }

        console.log(finalPayLoad);
        saveSalaryProcess(finalPayLoad);
        form.resetFields();
        setselectedRowKeys([]);
        setselectedValue([]);
    }

    return (
        <Card title="Salary Process">
            <Form
                layout="vertical"
                id="classConfigInfo"
                form={form}
                onFinish={onProcess}
            >
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }}>  </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item
                            name="salaryYear"
                            label="Salary Year"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please select year" },
                            ]}
                        >
                            <Select placeholder="Select year">
                                <Option key={year - 1} value={year - 1}>{year - 1}</Option>
                                <Option key={year} value={year}>{year}</Option>
                                <Option key={year + 1} value={year + 1}>{year + 1}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item
                            name="salaryMonth"
                            label="Salary Month"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please select month" },
                            ]}
                        >
                            <Select placeholder="Select month">
                                <Option key="1" value="January">January</Option>
                                <Option key="2" value="February">February</Option>
                                <Option key="3" value="March">March</Option>
                                <Option key="4" value="April">April</Option>
                                <Option key="5" value="May">May</Option>
                                <Option key="6" value="June">June</Option>
                                <Option key="7" value="July">July</Option>
                                <Option key="8" value="August">August</Option>
                                <Option key="9" value="September">September</Option>
                                <Option key="10" value="October">October</Option>
                                <Option key="11" value="November">November</Option>
                                <Option key="12" value="December">December</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Space size={'middle'} >
                            <Button type='primary' htmlType='submit' icon={<SettingOutlined />}> Process</Button>
                        </Space>
                    </Col>

                </Row>
                <Row className="m-t-mo-30">
                    <Col span="24">
                        <div className="datatable-responsive-demo">
                            {tableData?.length > 0 &&
                                <>
                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns,
                                            dataSource: tableData,
                                            filterData: tableData,
                                            pagination: true,
                                            bordered: true,
                                            rowKey: "employeeId",
                                            rowSelection: rowSelection,
                                        }}
                                        mobileBreakPoint={768}
                                    />

                                </>
                            }
                        </div>
                    </Col>
                </Row>
            </Form>
        </Card>
    )

}