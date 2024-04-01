// 用户状态
export const USER_TYPE = [
  {
    label: '正常',
    value: false,
  },
  {
    label: '冻结',
    value: true,
  },
];

// 用户类型
export const USER_TYPES = [
  {
    label: '企业用户',
    value: false,
  },
  {
    label: '非企业用户',
    value: true,
  },
];

// 充电卡状态
export const CHARGE_CARD_TYPE = [
  {
    label: '未绑定',
    value: '1',
  },
  {
    label: '已绑定',
    value: '2',
  },
  {
    label: '已作废',
    value: '3',
  },
];

// 渠道配置
export const CHANNEL_CONFIG = [
  {
    label: '短信通道配置',
    value: 'sms',
  },
  {
    label: '微信支付配置',
    value: 'wx',
  },
  {
    label: '互联互通配置',
    value: '1',
  },
];
export const CHANNEL_CONFIG1 = [
  {
    label: '短信通道配置',
    value: 'sms',
  },
  {
    label: '微信支付配置',
    value: 'wx',
  },
  {
    label: '银联支付配置',
    value: 'yl',
  },
  {
    label: '互联互通配置',
    value: '1',
  },
];
// 企业身份
export const CORPORATE_IDENTITY_TYPE = [
  {
    label: '电站运营商',
    value: '0',
  },
  {
    label: '车辆机构',
    value: '1',
  },
  {
    label: '流量方',
    value: '2',
  },
  {
    label: '监管平台',
    value: '3',
  },
];

// 运营商属性
export const ATTR_TYPE = [
  {
    label: '自营',
    value: '0',
  },
  {
    label: '加盟',
    value: '1',
  },
  {
    label: '互联互通',
    value: '2',
  },
];

// 是否
export const YES_NO = [
  {
    label: '是',
    value: '0',
  },
  {
    label: '否',
    value: '1',
  },
];

export const TRUE_FALSE = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

// 是否
export const NO_YES = [
  {
    label: '否',
    value: '0',
  },
  {
    label: '是',
    value: '1',
  },
];

// 流水类型
export const FLOW_TYPE = [
  {
    label: '个人充值',
    value: 1,
  },
  {
    label: '个人退款',
    value: 2,
  },
  {
    label: '个人消费',
    value: 3,
  },
  {
    label: '平台充值',
    value: 4,
  },
  {
    label: '平台退款',
    value: 5,
  },
  {
    label: '补贴消费',
    value: 6,
  },
  {
    label: '补贴下发',
    value: 7,
  },
  {
    label: '补贴扣回',
    value: 8,
  },
  {
    label: '企业充值',
    value: 9,
  },
  {
    label: '企业退款',
    value: 10,
  },
  {
    label: '用户余额修正',
    value: 11,
  },
];

// 抵扣类型
export const DEDUCTION_TYPE = [
  {
    label: '服务费',
    value: '0',
  },
  {
    label: '电费',
    value: '1',
  },
  {
    label: '总费用',
    value: '2',
  },
];

// 可用电站
export const POWER_STATION_TYPE = [
  {
    label: '全部电站',
    value: '0',
  },
  {
    label: '选择运营商',
    value: '1',
  },
  {
    label: '选择单电站',
    value: '2',
  },
];

// 电站管理-启停状态
export const STATION_STATUS_USE = [
  {
    label: '启用',
    value: true,
  },
  {
    label: '停用',
    value: false,
  },
];
//电站管理-是否增容 ：1：增容 0：不增容
export const STATION_INCREASE = [
  {
    label: '不增容',
    value: false,
  },
  {
    label: '增容',
    value: true,
  },
];
// 电站管理-移动端可见性：1：可见 0：不可见
export const STATION_VISIBLE = [
  {
    label: '可见',
    value: true,
  },
  {
    label: '不可见',
    value: false,
  },
];
// 电站管理-是否收取占用费： 1：是 0：否
export const STATION_SITE = [
  {
    label: '否',
    value: false,
  },
  {
    label: '是',
    value: true,
  },
];
//电站管理-是否有道闸: 1：有 0：无
export const STATION_BRAKE = [
  {
    label: '无道闸',
    value: false,
  },
  {
    label: '有道闸',
    value: true,
  },
];

//电桩管理-有无SIM/有无地锁
export const PILE_SIM = [
  {
    label: '无',
    value: false,
  },
  {
    label: '有',
    value: true,
  },
];

//电桩管理-在线状态
export const PILE_ONLINE = [
  {
    label: '在线',
    value: true,
  },
  {
    label: '离线',
    value: false,
  },
];

// 在线状态
export const ONLINE = [
  {
    label: '在线',
    value: '1',
  },
  {
    label: '离线',
    value: '0',
  },
];
//互联互通电桩管理-生效状态
export const PILE_EFFECTIVE_STATUS = [
  {
    label: '下架',
    value: '1',
  },
  {
    label: '生效中',
    value: '2',
  },
];

// 任务模式
export const TASK_TYPE = [
  {
    label: '补贴下发',
    value: 0,
  },
  {
    label: '补贴扣回',
    value: 1,
  },
];

