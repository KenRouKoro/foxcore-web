<template>

  <transition name="index-view">
    <div v-if="indexMarkdownHTML!=null" v-html="indexMarkdownHTML" class="index-view-port">
    </div>
  </transition>

</template>

<script setup>
import {ref,onMounted} from "vue";
import {useLoadingBar} from "naive-ui";
import {getIndexMarkdown} from "../api/api.js";
import {marked} from "marked";

document.title = "主页";
const loadingBar = useLoadingBar()
loadingBar.finish()

const indexMarkdownHTML = ref()

onMounted(() => {

  getIndexMarkdown().then(res => {
    setTimeout(()=>{
      indexMarkdownHTML.value = marked.parse(res.data)
    },500)
  })

})



</script>

<style scoped>

.index-view-port{
  text-align: left;
  padding: 10px 40px;
  width: 100%;
}

.index-view-enter-active,
.index-view-leave-active {
  transition: opacity 0.5s ease;
}
.index-view-enter-from,
.index-view-leave-to {
  opacity: 0;
}


</style>