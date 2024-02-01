<script setup>
import {useRouter,onBeforeRouteUpdate} from "vue-router";
import {ref} from "vue"
import {useLoadingBar} from "naive-ui";

const router = useRouter();
let router_name = '路径 ' + router.currentRoute.value.path + ' 不存在'
document.title = "404错误 " + router.currentRoute.value.path + ' 不存在'
const loadingBar = useLoadingBar()
loadingBar.error();
onBeforeRouteUpdate((to)=>{
  router_name = '路径 ' + to.path + ' 不存在'
  document.title = "404错误 " + to.path + ' 不存在'
  loadingBar.error();
})
</script>

<template  >
  <div class="error-result">
    <n-result  status="404" title="404 资源不存在" :description="router_name">
      <template #footer>
        <n-button type="primary" @click="router.push('/')">返回主页</n-button>
      </template>
    </n-result>
  </div>

</template>

<style scoped>
.error-result{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  position: absolute;
}

</style>