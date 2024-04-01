import { queryRegion, getPprovince, getExport } from '@/service/apis/api';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';
import { Md5 } from 'ts-md5';

export const exportFile = (url: string, name: string, params: any) => {
  getExport(url, `${name}-${dayjs(new Date()).format('YYYYMMDDHHmmss')}`, params);
}

const listToTree = (data: any) => {
  // * 先生成parent建立父子关系
  const obj = {} as any;
  data.forEach((item: any) => {
    obj[item.srId] = item;
  });
  // console.log(obj, "obj")
  const parentList = [] as any;
  data.forEach((item: any) => {
    const parent = obj[item.parentId];
    if (parent) {
      // * 当前项有父节点
      parent.children = parent.children || [];
      item.label = item.name;
      item.value = String(item.srId);
      parent.children.push(item);
    } else {
      // * 当前项没有父节点 -> 顶层
      item.label = item.name;
      item.value = String(item.srId);
      parentList.push(item);
    }
  });
  return parentList;
};

// 密码md5加密
export const getMd5 = (str: string) => {
  const md5: any = new Md5();
  md5.appendAsciiStr(str);
  return md5.end();
};
export const getRandom6 = () => {
  const random = String(Math.random() * 1000000)
  let code = String(parseInt(random) + 1000000);
  code = code.substring(1, 7);
  return code
}

// 日期格式
export const getYM = (date?: any) => {
  const time = date || new Date();
  return dayjs(time).format('YYYY-MM');
};
export const getDay = (date: any) => {
  return dayjs(date).format('YYYY-MM-DD');
};
export const getTime = (time: any) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};

// 清除缓存，并退出
export const exit = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('accountId');
  window.localStorage.removeItem('channelId');
  window.localStorage.removeItem('orgId');
  window.localStorage.removeItem('orgName');

  document.location = document.location.origin;
}

// 按钮权限
export const bntAuth = (key: string | any) => {
  if (!key) {
    return true;
  }
  const btns = window.localStorage.getItem('btnList');
  const channelId = window.localStorage.getItem('channelId');
  if (channelId) {
    if (btns?.includes(key)) {
      return true
    }
  } else {
    if (btns?.includes(`0:${key}`)) {
      return true
    }
  }
  return false;
}

// 根据日期区间，返回周期
export const getWeek = (times: any, week: any) => {
  // const st = Number(times[0].replaceAll('-', ''));
  // const et = Number(times[1].replaceAll('-', ''));
  const st = new Date(times[0]).getTime();
  const et = new Date(times[1]).getTime();
  const ww: any = cloneDeep(week);
  if ((et - st) / 1000 / 60 / 60 / 24 + 1 < 7) {
    const sw = new Date(times[0]).getDay();
    const ew = new Date(times[1]).getDay();
    if (ew >= sw) {
      ww.forEach((item: any) => {
        const num = Number(item.value) - 1;
        if (num < sw || num > ew) {
          item.disabled = true;
        }
      })
    } else {
      ww.forEach((item: any) => {
        const num = Number(item.value) - 1;
        if (!((num <= ew) || (num <= 7 && num >= sw))) {
          item.disabled = true;
        }
      })
    }
  }
  return ww;
}

// 数字转换为万单位
export const formatNumber = (num: any) => {
  // num = Number(num);
  if (Number(num) == 0 || (Number(num) > 0 && Number(num) < 10000) || (Number(num) < 0 && Number(num) > -10000)) {
    return num + '';
  } else {
    const numStr = (num / 10000).toFixed(2);
    return Number(numStr) + '万';
  }
}

// 数字转换为万单位，可自定义小数位
export const formatNumberDigit = (num: any, digit: any) => {
  if (Number(num) === 0) {
    if (digit === 0) {
      return num
    } else {
      return Number(num).toFixed(digit)
    }
  } else if ((Number(num) > 0 && Number(num) < 10000) || (Number(num) < 0 && Number(num) > -10000)) {
    return num + '';
  } else if (isNaN(Number(num))) {
    return '--'
  } else {
    const numStr = (num / 10000).toFixed(2);
    return Number(numStr) + '万';
  }
}


// 字典匹配
export const getLabel = (row: any, column: any) => {
  let obj = {} as any;
  if (column.type) {
    obj = column.dic.find((item: any) => {
      return column.type(item.value) === row[column.prop];
    });
  } else {
    obj = column.dic.find((item: any) => {
      return item.value === row[column.prop];
    });
  }
  return obj ? obj.label : '--';
};

// 字典转化
export const findKeyByValue = (obj: any, value: any) => {
  for (const key in obj) {
    if (obj[key].value == value) {
      return obj[key].label;
    }
  }
  return '--'; // 没有找到匹配的键
}

// 计算精度
export const round = (num: number, decimals: number) => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};