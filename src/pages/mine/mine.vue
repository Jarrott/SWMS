 <template>
  <div class="mine-page">
    <div class="mine-left">
      <div class="title">My Menu</div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo">
        <el-menu-item index="1" v-for="(menuItem, index) in data.menuList" :key="index" @click="handleClickMenu(menuItem)">
          <span slot="title">{{ menuItem.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="mine-right">
      <el-scrollbar class="mine-page-scrollbar">
        <div class="mine-page-wrap">
          <router-view
            ref="RouterView"
            :key="$route.path"
          ></router-view>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { exit } from '@/utils/utils';

const route = useRoute();
const router = useRouter();

const data = reactive({
  menuList: [
    {
      name: 'Account Dashboard',
      path: 'mine',
    },
    {
      name: 'Account Information',
      path: 'infoEdit',
    },
    {
      name: 'Address Book',
      path: '',
    },
    {
      name: 'My Orders',
      path: '',
    },
    {
      name: 'My Product Reviews',
      path: '',
    },
    {
      name: 'Customer Points',
      path: '',
    },
    {
      name: 'Log Out',
      path: '',
    },
    {
      name: 'Member Cancellation',
      path: '',
    },
  ] as any,
});

const handleClickMenu = (item) => {
  router.push({
    path: item.path,
  });
}

</script>
<style lang="scss" scoped>
.mine-page {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-family: 'Oswald-Medium';
  color: #2E2E2D;
  display: flex;
  padding-top: 80px;

  .mine-left {
    width: 142px;
    margin-right: 115px;
    margin-left: 174px;
    // padding-top: 44px;
    box-sizing: border-box;

    :deep(.el-menu) {
      border-right: 0;

      .el-menu-item.is-active {
        color: #2099A3;
        font-size: 16px;
        font-style: normal;
        font-weight: 500; 
        letter-spacing: 0.36px;
        text-transform: capitalize;
        margin: 0;
        padding: 0;
        height: 50px;
        line-height: 50px;

      }
    }

    .title {
      color: #686868;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.36px;
      text-transform: capitalize;
      margin-bottom: 12px;
    }
  }

  .mine-right {
    width: calc(100% - 432px);
    // padding-top: 44px;
    box-sizing: border-box;
    color: #2E2E2D;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: uppercase;

    .mine-page-scrollbar {
      width: 100%;
      height: calc(100vh - 120PX);

      :deep(.el-scrollbar__view) {
        height: auto;
      }

      .mine-page-wrap {
        height: 100%;
      }
    }
  }
}
</style>
