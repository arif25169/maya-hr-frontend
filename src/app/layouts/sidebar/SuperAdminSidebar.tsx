import { Menu } from 'antd';
import React from 'react';
import { PieChartOutlined } from '@ant-design/icons/lib';

export function SuperAdminSidebar() {
	return <Menu theme="dark" defaultSelectedKeys={ [ '1' ] } mode="inline">
		<Menu.Item key="1" icon={ <PieChartOutlined/> }>
			Organisations
		</Menu.Item>
	</Menu>
}
