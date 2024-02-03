<template>
 <div class="config-view" v-if="metaData!=null">
  <div class="title">
    <h1>
      {{metaData.name}}
    </h1>
    <n-button @click="metaData.config = [];loadData()">
      重新加载
    </n-button>
  </div>

   <div class="configs">
     <transition-group tag="ul" name="fade-list"
                       :css="false"
                       @before-enter="beforeEnter"
                       @enter="enter"
                       @after-enter="afterEnter">

       <div v-show="show" v-for="(config,index) in metaData.config" :data-delay="index * 150" :key="config.id">
         <n-divider />
         <ConfigEditor  :fieldID="config.id" v-model:data="metaData.config[index]" :configID="id">

         </ConfigEditor>
       </div>

     </transition-group>

   </div>
 </div>
</template>

<script setup>
// 1. 导入必要的库和组件
import { ref, onBeforeUnmount } from 'vue' // 导入Vue的响应式引用和生命周期钩子
import { useRouter } from "vue-router" // 导入Vue路由
import { getMetaData } from "../api/api.js" // 导入API方法
import ConfigEditor from "../components/ConfigEditor.vue" // 导入子组件
import { useMessage } from 'naive-ui' // 导入UI库的消息功能

// 2. 初始化组件状态
const router = useRouter(); // 使用路由
const message = useMessage() // 初始化消息功能
const id = ref('') // 存储当前路由的id参数
const metaData = ref(null) // 存储从API获取的元数据
const show = ref(false) // 控制设置元素的显示

// 从路由获取id并打印
id.value = router.currentRoute.value.params.id
console.log(id.value)

// 3. 定义组件逻辑
// 加载数据的方法
const loadData = () => {
  getMetaData(id.value).then((res) => {
    metaData.value = res.data;
    setTimeout(() => {
      show.value = true
    }, 200)
  })
}

// 调用加载数据方法
loadData()

// 设置路由守卫，当路由变化时重新加载数据
const removeRouterHook = router.afterEach((to, from) => {
  if (to.path.indexOf('/config') < 0) {
    return
  }
  id.value = to.params.id
  loadData()
})

// 组件卸载前移除路由守卫
onBeforeUnmount(() => {
  removeRouterHook();
});

// 4. 动画相关方法
// 动画开始前
const beforeEnter = (dom) => {
  dom.classList.add('fade-list-enter-active');
}
// 动画执行中
const enter = (dom, done) => {
  let delay = Number(dom.dataset.delay);
  setTimeout(() => {
    dom.classList.remove('fade-list-enter-active');
    dom.classList.add('fade-list-enter-to');
    let transitionend = window.ontransitionend ? "transitionend" : "webkitTransitionEnd";
    dom.addEventListener(transitionend, function onEnd() {
      dom.removeEventListener(transitionend, onEnd);
      done(); // 动画完成后调用done()
    })
  }, delay);
}
// 动画完成后
const afterEnter = (dom) => {
  dom.classList.remove('fade-list-enter-to');
}
</script>


<style scoped>
.config-view{
  text-align: left;
  padding: 40px;
}

.configs{
}
.title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.fade-list-enter-active {
  opacity: 0;
  transform: translateY(100%);
}

.fade-list-enter-to {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s;
}

</style>