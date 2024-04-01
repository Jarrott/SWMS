<template>
  <div class="login-wrap">
    <div class="login-wrap-left">
      <h2>MEMBER LOGIN</h2>
      <div class="form-box">
        <div class="form-box-item">
          <div class="label">EMAIL</div>
          <div class="item-input">
            <el-input v-model="data.email" class="form-input" placeholder=""></el-input>
          </div>
        </div>
        <div class="form-box-item">
          <div class="label">PASSWORD</div>
          <div class="item-input">
            <el-input v-model="data.password" class="form-input" placeholder=""></el-input>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <div class="join-btn login-btn flex">
          <span>LOGIN</span>
          <div class="iconfont icon-jiantou-you"></div>
        </div>
        <div class="forgot-text">Forgot your password?</div>
      </div>
    </div>
    <div class="login-wrap-right">
      <h2>NOT A MEMBER YET?</h2>
      <div>Sign up for a member account to take advantage of all the benefits offered by the Scotch Malt Whisky Society.</div>
      <div class="join-btn flex">
        <span>JOIN</span>
        <div class="iconfont icon-jiantou-you"></div>
      </div>    
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus';
import bg1 from '@/assets/images/login/bg1.png';
import bg2 from '@/assets/images/login/bg2.png';
import icon from '@/assets/images/login/img.png';
import {
  sendSmsCode,
  login,
  queryMenuTree,
  queryButtonList,
} from '@/service/apis/api';
import { getMd5 } from '@/utils/utils';

const router = useRouter();
const formRef = ref<FormInstance>();

const title = document.title;

const ruleForm = reactive({
  userName: '',
  password: '',
  smsCode: '',
});

// 记住账号密码
let savePws = ref(false);
const saveLogin = window.localStorage.getItem('login');
if (saveLogin) {
  savePws.value = true;
  const obj = JSON.parse(saveLogin);
  ruleForm.userName = obj.userName;
  ruleForm.password = obj.password;
}

// 获取验证码
const data = reactive({
  email: '',
  password: '',
});
const clickCode = () => {
  
};

// 登录
const clickLogin = async () => {
  router.push({
    name: 'home',
  });

};

const keydownEvent = () => {
  document.onkeydown = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      clickLogin();
    }
  };
};

onMounted(() => {
  window.addEventListener('keydown', keydownEvent, true);
});

onUnmounted(() => {
  window.removeEventListener('keydown', keydownEvent, true);
});
</script>

<style lang="scss" scoped>
.login-wrap {
  padding: 0 4.5%;
  justify-content: space-between;
  display: flex;

  &-left {
    flex: 1;
    background-color: #f7f7f7;
    border: 1px solid #dbdbdb;
    min-height: 450px;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 60px 4.5%;
    color: #2e2e2d;
    font-family: Oswald, sans-serif;
    
    h2 {
      font-size: 2.7em;
      font-weight: 500;
      letter-spacing: .01em;
      line-height: 1.1em;
      text-transform: uppercase;
    }

    .form-box {
      &-item {
        margin-bottom: 35px;

        .label {
          margin-bottom: 5px;
        }

        .form-input {
          height: 45px;
          border: 1px solid #2e2e2d;
          box-sizing: border-box;

          :deep(.el-input__wrapper) {
            border-radius: 0;
            border: 0;
            
          }
        }
      }
    }

    .btn-box {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .forgot-text {
        font-size: 18px;
        font-weight: 500;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  &-right {
    flex: 1;
    background-color: #202448;
    min-height: 450px;
    box-sizing: border-box;
    padding: 110px 4.5% 60px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-family: Oswald,sans-serif;

    h2 {
      font-family: Oswald, sans-serif;
      font-size: 2.7em;
      font-weight: 500;
      letter-spacing: .01em;
      line-height: 1.1em;
      text-transform: uppercase;
      margin-bottom: 30px;
    }
  }

  .join-btn {
    width: 130px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-family: Oswald,sans-serif;
    font-weight: 600;
    border: 4px solid #fff;
    box-sizing: border-box;
    justify-content: center;
    font-size: 23px;
    margin-top: 32px;
    cursor: pointer;

    .icon-jiantou-you {
      font-weight: 700;
      font-size: 23px;
      margin-left: 10px;
    }
  }
  
  .login-btn {
    border: 4px solid #2e2e2d;
    color: #2e2e2d;
  }
}
</style>