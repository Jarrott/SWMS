const iconDatas: any = {
  '1': 'user', // 用户管理
  '2': 'equity', // 电桩运营
  '3': 'market', // 营销管理
  '4': 'alarm', // 告警中心
  '5': 'statistics', // 统计中心
  '6': 'finance', // 财务管理
  '7': 'enterprise', // 企业管理
  '8': 'power', // 权限管理
  '9': 'network', // 第三方对接
  '10': 'setting', // 初始化配置
  '71': 'platform', // 平台运营商管理
  '86': 'plate', // 平台管理
  '87': 'dealer', // 经销商管理
  '88': 'distributor', // 分销商管理
  '89': 'clear-set', // 清分设置
  '107': 'clear', // 清分管理
};
export const getIcon = (item: any) => {
  return iconDatas[item.id];
};