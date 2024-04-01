<!-- 列表组件（保护查询、列表上面按钮、列表、列表按钮、分页  -->
<template>
  <div class="qc-table-wrap">
    <!-- 查询组件 -->
    <div v-if="query && query.length > 0" class="query-wrap">
      <el-form
        class="query-form"
        :class="[
          search.isHide ? 'query-form-height-hide' : 'query-form-height-show',
        ]"
        :model="search.ruleForm"
        ref="searchForm"
        labelPosition="right"
      >
        <el-form-item
          class="query-item"
          v-for="(item, index) in query"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template #label>
            <div
              :style="`width: ${
                search.labelW[index % 4]
              }px; text-align: right;`"
            >
              {{ item.label }}
            </div>
          </template>
          <component
            :is="dom[item.comName]"
            v-model.trim="search.ruleForm[item.prop]"
            v-bind="item.props"
            v-on="item.props"
            :popper-class="`qc-${item.comName}`"
            :clearable="item.props.clearable ? false : true"
          >
            <template v-if="item.props.prepend" #prepend>{{
              item.props.prepend
            }}</template>
            <template v-if="item.props.append" #append>{{
              item.props.append
            }}</template>
          </component>
        </el-form-item>
        <div
          v-if="query.length % 4 === 0"
          class="query-item"
          style="visibility: hidden; height: 52px"
        ></div>
      </el-form>
      <!-- 查询按钮组 -->
      <div class="query-btn">
        <el-button
          v-if="query && query.length > 3"
          type="default"
          @click.stop="handleSearchShow"
          >{{ search.isHide ? '展开' : '隐藏' }}</el-button
        >
        <el-button type="primary" @click.stop="handleQuery">查询</el-button>
        <el-button type="default" @click.stop="handleReset">重置</el-button>
      </div>
      <!-- 隐藏遮罩 -->
      <div class="line-box"></div>
    </div>

    <div class="bottom-box">
      <div class="bottom-wrap">
        <!-- 头部按钮 -->
        <div
          v-if="prop.toolbar && prop.toolbar.length > 0"
          class="toolbar-wrap"
        >
          <div v-for="(btn, index) in prop.toolbar" :key="index">
            <el-button
              v-if="!btn.text && !btn.import && bntAuth(btn.permission)"
              :style="`width:${btn.width || 'auto'}`"
              :type="btn.type"
              :plain="btn.plain"
              :disabled="btn.disabledFun ? btn.disabledFun() : false"
              @click="handleToolbar(btn)"
              ><span class="iconfont" :class="btn.icon"></span
              >{{ btn.labelFun ? btn.labelFun(btn) : btn.label }}</el-button
            >
            <el-upload
              v-else-if="btn.import && bntAuth(btn.permission)"
              ref="uploadRef"
              class="upload-demo"
              :action="`/api/${btn.url}`"
              :limit="1"
              :show-file-list="false"
              :headers="uploadHeaders"
              :on-success="btn.handleSuccess || handleAvatarSuccess"
              :on-error="handleError"
              :before-upload="btn.beforeUpload || beforeAvatarUpload"
            >
              <el-button :type="btn.type" :plain="btn.plain"
                ><span class="iconfont" :class="btn.icon"></span
                >{{ btn.label }}</el-button
              >
            </el-upload>
            <div
              v-else-if="btn.text && bntAuth(btn.permission)"
              class="text-label"
            >
              {{ btn.label }} : <span>{{ btn.value }} </span>
            </div>
          </div>
        </div>

        <slot v-if="prop.othercontent" name="othercontent"></slot>
        <slot v-if="prop.content" name="content"></slot>

        <!-- 列表 -->
        <el-table
          v-else
          ref="table"
          :data="list.data"
          style="width: 100%"
          :max-height="prop.maxHeight"
          :border="prop.border"
          :show-summary="prop.showSummary"
          @selection-change="handleSelectionChange"
        >
          <template #empty>
            <div class="no-data-wrap">
              <div class="no-data"></div>
              <div class="text">暂无数据</div>
            </div>
          </template>
          <!-- 序号 -->
          <el-table-column
            v-if="!select && indexShow"
            width="60"
            type="index"
            label="序号"
            align="center"
            :index="indexMethod"
          />
          <!-- 多选列 -->
          <el-table-column v-if="select" type="selection" width="40" />
          <!-- 列表项 -->
          <el-table-column
            v-for="(item, index) in prop.columns"
            :key="index"
            align="center"
            :width="item.width"
          >
            <template v-if="item.children?.length > 0">
              <el-table-column
                v-for="(citem, cindex) in item.children"
                :key="`c-${cindex}`"
                align="center"
                :width="citem.width"
              >
                <template #header>
                  <el-popover effect="light" placement="top" width="auto">
                    <template #default>
                      <div>{{ citem.label }}</div>
                    </template>
                    <template #reference>
                      <div
                        v-if="citem.templateHeader"
                        v-html="citem.templateHeader(citem, index)"
                      ></div>
                      <!--自定义表头内容（实现功能-鼠标hover显示title）-->
                      <div v-else-if="citem.askContent" class="text-line">
                        <span>{{ citem.label }}</span>
                        <el-tooltip
                          effect="light"
                          :content="citem.askContent"
                          placement="top"
                        >
                          <span class="iconfont icon-tishi_o"></span>
                        </el-tooltip>
                      </div>
                      <div v-else class="text-line">{{ citem.label }}</div>
                    </template>
                  </el-popover>
                </template>
                <template #default="scope">
                  <el-switch
                    v-if="citem.type === 'switch'"
                    v-model="scope.row[citem.prop]"
                    width="30"
                    size="small"
                    :loading="citem.loading"
                    :before-change="citem.handlebefore"
                    @change="citem.handle(scope.row)"
                    :disabled="!bntAuth(citem.permission)"
                  />
                  <el-popover
                    v-else
                    effect="light"
                    placement="top"
                    width="auto"
                  >
                    <template #default>
                      <div
                        v-if="citem.template"
                        v-html="citem.template(scope.row, index)"
                      ></div>
                      <div v-else-if="citem.popValue">
                        {{ citem.popValue(scope.row, index) }}
                      </div>
                      <div v-else-if="citem.dic">
                        {{ getLabel(scope.row, citem) }}
                      </div>
                      <div
                        v-else-if="citem.clickFun"
                        @click="citem.clickFun(scope.row)"
                        :class="scope.row[citem.prop] ? 'linkColor' : ''"
                      >
                        {{ scope.row[citem.prop] || '--' }}
                      </div>
                      <div v-else>{{ scope.row[citem.prop] || '--' }}</div>
                    </template>
                    <template #reference>
                      <div
                        class="text-line"
                        v-if="citem.template"
                        v-html="citem.template(scope.row, index)"
                      ></div>
                      <div v-else-if="citem.dic">
                        {{ getLabel(scope.row, citem) }}
                      </div>
                      <div
                        v-else-if="citem.clickFun"
                        @click="citem.clickFun(scope.row)"
                        :class="scope.row[citem.prop] ? 'linkColor' : ''"
                      >
                        {{ scope.row[citem.prop] || '--' }}
                      </div>
                      <div v-else-if="citem.dataType">
                        {{ citem.dataType(scope.row[citem.prop]) }}
                      </div>
                      <div v-else-if="citem.dataNum">
                        {{ scope.row[citem.prop].toFixed(citem.dataNum) }}
                      </div>
                      <div v-else class="text-line">
                        {{ scope.row[citem.prop] || '--' }}
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </template>
            <template #header>
              <el-popover effect="light" placement="top" width="auto">
                <template #default>
                  <div>{{ item.label }}</div>
                </template>
                <template #reference>
                  <div
                    v-if="item.templateHeader"
                    v-html="item.templateHeader(item, index)"
                  ></div>
                  <!--自定义表头内容（实现功能-鼠标hover显示title）-->
                  <div v-else-if="item.askContent" class="text-line">
                    <span>{{ item.label }}</span>
                    <el-tooltip
                      effect="light"
                      :content="item.askContent"
                      placement="top"
                    >
                      <span class="iconfont icon-tishi_o"></span>
                    </el-tooltip>
                  </div>
                  <div v-else class="text-line">{{ item.label }}</div>
                </template>
              </el-popover>
            </template>
            <template #default="scope" v-if="!item.children">
              <el-switch
                v-if="item.type === 'switch'"
                v-model="scope.row[item.prop]"
                width="30"
                size="small"
                :loading="item.loading"
                :before-change="item.handlebefore"
                @change="item.handle(scope.row)"
                :disabled="!bntAuth(item.permission)"
              />
              <el-popover v-else effect="light" placement="top" width="auto">
                <template #default>
                  <div
                    v-if="item.template"
                    v-html="item.template(scope.row, index)"
                  ></div>
                  <div
                    v-else-if="item.popValue && item.popValue(scope.row, index)"
                  >
                    {{ item.popValue(scope.row, index) }}
                  </div>
                  <div v-else-if="item.dic">
                    {{ getLabel(scope.row, item) }}
                  </div>
                  <div
                    v-else-if="item.clickFun"
                    @click="item.clickFun(scope.row)"
                    :class="scope.row[item.prop] ? 'linkColor' : ''"
                  >
                    {{ scope.row[item.prop] || '--' }}
                  </div>
                  <div v-else>{{ scope.row[item.prop] || '--' }}</div>
                </template>
                <template #reference>
                  <div
                    class="text-line"
                    v-if="item.template"
                    v-html="item.template(scope.row, index)"
                  ></div>
                  <div v-else-if="item.dic">
                    {{ getLabel(scope.row, item) }}
                  </div>
                  <div
                    v-else-if="item.clickFun"
                    @click="item.clickFun(scope.row)"
                    :class="scope.row[item.prop] ? 'linkColor' : ''"
                  >
                    {{ scope.row[item.prop] || '--' }}
                  </div>
                  <div v-else-if="item.dataType">
                    {{ item.dataType(scope.row[item.prop]) }}
                  </div>
                  <div v-else-if="item.dataNum">
                    {{ scope.row[item.prop].toFixed(item.dataNum) }}
                  </div>
                  <div v-else class="text-line">
                    {{ scope.row[item.prop] || '--' }}
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column
            v-if="btnObj.list && btnObj.list.length > 0"
            label="操作"
            fixed="right"
            align="center"
            :width="btnWidth"
          >
            <template #default="scope">
              <div class="table-btn-wrap">
                <div
                  class="table-btn"
                  :class="{
                    'table-btn-line': btn.line,
                    'btn-disabled':
                      btn.disabledFun && btn.disabledFun(scope.row),
                    'btn-hide': btn.hideFun && btn.hideFun(scope.row),
                  }"
                  :style="`color: ${
                    btn.disabledFun && btn.disabledFun(scope.row)
                      ? ''
                      : btn.colorFun
                      ? btn.colorFun(scope.row)
                      : btn.color
                  };`"
                  v-for="(btn, index) in btnObj.list"
                  :key="index"
                  @click="
                    (!btn.disabledFun || !btn.disabledFun(scope.row)) &&
                      btn.handle(scope.row)
                  "
                >
                  {{ btn.labelFun ? btn.labelFun(scope.row) : btn.label }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div
          v-if="prop.isPagination && list.data && list.data.length > 0"
          class="pagination-wrap"
        >
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            :current-page="page.pageNo"
            :page-sizes="[10, 20, 30, 40]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ElCascader,
  ElDatePicker,
  ElInput,
  ElTimePicker,
  UploadProps,
} from 'element-plus';
import { queryList } from '@/service/apis/api';
import { getFileType } from '@/components/qcUpload/index';
import { DOWNLOAD_TEMTEMPLATE } from '@/service/apis/api';
import { bntAuth } from '@/utils/utils';

interface Props {
  url?: string; // 列表接口地址
  query?: any; // 筛选项
  toolbar?: any; // 头部按钮
  columns: any; // 列表key数据
  handles?: any; // 操作列按钮数据
  select?: boolean; // 列表是否多选
  isPagination?: boolean; // 是否分页
  listKey?: string; // 返回列表数据对应的key
  border?: boolean; // 是否带有纵向边框
  content?: boolean; // 自定义内容
  othercontent?: boolean;
  isPost?: boolean; //是否请求数据
  list?: any; //列表数据
  params?: any; // 接口固定参数
  showSummary?: boolean; // 是否在表尾显示合计行
  indexShow?: boolean; // 是否显示序号
  maxHeight?: any; // Table 的高度
}
const prop = withDefaults(defineProps<Props>(), {
  url: '',
  query: [] as any,
  toolbar: [] as any,
  columns: [] as any,
  handles: [] as any,
  select: false,
  isPagination: true,
  listKey: 'dataList',
  border: false,
  content: false,
  othercontent: false,
  isPost: true,
  list: [] as any,
  params: {} as any,
  showSummary: false,
  indexShow: true,
  maxHeight: 500,
});

const uploadHeaders = reactive({
  encryptFlag: 'N',
  token: window.localStorage.getItem('token') || '',
  channelId: window.localStorage.getItem('channelId') || '',
  orgId: window.localStorage.getItem('orgId') || '',
  loginUser: window.localStorage.getItem('accountCode') || '',
});

const uploadRef = ref();

const emit = defineEmits(['get-list', 'get-page', 'selection-change']);

const dom = shallowReactive({
  input: ElInput,
  select: 'qc-select',
  cascader: ElCascader,
  date: ElDatePicker,
  time: ElTimePicker,
} as any);

let btnWidth = ref(24);
const btnObj = reactive({
  list: [] as any,
  line: {
    label: '|',
    line: true,
  },
});
prop.handles?.forEach((item: any, inx: number) => {
  if (bntAuth(item.permission)) {
    if (prop.border) {
      btnWidth.value += item.label.length * 12 + 8;
    } else {
      btnWidth.value += item.label.length * 12 + 6;
    }
    btnObj.list.push(item);
  }
});
console.log(btnWidth, btnObj);
// const btnLen = btnObj.list.length;
// if (btnLen > 2) {
//   if (btnLen % 2 == 0) {
//   }
// }

//搜索数据
const search = reactive({
  ruleForm: {} as any,
  isHide: true, // 是否隐藏，默认隐藏
  labelW: [82, 82, 82, 82], // 每个itemlabel的宽度，纵对齐
  isFirst: true, //是否第一进入
});

let strs = reactive([] as any);
prop.query.forEach((item: any, index: number) => {
  // 初始查询组件部分属性
  if (item.comName === 'select') {
    item.props.isWidth = true;
  }
  if (item.comName === 'date') {
    item.props.prefixIcon = 'Clock';
    let obj = reactive({} as any);
    obj.editable = false;
    obj.startPlaceholder = '开始时间';
    obj.endPlaceholder = '结束时间';
    obj.placeholder = '请选择时间';
    obj.valueFormat = 'YYYY-MM-DD';
    if (item.props.type === 'month') {
      obj.valueFormat = 'YYYY-MM';
    } else if (item.props.type === 'datetimerange') {
      obj.defaultTime = [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ];
      obj.valueFormat = 'YYYY-MM-DD HH:mm:ss';
    }
    item.props = { ...obj, ...item.props };
  } else if (item.comName === 'time') {
    let obj = reactive({} as any);
    obj.placeholder = '请选择时间';
    obj.editable = false;
    obj.valueFormat = 'hh:mm:ss';
    item.props = { ...obj, ...item.props };
  }
  // 计算label宽度
  const inx = index % 4;
  if (!strs[inx] || (strs[inx] && strs[inx].length < item.label.length)) {
    strs[inx] = item.label;
  }
  // 初始赋默认值
  if (item.value) {
    search.ruleForm[item.prop] = item.value;
  }
});
strs.forEach((item: any, index: number) => {
  search.labelW[index] = item.length * 13 + 30;
});
watch(
  () => prop.query,
  (newVal, oldVal) => {
    console.log('table---', newVal);
  },
  { immediate: true, deep: true }
);

// search.labelW[0] =
//列表数据
const table = ref();
const list = reactive({
  data: [] as any,
  selectData: [] as any,
});
//分页数据
const page = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0,
});

watch(
  () => prop.list,
  (newVal, oldVal) => {
    list.data = newVal;
    page.total = newVal.length;
  },
  { immediate: true, deep: true }
);
const getForm = () => {
  const form = { ...search.ruleForm };
  for (const key in form) {
    const obj = prop.query.find((item: any) => item.prop === key);
    if (obj?.comName === 'date' && obj?.keys) {
      obj.keys.forEach((item: any, inx: number) => {
        if (form[key]) {
          form[item] = form[key][inx];
        } else {
          delete form[item];
        }
      });
      delete form[key];
    }
  }
  return { ...prop.params, ...form };
};
const getData = () => {
  if (!prop.isPost) return;
  if (prop.select) {
    table.value && table.value?.clearSelection();
  }
  if (prop.url) {
    const form = getForm();
    queryList(prop.url, form, page).then((res: any) => {
      if (res) {
        console.log('res---', res);
        if (
          page.pageNo !== 1 &&
          (!res[prop.listKey] || res[prop.listKey]?.length === 0)
        ) {
          page.pageNo--;
          getData();
          return;
        }
        nextTick(() => {
          page.total = res.totalCount || res.total;
          list.data = res[prop.listKey];
          emit('get-page', page.total);
        });
      }
    });
  } else {
    emit('get-list', page, search);
  }
};
if (prop.isPost) {
  getData();
} else {
  list.data = prop.list;
  page.total = prop.list.length;
}

// 展开/隐藏按钮
const handleSearchShow = () => {
  search.isHide = !search.isHide;
  // 设置搜索框高度
  if (search.isFirst) {
    search.isFirst = false;
    const qlen = prop.query.length;
    if (qlen > 3) {
      const qh = Math.ceil(qlen / 4) * 52 + (qlen % 4 === 0 ? 52 : 0);
      const styleQuery = window.document.querySelector(':root') as any;
      styleQuery.style.setProperty('--table-query-form-height', `${qh}px`);
    }
  }
};

// 重置按钮
const handleReset = () => {
  search.ruleForm = {};
  prop.query.forEach((item: any) => {
    if (item.value) {
      search.ruleForm[item.prop] = item.value;
    }
  });
  page.pageNo = 1;
  getData();
};

// 重置按钮1
const handleReset1 = () => {
  search.ruleForm = {};
  page.pageNo = 1;
  search.isHide = true;
};

const handleQuery = () => {
  page.pageNo = 1;
  getData();
  console.log('ruleForm---', search.ruleForm);
};

// 头部按钮事件
const handleToolbar = (item: any) => {
  const { handle } = item;
  if (prop.select) {
    // 有多选是，传勾选项数据
    handle && handle(list.selectData, item);
  } else if (item.url) {
    const url = `${DOWNLOAD_TEMTEMPLATE}${item.url}`;
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', '');
    a.click(); // 自执行点击事件
  } else {
    handle && handle(item);
  }
};

const indexMethod = (index: number) => {
  return index + 1;
};
// 列表多选变化时触发\
const handleSelectionChange = (val: any[]) => {
  list.selectData = val;
  emit('selection-change', val);
  console.log('handleSelectionChange ---', val);
};
// 是否单页全选
const isAllSelect = () => {
  return list.selectData.length === page.pageSize;
};

// 父页面调用接口后设置页面数据和总页数
const setTable = (obj: any) => {
  console.log('setTable---', obj);
  const { table, total } = obj;
  page.total = total;
  list.data = table;
  console.log('list.data---', list.data);
};
//分页事件---page-size 改变时触发
const handleSizeChange = (val: number) => {
  console.log('handleSizeChange ---', val);
  page.pageSize = val;
  getData();
};
//分页事件---current-page 改变时触发
const handleCurrentChange = (val: number) => {
  console.log('handleCurrentChange ---', val);
  page.pageNo = val;
  getData();
};

// 字典匹配
const getLabel = (row: any, column: any) => {
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

// 导入
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  uploadRef.value!.forEach((item: any) => {
    item.clearFiles();
  });
  if (response.businessCode === '1') {
    ElMessage({
      showClose: true,
      message: '导入成功',
      type: 'success',
    });
    getData();
  } else {
    ElMessage({
      showClose: true,
      message: response.msg,
      type: 'warning',
    });
  }
};

const handleError: UploadProps['onError'] = (response, uploadFile) => {
  console.log('response----', response);
  ElMessage({
    showClose: true,
    message: '导入失败',
    type: 'warning',
  });
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (!rawFile.name.endsWith('.xlsx') && !rawFile.name.endsWith('.xls')) {
  //   ElMessageBox.alert('请导入xlsx、xls格式的文件！', '提示', {
  //     confirmButtonText: '确认',
  //     type: 'warning',
  //   });
  //   return false;
  // }
  // return true;

  return getFileType(rawFile, 'xlsx').then((fileType) => {
    // 校验上传类型
    if (!fileType) {
      ElMessageBox.alert('请导入xlsx、xls格式的文件！', '提示', {
        confirmButtonText: '确认',
        type: 'warning',
      });
      return false;
    }
    return true;
  });
};

const setOptions = (i: number, list: any) => {
  prop.query[i].props.options = list;
};

const getSelectData = () => {
  return list.selectData;
};
const clearSelect = () => {
  nextTick(() => {
    table.value?.clearSelection();
  });
};

const clearData = () => {
  list.data = [];
  page.pageNo = 1;
  page.pageSize = 10;
  page.total = 0;
};

defineExpose({
  isAllSelect, //是否单页全选
  setTable, // 设置页面页面数据和总页数，父页面调用接口获取数据时使用
  getData,
  setOptions,
  handleQuery,
  handleReset,
  handleReset1,
  getSelectData,
  clearSelect,
  clearData,
  getForm,
});
</script>

<style lang="scss">
@import './index.scss';
</style>