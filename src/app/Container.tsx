import { Layout, Menu, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useStoreActions, useStoreState } from "./store/hooks/easyPeasy";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { ROUTES } from "./contents/routes";
import TopNavBar from "./topNavbar";
import { Sidebar } from "./layouts/sidebar/Sidebar";
import { Link } from "react-router-dom";

import Dashboard from './container/pages/dashboard/Dashboard.page';

import logo from "../assets/images/sdl.png";

import { Footer } from "antd/lib/layout/layout";
import CreateEmployee from "./container/pages/employee/CreateEmployee";
import SalaryGrade from "./container/pages/payroll/Settings/SalaryGrade.page";
import HeadAddition from "./container/pages/payroll/Settings/HeadAddition.page";
import HeadDeduction from "./container/pages/payroll/Settings/HeadDeduction.page";
import SalaryGradeConfigure from "./container/pages/payroll/Configure/SalaryGradeConfigure.page";
import EmployeeSalaryGradeAssign from "./container/pages/payroll/Configure/EmployeeSalaryGradeAssign.page";
import EmployeeList from "./container/pages/employee/EmployeeList";
import SalaryProcess from "./container/pages/payroll/Salary/SalaryProcess.page";
import SalaryProcessList from "./container/pages/payroll/Salary/SalaryProcessList.page";
import SalarySlip from "./container/pages/payroll/Salary/SalarySlip.page";
import CreateDesignation from "./container/pages/generalSettings/CreateDesignation";
import CreateEmployeeType from "./container/pages/generalSettings/CreateEmployeeType";
import CreateShift from "./container/pages/generalSettings/CreateShift";
import CreateDeduction from "./container/pages/generalSettings/CreateDeduction";
import CreateLeaveCategory from "./container/pages/generalSettings/CreateLeaveCategory";
import CreateLeaveConfig from "./container/pages/generalSettings/CreateLeaveConfig";
import CreateCompany from "./container/pages/generalSettings/CreateCompany";
import CreateDutyStation from "./container/pages/generalSettings/CreateDutyStation";
import CreateFinancialYear from "./container/pages/generalSettings/CreateFinancialYear";
import CreateDepartment from "./container/pages/generalSettings/CreateDepartment";
import CreateHoliday from "./container/pages/generalSettings/CreateHoliday";
import CreateEmployeeByExcel from "./container/pages/employee/CreateEmployeeByExcel";
import EmployeeInformation from "./container/pages/employee/EmployeeInformation";
import LeaveAssign from "./container/pages/generalSettings/LeaveAssign";
import UpdateCompany from "./container/pages/generalSettings/UpdateCompany";
import StaffTimeConfig from "./container/pages/generalSettings/StaffTimeConfig";
import TakeAttendanceSave from "./container/pages/attendance/TakeAttendanceSave";
import UpdateAttendance from "./container/pages/attendance/UpdateAttendance";
import BankAdviseContent from "./container/pages/payroll/BankAdviseContent";
import BankAdviseView from "./container/pages/payroll/BankAdviseView";
import EmployeeAssignDesignation from "./container/pages/employee/EmployeeAssignDesignation";
import EmployeeBankInfo from "./container/pages/employee/EmployeeBankInfo";
import DeviceProcess from "./container/pages/devices/DeviceProcess";
import EmployeeIdMappingWrapper from "./container/pages/attendance/EmployeeIdMappingWrapper";
import HolidayWrapper from "./container/pages/attendance/holiday/HolidayWrapper";
import EmployeeAttendanceDateWiseReport from "./container/pages/attendance/EmployeeAttendanceDateWiseReport";
import EmployeeAttendanceMonthWiseReport from "./container/pages/attendance/EmployeeAttendanceMonthWiseReport";
import LeaveApply from "./container/pages/generalSettings/LeaveApply";
import LeavePendingList from "./container/pages/generalSettings/LeavePendingList";
import EmployeeSelfAttendanceDetails from "./container/pages/generalSettings/EmployeeSelfAttendanceDetails";
import RemarksList from "./container/pages/generalSettings/RemarksList";
import CompanyList from "./container/pages/superAdmin/CompanyList";
import CompanyJump from "./container/pages/superAdmin/CompanyJump";
import Profile from './container/pages/signup/Profile.page';
import Users from "./container/pages/user/Users";

