import { Space, Table } from 'antd';
import React, { useEffect } from 'react'

export default function Dashboard() {

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
              </Space>
            ),
          },
      ];
    return (
        <>
           <Table dataSource={dataSource} columns={columns} />

        </>
    )
}