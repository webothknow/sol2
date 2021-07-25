// import React, { useEffect, useState } from 'react';
// import WebSocketClient from './ws/WebSocketClient'; //websocket
// import { observer } from 'mobx-react'; //observer

// const wsc = new WebSocketClient(null, 8700, '/ws', 100);

// const PuiWebSocketStatusComponent = () => {
//   useEffect(() => {}, []);

//   const WebSocketStatusObserver = observer(({ wsc, send_cmd }) => {
//     if (wsc.status == 'CONNECTED') {
//       send_cmd('cntl', 'graph_init');
//       setInterval(() => {
//         send_cmd('cntl', 'title_data');
//       }, 1000);
//     }
//     return <div />;
//   });

//   return (
//     <>
//       <WebSocketStatusObserver wsc={wsc} />
//     </>
//   );
// };

// export default PuiWebSocketStatusComponent;
