'use strict';
/**
 * Created By zh on 2019-06-12
 */
const fs = require('fs');
const PdfPrinter = require('pdfmake');

// 引入字体
const fonts = {
  sourceHan: {
    normal: './fonts/Source-Han.otf'
  },
  PingFangSC: {
    normal: './fonts/PingFang-SC-Regular.ttf',
    bold: './fonts/PingFang-SC-Bold.ttf'
  }
};

// 创建实例
const printer = new PdfPrinter(fonts);

const FONT_COLOR = '#5E5E5E';
const LINE_COLOR = '#EDEEF2';
const TABLE_HEAD_COLOR = '#6E6E6E';

// 全局样式
const defaultStyle = {
  font: 'PingFangSC',
  fontSize: 10,
  color: FONT_COLOR,
  lineHeight: 1.2
};

//  水印
const watermark = {
  text: '     隐私信息管理平台     ',
  color: '#EEE',
  opacity: 0.5,
  bold: true
};

// 预置样式
const styles = {
  tableTitle: {fontSize: 20, margin: [0, 20, 0, 10], bold: true},
  tableHeader: {bold: true, fontSize: 12, color: TABLE_HEAD_COLOR},
  dangerLabel: {lineHeight: 1, color: '#F14D58', background: '#F2E6E7'},
  dangerText: {lineHeight: 1, color: '#F14D58'},
  safeLabel: {lineHeight: 1, color: '#34BA3B', background: '#E1F8E9'},
  safeText: {lineHeight: 1, color: '#34BA3B'}
};

// 表格样式
const tableLayout = {
  hLineWidth(i, node) {
    return 1;
  },
  vLineWidth(i, node) {
    return 1;
  },
  hLineColor(i, node) {
    return LINE_COLOR;
  },
  vLineColor(i, node) {
    return LINE_COLOR;
  },
  paddingLeft(i, node) {
    return 5;
  }
};

// 标题
const titleIntro = {
  text: '小米隐私信息管理平台',
  fontSize: 28,
  bold: true,
  alignment: 'center'
};

// 标题图标
const titleImage = {
  image: './images/mi-logo.png',
  width: 40,
  absolutePosition: {x: 98, y: 40}
};

// 报告名
const titleLineY = 10;
const titleText = {
  text: '隐私检测报告',
  fontSize: 38,
  alignment: 'center',
  margin: [0, titleLineY]
};

// 标题分割线
const titleLine = {
  canvas: [
    {
      type: 'line',
      x1: 0,
      y1: titleLineY,
      x2: 500,
      y2: titleLineY,
      lineColor: LINE_COLOR
    }
  ],
  margin: [0, 0, 0, 20]
};

// 概览信息
const data = {
  id: '0de3a12b-20190611174750',
  name: '浏览器',
  appVersion: '8.9.2',
  deviceName: 'chiron',
  miuiVersion: 'MIUI 9 SPT-2019.05.15',
  developer: '马化腾'
};

const id = `编号: ${data.id}`;
const name = `软件名称: ${data.name}`;
const appVersion = `版本号: ${data.appVersion}`;
const deviceName = `测试机型: ${data.deviceName}`;
const miuiVersion = `操作系统: ${data.miuiVersion}`;
const developer = `开发者: ${data.developer}`;

const overview = [id, name, appVersion, deviceName, miuiVersion, developer];

// 隐私信息检测标题
const privacyDetailTitle = {
  text: '隐私信息将策详情',
  style: 'tableTitle'
};

// 隐私信息监测表格-表头
const privacyDetailTableHeader = [
  {text: '检测项', style: 'tableHeader'},
  {text: '是否读取', style: 'tableHeader'},
  {text: '是否上传', style: 'tableHeader'},
  {text: '是否明文上传', style: 'tableHeader'},
  {text: '检测结果', style: 'tableHeader'}
];

// 隐私信息监测表格-数据
const temp1 = Array.from({length: 15}, () => ['IMEI', '是', '是', '否', {text: '风险', style: 'dangerLabel'}]);
const temp2 = Array.from({length: 8}, () => ['AndroidID', '是', '是', '否', {text: '无风险', style: 'safeLabel'}]);
const privacyDetailTableBody = [...temp1, ...temp2];

// 隐私信息监测表格
const privacyDetailTable = {
  table: {
    headerRows: 1,
    widths: ['*', '*', '*', '*', '*'],
    body: [privacyDetailTableHeader, ...privacyDetailTableBody]
  },
  layout: tableLayout
};

// 权限使用标题
const permissionDetailTitle = {
  text: '权限使用详情',
  style: 'tableTitle'
};

// 权限使用表格-表头
const permissionDetailTableHeader = [
  {text: '权限项', style: 'tableHeader'},
  {text: '权限表示', style: 'tableHeader'},
  {text: '权限项类型', style: 'tableHeader'},
  {text: '是否声明', style: 'tableHeader'}
];

// 权限使用表格-数据
const temp3 = Array.from({length: 15}, () => [
  '访问日历',
  'android.permission.READ_CALENDAR',
  {text: '风险权限', style: 'dangerText'},
  {text: '否', style: 'dangerLabel'}
]);
const temp4 = Array.from({length: 8}, () => [
  '对希望访问通知政策的应用程序的标记许可',
  'android.permission.android.permission.ACCESS_COARSE_LOCATION',
  {text: '普通权限', style: ''},
  {text: '是', style: 'safeLabel'}
]);
const permissionDetailTableBody = [...temp3, ...temp4];

// 权限使用表格
const permissionDetailTable = {
  table: {
    headerRows: 1,
    widths: [100, 220, 78, 78],
    body: [permissionDetailTableHeader, ...permissionDetailTableBody]
  },
  layout: tableLayout
};

// 参数对象
const docDefinition = {
  content: [
    titleImage,
    titleIntro,
    titleText,
    titleLine,
    overview,
    privacyDetailTitle,
    privacyDetailTable,
    permissionDetailTitle,
    permissionDetailTable
  ],
  defaultStyle,
  styles,
  watermark
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);

pdfDoc.pipe(fs.createWriteStream(`document-${Date.now()}.pdf`));
pdfDoc.end();
