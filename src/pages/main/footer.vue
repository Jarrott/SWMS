<template>
  <div class="footer-content">
    <div class="join-club">
      <div class="join-club-box"><img src="@/assets/images/home/icon9.png" alt="" /></div>
      <div class="join-right-box">
        <div class="name">未成年の飲酒は法律で禁止されています。</div>
        <div>飲酒は20歳になってから。飲酒運転は法律で禁止されています。</div>
        <div>妊娠中や授乳期の飲酒は、胎児・乳児の発育に悪影響を与えるおそれがあります。</div>
      </div>
    </div>

    <div class="other-info flex">
      <div class="other-info-left">
        <img class="info-icon" src="@/assets/images/home/icon11.png" alt="">
        <div>安全なお支払い</div>
      </div>
      <div class="other-info-middle">
        <img class="info-middle-icon" src="@/assets/images/home/icon10.png" alt="" />
      </div>
      <div class="other-info-left">
        <img class="info-icon" src="@/assets/images/home/icon12.png" alt="">
        <div>日本配送</div>
      </div>
    </div>

    <div class="company-info">
      <div class="company-info-smws">
        <div class="title">ヘルプ&サポート</div>
        <div class="little-title">ショッピングガイド</div>
        <div class="little-title">会員規約</div>
        <div class="little-title">ポイントシステム規約</div>
      </div>
      <div class="company-info-more">
        <div class="title"></div>
        <div class="little-title">ポイントシステム規約</div>
        <div class="little-title">特定商取引法に基づく表記</div>
        <div class="little-title">セキュリティについて</div>
      </div>
      <div class="company-info-stay">
        <img class="logo-icon" src="@/assets/images/home/vector.png" alt="">
      </div>
      <div class="company-info-right">
        <div class="name">会員について</div>
        <div>ご入会</div>
        <div>更新手続き</div>
      </div>
    </div>
    <div class="copyright-box flex">
      <div class="copy-left">© THE SCOTCH MALT WHISKY SOCIETY.</div>
      <div class="copy-right flex">
        <img class="copy-icon" src="@/assets/images/home/icon3.png" alt="">
        <img class="copy-icon" src="@/assets/images/home/icon8.png" alt="">
        <img class="copy-icon" src="@/assets/images/home/icon4.png" alt="">
        <img class="copy-icon" src="@/assets/images/home/icon5.png" alt="">
        <img class="copy-icon" src="@/assets/images/home/icon7.png" alt="">
      </div>
    </div>
    
  </div>
</template>

<script lang="ts" setup name="dialog-pws">
import type { FormInstance, FormRules } from 'element-plus';
import { getMd5, exit } from '@/utils/utils';

const ruleFormRef = ref<FormInstance>();

const show = () => {
  dialogVisible.value = true;
};

const data = reactive({
  name: '',
  email: '',
})

defineExpose({
  show,
});
</script>
<style lang="scss" scoped>
.footer-content {
  padding: 100px 0px 20px;
  color: #2e2e2d;
  font-family: Oswald;
  background-color: #fff;

  .join-club {
    color: #2E2E2D;
    font-size: 16px;
    line-height: 124px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;

    &-box {
      img {
        width: 40px;
        height: 64px;
      }
    }

    .join-right-box {
      color: #2E2E2D;
      font-family: Oswald;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
      text-transform: uppercase;
      width: 585px;
      margin-left: 28px;
      box-sizing: border-box;
      padding: 0 20px;

      .name {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
      }
    }
  }

  .other-info {
    border-top: 1px solid #868686;
    border-bottom: 1px solid #868686;
    height: 160px;
    color: #2E2E2D;
    font-family: "PingFang SC";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 60px;

    div {
      flex: 1;
      text-align: center;
    }

    .info-middle-icon {
      width: 410px;
    }

    .info-icon {
      width: 44px;
      height: 44px;
      margin-bottom: 6px;
    }
  }

  .company-info {
    display: flex;
    padding: 30px 86px 20px;

    .title {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .little-title {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      margin-bottom: 8px;
    }

    &-smws {
      width: 15%;
    }

    &-more {
      margin-top: 28px;
      width: 15%;
    }

    &-stay {
      width: 40%;
      padding: 10px 20px;
      box-sizing: border-box;
      text-align: center;

      .logo-icon {
        width: 110px;
        height: 110px;
      }
    }

    &-right {
      width: 30%;
      text-align: right;
      font-size: 12px;
      font-weight: 400;

      .name {
        font-size: 14px;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }

  .copyright-box {
    box-sizing: border-box;
    padding: 20px 86px;
    color: #2E2E2D;
    font-family: Oswald;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;

    .copy-left {
      width: 30%;
    }

    .copy-right {
      text-align: center;
      width: 38%;
      justify-content: center;
    }

    .copy-icon {
      width: 24px;
      height: 24px;
      margin-left: 26px;
    }
  }
}
</style>