const { Header, Content, Sider } = Layout;
// Application
export default function Container() {
  const user = useStoreState((state) => state.auth.user);
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);
  var isMobile = false; //initiate as false
  if (
    /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
  ) {
    isMobile = true;
  }
  const onCollapse = (collapsed) => {
    //console.log("hello")
    //console.log(collapsed);
    setCollapsed(collapsed);
  };
  const d = new Date();
  let year = d.getFullYear();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        id="mySider"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        trigger={null}
        collapsedWidth={isMobile ? 0 : 80}
        width="230"
        style={{
          height: "100vh",
          overflow: "auto",
          position: isMobile ? "fixed" : "sticky",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="logo">
          {!collapsed && (
            <>
            <img src={logo} />
            </>
          )}
          {collapsed && (
            <div style={{ marginLeft: 15 }}>
              <AppstoreOutlined />
            </div>
          )}
          {/* {!collapsed && <span style={{color:"white", fontSize:12}}> {user?.instituteName}</span>} */}
        </div>
        {user && (
          <div className="sidebar-wrapper" id="style-4">
            {" "}
            <Sidebar />
          </div>
        )}
      </Sider>
      <Layout className="site-layout">
      <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1}} id="topFixedBar">
        {/* <Header className="site-layout-background"> */}
          <TopNavBar value={{ collapsed: collapsed, toggle: toggle }} />
        </Header>
        <Content className="p-15" style={{ marginTop: "64px" }}>
        {/* <Content className="p-15"> */}
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path={'/' +ROUTES.CREATE_EMPLOYEE} component={CreateEmployee} />
            <Route exact path={'/' +ROUTES.SETTINGS_PAYROLL_GRADE} component={SalaryGrade} />
            <Route exact path={'/' +ROUTES.SETTINGS_PAYROLL_ADDITION} component={HeadAddition} />
            <Route exact path={'/' +ROUTES.SETTINGS_PAYROLL_DEDUCTION} component={HeadDeduction} />
            <Route exact path={'/' +ROUTES.CONFIGURE_PAYROLL_GRADE} component={SalaryGradeConfigure} />
            <Route exact path={'/' +ROUTES.CONFIGURE_EMPLOYEE_GRADE} component={EmployeeSalaryGradeAssign} />
            <Route exact path={'/' +ROUTES.SALARY_PROCESS_PAYROLL} component={SalaryProcess} />
            <Route exact path={'/' +ROUTES.SALARY_PROCESS_LIST} component={SalaryProcessList} />
            <Route exact path={'/' +ROUTES.SALARY_SLIP} component={SalarySlip} />
            <Route exact path={'/' +ROUTES.EMPLOYEE_LIST} component={EmployeeList} />
            <Route exact path={'/' +ROUTES.CREATE_DESIGNATION} component={CreateDesignation} />
            <Route exact path={'/' +ROUTES.CREATE_EMPLOYEE_ADD} component={CreateEmployeeType} />
            <Route exact path={'/' +ROUTES.CREATE_SHIFT} component={CreateShift} />
            <Route exact path={'/' +ROUTES.CREATE_DEDUCTION} component={CreateDeduction} />
            <Route exact path={'/' +ROUTES.CREATE_LEAVE_CATEGORY} component={CreateLeaveCategory} />
            <Route exact path={'/' +ROUTES.CREATE_LEAVE_CONFIG} component={CreateLeaveConfig} />
            <Route exact path={'/' +ROUTES.CREATE_COMPANY} component={CreateCompany} /> 
            <Route exact path={'/' +ROUTES.UPDATE_COMPANY} component={UpdateCompany} /> 
            <Route exact path={'/' +ROUTES.CREATE_DEPARTMENT} component={CreateDepartment} /> 
            <Route exact path={'/' +ROUTES.CREATE_HOLIDAY} component={CreateHoliday} /> 
            <Route exact path={'/' +ROUTES.CREATE_DUTY_STATION} component={CreateDutyStation} /> 
            <Route exact path={'/' +ROUTES.CREATE_EMPLOYEE_EXCEL} component={CreateEmployeeByExcel} /> 
            <Route exact path={'/' +ROUTES.EMPLOYEE_INFORMATION} component={EmployeeInformation} /> 
            <Route exact path={'/' +ROUTES.LEAVE_ASSIGN} component={LeaveAssign} /> 
            <Route exact path={'/' +ROUTES.EMPLOYEE_ATTENDANCE_CONFIG} component={StaffTimeConfig} /> 
            <Route exact path={'/' +ROUTES.TAKE_ATTENDANCE} component={TakeAttendanceSave} /> 
            <Route exact path={'/' +ROUTES.UPDATE_ATTENDANCE} component={UpdateAttendance} /> 
            <Route exact path={'/' +ROUTES.BANK_ADVISE_CONTENT} component={BankAdviseContent} /> 
            <Route exact path={'/' +ROUTES.BANK_ADVISE_VIEW} component={BankAdviseView} /> 
            <Route exact path={'/' +ROUTES.EMPLOYEE_ASSIGN_DESIGNATION} component={EmployeeAssignDesignation} /> 
            <Route exact path={'/' +ROUTES.EMPLOYEE_BANK_INFO} component={EmployeeBankInfo} /> 
            <Route exact path={'/' +ROUTES.DEVICE_PROCESS} component={DeviceProcess} /> 
            <Route exact path={'/' +ROUTES.ID_MAPPING} component={EmployeeIdMappingWrapper} /> 
            <Route exact path={'/' + ROUTES.HOLIDAY} component={HolidayWrapper} />
            <Route exact path={'/' + ROUTES.HR_REPORT_DATE_WISE} component={EmployeeAttendanceDateWiseReport} />
            <Route exact path={'/' + ROUTES.HR_REPORT_MONTH_WISE} component={EmployeeAttendanceMonthWiseReport} />
            <Route exact path={'/' + ROUTES.APPLY_LEAVE} component={LeaveApply} />
            <Route exact path={'/' + ROUTES.LEAVE_PENDING} component={LeavePendingList} />
            <Route exact path={'/' + ROUTES.EOMPLOYEE_ATTENDNACE} component={EmployeeSelfAttendanceDetails} />
            <Route exact path={'/' + ROUTES.EOMPLOYEE_REMARKS} component={RemarksList} />
            <Route exact path={'/' + ROUTES.COMPANY_LIST} component={CompanyList} />
            <Route exact path={'/' + ROUTES.JUMP_COMPANY} component={CompanyJump} />
            <Route exact path={'/' + ROUTES.USER_LIST} component={Users} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', padding:"15px" }}>
          &copy; Copyright {year} <Link to="https://shebadigital.com/" style={{ color: "#00CA88" }}>Sheba Digital Limited</Link> | Part of Sheba Group.
        </Footer>
      </Layout>
    </Layout>
  );
}
