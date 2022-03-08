import React, { useEffect } from 'react';
import { useStoreActions, Actions } from "easy-peasy";
import { StoreModel } from "./store/store";
import { Button, Card, Col, List, Popover, Row, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { KeyOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useStoreState } from './store/hooks/easyPeasy';
import { Link } from "react-router-dom";
import containerBG from "../../src/assets/images/sp_logo.png";

export default function TopNavBar(props: any) {

  var isMobile = false; //initiate as false
  if (
    /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
  ) {
    isMobile = true;
  }

  const logout = useStoreActions(
    (actions: Actions<StoreModel>) => actions.auth.logout
  );
  const logoutclear = useStoreActions(
    (actions: Actions<StoreModel>) => actions.auth.logoutclear
  );

  const user = useStoreState(state => state.auth.user)

  const logoutfunc = () => {
    logoutclear(user?.access_token);
    logout("");
  }

  const toggleValueChange = (val) => { 
    return val;
  }

  useEffect(function(){
    let topHeaderWidth:any = document.getElementById('topFixedBar');
    const div = document.querySelector('#mySider'); 
    let check =   div?.classList.contains('ant-layout-sider-collapsed');
    if (!isMobile) {
      if(check == true){
        topHeaderWidth?.classList.remove("menu-open");
        topHeaderWidth?.classList.add("menu-close");
      }else{
        topHeaderWidth?.classList.remove("menu-close");
        topHeaderWidth?.classList.add("menu-open");
      }
    }else{
      topHeaderWidth?.classList.add("menu-mobile");
      topHeaderWidth?.classList.remove("menu-close");
        topHeaderWidth?.classList.remove("menu-open");
    }
  }, [toggleValueChange])

  const profilePopover = (onLogout, userData) => (
    <div
      style={{ width: 300 }}
      className="topbarDropDown"
    >
      <div className="profile-sort-details-wrapper">
          <div className="profile-image">
              <img src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png" alt="" />
          </div>
          <div className="user-name text-center">
              <h4>Name</h4>
              <span>Email</span>
          </div>
          <ul>
            <li className="headerDrop"><Link to="/test" style={{ display:'flex', justifyContent:'flex-start', alignItems: 'center' }} ><KeyOutlined /> <div>Change Password</div></Link></li>
            <li className="headerDrop" onClick={onLogout}><div><LogoutOutlined /> <span>Logout</span></div></li>
          </ul>
      </div>
    </div>
  );
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="insInfo" style={{ width: window.screen.width - 70, display: 'flex', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", alignItems: "center" }}>
          {React.createElement(props.value.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggleValueChange(props.value.toggle),
            style: { marginLeft: 2, marginRight: 2, fontSize: 20, color: "#fff" },
          })}
          {isMobile && props.value.collapsed &&
            <>
              <Avatar
                size={{ xs: 35, sm: 35, md: 35, lg: 35, xl: 40, xxl: 45 }}
                src={containerBG}
                style={{ marginLeft: 10 }}
              />
              <span className='instiute-name' style={{ fontSize: isMobile ? 14 : 18, fontWeight: "bold", color: 'white', textTransform: "uppercase", letterSpacing: isMobile ? 0 : 1, marginLeft: 2 }}>Sheba Hr</span>
            </>
          }
          {isMobile && !props.value.collapsed &&
            <>
              {React.createElement(props.value.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggleValueChange(props.value.toggle),
                style: { marginLeft: 2, marginRight: 2, fontSize: 25, fontWeight: 'bold', color: "#fff", right: 70, position: "absolute" },
              })}
            </>
          }
          {!isMobile &&
            <>
              <Avatar
                size={{ xs: 35, sm: 35, md: 35, lg: 35, xl: 40, xxl: 45 }}
                src={containerBG}
                style={{ marginLeft: 10 }}
              />
              <span style={{ fontSize: isMobile ? 14 : 18, fontWeight: "bold", color: 'white', textTransform: "uppercase", letterSpacing: isMobile ? 0 : 1, marginLeft: 5 }}>Sheba Hr</span>
            </>
          }
        </div>

        <div>
          <Popover
            content={profilePopover(logoutfunc, user)}
            placement="bottomLeft"
            trigger="click"
          >
            <Avatar
              icon={<UserOutlined />}
              size="large"
              style={{ marginRight: 5 }}
              className="pointer topUserImage"
            />
          </Popover>
        </div>
      </div>

    </>
  );
}