<template>
  <el-dialog
    v-model="dialogVisible"
    title="修改密码"
    width="430"
    class="qc-custom-dialog"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="dialog-form-wrap"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model.trim="ruleForm.oldPassword"
          placeholder="请输入旧密码"
          maxlength="30"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model.trim="ruleForm.newPassword"
          placeholder="请输入新密码"
          maxlength="30"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input
          v-model.trim="ruleForm.confirmPassword"
          placeholder="请再次输入新密码"
          maxlength="30"
          show-password
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" v-btnAntiShake="onSubmit"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="dialog-pws">
import type { FormInstance, FormRules } from 'element-plus';
import { updatePassword } from '@/service/apis/auth';
import { getMd5, exit } from '@/utils/utils';

const ruleFormRef = ref<FormInstance>();

let dialogVisible = ref(false);

let ruleForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const checkPws = (rule: any, value: any, callback: any) => {
  if (value && ruleForm.confirmPassword && value !== ruleForm.confirmPassword) {
    callback(new Error('两次输入的新密码不一致'));
  }
  callback();
};
const checkPws1 = (rule: any, value: any, callback: any) => {
  if (value && ruleForm.newPassword && value !== ruleForm.newPassword) {
    callback(new Error('两次输入的新密码不一致'));
  }
  callback();
};
const rules = reactive<FormRules>({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: checkPws, trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请输入确认新密码', trigger: 'blur' },
    { validator: checkPws1, trigger: 'blur' },
  ],
});

const show = () => {
  dialogVisible.value = true;
};
const hide = () => {
  dialogVisible.value = false;
};

const onSubmit = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      const from = {
        oldPassword: getMd5(ruleForm.oldPassword),
        newPassword: getMd5(ruleForm.newPassword),
      };
      updatePassword(from).then((res: any) => {
        hide();
        ElMessageBox.alert('密码修改成功，需要重新登录！', '提示', {
          confirmButtonText: '确认',
          type: 'success',
        }).then(() => {
          exit();
        });
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};

defineExpose({
  show,
});
</script>