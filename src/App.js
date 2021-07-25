import React, { useEffect, useState } from "react";
import WebSocketClient from "./js/ws/WebSocketClient"; //websoket
import { observer } from "mobx-react"; //observer
import { toJS } from "mobx"; //observer tojs
import RangeSlider from "react-bootstrap-range-slider"; //slider
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css"; //slider
import Form from "react-bootstrap/Form"; //slider
import "./App.css";

const wsc = new WebSocketClient(null, 8700, "/ws", 100);
const sender_id = 460;

function App() {
  const [graphData, setGraphData] = useState();
  const [onbDataArr, setOnbDataArr] = useState([]);
  const [gfcDataArr, setgfcDataArr] = useState([]);

  // send_cmd
  const send_cmd = (target, cmd, group, check) => {
    let obj = {};
    obj["target"] = target; // bw0.1
    obj["cmd"] = cmd; // f1
    obj["group"] = group;
    obj["sender"] = sender_id;
    obj["data"] = check;

    wsc.sendMsg(JSON.stringify(obj));
  };

  // swich init data
  const DataObserver = observer(({ store }) => {
    let d = store.getLastMsg; //2021 7 8
    //console.log('data: ', toJS(d)); //proxy tojs

    if (d && d["vehicle_type"] && d["vehicle_type"] == "bw0.1") {
      //console.log('data: ', toJS(d));
      if (d["sol_status"]) {
        if (d["sol_status"]["onb"]) {
          setOnbDataArr(d["sol_status"]["onb"]);
        }
        if (d["sol_status"]["gfc"]) {
          setgfcDataArr(d["sol_status"]["gfc"]);
        }
        // if (d["graph"]) {
        //   setGraphData(d);
        // }
      }
    }

    return <></>; //옵저버 리턴 필요
  });

  //ad observer1
  const ADObserver1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver1_1
  const COMObserver1_1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver1_2
  const COMObserver1_2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ad observer2
  const ADObserver2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver2_1
  const COMObserver2_1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver2_2
  const COMObserver2_2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ad observer3
  const ADObserver3 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver3_1
  const COMObserver3_1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver3_2
  const COMObserver3_2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ad observer4
  const ADObserver4 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d3"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver4_1
  const COMObserver4_1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //COMObserver4_2
  const COMObserver4_2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>R</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>T</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["d2"].toFixed(1)} </td>
              <td width="80%">{m[idx][group][0]["d3"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //time
  const now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  setInterval(updateTime, 1000);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="inner_wrapper1">
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "NC1", //group
                            "cmd", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC2",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC3",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC4",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC5",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC6",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC7",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC8",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">NC8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">NC8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver1 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #1</div>
              <COMObserver1_1 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #2</div>
              <COMObserver1_2 store={wsc.store} group="1" />
            </div>
          </div>
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "GFC1", //group
                            "cmd", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "GFC2",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "GFC3",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC4",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC5",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC6",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC7",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "NC8",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">GFC8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">GFC8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver2 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #1</div>
              <COMObserver2_1 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #2</div>
              <COMObserver2_2 store={wsc.store} group="1" />
            </div>
          </div>
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "A1", //group
                            "cmd", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "A2",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "A3",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "A4",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "A5",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "A6",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "A7",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "A8",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">A8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">A8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver3 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #1</div>
              <COMObserver3_1 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #2</div>
              <COMObserver3_2 store={wsc.store} group="1" />
            </div>
          </div>
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "B1", //group
                            "cmd", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "B2",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "B3",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "B4",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "B5",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "B6",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "B7",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "B8",
                            "cmd",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">B8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">B8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver4 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #1</div>
              <COMObserver4_1 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">com I/O #2</div>
              <COMObserver4_2 store={wsc.store} group="1" />
            </div>
          </div>
        </div>
        <div className="inner_wrapper2">
          <div className="status-bar-name">
            <label>title</label>
          </div>
          <div className="status-bar-timer">{time}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
