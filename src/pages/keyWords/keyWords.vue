<script lang="ts" setup>
import { searchKeyAPI } from '@/services/pagesAPI'
import type { keyDeatils } from '@/types'
import { onShow } from '@dcloudio/uni-app'
import { computed, onMounted, ref, watch } from 'vue'
let list = ref<keyDeatils[]>([])
// 计算是否展示变量
let ifshow = computed(() => {
  if (list.value.length) {
    console.log('yes')
    return false
  } else {
    console.log('no')

    return true
  }
})
let searchValue = ref('')
let selectedValue = ref(0)
let range = ref([
  { value: 0, text: '全部' },
  { value: 1, text: '审核中' },
  { value: 2, text: '已通过' },
  { value: 3, text: '已驳回' },
  { value: 4, text: '已取消' },
  { value: 5, text: '已发布' },
  { value: 6, text: '已失效' },
])
// 根据状态码显示不同的按钮
const buttonType = (value: number) => {
  if ([1, 2, 5].includes(value)) return 'success '
  else return 'error'
}
// 搜索值改变时重新发送候选值请求
const change = (value: number) => {
  selectedValue.value = value
  sendSearch()
}
// 关键词搜索
const sendSearch = async () => {
  if (selectedValue.value === 0) {
    // 选择全部类型时,发送关键词搜索请求
    const res = await searchKeyAPI({ keyName: searchValue.value, keyStatus: [0, 1, 2, 3, 4, 5] })
    list.value = res.data
  } else {
    let keyStatus = [selectedValue.value - 1]
    // 选择什么类型,发送响应的请求参数
    const res = await searchKeyAPI({
      keyName: searchValue.value,
      keyStatus,
    })
    list.value = res.data
  }
}
// 初始时,请求所有关键词
onShow(() => {
  sendSearch()
})
// 跳转新建关键词页面
const goKeyCreate = () => {
  uni.navigateTo({ url: '/pages/keyCreate/keyCreate' })
}
// 跳转关键词详情
const goDetails = (id: number) => {
  uni.navigateTo({ url: `/pages/key/key?id=${id}` })
}
</script>
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
      @confirm="sendSearch()"
    />
  </view>

  <scroll-view style="overflow: hidden; height: 70vh" scroll-y :show-scrollbar="false">
    <view v-if="ifshow" class="noshow"><text>暂无数据</text></view>
    <view class="card" @click="goDetails(item.id)" v-for="item in list" :key="item.id">
      <view class="between"
        ><view class="title"
          ><text>{{ item.keyword }}</text>
          <uni-tag
            class="tag"
            :text="range[item.keywordStatus + 1].text"
            size="small"
            :type="`${buttonType(item.keywordStatus + 1)}`as any"
            :circle="true" /></view
        ><view class="extra"
          >{{ item.keywordStatus == 1 || item.keywordStatus == 4 ? '发布回填' : ''
          }}<uni-icons type="right" size="14" /></view
      ></view>
      <view class="between" style="font-size: 13px; color: grey"
        ><view class="book">书名:{{ item.bookName }}</view
        ><view class="time">发布时间:{{ item.applicationTime.split(' ')[0] }}</view></view
      >
    </view>
  </scroll-view>

  <button style="margin: 10px; background-color: #007aff" :disabled="false" @click="goKeyCreate">
    <text style="color: white">创建关键词</text>
  </button>
</template>

<style lang="scss" scoped>
.noshow {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
  .tag {
    margin-top: -5px;
  }
  text {
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.book {
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
