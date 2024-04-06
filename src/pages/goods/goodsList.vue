<template>
  <div class="goods-page-wrap">
    <div class="goods-top-box">
      <div class="top-left">
        <div class="text1">COLLECTION</div>
        <div class="text2">ALL PRODUCTS</div>
        <div class="tags-box flex">
          <div class="tags-item flex" v-for="(tag, tagIndex) in checkedTagListComputed" :key="tagIndex">
            <span>{{ tag.name }}</span>
             <div class="iconfont icon-chahao1" @click="handleTagRemove(tag)"></div>
          </div>
        </div>
      </div>
      <div class="top-right flex">
        <div class="sort-box flex">
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

    <div class="list-box">

      <div class="row-item"
        v-for="(goodsItem, index) in data.goodsListData" :key="index" @click.stop="handleJumpDetails(goodsItem.id)">

        <img class="new-icon" v-if="goodsItem.isNew" src="@/assets/images/goods/new.png" alt="">

        <img class="right-icon" v-if="goodsItem.isRightIcon" :src="goodsItem.isRightIcon" alt="">
        <img class="sign-icon" v-if="goodsItem.isSignIcon" :src="goodsItem.isSignIcon" alt="">

        
        <template v-if="index===0 || index===1">
          <div class="img-box" v-if="index===0"><img class="item-icon" src="@/assets/images/goods/icon1.png" alt="" /></div>
          <div class="img-box" v-else-if="index===1"><img class="item-icon" src="@/assets/images/goods/icon2.png" alt="" /></div>
          <div class="text">{{ goodsItem.no }}</div>
          <div class="title">{{ goodsItem.title }}</div>
        </template>

        <template v-else>
          <div class="img-box">
            <img class="goods-icon" :src="goodsItem.img" alt="" />
          </div>
          <div class="info-box" v-if="goodsItem.type === 2">
            <div class="text1">{{ goodsItem.no }}</div>
            <div class="title bottom-title" :style="`color: ${goodsItem.color};`">{{ goodsItem.title }}</div>
            <div class="info-item flavour">
              <span class="label">FLAVOUR:</span>
              <span class="value" :style="`color: ${goodsItem.color};`">{{ goodsItem.flavour }}</span>
            </div>
            <div class="info-item">
              <span class="label">AGE:</span>
              <span class="value">{{ goodsItem.age }}</span>
            </div>
            <div class="info-item">
              <span class="label">REGION:</span>
              <span class="value">{{ goodsItem.region }}</span>
            </div>
            <div class="info-item">
              <span class="label">CASK:</span>
              <span class="value">{{ goodsItem.cask }}</span>
            </div>
          </div>
          <div class="info-desc-box" v-if="goodsItem.type === 3">
            <div class="text2">{{ goodsItem.no }}</div>
            <div class="title">{{ goodsItem.title }}</div>
            <div class="desc">{{ goodsItem.desc }}</div>
          </div>
          <div class="price-box flex">
            <span>{{ goodsItem.price1 }}</span>
            <span>{{ goodsItem.price2 }}</span>
          </div>
        </template>

        <div class="btn-box flex">
          <div class="btn btn1 flex" v-if="goodsItem.type===1">
            <span>ADD TO CART</span>
            <span class="iconfont icon-xiangyou"></span>
          </div>
          <div class="btn btn1 flex" v-else
          :style="[goodsItem.hovered ? `border:1px solid ${goodsItem.color};color: ${goodsItem.color};background:#fff;`: `background: ${goodsItem.color};border:1px solid ${goodsItem.color};color:#fff;`]"
          @mouseover="goodsItem.hovered = true"
          @mouseleave="goodsItem.hovered = false">
            <span>JOIN</span>
            <span class="iconfont icon-xiangyou" ></span>
          </div>

          <div class="btn btn2 flex"
          :style="[goodsItem.hovered1 ? `background: ${goodsItem.color};border:1px solid ${goodsItem.color};color:#fff;` : `border:1px solid ${goodsItem.color};color: ${goodsItem.color};background:#fff;`]"
          @mouseover="goodsItem.hovered1 = true"
          @mouseleave="goodsItem.hovered1 = false">
            <span>MORE INFO</span>
            <span class="iconfont icon-xiangyou"></span>
          </div>
        </div>
      </div>
    </div>



    <!-- 右侧筛选条件 -->
    <el-drawer
      title="我是标题"
      v-model="drawer"
      direction="rtl"
      :with-header="false"
      class="custom-drawer-info-box">
      <div class="filter-drawer-content">
        <div class="back-icon">
          <img src="@/assets/images/goods/filter-close-arrow.png" alt="" />
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
import goods_2 from "@/assets/images/goods/goods_2.png";
import goods_3 from "@/assets/images/goods/goods_3.png";
import goods_4 from "@/assets/images/goods/goods_4.png";
import goods_5 from "@/assets/images/goods/goods_5.png";
import goods_6 from "@/assets/images/goods/goods_6.png";
import goods_7 from "@/assets/images/goods/goods_7.png";
import goods_8 from "@/assets/images/goods/goods_8.png";
import goods_9 from "@/assets/images/goods/goods_9.png";
import goods_10 from "@/assets/images/goods/goods_10.png";
import goods_11 from "@/assets/images/goods/goods_11.png";
import goods_12 from "@/assets/images/goods/goods_12.png";
import goods_13 from "@/assets/images/goods/goods_13.png";
import goods_14 from "@/assets/images/goods/goods_14.png";
import goods_15 from "@/assets/images/goods/goods_15.png";
import goods_16 from "@/assets/images/goods/goods_16.png";
import goods_17 from "@/assets/images/goods/goods_17.png";

