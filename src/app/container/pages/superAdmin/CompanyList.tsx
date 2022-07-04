import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import Column from 'rc-table/lib/sugar/Column';
import { SwitcherOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CompanyList() {

    const fetchallCompanyView = useStoreActions((state)=> state.common.fetchallCompanyView);
    const allCompanyView = useStoreState((state) => state.common.allCompanyView);
    useEffect(() => {
        fetchallCompanyView();
    }, []);



    const columns = [
        { title: 'Company ID', dataIndex: 'companyId', key: "companyId", showOnResponse: true, showOnDesktop: true  },
        { title: 'Companyu Name', dataIndex: 'companyName', key: "companyName", showOnResponse: true, showOnDesktop: true  },
        { title: 'Address', dataIndex: 'address', key: "address", showOnResponse: true, showOnDesktop: true  },
        { title: 'Phone No', dataIndex: 'phoneNo', key: "phoneNo", showOnResponse: true, showOnDesktop: true  },
        { title: 'Status', dataIndex: 'status', key: "status", showOnResponse: true, showOnDesktop: true, render: (text, record:any, index) =>
        (
            <>
                <span>{record.companyStatus == true ? 'Enable' : 'Disable'}</span>
            </>
        )
        },

    ];

    return(
        <>
           <Card title="Company List">
           <Row className="m-t-mo-30">
                <Col span={24}>
                    <div className="datatable-responsive-demo">
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns,
                                dataSource: allCompanyView,
                                filterData: allCompanyView,
                                pagination: true,
                                bordered: true,
                                rowKey: "companyStatus",
                            }}
                            mobileBreakPoint={768}
                        />
                    </div>
                </Col>
            </Row>
           </Card>
        </>
    )
}