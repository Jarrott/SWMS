<template>
  <div class="create-account-wrap">
    <div class="form-box">
      <div class="title">Create an Account</div>
      <div class="tip">
        <span>Already have an account?</span><span class="login-text" @click="handleJumpUrl('login')"> Login</span>
      </div>
      <el-form ref="ruleFormRef"
        :inline="true" label-position="top" label-width="80px"
        :model="ruleForm" :rules="rules" class="custom-style-form">
        <el-form-item label="FIRST NAME" prop="firstName">
          <el-input v-model="ruleForm.firstName" ></el-input>
        </el-form-item>
        <el-form-item label="LAST NAME" prop="lastName">
          <el-input v-model="ruleForm.lastName"></el-input>
        </el-form-item>
        <el-form-item label="PHONE" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="EMAIL" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="date of birth" class="birth-box" prop="BirthMonth">
          <el-input v-model="ruleForm.BirthMonth" placeholder="MM"></el-input>
          <el-input v-model="ruleForm.BirthDay" placeholder="DD" style="margin: 0 20px;"></el-input>
          <el-input v-model="ruleForm.BirthYear" placeholder="YYYY"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input v-model="ruleForm.confirmPassword"></el-input>
        </el-form-item>
         <el-form-item label="Address" class="address-box" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="CITY" prop="address">
          <el-input v-model="ruleForm.city"></el-input>
        </el-form-item>
        <el-form-item label="State" class="custom-select" prop="state">
          <el-select v-model="ruleForm.state" placeholder="Select State">
            <el-option
              v-for="item in optionsS.stateType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="zip" prop="zip">
          <el-input v-model="ruleForm.zip"></el-input>
        </el-form-item>
        <el-form-item label="country" class="custom-select" prop="country">
          <el-select v-model="ruleForm.country" placeholder="Select Country">
            <el-option
              v-for="item in optionsS.countryType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="How did you hear about us?" class="custom-select" prop="about">
          <el-select v-model="ruleForm.about" placeholder="Please Select One">
            <el-option
              v-for="item in optionsS.aboutType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-checkbox v-model="data.checked">
        <div class="agree-tip">I agree to receive communications regarding membership, new releases, exclusive offers and tasting events.</div>
      </el-checkbox>

      <el-checkbox v-model="data.ageChecked">
        <div class="agree-tip">I am 21 years or older and agree to the <span class="text-under">terms and conditions</span>.</div>
      </el-checkbox>
      <div class="checkbox-error-message">{{ data.errorMessage }}</div>

      <div class="create-btn flex translate-btn" @click="handleCreate">
        <span>Create Account</span>
        <span class="iconfont icon-xiangyou"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules, FormInstance, ElIcon } from 'element-plus';
import ARROWDOWN from "@/assets/images/home/arrow-down.png";
import { Edit } from '@element-plus/icons';
import { STATETYPE, ABOUTTYPE } from "@/utils/simulatedData";

const router = useRouter();
const ruleFormRef = ref<FormInstance>();

const data = reactive({
  checked: false,
  ageChecked: false,
  errorMessage: '',
});

const ruleForm = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  BirthMonth: '',
  BirthDay: '',
  BirthYear: '',
  password: '',
  confirmPassword: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  about: '',
});

const rules = reactive<FormRules>({
  firstName: [{ required: true, message: 'First Name is required.', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Last Name is required.', trigger: 'blur' }],
  phone: [{ required: true, message: 'Email is required.', trigger: 'blur' }],
  email: [{ required: true, message: 'Phone is required.', trigger: 'blur' }],
  BirthMonth: [{ required: true, message: 'First Name is required.', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required.', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: 'Password Confirmation is required.', trigger: 'blur' }],
  address: [{ required: true, message: 'Address is required.', trigger: 'blur' }],
  city: [{ required: true, message: 'City is required.', trigger: 'blur' }],
  state: [{ required: true, message: 'State is required.', trigger: 'select' }],
  zip: [{ required: true, message: 'Zip is required.', trigger: 'blur' }],
  country: [{ required: true, message: 'Country is required.', trigger: 'select' }],
  about: [{ required: true, message: 'Referral is required.', trigger: 'select' }],
});

const optionsS = reactive({
  stateType: STATETYPE as any,
  countryType: [
    {
      label: 'United States',
      value: 'United States',
    }
  ] as any,
  aboutType: ABOUTTYPE as any,
});

const handleChangePower = (e: any) => {
};

const handleJumpUrl = (name: string) => {
  router.push({ name });
};

const handleCreate = async () => {
  // this.$refs.form.validate(valid => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      if (!data.checked || !data.ageChecked) {
        data.errorMessage = 'You must agree to the terms and conditions.';
        return
      }
      data.errorMessage = '';
    } else {
      console.log('error submit!', fields);
      
    }
  })
}

</script>

<style lang="scss" scoped>
.create-account-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  color: #2E2E2D;

  .form-box {
    border: 1px solid #DBDBDB;
    background: #F7F7F7;
    padding: 60px 274px 120px;
    box-sizing: border-box;

    .title {
      font-family: 'Oswald-Medium';
      font-size: 54px;
      font-style: normal;
      font-weight: 500;
      line-height: 60px;
      letter-spacing: 0.54px;
      text-transform: uppercase;
    }

    .tip {
      font-family: 'Georgia-Regular';
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0.4px;
      margin: 60px 0 30px;
    }

    .login-text {
      font-weight: 700;
      text-decoration-line: underline;
      cursor: pointer;
      
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
      }

      .birth-box {
        width: 91.5%;

        .el-input {
          width: 31.6%;
        }
      }

      .address-box {
        width: 91.5%;
      }

      :deep(.el-form-item__label) {
        font-family: 'Oswald-Regular';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.32px;
        text-transform: uppercase;
      }

      :deep(.el-form-item__content) {
        height: 45px;
        background-color: #F7F7F7;
        
        .el-input {
          height: 45px;
        }

        .el-input__wrapper, .el-select__wrapper {
          height: 45px;
          background-color: #F7F7F7;
          border-radius: 0;
          border: 1px solid #2E2E2D;
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
          // height: 45px;
          background-color: #ffdede;
          // border-radius: 0;
          border: 0;
        }
      }

      .custom-select {

        .el-select {
          height: 45px;
        }
      }
    }

    :deep(.el-checkbox__input) {

      .el-checkbox__inner {
        width: 22px;
        height: 22px;
        border: 1px solid #000;
        font-size: 24px;
      }

      &.is-checked .el-checkbox__inner {
        background-color: #F7F7F7;
      }

      .el-checkbox__inner::after {
        border: 3px solid #000;
        border-left: 0;
        border-top: 0;
        left: 6px;
        top: 3px;
      }

      .el-checkbox__input.is-checked .el-checkbox__inner::after {
        transform: rotate(50deg) scaleY(1.3);
      }
    }

    .agree-tip {
      font-family: 'Oswald-Regular';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.32px;
      text-transform: uppercase;
      color: #2E2E2D;

      .text-under {
        text-decoration-line: underline;
      }
    }

    .checkbox-error-message {
      color: #F00;
      font-family: 'Georgia-Regular';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.4px;
    }

    .create-btn {
      width: 248px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border: 4px solid #2E2E2D;
      box-sizing: border-box;
      color: #2E2E2D;
      font-family: 'Oswald-Regular';
      font-size: 23px;
      font-style: normal;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 40px;
      cursor: pointer;
      justify-content: center;

      .icon-xiangyou {
        font-size: 28px;
        margin-left: 8px;
      }

      &:hover {
       background-color: #2E2E2D;
       color: #fff; 
      }
    }
  }
}
</style>