import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';
import { Excel } from 'antd-table-saveas-excel';
import { moneyFormat } from '../../../../utils/utils';



const { Option } = Select;

const d = new Date();
const year = d.getFullYear();

export default function SalaryProcessList() {
    const salaryProcessList = useStoreState((state) => state.payroll.salaryProcessList);
    const fetchsalaryProcessList = useStoreActions((state) => state.payroll.fetchsalaryProcessList);



    /////////////

    const columns: any = [
        {
            title: 'Employee Id',
            dataIndex: 'customEmployeeId',
            key: 'customEmployeeId',
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
            title: 'Grade',
            dataIndex: 'salaryGrade',
            key: 'salaryGrade',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Basic Salary',
            dataIndex: 'basicSalary',
            key: 'netSalary',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.basicSalary)
            )
        },

        salaryProcessList?.salaryHeadAdditionName1 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName1,
            dataIndex: 'salaryHeadAdditionAmount1',
            key: 'salaryHeadAdditionAmount1',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount1)
            )
        },
        salaryProcessList?.salaryHeadAdditionName2 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName2,
            dataIndex: 'salaryHeadAdditionAmount2',
            key: 'salaryHeadAdditionAmount2',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount2)
            )
        },
        salaryProcessList?.salaryHeadAdditionName3 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName3,
            dataIndex: 'salaryHeadAdditionAmount3',
            key: 'salaryHeadAdditionAmount3',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount3)
            )
        },
        salaryProcessList?.salaryHeadAdditionName4 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName4,
            dataIndex: 'salaryHeadAdditionAmount4',
            key: 'salaryHeadAdditionAmount4',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount4)
            )
        },
        salaryProcessList?.salaryHeadAdditionName5 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName5,
            dataIndex: 'salaryHeadAdditionAmount5',
            key: 'salaryHeadAdditionAmount5',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount5)
            )
        },
        salaryProcessList?.salaryHeadAdditionName6 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName6,
            dataIndex: 'salaryHeadAdditionAmount6',
            key: 'salaryHeadAdditionAmount6',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount6)
            )
        },
        salaryProcessList?.salaryHeadAdditionName7 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName7,
            dataIndex: 'salaryHeadAdditionAmount7',
            key: 'salaryHeadAdditionAmount7',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount7)
            )
        },
        salaryProcessList?.salaryHeadAdditionName8 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName8,
            dataIndex: 'salaryHeadAdditionAmount8',
            key: 'salaryHeadAdditionAmount8',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount8)
            )
        },
        salaryProcessList?.salaryHeadAdditionName9 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName9,
            dataIndex: 'salaryHeadAdditionAmount9',
            key: 'salaryHeadAdditionAmount9',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount9)
            )
        },
        salaryProcessList?.salaryHeadAdditionName10 !== "" && {
            title: salaryProcessList?.salaryHeadAdditionName10,
            dataIndex: 'salaryHeadAdditionAmount10',
            key: 'salaryHeadAdditionAmount10',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount10)
            )
        },
        salaryProcessList?.salaryHeadDeductionName1 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName1,
            dataIndex: 'salaryHeadDeductionAmount1',
            key: 'salaryHeadDeductionAmount1',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount1)
            )

        },
        salaryProcessList?.salaryHeadDeductionName2 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName2,
            dataIndex: 'salaryHeadDeductionAmount2',
            key: 'salaryHeadDeductionAmount2',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount2)
            )

        },
        salaryProcessList?.salaryHeadDeductionName3 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName3,
            dataIndex: 'salaryHeadDeductionAmount3',
            key: 'salaryHeadDeductionAmount3',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount3)
            )

        },
        salaryProcessList?.salaryHeadDeductionName4 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName4,
            dataIndex: 'salaryHeadDeductionAmount4',
            key: 'salaryHeadDeductionAmount4',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount4)
            )

        },
        salaryProcessList?.salaryHeadDeductionName5 !== "" && {
            title: salaryProcessList?.salaryHeadDeductionName5,
            dataIndex: 'salaryHeadDeductionAmount5',
            key: 'salaryHeadDeductionAmount5',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount5)
            )

        },

        {
            title: 'Gross Salary',
            dataIndex: 'grossSalary',
            key: 'grossSalary',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.grossSalary)
            )
        },
        {
            title: 'Net Salary',
            dataIndex: 'netSalary',
            key: 'netSalary',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.netSalary)
            )
        },

    ];




    const [tableData, setTableData] = useState<any>([]);
    useEffect(() => {
        setTableData(salaryProcessList?.employeeList);
    }, [salaryProcessList]);

    const [form] = Form.useForm();
    const onProcess = (value) => {
        fetchsalaryProcessList(value);

    }

    return (
        <Card title="Salary Process View">
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
                            <Button type='primary' htmlType='submit' icon={<SearchOutlined />}> Search</Button>
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
                                            rowKey: "customEmployeeId",

                                        }}
                                        mobileBreakPoint={768}
                                    />

                                    <Space style={{float:"right"}}>
                                        <Button
                                            style={{
                                                marginBottom: 20,
                                            }}
                                            onClick={() => {
                                                const excel = new Excel();
                                                excel
                                                    .addSheet('test')
                                                    .addColumns(columns)
                                                    .addDataSource(tableData, {
                                                        str2Percent: true,
                                                    })
                                                    .saveAs(`Salary Process View of ${form.getFieldValue('salaryMonth')}-${form.getFieldValue('salaryYear')}.xlsx`);
                                            }}
                                        >
                                            Download Excel
                                        </Button>
                                    </Space>

                                </>
                            }
                        </div>
                    </Col>
                </Row>
            </Form>
        </Card>
    )

}