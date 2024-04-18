<template>
  <div class="bottle-of-month-page-wrap">
   <div class="bottle-top flex">
     <div class="info">
       <div class="text1">Member Services</div>
       <div class="text2">Bottle of The Month</div>
       <div class="text3">Take a tour of our broad-spectrum collection over the course of one year and explore a new bottle every month!</div>
     </div>
     <div class="img-box">
       <img src="@/assets/images/header/icon1.png" alt="" />
     </div>
   </div>
   <div class="desc">
     Bottle of the Month is an additional service we offer to our members who are looking to explore the full range of flavors our single casks have
    to offer. Over the course of 12 months, participants experience whiskies from different distilleries, flavour profiles, ages, and regions – and
    with every 12th bottle, we’ll send a complimentary companion bottle to celebrate a year of discovery with us. This is a great opportunity for
    new members looking to educate and expand their palate or long-standing members who want to “go offline” and build out their collection
    with a new mystery bottle every month selected by our team. This also makes an amazing gift for the whisky lover in your life! Membership is
    required ahead of signing up for the bottle of the month, so if you are not already a member and would like to sign yourself or someone else
    up, please visit our <span class="join-page" @click="handleJump('join')">Join Page</span> for Membership and Gift Membership options.
   </div>
   <div class="collapse-box">
     <div class="el-collapse">
      <div class="el-collapse-item" v-for="(item, index) in data.collapseList" :key="index" @click="handleChange(item)">
        <div class="title flex">
          <span>{{ item.title }}</span>
          <img class="icon-arrow" :class="{'arrowTransform': item.isOpen}" src="@/assets/images/home/arrow-down.png" alt="" />
        </div>
        <div class="text" :class="{'show-text': item.isOpen}">{{ item.text }}</div>
      </div>
    </div>
   </div>
   <div class="offices">Our offices are open from:</div>
   <div class="time">Monday to Friday, 9:00am to 5:00pm Eastern Time.</div>
  </div>
</template>
<script lang="ts" setup>
import GoodsListSwiper from "@/components/goods-list-swpier/goodsListSwpier.vue";

const router = useRouter();
const route = useRoute();

const {
  query: { id },
} = route;

const data = reactive({
  goodsDetailsInfo: {} as any,
  activeNames: ['1'],
  collapseList: [
    {
      title: 'How much does it cost?',
      text: 'Your card will be billed monthly for the cost of the bottle, shipping and tax. While we do have some more premium offerings, the bottles selected for the bottle of the month program will typically fall in the $110-$250 range. Please let us know if there are any price restrictions.',
      isOpen: false,
    },
    {
      title: 'Do I need a membership to sign up for Bottle of the Month?',
      text: 'Yes, membership is required to sign up for the bottle of the month. Please visit our Join Page to see Membership and Gift Membership options ahead of signing up for bottle of the month.',
      isOpen: false,
    },
    {
      title: 'What Whiskies are included?',
      text: 'Selections are not disclosed ahead of time. Each month you will be sent a new mystery whisky with a unique flavour profile, distillery, cask type, and region carefully selected by our team. The program is curated to show the range of our flavour profiles over the course of the year – for the true whisky explorer!',
      isOpen: false,
    },
    {
      title: 'How do I sign up?',
      text: 'Call us at 646-844-1154 ',
      isOpen: false,
    },
    {
      title: 'When will the Bottle of the Month be processed?',
      text: 'Bottle of the month orders are processed in the first week of every month, usually the same week of the first Monthly Outturn (with exceptions for holidays, etc.).',
      isOpen: false,
    },
    {
      title: 'Can I cancel at any time?',
      text: 'Yes! Just let us know ahead of the next month’s cycle. Please note, bottle of the month is on-going as long as membership is valid or until canceled.',
      isOpen: false,
    }
  ] as any,
  
});

const handleChange = (item: any) => {
  item.isOpen = !item.isOpen;
};

const handleJump = (name: string) => {
  router.push({name})
};
</script>

<style lang="scss" scoped>
.bottle-of-month-page-wrap {
  padding: 0 4.5%;
  box-sizing: border-box;
  font-style: normal;
  flex-shrink: 0;
  color: #2E2E2D;

  .bottle-top {
    background: #F2F2F2;
  }

  .info {
    width: 45%;
    height: 610px;
    padding: 90px 0 0 78px;
    box-sizing: border-box;
    
    .text1 {
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-family: 'Oswald-Regular';
    }

    .text2 {
      font-size: 82px;
      font-style: normal;
      font-weight: 500;
      line-height: 90px;
      letter-spacing: 0.82px;
      text-transform: uppercase;
      font-family: 'Oswald-Medium';
      margin: 10px 0 50px;
    }

    .text3 {
      font-size: 24px;
      font-family: 'Georgia-Italic';
      font-weight: 400;
      line-height: 38px;
      letter-spacing: 0.48px;
    }
  }

  .img-box {
    width: 55%;
    height: 610px;
    text-align: right;
    img {
      height: 610px;
    }
  }

  .desc {
    font-family: 'Georgia-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0.4px;
    padding: 60px 0px 0px;
    box-sizing: border-box;
    
    margin: 0 210px;

    .join-page {
      text-decoration-line: underline;
      font-family: 'Oswald-Medium';
      cursor: pointer;
    }
  }

  .collapse-box {
    margin-top: 50px;
    padding: 0 210px;

    .el-collapse-item {
      border-top: 1px solid #707070;
      // border-bottom: 1px solid #707070;
    }

    .title {
      font-family: 'Oswald-Medium';
      font-size: 26px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      padding: 26px 0 20px;
      cursor: pointer;
      justify-content: space-between;

      .icon-arrow {
        width: 14px;
        height: 9px;
        transition: transform 0.3s ease-in-out;
      }
    }

    .text {
      color: #2E2E2D;
      font-family: 'Georgia-Regular';
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 38px;
      letter-spacing: 0.48px;
      padding-bottom: 26px;
      opacity: 0;
      display: none;
      transition: opacity .3s ease;
    }

    .show-text {
      display: block;
      opacity: 1;
      transition: opacity .3s ease;
    }
  }

  .offices {
    font-family: 'Georgia-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.4px;
    padding: 60px 210px 0px;
  }

  .time {
    font-family: 'Georgia-Italic';
    font-size: 20px;
    font-style: italic;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0.4px;
    padding: 0px 210px 0px;
  }
  
}
</style>