import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, Skeleton } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import Column from 'rc-table/lib/sugar/Column';
import { SwitcherOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function EnbaledEmployeeMapping() {

    const fetchenabledEmployee = useStoreActions((state) => state.attendance.fetchenabledEmployee);
    const saveBatchIdmapping = useStoreActions((state) => state.attendance.saveBatchIdmapping);
    const saveSingleIdmapping = useStoreActions((state) => state.attendance.saveSingleIdmapping);
    const enabledEmployee = useStoreState((state) => state.attendance.enabledEmployee);


    useEffect(() => {
        fetchenabledEmployee();
    }, []);


    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        setTableData(enabledEmployee);
    }, [enabledEmployee]);

    const columns = [
        {
            title: 'ID',
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
            title: 'User ID',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Input value={record?.userId} placeholder='User Id' onChange={onchangeValue("userId", record, index)}></Input>

                )

            }
        },
        {
            title: 'Update',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Button type='primary' onClick={() => saveSingleIdmapping({
                        mapId: record?.mapId,
                        employeeId: record?.employeeId,
                        userId: record?.userId
                    })}> Update</Button>

                )

            }
        },

    ];

    const [checked, setChecked] = useState<boolean>(false);
    const batchSave = () => {
        let payload = tableData?.map((item: any) => {
            return {
                mapId: item?.mapId,
                employeeId: item?.employeeId,
                userId: item?.userId
            }
        });
        saveBatchIdmapping(payload);
        setChecked(false);
    };

    const onchangeValue: any =
        (key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e.target.value;
            setTableData(newData);
        };


    const checkItem = (e: any) => {
        setChecked(e.target.checked);
        if (e.target.checked === true) {
            let temp: any = []
            for (let i = 0; i < tableData.length; i++) {
                tableData[i].userId = tableData[i].customEmployeeId;
            }
            temp.push(...tableData);
            setTableData(temp);
        }

        if (e.target.checked === false) {
            let temp: any = []
            for (let i = 0; i < tableData.length; i++) {
                tableData[i].userId = null;
            }
            temp.push(...tableData);
            setTableData(temp);
        }
    }


    return (
        <>
            <Card title="Enabled Employee Machine ID Map List" className='box-shadow-none'>
                <Row className="m-t-mo-30">
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: 10, float: "right" }} value={checked} onChange={checkItem}>Check For Employee ID As Machine ID</Checkbox>
                    </Col>
                    <Col span={24}>
                        <div className="datatable-responsive-demo">
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: enabledEmployee,
                                    filterData: enabledEmployee,
                                    pagination: false,
                                    bordered: true,
                                    rowKey: "employeeId",
                                }}
                                mobileBreakPoint={768}
                            />
                            <Space size={'middle'} style={{ float: "right", marginTop: 10 }}>
                                <Button type="primary" onClick={batchSave}>Batch Update</Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
}