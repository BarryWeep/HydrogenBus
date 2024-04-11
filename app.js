const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));


const MainPageRoutes = require('./MainPage/MainPage');
app.use(MainPageRoutes);


const CompanyProfileRoutes = require('./CompanyProfile/CompanyProfile');
app.use(CompanyProfileRoutes);

const BusTrackInterfaceRoutes = require('./BusTrackInterface/BusTrackInterface');
app.use(BusTrackInterfaceRoutes);

const ContactRoutes = require('./Contact/Contact');
app.use(ContactRoutes);

const HydrogenBusProfileRoutes = require('./HydrogenBusProfile/HydrogenBusProfile');
app.use(HydrogenBusProfileRoutes);


const PrivacyPolicyRoutes = require('./PrivacyPolicy/PrivacyPolicy');
app.use(PrivacyPolicyRoutes);

const ServiceRoutes = require('./Service/Service');
app.use(ServiceRoutes);

const TermAndConditionRoutes = require('./TermAndCondition/TermAndCondition');
app.use(TermAndConditionRoutes);

const FeedbackRoutes = require('./Feedback/Feedback');
app.use(FeedbackRoutes);

const SendInformTableRoutes = require('./SendInformTable/SendInformTable');
app.use(SendInformTableRoutes);



let ws;
let retryInterval = 2000; // 重连间隔时间，例如 2000 毫秒
let maxRetries = 10; // 最大重试次数
let retries = 0; // 当前重试次数
const apiKey = '299a656d-7a94-4ca1-832e-f75ed1da76bd';
const sdkUrl = `wss://sdk.viriciti.com/api/v2/live?apiKey=${apiKey}`;

function connectWebSocket() {
  ws = new WebSocket(sdkUrl, {
    headers: {
      'x-api-key': apiKey
    }
  });

  ws.on('open', () => {
    console.log('WebSocket connection opened');
    ws.send(JSON.stringify({
      'vehicles': {
        'arcc_004': ['gps', 'speed', 'odo', 'soc', 'power', 'energy_used_per_day']
      }
    }));
    retries = 0; // 成功连接后重置重试次数
  });

  ws.on('message', (data) => {
    io.emit('update_data', JSON.parse(data));
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    // 如果连接关闭且没有达到最大重试次数，则尝试重连
    if (retries < maxRetries) {
      setTimeout(() => {
        console.log('尝试重新连接...');
        connectWebSocket();
        retries++;
      }, retryInterval);
    } else {
      console.log('已达到最大重连次数，停止重连尝试');
    }
  });
}

// 初始连接
connectWebSocket();

// 服务器设置
server.listen(3000, () => {
  console.log('Server running on port 3000');
});