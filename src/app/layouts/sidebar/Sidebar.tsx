import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AuditOutlined, CalculatorOutlined, ContainerOutlined, DashboardTwoTone, DeleteOutlined, DollarCircleOutlined, FileTextOutlined, FundProjectionScreenOutlined, FundViewOutlined, PartitionOutlined, SolutionOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons/lib';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { ROUTES } from "../../contents/routes";

export function Sidebar() {
	// console.log(window.location.pathname)




	const [openkeys, setopenkeys] = useState<any>('')
	useEffect(() => {
		//fetchpartnerProfile();
		setpathValue(window.location.pathname.slice(1));
		if (window.location.pathname.slice(1) === '') {
			setpathValue('dashboard')
		}
		let temp = window.location.pathname.substr(window.location.pathname.lastIndexOf("-") + 1).toString();
		// console.log(temp)
		setopenkeys(temp)
	}, []);

	const [pathValue, setpathValue] = useState<any>("1")
	const [mainpathValue, setmainpathValue] = useState<any>(null)

	// console.log(pathValue)

	//const key = window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1, location.pathname.length)
	//console.log(window.location.pathname)
	const [keys, setKeys] = useState<any>([]);
	const sideClick = (value) => {
		setpathValue(value.key)
		setKeys(value.keyPath)
		localStorage.setItem('sideBarValues', JSON.stringify(value.keyPath));
		localStorage.setItem('sideBarValuesKey', (value.key));
	}
	useEffect(() => {
		let val: any = localStorage.getItem('sideBarValues');
		let val2: any = localStorage.getItem('sideBarValuesKey');
		if (val !== null) {
			setRefresh(JSON.parse(val))
			setKeys(JSON.parse(val))
		}
		if (val2 !== null) {
			setpathValue(val2)
		}
		setView(true)
		//	console.log('here')
	}, []);

	const [refreshKeys, setRefresh] = useState<any>([]);
	const [view, setView] = useState<any>(false);

	const onOpenChange = (value) => {
		setKeys(value)
	}
	useEffect(() => {

		let val: any = localStorage.getItem('openKeys');
		if (val !== null) {
			setRefresh(JSON.parse(val))
		}
		setView(true)
	}, [])


	return <> {view && <Menu
		theme="dark"
		defaultSelectedKeys={[pathValue]}
		mode="inline"
		defaultOpenKeys={refreshKeys}
		selectedKeys={[pathValue]}
		onClick={sideClick}
		onOpenChange={onOpenChange}
		openKeys={keys}

	>

		<Menu.Item key="1" icon={<DashboardTwoTone />}>
			<Link to={ROUTES.DEFAULT} className="nav-text">Dashboard</Link>
		</Menu.Item>
		<SubMenu key={"hRAndPayroll"} icon={<PartitionOutlined />} title="HR and Payroll" >
			<SubMenu key={"employee"} icon={<PartitionOutlined />} title="Employee" >
				<Menu.Item key={ROUTES.CREATE_EMPLOYEE} icon={<UserOutlined />}>
					<Link to={ROUTES.CREATE_EMPLOYEE} className="nav-text">Create Emloyee</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.EMPLOYEE_LIST} icon={<UserOutlined />}>
					<Link to={ROUTES.EMPLOYEE_LIST} className="nav-text">Emloyee List</Link>
				</Menu.Item>
			</SubMenu>
		</SubMenu>
	</Menu>
	}
	</>

}
