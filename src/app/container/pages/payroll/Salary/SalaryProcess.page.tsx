import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsive';


export default function SalaryProcess() {
    const salarySheetViews = useStoreState((state) => state.payroll.salarySheetViews);
    const fetchsalarySheetViews = useStoreActions((state) => state.payroll.fetchsalarySheetViews);

    useEffect(() => {
        fetchsalarySheetViews();
    }, []);

    /////////////

    const columns:any = [
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

        salarySheetViews?.salaryHeadAdditionName1!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName1,
            dataIndex: 'salaryHeadAdditionAmount1',
            key: 'salaryHeadAdditionAmount1',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName2!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName2,
            dataIndex: 'salaryHeadAdditionAmount2',
            key: 'salaryHeadAdditionAmount2',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName3!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName3,
            dataIndex: 'salaryHeadAdditionAmount3',
            key: 'salaryHeadAdditionAmount3',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName4!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName4,
            dataIndex: 'salaryHeadAdditionAmount4',
            key: 'salaryHeadAdditionAmount4',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName5!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName5,
            dataIndex: 'salaryHeadAdditionAmount5',
            key: 'salaryHeadAdditionAmount5',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName6!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName6,
            dataIndex: 'salaryHeadAdditionAmount6',
            key: 'salaryHeadAdditionAmount6',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName7!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName7,
            dataIndex: 'salaryHeadAdditionAmount7',
            key: 'salaryHeadAdditionAmount7',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName8!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName8,
            dataIndex: 'salaryHeadAdditionAmount8',
            key: 'salaryHeadAdditionAmount8',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName9!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName9,
            dataIndex: 'salaryHeadAdditionAmount9',
            key: 'salaryHeadAdditionAmount9',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadAdditionName10!=="" && {
            title: salarySheetViews?.salaryHeadAdditionName10,
            dataIndex: 'salaryHeadAdditionAmount10',
            key: 'salaryHeadAdditionAmount10',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadDeductionName1!=="" && {
            title: salarySheetViews?.salaryHeadDeductionName1,
            dataIndex: 'salaryHeadDeductionAmount1',
            key: 'salaryHeadDeductionAmount1',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadDeductionName2!=="" && {
            title: salarySheetViews?.salaryHeadDeductionName2,
            dataIndex: 'salaryHeadDeductionAmount2',
            key: 'salaryHeadDeductionAmount2',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadDeductionName3!=="" && {
            title: salarySheetViews?.salaryHeadDeductionName3,
            dataIndex: 'salaryHeadDeductionAmount3',
            key: 'salaryHeadDeductionAmount3',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadDeductionName4!=="" && {
            title: salarySheetViews?.salaryHeadDeductionName4,
            dataIndex: 'salaryHeadDeductionAmount4',
            key: 'salaryHeadDeductionAmount4',
            showOnResponse: true,
            showOnDesktop: true
        },
        salarySheetViews?.salaryHeadDeductionName5!=="" && {
            title: salarySheetViews?.salaryHeadDeductionName5,
            dataIndex: 'salaryHeadDeductionAmount5',
            key: 'salaryHeadDeductionAmount5',
            showOnResponse: true,
            showOnDesktop: true
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

    return (
        <Card title="Salary Process">

            <Row className="m-t-mo-30">
                <Col span="24">
                    <div className="datatable-responsive-demo">
                        {tableData?.length > 0 &&
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: tableData,
                                    filterData: tableData,
                                    pagination: true,
                                    bordered: true,
                                    rowKey: "id",
                                }}
                                mobileBreakPoint={768}
                            />
                        }
                    </div>
                </Col>
            </Row>

        </Card>
    )

}