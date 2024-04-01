<!--
 * 错误页面
 -->
 <template>
  <div>您输入的地址不存在，将在{{ time }}s后返回登录</div>
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