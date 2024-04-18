// 1开头的手机号码
export const IS_PHONE_NUM = /^(1[0-9])\d{9}$/;
// 身份证号码 (身份证号码为15位或者18位，15位时全为数字，18位时前17位为数字，最后一位是校验位，可能为数字或字符X)
export const IS_IDENTITY_CARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// 统一社会信用代码-18位英文数字
export const IS_EN_NUMBER_18 = /^[A-Za-z0-9]{18}$/;

// 终端快捷码
export const IS_NUMBER_5 = /^[0-9]{5}$/;

// 整数数字类
export const IS_INTEGER = /^\d+$/;
// 整数数字类 >=0
export const IS_INT_0 = /^(0|[1-9][0-9]*)$/;

// 整数数字类 > 0
export const IS_INT = /^[1-9]\d*$/;

export const IS_DECIMAL_4 = /^\d+(\.\d{1,4})?$/;

export const IS_DECIMAL_1 = /^\d+(\.\d{1,1})?$/;

export const IS_DECIMAL_2 = /^\d+(\.\d{1,2})?$/;

export const IS_DECIMAL_3 = /^\d+(\.\d{1,3})?$/;

// 小数数字类  默认:小数点前6位、后2位
export const IS_6TO2 = /^\d{0,6}(\.\d{0,2})?$/;

// 小数数字类  默认:小数点前3位、后1位
export const IS_3TO1 = /^\d{0,3}(\.\d{0,1})?$/;

// 小数数字类  默认:小数点前3位、后4位
export const IS_3TO4 = /^\d{0,3}(\.\d{0,4})?$/;

// 0-100
export const IS_0_100 = /^([0-9]{1,2}|100)$/;

export const IS_0_100_1 = /^(\d{1,2}(\.[0-9]{1})?)$|^100$/;

// 1-100
export const IS_1_100 = /^([1-9][0-9]{0,1}|100)$/;

// 大于0的小数或整数,最多4位小数
export const IS_more_0_4 = /^[1-9]\d*(\.\d{1,2})?$|^(?!0.0$)(?!0.00$)(?!0.000$)(?!0.0000$)([0]\.\d{1,4})$/;

// 大于等于0的小数或整数,最多4位小数
// export const IS_0_4 = /^[1-9]\d*(\.\d{1,2})?$|^([0]\.\d{1,4})$/;

// 支持负数，小数，整数的数字
export const IS_NUM = /^[+-]?\d*\.?\d*$/;

export const IS_NUM1 = /^[+]?\d*\.?\d*$/;

// 1-60的整数
export const IS_1To60 = /^([1-5][0-9]$)|(^[6][0]$)|(^[1-9])$/;


// 两位小数(包含0)
export const IS_TWO_DECIMAL = /^\d+(\.\d{1,2})?$/;

// 大于2的正整数
export const IS_more_2 = /^([1-9]\d+|[3-9])$/;

// 正负，保留2位
export const IS_DECIMAL_2_1 = /^[-+]?\d+(\.\d{1,2})?$/;

// 大于0保留两位小数正则
export const IS_NUM_MORE0 =
  /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/;

// 包含字母和数字,但不能全是数字
export const IS_NUM_AND_EN = /^(?!^\d+$)[0-9a-zA-Z_]*$/; ///^(?![0-9]+$)[0-9a-zA-Z]+/;

//导入用户输入，不能输入中文逗号
export const NO_CHINESE_COMMA = /^[^\，]*$/

// 支持输入正整数和英文逗号
export const IS_INT_0_DOT = /^[0-9,]+$/

// 校验英文、数字
export const IS_EN_NUMBER = /^[A-Za-z0-9]+$/

// 数字和-
export const IS_NUM_LINE = /^[-0-9]+$/

// 12位数字
export const IS_NUM_12 = /\b\d{12}\b/