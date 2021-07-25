import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; //jscookie
//import "bootstrap/dist/css/bootstrap.css"; //bootstrap
import './PuiLoginHandleComponent.css';

const PuiLoginHandleComponent = () => {
  useEffect(() => {
    if (Cookies.get('userId') == null && Cookies.get('userPw') == null) {
      console.log("Cookie doesn't exists");
      const url = 'http://sw.perigee.kr/bw1/notfound';
      window.open(url, '_self');
    } else {
      console.log('Cookie exists');
    }
  }, []);

  Cookies.get('userId');
  Cookies.get('userPw');

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('userPw');
    link_go_back();
  };

  const link_go_back = () => {
    const url = 'http://sw.perigee.kr/bw1/login/';
    window.open(url, '_self');
  };

  return (
    <>
      <div className="loginout_btn" onClick={handleLogout}>
        <button>Logout</button>
      </div>
    </>
  );
};

export default PuiLoginHandleComponent;
