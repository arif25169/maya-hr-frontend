import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, DownloadOutlined, EditOutlined, FileExcelOutlined, FilePdfOutlined, SaveOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';
import { moneyFormat } from '../../../../utils/utils';
import moment from 'moment'
import $ from 'jquery';
import jsPDF from "jspdf";
import { pdfDataL, ppowerdbypdf, pdatepdf, lpowerdbypdf, ldatepdf } from '../../../utils/pdf';
import 'jspdf-autotable';
import { Excel } from 'antd-table-saveas-excel';
import { SelectDepartment } from '../../../select/SelectDepartment';
import { SelectGradeDeduction } from '../../../select/SelectGradeDeduction';
import { SelectGradeAddition } from '../../../select/SelectGradeAddition';
import { SelectDepartment2 } from '../../../select/SelectDepartment2';

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
var details = "Employee salary sheet";

export default function SalaryProcess() {
    const salarySheetViews = useStoreState((state) => state.payroll.salarySheetViews);
    const fetchsalarySheetViews = useStoreActions((state) => state.payroll.fetchsalarySheetViews);
    const fetchsalarySheetViewsByDepNew = useStoreActions((state) => state.payroll.fetchsalarySheetViewsByDepNew);
    const saveSalaryProcess = useStoreActions((state) => state.payroll.saveSalaryProcess);
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
        // {
        //     title: 'Basic Salary',
        //     dataIndex: 'basicSalary',
        //     key: 'netSalary',
        //     showOnResponse: true,
        //     showOnDesktop: true,
        //     render: (text: any, record: any, index) => (
        //         moneyFormat(record.basicSalary)
        //     )
        // },

        ...(salarySheetViews?.salaryHeadAdditionName1 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName1,
                dataIndex: 'salaryHeadAdditionAmount1',
                key: 'salaryHeadAdditionAmount1',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount1)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName2 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName2,
                dataIndex: 'salaryHeadAdditionAmount2',
                key: 'salaryHeadAdditionAmount2',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount2)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName3 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName3,
                dataIndex: 'salaryHeadAdditionAmount3',
                key: 'salaryHeadAdditionAmount3',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount3)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName4 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName4,
                dataIndex: 'salaryHeadAdditionAmount4',
                key: 'salaryHeadAdditionAmount4',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount4)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName5 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName5,
                dataIndex: 'salaryHeadAdditionAmount5',
                key: 'salaryHeadAdditionAmount5',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount5)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName6 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName6,
                dataIndex: 'salaryHeadAdditionAmount6',
                key: 'salaryHeadAdditionAmount6',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount6)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName7 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName7,
                dataIndex: 'salaryHeadAdditionAmount7',
                key: 'salaryHeadAdditionAmount7',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount7)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName8 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName8,
                dataIndex: 'salaryHeadAdditionAmount8',
                key: 'salaryHeadAdditionAmount8',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount8)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName9 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName9,
                dataIndex: 'salaryHeadAdditionAmount9',
                key: 'salaryHeadAdditionAmount9',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount9)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName10 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName10,
                dataIndex: 'salaryHeadAdditionAmount10',
                key: 'salaryHeadAdditionAmount10',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount10)
                )
            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName1 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName1,
                dataIndex: 'salaryHeadDeductionAmount1',
                key: 'salaryHeadDeductionAmount1',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => {
                    return (
                        <InputNumber min={0} formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")} value={record?.salaryHeadDeductionAmount1} onChange={onchangeValue("salaryHeadDeductionAmount1", record, record.index)}></InputNumber>
                    )
                }
            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName2 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName2,
                dataIndex: 'salaryHeadDeductionAmount2',
                key: 'salaryHeadDeductionAmount2',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => {
                    return (
                        <InputNumber min={0} formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")} value={record?.salaryHeadDeductionAmount2} onChange={onchangeValue("salaryHeadDeductionAmount2", record, record.index)}></InputNumber>
                    )
                }
            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName3 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName3,
                dataIndex: 'salaryHeadDeductionAmount3',
                key: 'salaryHeadDeductionAmount3',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => {
                    return (
                        <InputNumber min={0} formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")} value={record?.salaryHeadDeductionAmount3} onChange={onchangeValue("salaryHeadDeductionAmount3", record, record.index)}></InputNumber>
                    )
                }
            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName4 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName4,
                dataIndex: 'salaryHeadDeductionAmount4',
                key: 'salaryHeadDeductionAmount4',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => {
                    return (
                        <InputNumber min={0} formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")} value={record?.salaryHeadDeductionAmount4} onChange={onchangeValue("salaryHeadDeductionAmount4", record, record.index)}></InputNumber>
                    )
                }
            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName5 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName5,
                dataIndex: 'salaryHeadDeductionAmount5',
                key: 'salaryHeadDeductionAmount5',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => {
                    return (
                        <InputNumber min={0} formatter={value => `${value}`.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,")} value={record?.salaryHeadDeductionAmount5} onChange={onchangeValue("salaryHeadDeductionAmount5", record, record.index)}></InputNumber>
                    )
                }
            }
        ] : [],

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

    const columns2: any = [
        {
            title: 'Employee Id',
            dataIndex: 'customEmployeeId',
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
        // {
        //     title: 'Basic Salary',
        //     dataIndex: 'basicSalary',
        //     key: 'netSalary',
        //     showOnResponse: true,
        //     showOnDesktop: true,
        //     render: (text: any, record: any, index) => (
        //         moneyFormat(record.basicSalary)
        //     )
        // },

        ...(salarySheetViews?.salaryHeadAdditionName1 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName1,
                dataIndex: 'salaryHeadAdditionAmount1',
                key: 'salaryHeadAdditionAmount1',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount1)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName2 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName2,
                dataIndex: 'salaryHeadAdditionAmount2',
                key: 'salaryHeadAdditionAmount2',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount2)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName3 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName3,
                dataIndex: 'salaryHeadAdditionAmount3',
                key: 'salaryHeadAdditionAmount3',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount3)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName4 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName4,
                dataIndex: 'salaryHeadAdditionAmount4',
                key: 'salaryHeadAdditionAmount4',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount4)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName5 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName5,
                dataIndex: 'salaryHeadAdditionAmount5',
                key: 'salaryHeadAdditionAmount5',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount5)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName6 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName6,
                dataIndex: 'salaryHeadAdditionAmount6',
                key: 'salaryHeadAdditionAmount6',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount6)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName7 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName7,
                dataIndex: 'salaryHeadAdditionAmount7',
                key: 'salaryHeadAdditionAmount7',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount7)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName8 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName8,
                dataIndex: 'salaryHeadAdditionAmount8',
                key: 'salaryHeadAdditionAmount8',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount8)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName9 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName9,
                dataIndex: 'salaryHeadAdditionAmount9',
                key: 'salaryHeadAdditionAmount9',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount9)
                )
            }
        ] : [],
        ...(salarySheetViews?.salaryHeadAdditionName10 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadAdditionName10,
                dataIndex: 'salaryHeadAdditionAmount10',
                key: 'salaryHeadAdditionAmount10',
                showOnResponse: true,
                showOnDesktop: true,
                render: (text: any, record: any, index) => (
                    moneyFormat(record.salaryHeadAdditionAmount10)
                )
            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName1 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName1,
                dataIndex: 'salaryHeadDeductionAmount1',
                key: 'salaryHeadDeductionAmount1',
                showOnResponse: true,
                showOnDesktop: true,

            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName2 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName2,
                dataIndex: 'salaryHeadDeductionAmount2',
                key: 'salaryHeadDeductionAmount2',
                showOnResponse: true,
                showOnDesktop: true,

            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName3 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName3,
                dataIndex: 'salaryHeadDeductionAmount3',
                key: 'salaryHeadDeductionAmount3',
                showOnResponse: true,
                showOnDesktop: true,

            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName4 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName4,
                dataIndex: 'salaryHeadDeductionAmount4',
                key: 'salaryHeadDeductionAmount4',
                showOnResponse: true,
                showOnDesktop: true,

            }
        ] : [],

        ...(salarySheetViews?.salaryHeadDeductionName5 !== "") ? [
            {
                title: salarySheetViews?.salaryHeadDeductionName5,
                dataIndex: 'salaryHeadDeductionAmount5',
                key: 'salaryHeadDeductionAmount5',
                showOnResponse: true,
                showOnDesktop: true,

            }
        ] : [],

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
        setTableData(salarySheetViews?.employeeList?.map((item, index) => ({ ...item, index: index })));
    }, [salarySheetViews]);

    const onchangeValue: any = useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = [...tableData];
        newData[index][key] = e;
        let salaryHeadDeductionAmount = data?.salaryHeadDeductionAmount1 + data?.salaryHeadDeductionAmount2 + data?.salaryHeadDeductionAmount3 + data?.salaryHeadDeductionAmount4 + data?.salaryHeadDeductionAmount5;
        // newData[index]['grossSalary'] = data?.netSalary - salaryHeadDeductionAmount;
        newData[index]['netSalary'] = data?.grossSalary - salaryHeadDeductionAmount;
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

    const [salaryMonth, setsalaryMonth] = useState<any>('');
    const [salaryYear, setsalaryYear] = useState<any>('');

    const [all, setall] = useState<any>('')
    const [absentFineId, setabsentFineId] = useState<any>(null)
    const [bonusId, setbonusId] = useState<any>(null)



    const onProcess = (value) => {
        if (value.departmentId === 'all') {
            value.departmentId = null;
            details = "Employee salary sheet";
        } else details = `Employee salary sheet of Department-${$(".depSelect").text()}`;
        value.absentFineId= absentFineId;
        value.bonusId= bonusId;
        fetchsalarySheetViewsByDepNew(value);
        setsalaryMonth(value.salaryMonth);
        setsalaryYear(value.salaryYear)
    }
    const onSave = () => {
        if (selectedRowKeys.length === 0) {
            message.error("Please select at least one row");
            return;
        };
        let payLoad = selectedValue?.map((item: any) => {
            return {
                // "basicSalary": item.basicSalary,
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
            "salaryMonth": salaryMonth,
            "salaryYear": salaryYear,
        }

        saveSalaryProcess(finalPayLoad);
        // form.resetFields();
        setselectedRowKeys([]);
        setselectedValue([]);
    };

    var getColumns = function () {
        return [
            { title: "Employee Id", dataKey: "customEmployeeId" },
            { title: "Name", dataKey: "employeeName" },
            { title: "Designation", dataKey: "designation" },
            ...(salarySheetViews?.salaryHeadAdditionName1 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName1, dataKey: "salaryHeadAdditionAmount1" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName2 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName2, dataKey: "salaryHeadAdditionAmount2" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName3 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName3, dataKey: "salaryHeadAdditionAmount3" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName4 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName4, dataKey: "salaryHeadAdditionAmount4" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName5 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName5, dataKey: "salaryHeadAdditionAmount5" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName6 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName6, dataKey: "salaryHeadAdditionAmount6" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName7 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName7, dataKey: "salaryHeadAdditionAmount7" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName8 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName8, dataKey: "salaryHeadAdditionAmount8" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName9 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName9, dataKey: "salaryHeadAdditionAmount9" }] : [],
            ...(salarySheetViews?.salaryHeadAdditionName10 !== "") ? [{ title: salarySheetViews?.salaryHeadAdditionName10, dataKey: "salaryHeadAdditionAmount10" }] : [],
            ...(salarySheetViews?.salaryHeadDeductionName1 !== "") ? [{ title: salarySheetViews?.salaryHeadDeductionName1, dataKey: "salaryHeadDeductionAmount1" }] : [],
            ...(salarySheetViews?.salaryHeadDeductionName2 !== "") ? [{ title: salarySheetViews?.salaryHeadDeductionName2, dataKey: "salaryHeadDeductionAmount2" }] : [],
            ...(salarySheetViews?.salaryHeadDeductionName3 !== "") ? [{ title: salarySheetViews?.salaryHeadDeductionName3, dataKey: "salaryHeadDeductionAmount3" }] : [],
            ...(salarySheetViews?.salaryHeadDeductionName4 !== "") ? [{ title: salarySheetViews?.salaryHeadDeductionName4, dataKey: "salaryHeadDeductionAmount4" }] : [],
            ...(salarySheetViews?.salaryHeadDeductionName5 !== "") ? [{ title: salarySheetViews?.salaryHeadDeductionName5, dataKey: "salaryHeadDeductionAmount5" }] : [],
            { title: "Gross Salary", dataKey: "grossSalary" },
            { title: "Net Salary", dataKey: "netSalary" },

        ];
    };

    function exportPdf() {


        var doc = new jsPDF("p", "mm", "a4");
        pdfDataL(doc, details);
        doc.writeText(0, 30, `Month: ${salaryMonth} & Year: ${salaryYear}`, { align: "center" });
        doc.writeText(-15, 30, `Date: ${moment(new Date()).format("DD/MM/YYYY")}`, { align: "right" });
        var totalPagesExp = "{total_pages_count_string}";

        var pageContent = function (data) {
            // FOOTER
            var str = ppowerdbypdf + data.pageCount;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp + pdatepdf;
            }
            doc.setFontSize(8);
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            doc.text(str, data.settings.margin.right, pageHeight - 10);
            doc.text(str, data.settings.margin.right, pageHeight - 10);
        };

        doc.autoTable(getColumns(), tableData, {

            headerStyles: {
                lineWidth: .01,
                overflow: "linebreak",
                lineColor: [224, 224, 224]
            },
            theme: "grid",
            styles: { fontSize: 7, overflow: "linebreak", },
            startY: 45,
            addPageContent: pageContent
        });
        doc.setFontType("normal")
        doc.setFontSize(10);
        doc.text('Authorized Signature', 14, doc.autoTable.previous.finalY + 25);
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }

        doc.save(details + ".pdf");

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
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 0 }} xl={{ span: 0 }}>  </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 4 }}>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }}>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }}>
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item
                            name="x"
                            label="Absent Fine"
                            className="title-Text"
                            // initialValue={null}
                        >
                            <SelectGradeDeduction onChange={e=>{setabsentFineId(e); console.log(e)}} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item
                            name="y"
                            label="Bonus Head"
                            className="title-Text"
                    //    
                        >
                            <SelectGradeAddition  onChange={e=>setbonusId(e)}/>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }}>
                        <Form.Item
                            name="bonusAcceptanceOfBasic"
                            label="Acceptance of Basic"
                            className="title-Text"
                            initialValue={null}
                        >
                            <InputNumber placeholder='0-1' min={0} max={1} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 2 }} xl={{ span: 2 }}>
                        <Button type='primary' htmlType='submit' icon={<SearchOutlined />}> Search</Button>
                    </Col>
                </Row>
                {tableData?.length > 0 &&
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
                                <Space size={'middle'} style={{ float: "right" }}>
                                    <Button type="primary" icon={<FilePdfOutlined />} onClick={() => exportPdf()}>Download PDF</Button>
                                    <Button
                                        style={{

                                        }}
                                        icon={<FileExcelOutlined />}
                                        type="primary"
                                        onClick={() => {
                                            const excel = new Excel();
                                            excel
                                                .addSheet('Sheet 1')
                                                .addColumns(columns2)
                                                .addDataSource(tableData, {
                                                    str2Percent: true,
                                                })
                                                .saveAs(`${details}.xlsx`);
                                        }}
                                    >
                                        Download Excel
                                    </Button>
                                    <Button type='primary' onClick={() => onSave()} icon={<SettingOutlined />}> Process</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                }

            </Form>
        </Card>
    )

}