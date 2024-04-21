<template>
  <div class="info-edit-wrap">
    <div class="title">EDIT ACCOUNT INFORMATION</div>
    <el-form ref="ruleFormRef"
        :inline="true" label-position="top" label-width="80px"
        :model="ruleForm" :rules="rules" class="custom-style-form">
      <el-form-item label="First Name" prop="firstName">
        <el-input v-model="ruleForm.firstName" disabled></el-input>
      </el-form-item>
      <el-form-item label="last Name" prop="lastName">
        <el-input v-model="ruleForm.lastName" disabled></el-input>
      </el-form-item>
      <el-form-item label="email Address" prop="email" class="custom-single-item">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="to way to send out DM" class="custom-single-item">
        <el-select v-model="ruleForm.DMWay" placeholder="Select to way to send out DM">
          <el-option
            v-for="item in optionsS.DMWay"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="DM in e-mail" class="custom-single-item">
        <el-select v-model="ruleForm.DMEmail" placeholder="Select DM in e-mail">
          <el-option
            v-for="item in optionsS.DMEmail"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="custom-single-item">
        <div class="birth-text">Date of Birth</div>
      </el-form-item>
      <el-form-item label="MM" class="birth-box" prop="BirthMonth">
        <el-input v-model="ruleForm.BirthMonth" placeholder="MM"></el-input>
      </el-form-item>
      <el-form-item label="DD" class="birth-box" prop="BirthDay">
        <el-input v-model="ruleForm.BirthDay" placeholder="DD"></el-input>
      </el-form-item>
      <el-form-item label="YYYY" class="birth-box" prop="BirthYear">
        <el-input v-model="ruleForm.BirthYear" placeholder="YYYY"></el-input>
      </el-form-item>
      <el-form-item label="Gender" class="custom-single-item">
        <el-select v-model="ruleForm.sex" placeholder="Select Gender">
          <el-option
            v-for="item in optionsS.sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="flex change-password">
      <el-checkbox v-model="data.checked" @change="changePassword"></el-checkbox>
      <div class="agree-tip">Change Password</div>
    </div>
    <!-- 更换密码 start -->
    <div class="change-box" v-if="data.checked">
      <div class="password-title">Change Password</div>

      <el-form ref="ruleFormRef1"
        :inline="true" label-position="top" label-width="80px"
        :model="ruleForm" :rules="rules" class="custom-style-form">
        <el-form-item label="Current Password" prop="password" class="custom-single-item">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="newPassword">
          <el-input v-model="ruleForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="Confirm New Password" prop="confirmPassword">
          <el-input v-model="ruleForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 更换密码 end -->

    <div class="save-btn" @click="handleSave">SAVE</div>
  </div>
</template>
<script lang="ts" setup>
import type { FormRules, FormInstance, ElIcon } from 'element-plus';
import { STATETYPE, ABOUTTYPE } from "@/utils/simulatedData";

const ruleFormRef = ref<FormInstance>();
const ruleFormRef1 = ref<FormInstance>();

const data = reactive({
 checked: false
});

const ruleForm = reactive({
  firstName: 'carol',
  lastName: 'carol',
  email: '',
  DMWay: 'only email',
  DMEmail: 'HTML',
  BirthMonth: '',
  BirthDay: '',
  BirthYear: '',
  sex: 'Male',
  password: '',
  newPassword: '',
  confirmPassword: '',
});

const optionsS = reactive({
  DMWay: [
    {
      label: 'only email',
      value: 'only email',
    }
  ] as any,
  DMEmail: [
    {
      label: 'HTML',
      value: 'HTML',
    }
  ] as any,
  sexList: [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Unknown',
      value: 'Unknown',
    }
  ] as any,
  aboutType: ABOUTTYPE as any,
});

const rules = reactive<FormRules>({
  firstName: [{ required: true, message: 'First Name is required.', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Last Name is required.', trigger: 'blur' }],
  email: [{ required: true, message: 'Phone is required.', trigger: 'blur' }],
  BirthMonth: [{ required: true, message: 'BirthMonth is required.', trigger: 'blur' }],
  BirthDay: [{ required: true, message: 'BirthDay is required.', trigger: 'blur' }],
  BirthYear: [{ required: true, message: 'BirthYear is required.', trigger: 'blur' }],
  password: [{ required: true, message: 'current password is required.', trigger: 'blur' }],
  newPassword: [{ required: true, message: 'new password is required.', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: 'confirm password is required.', trigger: 'blur' }],
  
});

// 是否修改密码
const changePassword = (val: any) => {
  console.log('val', val);
  if (!val) {
    ruleForm.password = '';
    ruleForm.newPassword = '';
    ruleForm.confirmPassword = '';
    ruleFormRef1?.value?.clearValidate();
  }
};

// 保存
const handleSave = async () => {
  console.log('1');
  
  if (!ruleFormRef.value) return;
  console.log('2');
  await ruleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      
    } else {
      console.log('error submit!', fields);
    }
  });
  if (data.checked) {
    await ruleFormRef1.value?.validate((valid, fields) => {
      if (valid) {
        
      } else {
        console.log('error submit2!', fields);
      }
    });
  }
  

  // 待处理
}
</script>

<style lang="scss" scoped>
.info-edit-wrap {
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-family: 'Oswald-Medium';
  color: #2E2E2D;
  text-transform: capitalize;

  .title {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .custom-style-form {
     width: 100%;

    :deep(.el-form-item) {
      width: calc(46% - 20px);
      margin-bottom: 36px;
    }

    :deep(.el-form-item__error) {
      color: #F00;
      font-family: 'Georgia-Regular';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.4px;
      margin-top: 4px;
      text-transform: capitalize;
    }

    .custom-single-item {
      width: 91.2%;
    }

    .birth-text {
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.36px;
      text-transform: uppercase;
    }

    .birth-box {
      width: 28.6%;

      .el-input {
        width: 100%;
      }
    }

    :deep(.el-form-item__label) {
      font-family: 'Oswald-Regular';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.32px;
      text-transform: capitalize;
    }

    :deep(.el-form-item__content) {
      height: 45px;
      background-color: #ffffff;
      
      .el-input {
        height: 45px;
      }

      .el-input__wrapper, .el-select__wrapper {
        height: 45px;
        background-color: #fff;
        border-radius: 0;
      }

      .el-input__inner {
        color: #2E2E2D;
        font-family: 'Oswald-Regular';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.32px;
      }
    }

    :deep(.is-error) {
      .el-input__wrapper, .el-select__wrapper {
        background-color: #ffdede;
        border: 0;
      }
    }

  }

  .change-password {
    :deep(.el-checkbox__input) {
      margin-right: 6px;

      .el-checkbox__inner {
        width: 16px;
        height: 16px;
        border: 1px solid #000;
        font-size: 89px;
      }

      &.is-checked .el-checkbox__inner {
        background-color: #F7F7F7;
      }

      .el-checkbox__inner::after {
        border: 3px solid #000;
        border-left: 0;
        border-top: 0;
        left: 5px;
        top: 2px;
      }

    }
  }

  .save-btn {
    width: 74px;
    height: 50px;
    background-color: #2099A3;
    line-height: 50px;
    text-align: center;
    margin-top: 24px;
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.54px;
    text-transform: uppercase;
    cursor: pointer;
  }

  .change-box {
    .password-title {
      color: #2E2E2D;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.36px;
      text-transform: uppercase;
      margin-top: 32px;
      margin-bottom: 20px;
    }
  }
}
</style>

