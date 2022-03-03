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
import EmployeeList from "./container/pages/employee/EmployeeList";


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
            <Route exact path={'/' +ROUTES.SETTINGS_PAYROLL_GRADE} component={SalaryGrade} />
            <Route exact path={'/' +ROUTES.SETTINGS_PAYROLL_ADDITION} component={HeadAddition} />
            <Route exact path={'/' +ROUTES.SETTINGS_PAYROLL_DEDUCTION} component={HeadDeduction} />
            <Route exact path={'/' +ROUTES.CONFIGURE_PAYROLL_GRADE} component={SalaryGradeConfigure} />
            <Route exact path={'/' +ROUTES.EMPLOYEE_LIST} component={EmployeeList} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', padding:"15px" }}>
          &copy; Copyright {year} <Link to="https://shebadigital.com/" style={{ color: "#00CA88" }}>Sheba Digital Limited</Link> | Part of Sheba Group.
        </Footer>
      </Layout>
    </Layout>
  );
}
