<template>
  <div>
    <div class="goods-filter-top-box">
      <div class="top-left">
        <div class="text1">COLLECTION</div>
        <div class="text2">{{ prop.title }}</div>
        <div class="tags-box flex">
          <div class="tags-item flex" v-for="(tag, tagIndex) in checkedTagListComputed" :key="tagIndex">
            <span>{{ tag.name }}</span>
              <div class="iconfont icon-chahao1" @click="handleTagRemove(tag)"></div>
          </div>
        </div>
      </div>
      <div class="top-right flex">
        <div class="sort-box flex" v-if="type=='goodList'">
          <div>表示:</div>
          <el-select v-model="data.express" placeholder="" class="custom-select-box express-select">
            <el-option
              v-for="item in data.expressOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="sort-box flex">
          <div>SORT BY:</div>
          <el-select v-model="data.sortValue" placeholder="" class="custom-select-box">
            <el-option
              v-for="item in data.sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filter-box" @click="handleOpenDrawer">
          <span>FILTER BY:</span>
          <img class="filter-icon" src="@/assets/images/goods/filter.png" alt="" />
        </div>
      </div>
    </div>

  <!-- 右侧筛选条件 -->
  <el-drawer
    title="我是标题"
    v-model="data.drawer"
    direction="rtl"
    :with-header="false"
    class="custom-drawer-info-box">
    <div class="filter-drawer-content">
      <div class="back-icon">
        <img src="@/assets/images/goods/filter-close-arrow.png" alt="" @click="data.drawer=false" />
      </div>
      <div class="filer-title-box flex">
        <span class="text-by">Filter By:</span>
        <span class="text-all" @click="handleClearAll">Clear All</span>
      </div>
      <div class="filter-row">
        <div class="filter-row-title">Flavor Profile</div>
        <div class="ul-box">
          <div class="row-li flex" v-for="(flavorItem, fIndex) in data.checkListData" :key="fIndex" @click="handleFilterClick('flavor', flavorItem)">
            <div class="check-icon"><span :class="flavorItem.isChecked?'active-checked':''"></span></div>
            <div>{{ flavorItem.name }}</div>
          </div>
        </div>
      </div>

      <div class="filter-row">
        <div class="filter-row-title">Age</div>
        <div class="ul-box">
          <div class="row-li flex" v-for="(ageItem, aIndex) in data.checkListAgeData" :key="aIndex" @click="handleFilterClick('age', ageItem)">
            <div class="check-icon"><span :class="ageItem.isChecked?'active-checked':''"></span></div>
            <div>{{ ageItem.name }}</div>
          </div>
        </div>
      </div>

      <div class="filter-row">
        <div class="filter-row-title">Age</div>
        <div class="ul-box region-ul">
          <div class="row-li flex" v-for="(regionItem, rIndex) in data.checkListRegionData" :key="rIndex" @click="handleFilterClick('region', regionItem)">
            <div class="check-icon"><span :class="regionItem.isChecked?'active-checked':''"></span></div>
            <div>{{ regionItem.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</div>
</template>
<script lang="ts" setup>
interface Props {
  type?: any;
  title?: any;
}
const prop = withDefaults(defineProps<Props>(), {
  type: 'goodList' as any,
  title: 'ALL PRODUCTS',
});

const data = reactive({
  drawer: false,
  express: 16,
  sortValue: 'Featured',
  sortOptions: [
    {
      value: 'Featured',
      label: 'Featured'
    },
    {
      value: 'Cask: A - Z',
      label: 'Cask: A - Z'
    },
    {
      value: 'Cask: Z - A',
      label: 'Cask: Z - A'
    },
    {
      value: '$ High - Low',
      label: '$ High - Low'
    },
    {
      value: '$ Low - High',
      label: '$ Low - High'
    },
    {
      value: 'Newest - Oldest',
      label: 'Newest - Oldest'
    },
    {
      value: 'Oldest - Newest',
      label: 'Oldest - Newest'
    },
    {
      value: 'Stock: High - Low',
      label: 'Stock: High - Low'
    },
    {
      value: 'Stock: Low - High',
      label: 'Stock: Low - High'
    }
  ] as any,
  expressOptions: [
    {
      value: '8',
      label: '8'
    },
    {
      value: '16',
      label: '16'
    },
    {
      value: '32',
      label: '32'
    },
    {
      value: '64',
      label: '64'
    },
    {
      value: '128',
      label: '128'
    }
  ] as any,
  drawerFilter: false,
  checkListData: [
    {
      name: 'Young & Spritely',
      isChecked: false,
      type: 'flavor',
      id: 1,
    },
    {
      name: 'Oily & Coastal',
      isChecked: false,
      type: 'flavor',
      id: 2,
    },
    {
      name: 'Deep Rich & Dried Fruits',
      isChecked: false,
      type: 'flavor',
      id: 3,
    },
    {
      name: 'Juicy Oak & Vanilla',
      isChecked: false,
      type: 'flavor',
      id: 4,
    },
    {
      name: 'Light & Delicate',
      isChecked: false,
      type: 'flavor',
      id: 5,
    },
    {
      name: 'Lightly Peated',
      isChecked: false,
      type: 'flavor',
      id: 6,
    }, 
    {
      name: 'Old & Dignified',
      isChecked: false,
      type: 'flavor',
      id: 7,
    }, 
    {
      name: 'Peated',
      isChecked: false,
      type: 'flavor',
      id: 8,
    }, 
    {
      name: 'Spicy & Dry',
      isChecked: false,
      type: 'flavor',
      id: 9,
    }, 
    {
      name: 'Spicy & Sweet',
      isChecked: false,
      type: 'flavor',
      id: 10,
    }, 
    {
      name: 'Sweet Fruity & Mellow',
      isChecked: false,
      type: 'flavor',
      id: 11,
    }, 
    {
      name: 'Heavily Peated',
      isChecked: false,
      type: 'flavor',
      id: 12,
    }
  ] as any,
  checkListAgeData: [
    {
      name: '10 years and under',
      isChecked: false,
      type: 'age',
      id: 1,
    },
    {
      name: '11 - 15 years',
      isChecked: false,
      type: 'age',
      id: 2,
    },
     {
      name: '16 - 20 years',
      isChecked: false,
      type: 'age',
      id: 3,
    },
    {
      name: '21 -25 years',
      isChecked: false,
      type: 'age',
      id: 4,
    }, {
      name: '26 - 30 years',
      isChecked: false,
      type: 'age',
      id: 5,
    },
    {
      name: '31 years and above',
      isChecked: false,
      type: 'age',
      id: 6,
    }
  ] as any,
  checkListRegionData: [
    {
      name: 'India',
      isChecked: false,
      type: 'region',
      id: 1,
    }
  ] as any,
});

const checkedTagListComputed = computed(() => {
  let list: any = [];
  data.checkListData.map((f: any) => {
    if (f.isChecked) {
      list.push(f);
    }
  });
  data.checkListAgeData.map((a: any) => {
    if (a.isChecked) {
      list.push(a);
    }
  });
  data.checkListRegionData.map((r: any) => {
    if (r.isChecked) {
      list.push(r);
    }
  });
  return list;
});

// 单个-移除筛选条件项
const handleTagRemove = (item: any) => {
  if (item.type === 'flavor') {
    data.checkListData.map((f: any) => {
      if (f.id === item.id) {
        f.isChecked = false;
      }
    });
  } else if (item.type === 'age') {
    data.checkListAgeData.map((a: any) => {
      if (a.id === item.id) {
        a.isChecked = false;
      }
    });
  } else {
    data.checkListRegionData.map((r: any) => {
      if (r.id === item.id) {
        r.isChecked = false;
      }
    });
  }
};

// 打开筛选抽屉
const handleOpenDrawer = () => {
  data.drawer = true;
};

// 筛选条件是否选中
const handleFilterClick = (type: string, item: any) => {
  item.isChecked = !item.isChecked;
};

// 清除所有的选中项
const handleClearAll = () => {
  data.checkListData.map((f: any) => {
    f.isChecked = false;
  });
  data.checkListAgeData.map((a: any) => {
    a.isChecked = false;
  });
  data.checkListRegionData.map((r: any) => {
    r.isChecked = false;
  });
}
</script>
<style lang="scss" scoped>
.goods-filter-top-box {
  background: #F7F7F7;
  min-height: 143px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  .top-left {
    color: #2E2E2D;
    font-family: 'Oswald-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.8px;
    padding: 24px 0 0 80px;
    box-sizing: border-box;

    .text2 {
      color: #2E2E2D;
      font-family: 'Oswald-Medium';
      font-size: 35px;
      font-style: normal;
      font-weight: 500;
      line-height: 35px;
      letter-spacing: 2px;
      margin-top: 6px;
      text-transform: uppercase;
    }

    .tags-box {
      margin-top: 20px;
      width: calc(100% - 50px);
      flex-wrap: wrap;

      .tags-item {
        color: #2E2E2D;
        font-family: 'Oswald-Medium';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: 0.8px;
        padding: 0 24px 0 0px;
        box-sizing: border-box;
        border-right: 1px solid #2E2E2D;
        margin-bottom: 10px;
        margin-right: 24px;

        .icon-chahao1 {
          margin-left: 8px;
          cursor: pointer;
          font-size: 18px;
        }

        &:last-child {
          border-right: 0;
          margin-right: 0;
        }

        &:nth-child(4n) {
          border-right: 0;
        }
      }
    }
  }

  .top-right {

    .sort-box {
      margin-right: 64px;
      white-space: nowrap;
      font-size: 18px;
      color: #2E2E2D;
      font-weight: 600;
      font-family: 'Oswald-Medium';

      .icon-arrow {
        width: 16px;
        height: 12px;
        margin-left: 10px;
        vertical-align: middle;
      }
    }
    .filter-box {
      width: 254px;
      height: 100%;
      background: #EFEFEF;
      color: #2E2E2D;
      font-family: 'Oswald-Medium';
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.4px;
      text-align: center;
      line-height: 143px;
      cursor: pointer;

      .filter-icon {
        width: 30px;
        height: 16px;
        margin-left: 22px;
      }
    }
  }
}

.express-select {
  width: 80px;
}

.custom-drawer-info-box {
  color: #2E2E2D;
  font-style: normal;
  font-family: 'Oswald-Medium';

  .el-drawer__body {
    padding: 0!important;
    
  }
  .back-icon {
    border-bottom: 1px solid #000000;
    height: 50px;
    line-height: 50px;
    img {
      width: 26px;
      height: 16px;
      cursor: pointer;
    }
  }

  .filer-title-box {
    font-family: 'Oswald-Medium';
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.28px;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 18px 0px 28px;
    border-bottom: 1px solid #CDCDCD;
    color: #2E2E2D;

    .text-by {
      font-size: 18px;
      line-height: 18px;
    }

    .text-all {
      text-decoration-line: underline;
      cursor: pointer;
    }
  }

  .filter-row {
    &-title {
      font-size: 30px;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      margin-top: 20px;
      margin-bottom: 18px;
    }

    .ul-box {
      margin-left: 0;
      box-sizing: border-box;
      border-bottom: 1px solid #CDCDCD;

      &.region-ul {
        border-bottom: 0;
      }

      .row-li {
        font-family: 'Oswald-Regular';
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.32px;
        text-transform: uppercase;
        color: #2E2E2D;
        margin-bottom: 24px;
        cursor: pointer;

        .check-icon {
          width: 20px;
          height: 20px;
          border-radius: 2px;
          border: 1px solid #707070;
          margin-right: 10px;
          box-sizing: border-box;
          text-align: center;
          line-height: 20px;

          .active-checked {
            display: inline-block;
            background-color: #2E2E2D;
            width: 13px;
            height: 13px;
          }
        }
      }
    }

    
  }
}
</style>


