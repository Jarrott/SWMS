<template>
  <div class="select-address-box">
    <div class="name">BILLING ADDRESS</div>
    <div class="text">Select a billing address from your address book or enter a new address.</div>
    <div class="add-address custom-select">
      <el-select v-model="data.addressType"
        @change="changeAddress" class="custom-select-dialog">
        <el-option
          v-for="item in data.addressList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <template v-if="data.addressType=='2'">
    <el-form
        ref="ruleFormRef"
        :inline="true" label-position="top" label-width="80px"
        :model="ruleForm" :rules="rules" class="custom-style-form">
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="ruleForm.firstName" ></el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName" style="margin-left:20px;">
          <el-input v-model="ruleForm.lastName"></el-input>
        </el-form-item>

        <el-form-item label="Telephone" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label=""></el-form-item>

        <el-form-item label="" prop="" class="empty-line">
          <div class="line"></div>
          <div class="text-empty">ADDRESS</div>
        </el-form-item>
        
        <el-form-item label="Zip" prop="zip">
          <el-input v-model="ruleForm.zip"></el-input>
        </el-form-item>
        <el-form-item label=""></el-form-item>
      
        <el-form-item label="State/Province" class="custom-select" prop="state">
          <el-select v-model="ruleForm.state" placeholder="Select State">
            <el-option
              v-for="item in data.stateType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=""></el-form-item>

        <el-form-item label="City" prop="city">
          <el-input v-model="ruleForm.city"></el-input>
        </el-form-item>
        <el-form-item label=""></el-form-item>

        <el-form-item label="Street Address" prop="Street" style="width: 100%;">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>

        <el-form-item label="Street Address 2" style="width: 100%;">
          <el-input v-model="ruleForm.address2"></el-input>
        </el-form-item>

        <el-form-item label="Company" style="width: 100%;">
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
      </el-form>

      <el-checkbox v-model="data.checked">
        <div class="agree-tip">Save in address book</div>
      </el-checkbox>
    </template>

    <div class="ship-box">
      <div class="ship-item" @click="handleShip('same')">
        <img v-if="!data.sameIsShow" src="@/assets/images/common/radio.png" alt="" />
        <img v-else src="@/assets/images/common/radio_active.png" alt="" />
        <span>Ship to this address</span>
      </div>
      <div class="ship-item" @click="handleShip('different')">
        <img v-if="!data.differentIsShow" src="@/assets/images/common/radio.png" alt="" />
        <img v-else src="@/assets/images/common/radio_active.png" alt="" />
        <span>Ship to different address</span>
      </div>
    </div>
    <div class="btn-box flex" >
      <div class="btn" @click="handleNext">CONTINUE</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules, FormInstance, ElIcon } from 'element-plus';
import { STATETYPE, ABOUTTYPE } from "@/utils/simulatedData";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const data = reactive({
  active: 0, // 步骤条
  checked: false,
  addressList: [
    {
      label: 'Shao Minglin, 1700005,日本，東京都，豊島区1-20-1 dimus 704',
      value: '1'
    },
    {
      label: 'New Address',
      value: '2',
    },
  ], // 选择地址
  addressType: '1', // 地址类型
  stateType: STATETYPE as any,
  sameIsShow: true, // 是否配送到这个地址
  differentIsShow: false, // 是否配送到不同的地址
});

const ruleForm = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  zip: '',
  state: '',
  city: '',
  address: '',
  address2: '',
  company: '',
});
const rules = reactive<FormRules>({
  firstName: [{ required: true, message: 'First Name is required.', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Last Name is required.', trigger: 'blur' }],
  phone: [{ required: true, message: 'Email is required.', trigger: 'blur' }],
  zip: [{ required: true, message: 'Zip is required.', trigger: 'blur' }],
  state: [{ required: true, message: 'State is required.', trigger: 'select' }],
  city: [{ required: true, message: 'City is required.', trigger: 'blur' }],
  address: [{ required: true, message: 'Address is required.', trigger: 'blur' }],
});

const qcSelectRef = ref();

// 选择配送方式
const handleShip = (type: string) => {
  if (type === 'same') {
    data.sameIsShow = true;
    data.differentIsShow = false;
  } else {
    data.differentIsShow = true;
    data.sameIsShow = false;
  }
};

// 地址选择框
const changeAddress = (item: any) => {
  data.addressType = item;
}

const emit = defineEmits(['next-step']);
// 下一步
const handleNext = async () => {
  // 添加新地址时 才会有的校验
  if (data.addressType ==='2') {
    if (!ruleFormRef.value) return;
    await ruleFormRef.value?.validate((valid, fields) => {
      if (valid) {
        emit('next-step', 1);
      } else {
        console.log('error submit!', fields);
        for (const key in ruleForm) {
          if (fields[key]) {
            ruleFormRef.value.scrollToField(key);
            break;
          }
        }
        return;
      }
    })
  } else {
    emit('next-step', 1);
  }
};
</script>

<style lang="scss" scoped>
.select-address-box {
  width: 50%;
  margin: 72px auto 0;

  .name {
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.32px;
    text-transform: uppercase;
  }

  .text {
    font-family: 'Oswald-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.32px;
    text-transform: uppercase;
    margin-top: 44px;
    margin-bottom: 3px;
  }

  .add-address {
    margin-bottom: 44px;
    position: relative;

    :deep(.el-select__wrapper) {
      height: 45px;
      background-color: #fff;
      border-radius: 0;
      border: 1px solid #2E2E2D;
    }

    :deep(.el-input__inner) {
      color: #2E2E2D;
      font-family: 'Oswald-Regular';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.32px;
    }
  }


  .custom-style-form {
    width: 100%;

    :deep(.el-form-item) {
      width: calc(48% - 0px);
      margin-bottom: 36px;
      margin-right: 0;
    }

    :deep(.el-form-item__error) {
      color: #F00;
      font-family: 'Georgia-Regular';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.4px;
      margin-top: 4px;
    }

    .empty-line {
      width: 100%;
      margin-top: 32px;
      margin-bottom: 72px;

      .line {
        width: 100%;
        height: 1px;
        background: #D4D4D4;
      }

      .text-empty {
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.32px;
        text-transform: uppercase;
        margin-top: 32px;
      }
    }

    :deep(.el-form-item__label) {
      font-family: 'Oswald-Regular';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.32px;
    }

    :deep(.el-form-item__content) {
      height: 45px;
      
      .el-input {
        height: 45px;
      }

      .el-input__wrapper, .el-select__wrapper {
        height: 45px;
        border-radius: 0;
        border: 1px solid #2E2E2D;
      }

      .el-input__inner {
        color: #2E2E2D;
        font-family: 'Oswald-Regular';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.32px;
      }
    }

    :deep(.is-error) {
      .el-input__wrapper, .el-select__wrapper {
        background-color: #ffdede;
        border: 0;
      }
    }
  }

  .ship-box {
    border-top: 1px solid#D4D4D4;
    padding-top: 36px;
    font-family: 'Oswald-Regular';

    .ship-item {
      margin-bottom: 14px;
      cursor: pointer;

      img {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        vertical-align: middle;
      }
    }
  }
  
  .btn-box {
    justify-content: flex-end;
    margin-top: 44px;

    .btn {
      width: 130px;
      height: 64px;
      background-color: #2099A3;
      text-align: center;
      line-height: 64px;
      color: #fff;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.54px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
}
</style>
