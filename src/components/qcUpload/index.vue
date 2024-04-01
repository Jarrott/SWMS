<template>
  <el-upload
    class="edit-uploader"
    :action="prop.url"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-error="handleAvatarError"
    :auto-upload="true"
    :headers="uploadData.headers"
    :data="prop.bodyData"
  >
    <template #tip>
      <div v-if="prop.tip" class="el-upload__tip">
        {{ prop.tip }}
      </div>
      <div v-if="prop.title" class="tip-title">
        {{ prop.title }}
      </div>
    </template>
    <img v-if="uploadData.imgVal" :src="getImg()" class="avatar" />
    <el-icon
      v-if="uploadData.imgVal"
      class="edit-close-icon"
      @click.stop="handleRemove"
      ><CircleCloseFilled
    /></el-icon>
    <el-icon v-else class="edit-uploader-icon"><Plus /></el-icon
  ></el-upload>
</template>

<script lang="ts" setup>
import type { UploadProps } from 'element-plus';
import { uploadImg } from '@/service/apis/api';
import { defSize, getFileType } from './index';

interface Props {
  valueModel?: string; // 图片地址
  url?: string; // 上传地址
  type?: string; //文件类型 img / files / pdf / xlsx
  size?: number; // 文件大小 单位M
  tip?: string; //温馨提示
  title?: string; //名称
  bodyData?: any; // 上传时附带的额外参数
}
const prop = withDefaults(defineProps<Props>(), {
  valueModel: '',
  url: uploadImg,
  type: 'img',
  size: 2,
  tip: '温馨提示：只能上传jpg/jpeg/png文件，且不超过2M',
  title: '',
  bodyData: {} as any,
});
const uploadData = reactive({
  headers: {
    encryptFlag: 'N',
    token: window.localStorage.getItem('token') || '',
    channelId: window.localStorage.getItem('channelId') || '',
    // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiIxIiwiYWNjb3VudE5hbWUiOiJjY2MiLCJzdXBlckZsYWciOnRydWUsInR5cGUiOiJCIiwib3BlcmF0b3JJZCI6IjExMTExMSJ9.PSFnw0fOJGaDSf4GZptzlA8d_pmHN1SRyvTV3b85ago',
    // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiIxIiwiZXhwaXJlVGltZSI6MTY4NDkyMDE4MTIxNSwiYWNjb3VudE5hbWUiOiJjY2MiLCJ0eXBlIjoiQyJ9.jCW0mb1dDZ-WzDiVMJsh97WgGWpq0bt_C6rqHaDUluM',
  },
  imgVal: '',
});

watch(
  () => prop.valueModel,
  (newVal, oldVal) => {
    uploadData.imgVal = newVal;
  },
  { immediate: true, deep: true }
);

const emit = defineEmits(['on-success', 'before-upload', 'on-error']);
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile: any
) => {
  uploadData.imgVal = uploadFile.response.data;
  emit('on-success', uploadFile.response.data);
};
const handleAvatarError: UploadProps['onError'] = (error) => {
  emit('on-error', error);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  return getFileType(file, prop.type).then((fileType) => {
    // 校验上传类型
    if (!fileType) {
      emit('before-upload', 'type');
      return false;
    }
    const fileSize = file.size <= prop.size * defSize.value;
    // 校验上传文件大小
    if (!fileSize && fileType) {
      emit('before-upload', 'size');
      return false;
    }
    emit('before-upload', '');
    return true;
  });
};

const handleRemove = () => {
  uploadData.imgVal = '';
  emit('on-success', uploadData.imgVal);
};

const getImg = () => {
  if (prop.bodyData?.path === 'org') {
    return uploadData.imgVal.split('?')[0];
  }
  return uploadData.imgVal;
};
</script>

<style lang="scss">
.edit-uploader {
  position: relative;
  .el-upload__tip {
    color: rgba(0, 0, 0, 0.4);
  }
  .tip-title {
    color: var(--el-color-primary);
    text-align: center;
  }
}
.edit-uploader .el-upload {
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  cursor: pointer;
  // position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

  .avatar {
    width: 88px;
    height: 88px;
  }
}

.edit-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.edit-uploader-icon {
  font-size: 16px;
  color: #fff;
  width: 88px;
  height: 88px;
  text-align: center;
  background-image: url(@/assets/images/uploader-bg.png);
  background-size: 73px 53px;
  background-repeat: no-repeat;
  background-position: center;
  svg {
    color: #fff;
    padding: 5px;
    background-color: #000;
    border-radius: 50%;
  }
}
.el-icon.edit-close-icon {
  position: absolute;
  top: -4px;
  left: 82px;
  font-size: 14px;
  color: #fa3939;
  background-color: #fff;
  border: 2px solid #d5d5d5;
  border-radius: 50%;
}
.is-error .edit-uploader .el-upload {
  border: 1px solid var(--el-color-danger);
}
</style>