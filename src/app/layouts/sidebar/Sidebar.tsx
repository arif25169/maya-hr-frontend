import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AuditOutlined, CalculatorOutlined, DashboardTwoTone, DeleteOutlined, DollarCircleOutlined, FileTextOutlined, FundProjectionScreenOutlined, FundViewOutlined, PartitionOutlined, SolutionOutlined, UserAddOutlined, ContainerOutlined  } from '@ant-design/icons/lib';
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
		<SubMenu key={"generalSetting"} icon={<PartitionOutlined />} title="General Settings" >
			{/* <Menu.Item key={ROUTES.CREATE_COMPANY} icon={<ContainerOutlined  />}>
				<Link to={ROUTES.CREATE_COMPANY} className="nav-text">Create Company</Link>
			</Menu.Item> */}
			<Menu.Item key={ROUTES.UPDATE_COMPANY} icon={<ContainerOutlined  />}>
				<Link to={ROUTES.UPDATE_COMPANY} className="nav-text">Update Company</Link>
			</Menu.Item>
			{/* <Menu.Item key={ROUTES.CREATE_FINANCIAL_YEAR} icon={<ContainerOutlined  />}>
				<Link to={ROUTES.CREATE_FINANCIAL_YEAR} className="nav-text">Financial Year</Link>
			</Menu.Item> */}
			{/* <Menu.Item key={ROUTES.CREATE_DEDUCTION} icon={<ContainerOutlined  />}>
				<Link to={ROUTES.CREATE_DEDUCTION} className="nav-text">Create Deduction</Link>
			</Menu.Item> */}
		</SubMenu>
		<SubMenu key={"hRAndPayroll"} icon={<PartitionOutlined />} title="Employee Profile" >
			<SubMenu key={"employeeSetting"} icon={<PartitionOutlined />} title="Settings" >
				<Menu.Item key={ROUTES.CREATE_DEPARTMENT} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_DEPARTMENT} className="nav-text">Department</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.CREATE_DESIGNATION} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_DESIGNATION} className="nav-text">Designation</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.CREATE_EMPLOYEE_ADD} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_EMPLOYEE_ADD} className="nav-text">Employee Type</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.CREATE_SHIFT} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_SHIFT} className="nav-text">Shift</Link>
				</Menu.Item>
			</SubMenu>
			<SubMenu key={"employee"} icon={<PartitionOutlined />} title="Registration" >
				{/* <Menu.Item key={ROUTES.CREATE_EMPLOYEE} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_EMPLOYEE} className="nav-text">Single</Link>
				</Menu.Item> */}
				<Menu.Item key={ROUTES.CREATE_EMPLOYEE_EXCEL} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_EMPLOYEE_EXCEL} className="nav-text">Bulk</Link>
				</Menu.Item>

				<Menu.Item key={ROUTES.EMPLOYEE_LIST} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.EMPLOYEE_LIST} className="nav-text">Employee List</Link>
				</Menu.Item>			
				
				<Menu.Item key={ROUTES.EMPLOYEE_ASSIGN_DESIGNATION} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.EMPLOYEE_ASSIGN_DESIGNATION} className="nav-text">Assign Designation</Link>
				</Menu.Item>
				{/* <Menu.Item key={ROUTES.EMPLOYEE_INFORMATION} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.EMPLOYEE_INFORMATION} className="nav-text">Emloyee Information</Link>
				</Menu.Item> */}
			</SubMenu>
		</SubMenu>
		<SubMenu key={"attendance"} icon={<PartitionOutlined />} title="Attandance" >
			<SubMenu key={"attendanceSetting"} icon={<PartitionOutlined />} title="Settings" >

				<Menu.Item key={ROUTES.EMPLOYEE_ATTENDANCE_CONFIG} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.EMPLOYEE_ATTENDANCE_CONFIG} className="nav-text">Time Config</Link>
				</Menu.Item>

				<Menu.Item key={ROUTES.CREATE_LEAVE_CATEGORY} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_LEAVE_CATEGORY} className="nav-text">Leave Category</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.CREATE_LEAVE_CONFIG} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_LEAVE_CONFIG} className="nav-text">Leave Config</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.CREATE_HOLIDAY} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CREATE_HOLIDAY} className="nav-text">Holiday</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.LEAVE_ASSIGN} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.LEAVE_ASSIGN} className="nav-text">Leave Assign</Link>
				</Menu.Item>
			</SubMenu>
			<SubMenu key={"attendanceInput"} icon={<PartitionOutlined />} title="Input" >
				<Menu.Item key={ROUTES.TAKE_ATTENDANCE} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.TAKE_ATTENDANCE} className="nav-text">Manual</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.UPDATE_ATTENDANCE} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.UPDATE_ATTENDANCE} className="nav-text">Update</Link>
				</Menu.Item>
			</SubMenu>
		</SubMenu>
		<SubMenu key={"payrollMenu"} icon={<PartitionOutlined />} title="Payroll" >
			<SubMenu key={"payrollSetiings"} icon={<PartitionOutlined />} title="Settings" >
				<Menu.Item key={ROUTES.SETTINGS_PAYROLL_GRADE} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.SETTINGS_PAYROLL_GRADE} className="nav-text">Grade</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.SETTINGS_PAYROLL_ADDITION} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.SETTINGS_PAYROLL_ADDITION} className="nav-text">Addition</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.SETTINGS_PAYROLL_DEDUCTION} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.SETTINGS_PAYROLL_DEDUCTION} className="nav-text">Deduction</Link>
				</Menu.Item>
			</SubMenu>
			<SubMenu key={"payrollConfigure"} icon={<PartitionOutlined />} title="Configure" >
				<Menu.Item key={ROUTES.CONFIGURE_PAYROLL_GRADE} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CONFIGURE_PAYROLL_GRADE} className="nav-text">Grade</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.CONFIGURE_EMPLOYEE_GRADE} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.CONFIGURE_EMPLOYEE_GRADE} className="nav-text">Grade Assign</Link>
				</Menu.Item>
			</SubMenu>
			<SubMenu key={"salaryProcessMenu"} icon={<PartitionOutlined />} title="Salary Process" >
				<Menu.Item key={ROUTES.SALARY_PROCESS_PAYROLL} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.SALARY_PROCESS_PAYROLL} className="nav-text"> Save</Link>
				</Menu.Item>
				<Menu.Item key={ROUTES.SALARY_PROCESS_LIST} icon={<ContainerOutlined  />}>
					<Link to={ROUTES.SALARY_PROCESS_LIST} className="nav-text"> View</Link>
				</Menu.Item>
			</SubMenu>
			<Menu.Item key={ROUTES.SALARY_SLIP} icon={<ContainerOutlined  />}>
				<Link to={ROUTES.SALARY_SLIP} className="nav-text"> Salary Slip</Link>
			</Menu.Item>				
			<Menu.Item key={ROUTES.BANK_ADVISE_CONTENT} icon={<ContainerOutlined  />}>
				<Link to={ROUTES.BANK_ADVISE_CONTENT} className="nav-text"> Bank Advise Content</Link>
			</Menu.Item>			
			<Menu.Item key={ROUTES.BANK_ADVISE_VIEW} icon={<ContainerOutlined  />}>
				<Link to={ROUTES.BANK_ADVISE_VIEW} className="nav-text"> Bank Advise View</Link>
			</Menu.Item>

		</SubMenu>

	</Menu>
	}
	</>

}
