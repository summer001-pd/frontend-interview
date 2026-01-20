<template>
  <Tabs :value="currentTabKey" @update:value="setCurrentTab">
    <TabList>
        <Tab
          v-for="tab in tabList"
          :key="tab.tabKey"
          :value="tab.tabKey">
          {{tab.tabName}}
        </Tab>
    </TabList>
    <TabPanels>
        <TabPanel :value="currentTabKey">
          <DataTable :value="currentTableData" :loading="loading" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="address" header="Address"></Column>
          </DataTable>
        </TabPanel>
    </TabPanels>
</Tabs>
</template>

<script setup lang="ts">
import { ref,computed, onMounted } from 'vue'
import { fetchData, tabList, type TabKey, type FetchDataResult } from './api/index.ts'

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const latestRequestIds = ref<string[]>([])
const requestRes = ref<FetchDataResult[]>([])

const loading = ref<boolean>(false)
// Current Tab Key
const currentTabKey = ref<TabKey>('tab1')
// Current Table Data
const currentTableData = computed(() => {
  const requestId = latestRequestIds.value[latestRequestIds.value.length - 1]
  const res = requestRes.value.find(res => res?.requestId === requestId)
  return res?.data || []
})

/**
 * Author: xiaohong
 * Email: 1315228475@qq.com
 * Created: 2026-01-20 21:19:26
 * Timezone: Asia/Beijing
 * Description: 
 * 这里的竟态问题
 * 1、可以通过控制点击事件,请求执行完毕之前，不能再点击其他选项卡，添加loading
 * 2、可以通过请求的cancel，只执行最后一个相同的请求，取消原先未执行完的请求
 * 3、目前是将请求生成一个id存到数组里面，将response存到一个数组里面，通过id找到对应的response
 */
async function getCurrentTabInfo(tabKey:TabKey) {
  const requestId = `${tabKey}_${Date.now()}`
  latestRequestIds.value.push(requestId)
  try {
    loading.value = true
    const res = await fetchData(tabKey, requestId)
    requestRes.value.push(res as FetchDataResult)
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log('Error fetching tab data:', error)
  }
}

function setCurrentTab(tabKey:TabKey) {
  currentTabKey.value = tabKey
  getCurrentTabInfo(currentTabKey.value)
}

onMounted(() => {
  getCurrentTabInfo(currentTabKey.value)
})
</script>

<style>
  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
</style>