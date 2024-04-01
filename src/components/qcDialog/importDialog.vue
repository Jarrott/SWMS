<template>
  <el-dialog
    v-model="dialogVisible"
    :title="prop.title"
    width="430"
    class="qc-custom-dialog import-dialog"
  >
    <el-form
      ref="dialogFormRef"
      :model="dialogForm"
      :rules="dialogRules"
      label-width="80px"
      class="dialog-form-wrap"
    >
      <el-form-item :label="prop.label" prop="file">
        <div class="iconfont icon-download" @click="downloadTemplate">
          下载{{ prop.templateName }}
        </div>
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          drag
          action="#"
          :auto-upload="true"
          :http-request="uploadFile"
          :before-upload="beforeAvatarUpload"
          :on-remove="onRemove"
          :limit="1"
          :on-exceed="handleExceed"
          accept=".xlsx,.xls"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖至此处或点击此处上传
            <div>支持格式：.xlsx,.xls</div>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="submitDialog"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules, UploadProps } from 'element-plus';
import { getFileType } from '@/components/qcUpload/index';
import {
  uploadImport,
  URL_UPLOADUSERS,
  DOWNLOAD_TEMTEMPLATE,
  URL_DOWNLOADS,
} from '@/service/apis/api';

interface Props {
  title?: string;
  label?: string;
  templateName?: string;
  url?: string;
  templateNameUrl?: string;
}
const prop = withDefaults(defineProps<Props>(), {
  title: '批量导入用户',
  label: '上传用户',
  templateName: '用户导入模板',
  url: URL_UPLOADUSERS,
  templateNameUrl: URL_DOWNLOADS,
});
const dialogFormRef = ref<FormInstance>();
const uploadRef = ref();

let dialogVisible = ref(false);

const checkFile = (rule: any, value: any, callback: any) => {
  if (value.length == 0) {
    callback(new Error('请上传文件'));
  }
  callback();
};

let dialogForm = reactive({
  file: [] as any,
});
const dialogRules = reactive<FormRules>({
  file: [
    { required: true, message: '请上传用户', trigger: 'change' },
    { validator: checkFile, trigger: 'change' },
  ],
});

// 下载模板
const downloadTemplate = () => {
  const url = `${DOWNLOAD_TEMTEMPLATE}${prop.templateNameUrl}`;
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', '');
  a.click(); // 自执行点击事件
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('beforeUpload---', rawFile);
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
const onRemove: UploadProps['onRemove'] = () => {
  dialogForm.file = [];
};
const uploadFile = (data: any) => {
  console.log();
  return new Promise((resolve, reject) => {
    dialogForm.file = [data!.file];
    dialogFormRef?.value?.clearValidate();
  });
};

const handleExceed: UploadProps['onExceed'] = () => {
  ElMessageBox.alert('最多可以上传1个文件', '提示', {
    confirmButtonText: '确认',
    type: 'warning',
  });
};

let params: any = reactive({});
// 关闭弹框
const hide = () => {
  params = {};
  dialogVisible.value = false;
  uploadRef.value?.clearFiles();
};
// 打开弹窗并赋值
const show = (data?: any) => {
  if (data) {
    params = data;
  }
  dialogVisible.value = true;
};

// 弹窗提交
const emit = defineEmits(['user-data']);
const submitDialog = async () => {
  if (!dialogFormRef.value) return;
  const formData = new FormData();
  formData.append('file', dialogForm.file[0]);
  for (const key in params) {
    formData.append(key, params[key]);
  }
  await dialogFormRef?.value.validate((valid, fields: any) => {
    if (valid) {
      uploadImport(prop.url, formData).then((res) => {
        emit('user-data', res);
        hide();
      });
    }
  });
};

defineExpose({
  show,
});
</script>

<style lang="scss">
.import-dialog {
  .icon-download {
    color: #5073f7;
    cursor: pointer;
  }
  .upload-demo {
    width: 100%;
  }
}
</style>