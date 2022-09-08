import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';
import { Excel } from 'antd-table-saveas-excel';
import { moneyFormat } from '../../../../utils/utils';
import { SelectDepartment } from '../../../select/SelectDepartment';
import { SelectDepartment2 } from '../../../select/SelectDepartment2';



const { Option } = Select;

const d = new Date();
const year = d.getFullYear();

export default function SalaryGradeConfigureList() {
    const salryConfigurationSheetByDepartment = useStoreState((state) => state.payroll.salryConfigurationSheetByDepartment);
    const fetchsalryConfigurationSheetByDepartment = useStoreActions((state) => state.payroll.fetchsalryConfigurationSheetByDepartment);
    const fetchsalryConfigurationSheetByDepartment2 = useStoreActions((state) => state.payroll.fetchsalryConfigurationSheetByDepartment2);
    const deleteSalryConfiguration = useStoreActions((state) => state.payroll.deleteSalryConfiguration);
    const fetchCompanyDepartmentList = useStoreActions(
        (state) => state.common.fetchCompanyDepartmentList
    );
    useEffect(() => {
        fetchCompanyDepartmentList();
    }, []);


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
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName1 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName1,
            dataIndex: 'salaryHeadAdditionAmount1',
            key: 'salaryHeadAdditionAmount1',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount1)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName2 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName2,
            dataIndex: 'salaryHeadAdditionAmount2',
            key: 'salaryHeadAdditionAmount2',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount2)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName3 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName3,
            dataIndex: 'salaryHeadAdditionAmount3',
            key: 'salaryHeadAdditionAmount3',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount3)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName4 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName4,
            dataIndex: 'salaryHeadAdditionAmount4',
            key: 'salaryHeadAdditionAmount4',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount4)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName5 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName5,
            dataIndex: 'salaryHeadAdditionAmount5',
            key: 'salaryHeadAdditionAmount5',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount5)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName6 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName6,
            dataIndex: 'salaryHeadAdditionAmount6',
            key: 'salaryHeadAdditionAmount6',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount6)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName7 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName7,
            dataIndex: 'salaryHeadAdditionAmount7',
            key: 'salaryHeadAdditionAmount7',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount7)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName8 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName8,
            dataIndex: 'salaryHeadAdditionAmount8',
            key: 'salaryHeadAdditionAmount8',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount8)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName9 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName9,
            dataIndex: 'salaryHeadAdditionAmount9',
            key: 'salaryHeadAdditionAmount9',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount9)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadAdditionName10 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadAdditionName10,
            dataIndex: 'salaryHeadAdditionAmount10',
            key: 'salaryHeadAdditionAmount10',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadAdditionAmount10)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadDeductionName1 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadDeductionName1,
            dataIndex: 'salaryHeadDeductionAmount1',
            key: 'salaryHeadDeductionAmount1',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount1)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadDeductionName2 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadDeductionName2,
            dataIndex: 'salaryHeadDeductionAmount2',
            key: 'salaryHeadDeductionAmount2',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount2)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadDeductionName3 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadDeductionName3,
            dataIndex: 'salaryHeadDeductionAmount3',
            key: 'salaryHeadDeductionAmount3',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount3)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadDeductionName4 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadDeductionName4,
            dataIndex: 'salaryHeadDeductionAmount4',
            key: 'salaryHeadDeductionAmount4',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount4)
            )
        }] : [],
        ...salryConfigurationSheetByDepartment?.salaryHeadDeductionName5 !== "" ? [{
            title: salryConfigurationSheetByDepartment?.salaryHeadDeductionName5,
            dataIndex: 'salaryHeadDeductionAmount5',
            key: 'salaryHeadDeductionAmount5',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => (
                moneyFormat(record.salaryHeadDeductionAmount5)
            )
        }] : [],
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
        {
            title: 'Action',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteSalryConfiguration({ id: record?.salaryConfigId, data: search })}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                )

            }
        },
    ];

    const [tableData, setTableData] = useState<any>([]);
    useEffect(() => {
        setTableData(salryConfigurationSheetByDepartment?.employeeList);
    }, [salryConfigurationSheetByDepartment]);

    const [form] = Form.useForm();
    const [search, setsearch] = useState<any>(null)
    const onProcess = (value) => {
        if (value.departmentId==='all'){
            setsearch(null)
            fetchsalryConfigurationSheetByDepartment2();
        } else{
            setsearch(value.departmentId);
            fetchsalryConfigurationSheetByDepartment(value.departmentId);
        }

    }

    return (
        <>
            <Form
                layout="vertical"
                id="classConfigInfo"
                form={form}
                onFinish={onProcess}
            >
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>  </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item
                            name="departmentId"
                            label="Department"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please select department" },
                            ]}
                        >
                            <SelectDepartment2 />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
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

                                    <Space style={{ float: "right" }}>
                                        <Button
                                            style={{
                                                marginBottom: 20,
                                            }}
                                            type="primary"
                                            onClick={() => {
                                                const excel = new Excel();
                                                excel
                                                    .addSheet('Salary Process')
                                                    .addColumns(columns)
                                                    .addDataSource(tableData, {
                                                        str2Percent: true,
                                                    })
                                                    .saveAs(`Salary Process of ${form.getFieldValue('salaryMonth')}-${form.getFieldValue('salaryYear')}.xlsx`);
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
        </>
    )

}