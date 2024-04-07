import axios from 'axios';
import { exit } from '@/utils/utils';
import { ElMessage } from "element-plus";

const baseURL = '/api';
let loading = reactive({
  num: 0,
  instance: null as any,
});
const qcMsgBox = (msg: string) => {
  // ElMessageBox.alert(msg, '提示', {
  //   confirmButtonText: '确认',
  //   type: 'warning',
  // });
  ElMessage({
    showClose: true,
    message: msg,
    type: 'warning',
  });
};
// 创建axios实例
const request = axios.create({
  baseURL: '', // baseURL // 所有的请求地址前缀部分(没有后端请求不用写)
  timeout: 60000, // 请求超时时间(毫秒)
  method: 'POST',
  // withCredentials: true, // 异步请求携带cookie
  headers: {
    'Content-Type': 'application/json',
    token: window.localStorage.getItem('token') || '',
    channelId: window.localStorage.getItem('channelId') || '',
    orgId: window.localStorage.getItem('orgId') || '',
    encryptFlag: 'N',
  },
});

// request拦截器
// config.params: { 
// form: 请求参数
// pages：分页信息
// isLoading: true有请求loading , false（默认）无请求loading
// type: import 导入 , 默认 普通请求
// errorMsg：true异常提示自定义，false（默认）
// errorHand：true时异常数据返回，false（默认）
// successMsg: 成功时提示需要提示内容，有提示，无不提示；1-保存成功，2-操作成功，其他-自定义显示内容
// }
request.interceptors.request.use(
  (config) => {
    // 如果你要去localStor获取token
    // let token = localStorage.getItem("x-auth-token");
    // if (token) {
    //添加请求头
    // config.headers['Authorization'] = 'Bearer ' + token;
    // }
    if (config.params.isLoading !== false) {
      loading.num++;
      if (!loading.instance) {
        loading.instance = ElLoading.service({
          lock: true,
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
        });
      }
    }
    const tt = window.localStorage.getItem('token') || ''
    // if (!config.params.noToken && !tt) {
    //   document.location = document.location.origin;
    //   return;
    // }
    config.headers.token = config.params.noToken ? '' : tt;
    config.headers.channelId = window.localStorage.getItem('channelId') || '';
    config.headers.orgId = window.localStorage.getItem('orgId') || '';

    if (config.params.type === 'import') {
      console.log('aa----', config.headers);
      // const header: any = {
      //   'Content-Type': 'multipart/form-data',
      //   token: window.localStorage.getItem('token'),
      //   encryptFlag: 'N',
      // };
      // config.headers = header;
      config.headers['Content-Type'] = 'multipart/form-data';
      config.headers.Operation = 'import';
      console.log('bb----', config.headers);
      config.data = config.params.form;
      delete config.params;
      return config;
    }
    config.url = config.url?.includes('url-')
      ? config.url
      : `${baseURL}${config.url}`;
    config.data = {
      company: {
        token: window.localStorage.getItem('token'),
        version: '2.0',
        appId: '1.1',
        encryptFlag: 'N',
        // channelId: '1648601415276154881',
        // channelId: '1665556731594723330',
        channelId: window.localStorage.getItem('channelId') || '',
        orgId: window.localStorage.getItem('orgId') || '',
      },
      // account: {
      //   accountId: '1.1.1',
      //   accountName: '111',
      //   type: 'C',
      //   orgId: '1648290454501675009',
      //   operatorId: '111111',
      //   // channelId: '1648601415276154881',
      //   // channelId: '1665556731594723330',
      //   channelId: '',
      //   extInfo: {},
      //   filters: {},
      // },
      errorMsg: config.params.errorMsg || false, // true时异常提示自定义
      errorHand: config.params.errorHand || false, // true时异常数据返回
      isLoading: config.params.isLoading === false ? false : true, // true时有loading
      successMsg: config.params.successMsg || '',

      // body: config.params,
      data: config.params.form,
      timeStamp: '2023-03-02 15:00:00',
      nonce: '234',
      sign: '',
      export: config.params.export,
    };
    if (config.params.pages) {
      config.data.pageNo = config.params.pages.pageNo;
      config.data.pageSize = config.params.pages.pageSize;
    }
    // config.data = [];
    delete config.params;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    Promise.reject(error);
  }
);

// response 拦截器
request.interceptors.response.use(
  (response: any) => {
    return new Promise((resolve, reject) => {
      const cdata =
        response.config.data instanceof FormData
          ? { isLoading: true }
          : JSON.parse(response.config.data);
      if (cdata.isLoading) {
        loading.num--;
        if (loading.num <= 0) {
          loading.num = 0;
          if (loading.instance) {
            loading.instance.close();
            loading.instance = null;
          }
        }
      }
      if (cdata.export) {
        if (response.data.size < 300) {
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel"
          })
          const fr: any = new FileReader() // FileReader可以读取Blob内容
          fr.readAsText(blob) // 二进制转换成text
          fr.onload = function (e: any) {
            const result = fr.result ? JSON.parse(fr.result) : '' // result 转换的结果
            console.log('re----', result)
            if (result.businessCode === '104' || result.businessCode === 'notLogin') {
              ElMessageBox.alert('登录失效，请重新登录', '提示', {
                confirmButtonText: '确认',
                type: 'warning',
              }).then(() => {
                exit()
              });
            } else if (result.businessCode === '1') {
              resolve(response.data);
              ElMessage({
                showClose: true,
                message: '导出成功',
                type: 'success',
              });
            } else {
              ElMessage({
                showClose: true,
                message: result.msg || '网络异常，请稍后重试！',
                type: 'warning',
              });
            }
          }
        } else {
          resolve(response.data);
          ElMessage({
            showClose: true,
            message: '导出成功',
            type: 'success',
          });
        }
        return;
      }
      if (response.data.businessCode === '104' || response.data.businessCode === 'notLogin') {
        ElMessageBox.alert('登录失效，请重新登录', '提示', {
          confirmButtonText: '确认',
          type: 'warning',
        }).then(() => {
          exit()
        });
      } else if (response.data.businessCode === '1') {
        if (cdata.successMsg) {
          ElMessage({
            showClose: true,
            message: cdata.successMsg === '1' ? '保存成功！' : (cdata.successMsg === '2' ? '操作成功' : cdata.successMsg),
            type: 'success',
          });
        }
        if (cdata.errorHand) {
          resolve(response.data);
        } else {
          resolve(response.data.data);
        }
      } else {
        if (!cdata.errorMsg) {
          qcMsgBox(response.data.msg);
        }
        if (cdata.errorHand) {
          reject(response.data);
        }
      }
      // 对响应数据做点什么
      // return response.data;
    });
  },
  (error) => {
    if (JSON.parse(error.config.data).isLoading) {
      loading.num--;
      if (loading.num <= 0) {
        loading.num = 0;
        if (loading.instance) {
          loading.instance.close();
          loading.instance = null;
        }
      }
    }
    console.log('error---', error);
    qcMsgBox('网络异常，请稍后重试！');
    // 对响应错误做点什么
    // return Promise.reject(error);
  }
);
export default request;
