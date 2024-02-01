<template>
  <header class="header">
    <div class="left-tools">
      <n-icon size="30" color="#999"  @click="router.push('/')">
        <Home />
      </n-icon>
    </div>
    <div class="configs-view">
      <transition-group name="configs-item"  >
        <div v-if="configs!=null" v-for="config in configs" class="config-item" @click="router.push({ path:'/config/'+config.id})">

          <h3 style="margin: 0">{{config.name}}</h3>

        </div>
      </transition-group>
    </div>
    <div class="right-tools">
      <n-icon size="30" color="#999"  @click="router.push('/setting')">
        <Tools />
      </n-icon>
      <n-icon style="margin-right: 20px" size="30" color="#999"  @click="refresh()">
        <Redo />
      </n-icon>
    </div>
  </header>
</template>

<script setup>
import {Tools,Home,Redo} from '@vicons/fa'
import {useRouter} from "vue-router";
import {ref,onMounted} from "vue";
import {addApiPathHook, getConfigsList} from "../api/api.js";


const router = useRouter();

const configs = ref([]);

onMounted(() => {
  getConfigsList().then(response=>{
    setTimeout( ()=>{
      configs.value = response.data.configs
    },200)
  })
  .catch(function (error) {
    router.push('/404')
  })
})

const refresh =()=>{
  getConfigsList().then(response=>{
    configs.value = []
    setTimeout( ()=>{
      configs.value = response.data.configs
    },200)
  })
  .catch(function (error) {
    router.push('/404')
  })
}

addApiPathHook(()=>{
  refresh()
})

</script>

<style scoped>

.header{
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  height: 60px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  position: sticky !important;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

}
.config-item{
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  transition: all ease-in-out 0.3s;
}
.config-item:hover{
  background-color: #fff2dc;
}
.configs-view{
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: left;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  overflow: auto;
}

.configs-item-enter-active,
.configs-item-leave-active {
  transition: all 0.5s ease;
}
.configs-item-enter-from,
.configs-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}


.right-tools{
  display: flex;
  justify-content: right;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}
.left-tools{
  display: flex;
  justify-content: left;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}
</style>