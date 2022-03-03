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
import EmployeeList from "./container/pages/employee/EmployeeList";
import CreateDesignation from "./container/pages/generalSettings/CreateDesignation";
import CreateEmployeeType from "./container/pages/generalSettings/CreateEmployeeType";
import CreateShift from "./container/pages/generalSettings/CreateShift";
import CreateDeduction from "./container/pages/generalSettings/CreateDeduction";
import CreateLeaveCategory from "./container/pages/generalSettings/CreateLeaveCategory";
import CreateCompany from "./container/pages/generalSettings/CreateCompany";
import CreateFinancialYear from "./container/pages/generalSettings/CreateFinancialYear";
import CreateDepartment from "./container/pages/generalSettings/CreateDepartment";
import CreateHoliday from "./container/pages/generalSettings/CreateHoliday";
import CreateEmployeeByExcel from "./container/pages/employee/CreateEmployeeByExcel";


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
            <img src={logo} style={{height:58, width:200}} />
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
            <Route exact path={'/' +ROUTES.CREATE_EMPLOYEE} component={CreateEmployee} />
            <Route exact path={'/' +ROUTES.EMPLOYEE_LIST} component={EmployeeList} />
            <Route exact path={'/' +ROUTES.CREATE_DESIGNATION} component={CreateDesignation} />
            <Route exact path={'/' +ROUTES.CREATE_EMPLOYEE_ADD} component={CreateEmployeeType} />
            <Route exact path={'/' +ROUTES.CREATE_SHIFT} component={CreateShift} />
            <Route exact path={'/' +ROUTES.CREATE_DEDUCTION} component={CreateDeduction} />
            <Route exact path={'/' +ROUTES.CREATE_LEAVE_CATEGORY} component={CreateLeaveCategory} />
            <Route exact path={'/' +ROUTES.CREATE_COMPANY} component={CreateCompany} /> 
            <Route exact path={'/' +ROUTES.CREATE_DEPARTMENT} component={CreateDepartment} /> 
            <Route exact path={'/' +ROUTES.CREATE_HOLIDAY} component={CreateHoliday} /> 
            <Route exact part={'/' +ROUTES.CREATE_EMPLOYEE_EXCEL} component={CreateEmployeeByExcel} />
            
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', padding:"15px" }}>
          &copy; Copyright {year} <Link to="https://shebadigital.com/" style={{ color: "#00CA88" }}>Sheba Digital Limited</Link> | Part of Sheba Group.
        </Footer>
      </Layout>
    </Layout>
  );
}
