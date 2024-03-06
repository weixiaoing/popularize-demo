<template>
  <view class="buttonContainer">
    <button
      class="btn"
      v-for="item in range"
      :key="item.value"
      :class="{ selected: selectedValue == item.value }"
      @click="change(item.value)"
    >
      {{ item.text }}
    </button>
  </view>
  <view class="search">
    <uni-search-bar
      bgColor="#f8f8f8"
      cancelButton="none"
      v-model="searchValue"
      @confirm="sendSearch"
    />
  </view>

  <scroll-view style="overflow: hidden; height: 70vh" scroll-y :show-scrollbar="false">
    <view class="card" @click="goDetails" v-for="item in array" :key="item">
      <view class="between"
        ><view class="title"
          ><text>{{ '书名' }}</text>
          <uni-tag text="已发布" size="small" type="primary" :circle="true" /></view
        ><view class="extra">{{ '发布回填' }}<uni-icons type="right" size="14" /></view
      ></view>
      <view class="between" style="font-size: 13px; color: grey"
        ><view class="book"
          >书名:{{ '你好, 这是书名测试溢出啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊' }}</view
        ><view class="time">发布时间:{{ '2022.1.1' }}</view></view
      >
    </view>
  </scroll-view>
  <button style="margin: 10px; background-color: #007aff" :disabled="false" @click="goKeyCreate">
    <text style="color: white">创建关键词</text>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
let array = new Array(10).fill(1).map((item, index) => index)
let searchValue = ref('')
let selectedValue = ref(0)
let range = ref([
  { value: 0, text: '全部' },
  { value: 1, text: '审核中' },
  { value: 2, text: '已驳回' },
  { value: 3, text: '已取消' },
  { value: 4, text: '已发布' },
  { value: 5, text: '已失效' },
])
const change = (value: number) => {
  selectedValue.value = value
}
const sendSearch = () => {
  console.log('test')
}

const goKeyCreate = () => {
  uni.navigateTo({ url: '/pages/keyCreate/keyCreate' })
}

const goDetails = () => {
  uni.navigateTo({ url: '/pages/key/key' })
}
</script>

<style lang="scss" scoped>
.between {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    background-color: rgba(255, 0, 0, 0);
    width: 50px;
    padding: 0px;
    white-space: nowrap;
    height: 20px;
    font-size: 12px;
    line-height: 16px;
  }
  .selected {
    color: goldenrod;
  }
}
.search {
  padding: 0 10px;
}
.container {
  display: flex;
  padding: 0 10px;
  flex-direction: column;
}

.card {
  min-height: 80px;
  justify-content: space-between;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
  border: 1px solid #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.title {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.book {
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
