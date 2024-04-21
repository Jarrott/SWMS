<template>
  <div class="account-dashboard-wrap">
    <div class="title">my dashboard</div>
    <div class="user-name">hello, carol wang!</div>
    <div class="tips">From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.</div>
    <div class="member-info">MEMBER INFO</div>
    <div class="member-item flex">
      <span class="label">ID</span>
      <span class="value">JP7647</span>
    </div>
    <div class="member-item flex">
      <span class="label">Expiry</span>
      <span class="value">2024/06/30 JST</span>
    </div>
    <div class="order-title-box flex">
      <span>RECENT ORDERS</span>
      <div class="view-btn">view all</div>
    </div>
    <div class="order-table-title-box flex">
      <div class="label">Order #</div>
      <div class="label">Date</div>
      <div class="label ship">Ship To</div>
      <div class="label">Total</div>
      <div class="label">Status</div>
      <div class="label">Actions</div>
    </div>
    <div class="order-table-box">
      <div class="table-item flex" v-for="(item, index) in data.orderList" :key="index">
        <div class="value">{{ item.orderId }}</div>
        <div class="value">{{ item.date }}</div>
        <div class="value ship">{{ item.shipTo }}</div>
        <div class="value">{{ item.total }}</div>
        <div class="value">{{ item.orderId }}</div>
        <div class="value btn-box flex">
          <div class="action-btn">view order</div>
        </div>
      </div>
    </div>
    <div class="account-title">ACCOUNT INFORMATION</div>
    <div class="contact-box">
      <div class="name">CONTACT INFORMATION</div>
      <div class="edit-box">
        <img src="@/assets/images/mine/edit.png" alt="" />
      </div>
    </div>
    <div class="info-box">
      <div>carol wang</div>
      <div>carol123@gmail.com</div>
      <div class="password">change password</div>
    </div>
    <div class="dm-box">
      <div class="name">to way to send out DM</div>
      <div>only email</div>
    </div>
    <div class="address-box flex">
      <span>ADDRESS BOOK</span>
      <div class="btn">MANAGE ADDRESSES</div>
    </div>
    <div class="home-address-box">
      <div class="left">
        <div class="title">MEMBER'S HOME ADDRESS</div>
        <div>carol wang</div>
        <div>595-0813 Japan, Tadaoka</div>
        <div>Semboku District</div>
        <div>Osaka3-1514-7</div>
        <div>T：0725-58-7902</div>
        <div class="edit">Edit Address</div>
      </div>
      <div class="right">
        <div class="title">DEFAULT SHIPPING ADDRESS</div>
        <div>carol wang</div>
        <div>595-0813 Japan, Tadaoka</div>
        <div>Semboku District</div>
        <div>Osaka3-1514-7</div>
        <div>T：0725-58-7902</div>
        <div class="edit">Edit Address</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

const data = reactive({
  orderList: [
    {
      orderId: '100056299',
      date: '4/14/2024',
      shipTo: 'carol wang',
      total: '¥3,300',
      status: '1', // 1待处理 2完成 3失败
    },
    {
      orderId: '100055188',
      date: '1/10/2024',
      shipTo: 'carol wang',
      total: '¥14,800',
      status: '2',
    },
    {
      orderId: '100054154',
      date: '11/10/2023',
      shipTo: 'carol wang',
      total: '¥1,300',
      status: '2',
    },
    {
      orderId: '100052772',
      date: '8/30/2023',
      shipTo: 'carol wang',
      total: '¥13,300',
      status: '3',
    },
    {
      orderId: '100051806',
      date: '6/23/2023',
      shipTo: 'carol wang',
      total: '¥33,300',
      status: '2',
    }
  ] as any,
})
</script>

<style lang="scss" scoped>
.account-dashboard-wrap {
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-family: 'Oswald-Medium';
  color: #2E2E2D;

  .title {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: uppercase;
  }

  .user-name {
    color: #686868;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: capitalize;
    margin: 24px 0;
  }
  .tips {
    color: #686868;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: capitalize;
  }

  .member-info {
    color: #2E2E2D;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: uppercase;
    margin: 44px 0px 0;
  }

  .member-item {
    color: #686868;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: capitalize;
    margin-top: 24px;

    .label {
      display: inline-block;
      width: 80px;
      margin-left: 24px;
      margin-right: 190px;
    }
  }

  .order-title-box {
    margin-top: 44px;
    width: 88%;
    justify-content: space-between;
    padding-bottom: 24px;
    border-bottom: 1px solid #D4D4D4;

    .view-btn {
      width: 80px;
      height: 50px;
      background: #2099A3;
      text-align: center;
      line-height: 50px;
      color: #FFF;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

  .order-table-title-box {
    color: #686868;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: capitalize;
    margin-top: 24px;
    margin-bottom: 24px;
    width: 88%;

    .label {
      width: 15%;
    }

    .ship {
      width: 25%;
    }
  }

  .order-table-box {
    width: 88%;

    .table-item {
      padding: 24px 0;
      border-bottom: 1px solid #D4D4D4;
      box-sizing: border-box;

      .value {
        width: 15%;
        color: #686868;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.36px;
        text-transform: capitalize;
      }

      .ship {
        width: 25%;
      }

      .btn-box {
        justify-content: flex-end;
      }

      .action-btn {
        width: 98px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #2099A3;
        color: #FFF;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.54px;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
    
  }

  .account-title {
    color: #2E2E2D;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: uppercase;
    margin: 44px 0 16px;
  }

  .contact-box {
    width: 42%;
    border-bottom: 1px solid #D4D4D4;
    position: relative;

    .name {
      color: #2E2E2D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.36px;
      text-transform: uppercase;
      margin-bottom: 50px;
    }

    .edit-box {
      position: absolute;
      right: 32px;
      top: 0;
      width: 60px;
      height: 50px;
      line-height: 60px;
      text-align: center;
      background-color: #2099A3;
      cursor: pointer;
      img {
        height: 24px;
      }
    }
  }

  .info-box {
    color: #686868;
    font-family: 'Oswald-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.36px;
    text-transform: capitalize;
    margin-top: 20px;

    .password {
      color: #2099A3;
      cursor: pointer;
    }
  }

  .dm-box {
    color: #686868;
    font-family: 'Oswald-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.36px;
    margin-top: 36px;

    .name {
      font-family: 'Oswald-Medium';
      color: #686868;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: 0.36px;
    }
  }

  .address-box {
    color: #2E2E2D;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.36px;
    text-transform: uppercase;
    padding: 44px 0;
    border-bottom: 1px solid #D4D4D4;
    justify-content: space-between;

    .btn {
      width: 144px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #2099A3;
      color: #FFF;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

  .home-address-box {
    display: flex;
    margin-top: 20px;
    color: #686868;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.36px;
    text-transform: capitalize;

    .left, .right {
      width: 50%;
    }

    .title {
      color: #2E2E2D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.36px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .edit {
      color: #2099A3;
      cursor: pointer;
    }
  }
}
</style>

