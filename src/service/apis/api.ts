import request from '../index';
import fileDownload from 'js-file-download';

const apiUrl = '/api-server';
const baseUrl = '/base-server';
const financeUrl = '/finance-server';
const authUrl = '/auth-server';

// 下载模板地址
export const DOWNLOAD_TEMTEMPLATE = '/url-tmpl/';

// 上传文件
export const URL_DOWNLOADS = `%E7%94%A8%E6%88%B7%E8%B4%A6%E6%88%B7%E6%A8%A1%E6%9D%BF.xlsx`;
// export const uploadImg = `${apiUrl}/upload/img`;
export const uploadImg = `/api${apiUrl}/upload/img`;
export const URL_UPLOADUSERS = `/api${financeUrl}/subsidyTask/uploadUsers`;
export const uploadImport = (url: string, params: any) => {
  return request({
    url: url,
    params: { form: params, type: 'import' },
  });
};

// OCR识别（驾驶证/行驶证）
export const URL_OCRUPLOAD = `/api${apiUrl}/ocr/ocrUpload`

// 获取省市区数据
export const queryRegion = (params: any) => {
  return request({
    url: `${apiUrl}/region/getRegion`,
    params: { form: params },
  });
};

// 获取省市数据
export const getPprovince = (params: any) => {
  return request({
    url: `${apiUrl}/region/getPprovince`,
    params: { form: params },
  });
};

//获取省市二级树
export const queryRegionTwoTree = (params: any) => {
  return request({
    url: `${apiUrl}/region/queryRegionTwoTree`,
    params: { form: params },
  });
};

// 获取通用列表接口
const arr = [
  `${baseUrl}/user/queryUserList`,
  `${baseUrl}/channel/queryChannelList`,
  `${baseUrl}/charge/queryChargeCardList`,
  `${baseUrl}/org/queryCompanyList`,
  `${baseUrl}/label/queryLabelList`,
];
export const queryList = (url: string, params: any, pages: any) => {
  if (arr.includes(url)) {
    params = { ...params, ...pages };
  }
  return request({
    url: url,
    params: { form: params, pages: pages },
  });
};

// 导出接口
export const getExport = (url: string, name: string, params: any) => {
  request({
    url: url,
    responseType: 'blob',
    params: { form: params, export: true },
  }).then((res: any) => {
    fileDownload(res, `${name}.xlsx`);
  });
};

// 获取字典集合
export const queryDicByParent = (params: any) => {
  return request({
    url: `${apiUrl}/dicData/queryDicByParent`,
    params: { form: params },
  });
};

// 登录接口
export const login = (params: any) => {
  return request({
    url: `${authUrl}/sso/login`,
    params: { form: params, noToken: true },
  });
};

// 登录-B端登录发送短信接口
export const sendSmsCode = (params: any) => {
  return request({
    url: `${authUrl}/sso/sendSmsCode`,
    params: { form: params, errorHand: true },
  });
};

// 登录-B端登录-查询菜单Tree
export const queryMenuTree = () => {
  return request({
    url: `${authUrl}/menuButton/queryMenuTree`,
    params: { form: {} },
  });
};

// 登录-B端登录-查询按钮列表
export const queryButtonList = () => {
  return request({
    url: `${authUrl}/menuButton/queryButtonList`,
    params: { form: {} },
  });
};

// B端退出接口
export const logout = (params: any) => {
  return request({
    url: `${authUrl}/sso/logout`,
    params: { form: params, },
  });
};

// 登录-右上角切换渠道数据查询
export const selectOrgTreeData = (params: any) => {
  return request({
    url: `${baseUrl}/auth/selectOrgTreeData`,
    params: { form: params },
  });
};
