<template>
  <div class="login-wrap">
    <div class="login-wrap-left">
      <h1>MEMBER LOGIN</h1>
      <div class="form-box">
        <div class="form-box-item">
          <div class="label">EMAIL</div>
          <div class="item-input">
            <el-input v-model="data.email" class="form-input" :class="{'ErrorBorder': emailError}"></el-input>
          </div>
          <div v-if="emailError" class="error-text">{{ emailError }}</div>
        </div>
        <div class="form-box-item">
          <div class="label">PASSWORD</div>
          <div class="item-input">
            <el-input v-model="data.password" class="form-input" :class="{'ErrorBorder': passwordError}"></el-input>
          </div>
          <div v-if="passwordError" class="error-text">{{ passwordError }}</div>
        </div>
      </div>
      <div class="btn-box">
        <div class="join-btn login-btn flex translate-btn" @click="clickLogin">
          <span>LOGIN</span>
          <div class="iconfont icon-jiantou-you"></div>
        </div>
        <div class="forgot-text" @click="handleJumpUrl('forgotPwd')">Forgot your password?</div>
      </div>
    </div>
    <div class="login-wrap-right">
      <h2>NOT A MEMBER YET?</h2>
      <div>Sign up for a member account to take advantage of all the benefits offered by the Scotch Malt Whisky Society.</div>
      <div class="join-btn flex translate-btn" @click="handleJumpUrl('join')">
        <span>JOIN</span>
        <div class="iconfont icon-jiantou-you"></div>
      </div>    
    </div>
  </div>
</template>

<script lang="ts" setup>

const router = useRouter();

const data = reactive({
  email: '',
  password: '',
});

const emailError = ref('');
const passwordError = ref('');


const handleJumpUrl = (name: string) => {
  router.push({ name });
};

// 登录
const clickLogin = async () => {
  if (!data.email) {
    emailError.value = 'Email is required.';
  }
  if (!data.password) {
    passwordError.value = 'Password is required.';
  }
  if (data.email && data.password) {
    emailError.value = '';
    passwordError.value = '';
    window.localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50Q29kZSI6ImFkbWluIiwiYWNjb3V');
    router.push({
      name: 'home',
    });
  }
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
  margin-top: 60px;

  &-left {
    flex: 1;
    background-color: #f7f7f7;
    border: 1px solid #dbdbdb;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 60px 4.5%;
    color: #2e2e2d;
    font-family: 'Oswald-Medium', sans-serif;
    
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
          font-size: 16px;
        }

        .form-input {
          height: 45px;
          border: 1px solid #2e2e2d;
          box-sizing: border-box;

          :deep(.el-input__wrapper) {
            border-radius: 0;
            border: 0;
            
          }

          &.ErrorBorder {
            border: 1px solid red;
          }
        }

        .error-text {
          color: red;
          font-family: 'Oswald-Medium';
          margin-top: 4px;
          font-size: 14px;
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
        font-family: 'Oswald-Regular';
      }
    }
  }

  &-right {
    flex: 1;
    background-color: #202448;
    // min-height: 450px;
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

    &:hover {
      background-color: #fff;
      color: #2e2e2d;
    }

    .icon-jiantou-you {
      font-weight: 700;
      font-size: 23px;
      margin-left: 10px;
    }
  }
  
  .login-btn {
    border: 4px solid #2e2e2d;
    color: #2e2e2d;

    &:hover {
      background-color: #2e2e2d;
      color: #fff;
    }
  }
}
</style>