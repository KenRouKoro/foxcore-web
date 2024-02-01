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
import {  ref ,onBeforeUnmount} from 'vue'
import {useRouter} from "vue-router";
import {getMetaData} from "../api/api.js";
import ConfigEditor from "../components/ConfigEditor.vue";

import { useMessage } from 'naive-ui'
const message = useMessage()

const router = useRouter();
const id = ref('')
const metaData = ref(null)

const show = ref(false)

id.value = router.currentRoute.value.params.id

console.log(router.currentRoute.value.params.id)

const loadData = ()=>{
  getMetaData(id.value).then((res)=>{
    metaData.value = res.data;
    setTimeout(()=>{
      show.value = true
    },200)
  })
}

loadData()
const removeRouterHook = router.afterEach((to,from)=>{
  if(to.path.indexOf('/config')<0){
    return
  }
  id.value = router.currentRoute.value.params.id
  loadData()
})

onBeforeUnmount(()=>{
  removeRouterHook();
});

const beforeEnter = (dom) =>{
  dom.classList.add('fade-list-enter-active');
}
const enter = (dom, done) =>{
  let delay = dom.dataset.delay;
  delay = Number(delay);
  setTimeout(() => {
    dom.classList.remove('fade-list-enter-active');
    dom.classList.add('fade-list-enter-to');
    let transitionend = window.ontransitionend ? "transitionend" : "webkitTransitionEnd";
    dom.addEventListener(transitionend, function onEnd () {
      dom.removeEventListener(transitionend, onEnd);
      done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
    })

  }, delay);
}
const afterEnter = (dom) =>{
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