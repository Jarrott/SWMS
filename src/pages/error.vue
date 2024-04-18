<!--
 * 错误页面
 -->
 <template>
  <div class="error-page">
    <div class="title">WE'RE SORRY...</div>
    <div class="error-text">The page you're looking for has either been moved, deleted, or does not exist.</div>
    <div class="error-text">Will return in {{ time }} seconds</div>
  </div>
</template>

<script lang="ts" setup>
import { exit } from '@/utils/utils';

const time = ref(5);
const timer = setInterval(() => {
  time.value--;
  if (time.value === 0) {
    clearInterval(timer);
    exit();
  }
}, 1000);
</script>
<style lang="scss" scoped>
.error-page {
  width: 91%;
  height: 76vh;
  margin: 0 auto;
  box-sizing: border-box;
  color: #2E2E2D;
  background: #F2F2F2;
  padding: 120px 4.5%;

  .title {
    font-size: 82px;
    font-family: 'Oswald-Medium';
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.82px;
    text-transform: uppercase;
  }

  .error-text {
    font-size: 24px;
    font-family: 'Georgia-Italic';
    font-style: italic;
    font-weight: 400;
    line-height: 38px;
    letter-spacing: 0.4px;
    margin-top: 24px;
  }
}
</style>
