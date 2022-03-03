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
				<Menu.Item key={ROUTES.CREATE_EMPLOYEE_EXCEL} icon={<UserOutlined />}>
					<Link to={ROUTES.CREATE_EMPLOYEE_EXCEL} className="nav-text">Create Emloyee By Excel</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.EMPLOYEE_LIST} icon={<UserOutlined />}>
					<Link to={ROUTES.EMPLOYEE_LIST} className="nav-text">Emloyee List</Link>
				</Menu.Item>
			</SubMenu>
		</SubMenu>		
		<SubMenu key={"payrollMenu"} icon={<PartitionOutlined />} title="Payroll" >
			<SubMenu key={"payrollSetiings"} icon={<PartitionOutlined />} title="Settings" >
				<Menu.Item key={ROUTES.SETTINGS_PAYROLL_GRADE} icon={<UserOutlined />}>
					<Link to={ROUTES.SETTINGS_PAYROLL_GRADE} className="nav-text">Grade</Link>
				</Menu.Item>				
				<Menu.Item key={ROUTES.SETTINGS_PAYROLL_ADDITION} icon={<UserOutlined />}>
					<Link to={ROUTES.SETTINGS_PAYROLL_ADDITION} className="nav-text">Addition</Link>
				</Menu.Item>				
				<Menu.Item key={ROUTES.SETTINGS_PAYROLL_DEDUCTION} icon={<UserOutlined />}>
					<Link to={ROUTES.SETTINGS_PAYROLL_DEDUCTION} className="nav-text">Deduction</Link>
				</Menu.Item>
			</SubMenu>			
			<SubMenu key={"payrollConfigure"} icon={<PartitionOutlined />} title="Configure" >
				<Menu.Item key={ROUTES.CONFIGURE_PAYROLL_GRADE} icon={<UserOutlined />}>
					<Link to={ROUTES.CONFIGURE_PAYROLL_GRADE} className="nav-text">Grade</Link>
				</Menu.Item>				

			</SubMenu>
		</SubMenu>
		<SubMenu key={"generalSetting"} icon={<PartitionOutlined />} title="General Settings" >
			<Menu.Item key={ROUTES.CREATE_COMPANY} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_COMPANY} className="nav-text">Create Company</Link>
			</Menu.Item>
			<Menu.Item key={ROUTES.CREATE_FINANCIAL_YEAR} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_FINANCIAL_YEAR} className="nav-text">Create Financial Year</Link>
			</Menu.Item>
			<Menu.Item key={ROUTES.CREATE_DEPARTMENT} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_DEPARTMENT} className="nav-text">Create Department</Link>
			</Menu.Item>
			<Menu.Item key={ROUTES.CREATE_DESIGNATION} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_DESIGNATION} className="nav-text">Create Designation</Link>
			</Menu.Item>
			<Menu.Item key={ROUTES.CREATE_EMPLOYEE_ADD} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_EMPLOYEE_ADD} className="nav-text">Add Employee</Link>
			</Menu.Item>
			<Menu.Item key={ROUTES.CREATE_SHIFT} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_SHIFT} className="nav-text">Create Shift</Link>
			</Menu.Item> 
			<Menu.Item key={ROUTES.CREATE_DEDUCTION} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_DEDUCTION} className="nav-text">Create Deduction</Link>
			</Menu.Item>
			<Menu.Item key={ROUTES.CREATE_LEAVE_CATEGORY} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_LEAVE_CATEGORY} className="nav-text">Create Leave Category</Link>
			</Menu.Item>
			<Menu.Item key={ROUTES.CREATE_HOLIDAY} icon={<UserOutlined />}>
				<Link to={ROUTES.CREATE_HOLIDAY} className="nav-text">Create Holiday</Link>
			</Menu.Item>
		</SubMenu>
	</Menu>
	}
	</>

}
