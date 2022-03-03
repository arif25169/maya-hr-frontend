import React, { useEffect, useState } from 'react';
import { Button, Card, Col, List, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Descriptions } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import TableView from '../../../../contents/AntTableResponsiveNoSearch';
import { SelectPayrollGrade } from '../../../select/SelectPayrollGrade';



export default function SalaryGradeConfigureList() {
    const salaryGradeConfigurationList = useStoreState((state) => state.payroll.salaryGradeConfigurationList);
    const fetchsalaryGradeConfigurationList = useStoreActions((state) => state.payroll.fetchsalaryGradeConfigurationList);




    useEffect(() => {
        fetchsalaryGradeConfigurationList();
    }, [])


    console.log(salaryGradeConfigurationList)



    const additioncolumns = [
        {
            title: 'Salary Head',
            dataIndex: 'salaryHeadName',
            key: 'salaryHeadName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            showOnResponse: true,
            showOnDesktop: true
        },

    ];


    const deductioncolumns = [
        {
            title: 'Salary Head',
            dataIndex: 'salaryHeadName',
            key: 'salaryHeadName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            showOnResponse: true,
            showOnDesktop: true
        },
    ];

    return (
        <>
            <List
                bordered
                dataSource={salaryGradeConfigurationList}
                renderItem={(item: any, index) => (
                    <Card>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                <Descriptions
                                    // title="User Info"
                                    bordered
                                    style={{ marginBottom: 10 }}
                                    column={{ xxl: 4, xl: 4, lg: 4, md: 1, sm: 1, xs: 1 }}
                                >
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Salary Grade Name"><span style={{ fontWeight: "normal" }}>{item?.salaryGradeName}</span></Descriptions.Item>
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Basic Salary"><span style={{ fontWeight: "normal" }}>{item?.basic}</span></Descriptions.Item>
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Net Salary"><span style={{ fontWeight: "normal" }}>{item?.netSalary}</span></Descriptions.Item>
                                    <Descriptions.Item style={{ fontWeight: "bold" }} label="Gross Salary"><span style={{ fontWeight: "normal" }}>{item?.grossSalary}</span></Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                <Card title="Addition List">

                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns: additioncolumns,
                                            dataSource: item?.salaryHeadAdditionConfigurations,
                                            filterData: item?.salaryHeadAdditionConfigurations,
                                            pagination: false,
                                            bordered: true,
                                            rowKey: "configId",

                                            style: { maxHeight: 300, overflow: 'auto' }
                                        }}
                                        mobileBreakPoint={768}
                                    />
                                </Card>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>

                                <Card title="Deduction List">

                                    <TableView
                                        antTableProps={{
                                            showHeader: true,
                                            columns: deductioncolumns,
                                            dataSource: item?.salaryHeadDeductionConfigurations,
                                            filterData: item?.salaryHeadDeductionConfigurations,
                                            pagination: false,
                                            bordered: true,
                                            rowKey: "salaryHeadDeductionId",
                                            style: { maxHeight: 300, overflow: 'auto' }
                                        }}
                                        mobileBreakPoint={768}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                )}
            />


        </>
    )

}