// 执行模式
export const EXECUTE_TYPE = [
  {
    label: '立即执行',
    value: 0,
  },
  {
    label: '定时执行',
    value: 1,
  },
  {
    label: '周期执行',
    value: 2,
  },
];

// 任务状态
export const TASK_SATAUS = [
  {
    label: '未开始',
    value: 0,
  },
  {
    label: '进行中',
    value: 1,
  },
  {
    label: '已结束',
    value: 2,
  },
  {
    label: '已终止',
    value: 3,
  },
];

// 终止原因
export const REASON_TYPE = [
  {
    label: '余额不足',
    value: 1,
  },
  {
    label: '手动停止',
    value: 2,
  },
];

export const WEEK = [
  {
    label: '周日',
    value: '1',
  },
  {
    label: '周一',
    value: '2',
  },
  {
    label: '周二',
    value: '3',
  },
  {
    label: '周三',
    value: '4',
  },
  {
    label: '周四',
    value: '5',
  },
  {
    label: '周五',
    value: '6',
  },
  {
    label: '周六',
    value: '7',
  },
];

export const AUTH_STATION = [
  {
    label: '无权限',
    value: 'NONE',
  },
  {
    label: '企业超管权限',
    value: 'SUPER',
  },
  {
    label: '选择企业',
    value: 'ORG',
  },
  {
    label: '选择单电站',
    value: 'STATION',
  },
]

export const AUTH_STATION1 = [
  {
    label: '无权限',
    value: 'NONE',
  },
  {
    label: '选择企业',
    value: 'ORG',
  },
  {
    label: '选择单电站',
    value: 'STATION',
  },
]

export const AUTH_USER = [
  {
    label: '无权限',
    value: 'NONE',
  },
  {
    label: '企业超管权限',
    value: 'SUPER',
  },
  {
    label: '选择企业',
    value: 'ORG',
  },
]

export const AUTH_USER1 = [
  {
    label: '无权限',
    value: 'NONE',
  },
  {
    label: '选择企业',
    value: 'ORG',
  },
]

export const AUTH_SHARE = [
  {
    label: '无权限',
    value: 'NONE',
  },
  {
    label: '企业超管权限',
    value: 'SUPER',
  },
  {
    label: '选择企业',
    value: 'ORG',
  },
  {
    label: '选择单分润方',
    value: 'USER',
  },
]
export const AUTH_SHARE1 = [
  {
    label: '无权限',
    value: 'NONE',
  },
  {
    label: '选择企业',
    value: 'ORG',
  },
  {
    label: '选择单分润方',
    value: 'USER',
  },
]

export const UNIT_TYPE = [
  {
    label: '企业用户',
    value: true,
  },
  {
    label: '非企业用户',
    value: false,
  },
]

export const LEVEL_TYPE = [
  {
    label: '样式一',
    value: '1',
  },
  {
    label: '样式二',
    value: '2',
  },
  {
    label: '样式三',
    value: '3',
  },
  {
    label: '样式四',
    value: '4',
  },
  {
    label: '样式五',
    value: '5',
  },
  {
    label: '样式六',
    value: '6',
  },
  {
    label: '样式七',
    value: '7',
  },
]

// 限制用户
export const TARGET_TYPE = [
  {
    value: '0',
    label: '选择企业',
  },
  {
    value: '1',
    label: '选择标签',
  },
  {
    value: '2',
    label: '选择单用户',
  },
];

//执行周期
export const EXECUTE_PERIOD = [
  {
    value: '0',
    label: '每日执行',
  },
  {
    value: '1',
    label: '每周执行',
  },
  {
    value: '2',
    label: '每月执行',
  },
];

// 首次充电活动-消费维度
export const ACTIVITY_TYPE = [
  {
    value: 2,
    label: '电量',
  },
  {
    value: 3,
    label: '实付金额',
  },
];

// 通知发送方式
export const NOTICE_METHOD = [
  {
    value: '0',
    label: '移动端推送',
  },
  {
    value: '1',
    label: '短信推送',
  },
];

// 通知发送状态
export const NOTICE_STATUS = [
  {
    value: '0',
    label: '待发送',
  },
  {
    value: '1',
    label: '已发送',
  },
];

// 通知发送对象
export const NOTICE_OBJECT = [
  {
    value: '0',
    label: '全部用户',
  },
  {
    value: '1',
    label: '选择企业',
  },
  {
    value: '2',
    label: '输入单用户',
  },
];

// 问题管理-上下架
export const PROBLEM_STATUS = [
  {
    value: true,
    label: '上架',
  },
  {
    value: false,
    label: '下架',
  },
];

// 告警等级
export const ALARM_LEVEL = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

// 升级包获取 isAutoUpdate isAutoUpdate false-手动配置/true-本地上传
export const IS_AUTOUPDATE = [
  {
    label: '手动配置',
    value: false,
  },
  {
    label: '本地上传',
    value: true,
  },
];

// 用户认证类型
export const USER_AUTH = [
  {
    label: '待认证',
    value: false,
  },
  {
    label: '已认证',
    value: true,
  },
];