import goods_icon_5 from "@/assets/images/goods/goods_icon_5.png";
import goods_icon_8 from "@/assets/images/goods/goods_icon_8.png";
import goods_icon_9 from "@/assets/images/goods/goods_icon_9.png";
import goods_icon_10 from "@/assets/images/goods/goods_icon_10.png";
import goods_icon_11 from "@/assets/images/goods/goods_icon_11.png";
import goods_icon_12 from "@/assets/images/goods/goods_icon_12.png";
import goods_icon_13 from "@/assets/images/goods/goods_icon_13.png";
import goods_icon_16 from "@/assets/images/goods/goods_icon_16.png";
import goods_icon_17 from "@/assets/images/goods/goods_icon_17.png";

import goods_sign_13 from "@/assets/images/goods/goods_sign_13.png";
import goods_sign_17 from "@/assets/images/goods/goods_sign_17.png";

const router = useRouter();
const drawer = ref(false);

const emit = defineEmits(['clear-cache']);

const data = reactive({
  tagsList: ['Old & dignified', 'Oily & coastal', 'Deep rich & dried fruits'] as any,
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
  goodsListData: [
    {
      img: '',
      no: 'GIFT',
      title: 'GIFT MEMBERSHIP',
      type: 1,
      color: '#2E2E2D',
      hovered: false,
      hovered1: false,
      id: 1,
    },
    {
      img: '',
      no: 'GIFT',
      title: 'GIFT CARD',
      type: 1,
      color: '#2E2E2D',
      hovered: false,
      hovered1: false,
      id: 2,
    },
    {
      img: goods_2,
      no: 'CASK NO. 4.294',
      title: 'AN AURA OF RESPECTABILITY',
      type: 2,
      flavour: 'Lightly Peated',
      age: '18 years',
      region: 'Highland, Island',
      cask: 'First Fill Pedro Ximenez barrique STR',
      price1: '$325',
      price2: '41 left',
      color: '#BDD78D',
      hovered: false,
      hovered1: false,
      id: 3,
    },
    {
      img: goods_3,
      no: 'CASK NO. 4.303',
      title: 'A nocturne sipper',
      type: 2,
      flavour: 'Oily & Coastal',
      age: '16 years',
      region: 'Highland, Island',
      cask: 'First Fill Pedro Ximenez barrique STR',
      price1: '$250',
      price2: '56 left',
      color: '#276B9A',
      isNew: true,
      hovered: false,
      hovered1: false,
      id: 4,
    },
    {
      img: goods_4,
      no: 'CASK NO. 6.69',
      title: 'Tyrant, show thy face!',
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '10 years',
      region: 'Highland Southern',
      cask: 'Second-fill Sherry butt',
      price1: '$125',
      price2: '58 left',
      color: '#71307C',
      hovered: false,
      hovered1: false,
      id: 5,
    },
    {
      img: goods_5,
      no: 'CASK NO. 9.291',
      title: 'Roll on a happy hay bale',
      type: 2,
      flavour: 'Oily & Coastal',
      age: '20 years',
      region: 'Speyside Spey',
      cask: 'First-fill barrel',
      price1: '$290',
      price2: '36 left',
      color: '#AC599E',
      isNew: true,
      isRightIcon: goods_icon_5,
      hovered: false,
      hovered1: false,
      id: 6,
    },
    {
      img: goods_6,
      no: 'CASK NO. 12.80',
      title: 'Heaven in a leather hammock',
      type: 2,
      flavour: 'Spicy & Dry',
      age: '34 years',
      region: 'Speyside, Lossie',
      cask: 'First-fill Spanish oak Pedro Ximenez butt',
      price1: '$1,195',
      price2: '13 left',
      color: '#F8AE53',
      hovered: false,
      hovered1: false,
      id: 7,
    },
    {
      img: goods_7,
      no: 'CASK NO. 6.69',
      title: 'The rose garden',
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '19 years',
      region: 'Highland Eastern',
      cask: 'First-fill barrel',
      price1: '$240',
      price2: '40 left',
      color: '#71307C',
      hovered: false,
      hovered1: false,
      id: 8,
    },
    {
      img: goods_8,
      no: 'CASK NO. 35.331',
      title: 'Ultra hoggie',
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '27 years',
      region: 'Speyside, Lossie',
      cask: 'First-fill toasted oak hogshead',
      price1: '$445',
      price2: '27 left',
      color: '#BC3434',
      isRightIcon: goods_icon_8,
      hovered: false,
      hovered1: false,
      id: 9,
    },
    {
      img: goods_9,
      no: 'CASK NO. 53.430',
      title: "Doesn't hold back",
      type: 2,
      flavour: 'Peated',
      age: '10 years',
      region: 'Islay',
      cask: 'Refill hogshead',
      price1: '$150',
      price2: '78 left',
      color: '#74AF3E',
      isNew: true,
      isRightIcon: goods_icon_9,
      hovered: false,
      hovered1: false,
      id: 10,
    },
    {
      img: goods_10,
      no: 'CASK NO. 146.2',
      title: "Join the great tumult",
      type: 2,
      flavour: 'Spicy & Sweet',
      age: '6 years',
      region: 'England',
      cask: 'First-fill barrique, shaved/toasted/re-charred',
      price1: '$145',
      price2: '44 left',
      color: '#71307C',
      isRightIcon: goods_icon_10,
      hovered: false,
      hovered1: false,
      id: 11,
    },
    {
      img: goods_11,
      no: 'CASK NO. G8.27',
      title: "Looks good in leather",
      type: 2,
      flavour: 'Spicy & Dry',
      age: '32 years',
      region: 'Lowland',
      cask: 'First-fill barrel',
      price1: '$295',
      price2: '31 left',
      color: '#F8AE53',
      isNew: true,
      isRightIcon: goods_icon_11,
      hovered: false,
      hovered1: false,
      id: 12,
    },
    {
      img: goods_12,
      no: 'CASK NO. 41.176',
      title: "Baristaliscious",
      type: 2,
      flavour: 'Juicy Oak & Vanilla',
      age: '17 years',
      region: 'Speyside Spey',
      cask: 'First-fill Chinkapin oak barrel, HTMC',
      price1: '$185',
      price2: '4 left',
      color: '#60A8D3',
      isRightIcon: goods_icon_12,
      hovered: false,
      hovered1: false,
      id: 13,
    },
    {
      img: goods_13,
      no: 'CASK NO. 44.145',
      title: "Pilgrimage to El Rocio",
      type: 2,
      flavour: 'Deep Rich & Dried Fruits',
      age: '13 years',
      region: 'Speyside Spey',
      cask: 'First-fill American oak Pedro Ximenez hogshead',
      price1: '$155',
      price2: '14 left',
      color: '#E6782A',
      isRightIcon: goods_icon_13,
      isSignIcon: goods_sign_13,
      hovered: false,
      hovered1: false,
      id: 14,
    },
    {
      img: goods_14,
      no: 'BUNDLE',
      title: "March into Spring!",
      type: 3,
      flavour: "Deep Rich & Dried Fruits,Juicy Oak & Vanilla,Spicy & Sweet",
      age: '8 years, 10 years, 16 years',
      region: 'Speyside, Highland, Speyside',
      cask: 'First-fill barrel, Second-fill Sherry butt, First-fill Chinkapin oak barrel HTMC',
      desc: 'Our March into Spring! bundle is sure to stoke some cask-strength conversation with a trio of tantalizing malts, each representing a unique flavour profile in indyllic fashion. Kick off the season right with this first-class flight!',
      price1: '$375',
      price2: '16 left',
      color: '#2E2E2D',
      isNew: true,
      hovered: false,
      hovered1: false,
      id: 15,
    },
    {
      img: goods_15,
      no: 'BUNDLE',
      title: "Embrace the Extraordinary",
      type: 3,
      desc: 'Embrace the extraordinary when discovering these unique Society casks from the Speyside and Highlands! This selection provides a rare opportunity to learn about the nuances between varied oak protocols.',
      price1: '$645',
      price2: '14 left',
      color: '#2E2E2D',
      hovered: false,
      hovered1: false,
      id: 16,
    },
    {
      img: goods_16,
      no: 'BUNDLE',
      title: "International Women’s Day Duo",
      type: 3,
      desc: 'Celebrate International Women’s Day with two extraordinary casks chosen by an all-female tasting panel! In celebration of last year’s International Women’s Day, this tasting panel of exceptional palates carefully selected a handful of different casks for this year’s celebration. Today, a remarkable duo of 20-year-old malts is ready for your collection!',
      price1: '$560',
      price2: '36 left',
      color: '#2E2E2D',
      isNew: true,
      isRightIcon: goods_icon_16,
      hovered: false,
      hovered1: false,
      id: 17,
    },
    {
      img: goods_17,
      no: 'CASK NO. B7.13',
      title: "C’est si bon!",
      type: 2,
      flavour: 'Bourbon',
      age: '4 years',
      region: 'Indiana, USA',
      cask: 'First-fill American oak #4 charred barrel, #2 charred heads',
      price1: '$65',
      price2: '32 left',
      color: '#202448',
      isRightIcon: goods_icon_17,
      isSignIcon: goods_sign_17,
      hovered: false,
      hovered1: false,
      id: 18,
    }
  ] as any,
  flavorCheckList: [] as any,
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
  drawer.value = true;
};

// 跳转详情
const handleJumpDetails = (id: number) => {
  emit('clear-cache');
  router.push({
    name: 'goodsDetail',
    query: {
      id
    }
  })
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

onMounted(() => {
  
});
onUnmounted(() => {
  
});
</script>
<style lang="scss">
.custom-select-box {
  margin-left: 10px;
  width: 140px;

  .el-select__placeholder.is-transparent {
    color: #2E2E2D;
  }

  .el-select__wrapper {
    border: 0!important;
    box-shadow: 0 0 0 0 #f7f7f7 inset;
    background-color: #F7F7F7;
    font-size: 18px;
    transition: transform 0.5s ease-in;
    
    // .el-select__suffix {
    //     transform: rotate(0deg);
    //   }

    &.is-hovering {
      box-shadow: 0 0 0 0 #f7f7f7 inset;
      border: 0;
      

      // .el-select__suffix {
      //   transform: rotate(-180deg);
      // }
    }

    .is-transparent {

    }
  }

  .el-select__suffix {
    .el-select__caret {
      // display: none;
      color: #2E2E2D;
      font-size: 24px;
    }
  }

  .el-select__suffix {
    color: red;
    // display: block;
    // width: 10px;
    // height: 6px;
    // background-image: url('@/assets/images/home/arrow-down.png'); /* 替换为你的图标路径 */
    // background-size: cover;
    // background-repeat: no-repeat;
    // background-position: center;
    // transition: transform 0.2s ease-in-out;
  }
}

.express-select {
  width: 80px;
}
.el-overlay {
  background-color: rgba(0,0,0,0);
}
</style>

<style lang="scss" scoped>
.goods-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  font-family: 'Oswald-Medium';

  .goods-top-box {
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

  .list-box {
    display: flex;
    margin-top: 124px;
    flex-wrap: wrap;
    width: 100%;

    .row-item {
      border: 1px solid #C1C1C1;
      background: #FFF;
      display: inline-flex;
      width: calc(25% - 16px);
      box-sizing: border-box;
      padding: 0px 22px 24px 22px;
      flex-direction: column;
      color: #2E2E2D;
      font-family: 'Oswald-Regular';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: 1.4px;
      margin-right: 16px;
      margin-bottom: 120px;
      position: relative;

      &:nth-child(4n) {
        margin-right: 0;
      }

      .new-icon {
        position: absolute;
        top: -50px;
        left: -1px;
        width: 75px;
      }

      .right-icon {
        width: 80px;
        height: 80px;
        position: absolute;
        top: -40px;
        right: 16px;
      }

      .sign-icon {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 44px;
        right: 16px;
      }

      .img-box {
        width: 100%;
        text-align: center;
        cursor: pointer;
      }

      .item-icon {
        width: 327px;
        height: 406px;
      }

      .goods-icon {
        // width: 100px;
        height: 400px;
        position: relative;
        top: -60px;
      }

      .text {
        margin-top: 212px;
      }

      .title {
        font-family: 'Oswald-Medium';
        font-size: 25px;
        font-weight: 500;
        line-height: 25px;
        letter-spacing: 0.25px;
        margin: 6px 0 16px;
        text-transform: uppercase;
      }

      .btn-box {
        width: 100%;
        // position: absolute;
        // bottom: 24px;

        .btn {
          flex: 1;
          border: 1px solid #2E2E2D;
          height: 44px;
          line-height: 44px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Oswald-Medium';
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 20px;
          cursor: pointer;

          .icon-xiangyou {
            font-size: 22px;
          }

          &.btn1 {
            background: #2E2E2D;
            color: #fff;
          }

          &.btn1:hover {
            background: #fff;
            color: #2E2E2D;

            .icon-xiangyou {
              transform: translate(5px);
              transition: all .2s linear;
            }
          }

          &.btn2:hover {
            .icon-xiangyou {
              transform: translate(5px);
              transition: all .2s linear;
            }
          }
        }
      }

      .text1 {
        // margin-top: 43px;
      }

      .info-item {
        font-family: 'Oswald-Medium';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0.28px;
        border-bottom: 1px solid #707070;
        box-sizing: border-box;
        padding-bottom: 6px;
        padding-top: 6px;

        &.flavour {
          border-top: 1px solid #707070;
        }

        .label {
          width: 80px;
          display: inline-block;
        }

        .value {
          font-family: 'Oswald-Regular';
          font-weight: 400;
          margin-left: 30px;
          white-space: nowrap;
          width: calc(100% - 130px);
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .info-desc-box {
        .desc {
          font-family: 'Georgia-Regular';
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.4px;
          height: 158px;
        }
      }

      .price-box {
        width: 100%;
        justify-content: space-between;
        margin: 18px 0 15px;
        font-family: 'Oswald-Medium';
        font-size: 25px;
        font-weight: 500;
        line-height: 27px;
      }
    }
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
}
</style>