<template>

  <div class="config">
    <h1>
      设置
    </h1>
    <n-divider />

    <div class="settings">
      <div class="settingitem">
        <h3 style="width: 100px;margin: 0;">
          API地址
        </h3>
        <n-input v-model:value="apipath" type="text" placeholder="api地址" />
        <n-button type="success" style="margin-left: 10px;" @click="save()">
          保存
        </n-button>
      </div>
    </div>

  </div>

</template>

<script setup>
import {useLoadingBar} from "naive-ui";
import {ref} from "vue";
import {api_path, setApiPath} from "../api/api.js";
import {useRouter} from "vue-router";

const apipath = ref(api_path)

const router = useRouter();

function save(){
  const tenYears = 10 * 365 * 24 * 60 * 60 * 1000; // 10 years in milliseconds
  const expires = new Date(Date.now() + tenYears).toUTCString();
  document.cookie = "api_path=" + encodeURIComponent(apipath.value) + "; path=/; expires=" + expires;
  setApiPath(apipath.value)

  router.push('/')

}

const loadingBar = useLoadingBar()
loadingBar.finish()


</script>


<style scoped>
.config{
  padding: 10px 40px;
  height: 100%;
  width: 100%;
  text-align: left;
}
.settings{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

}
.settingitem{
  display: flex;
  width: calc(100% - 80px);
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  height: 80px;
  justify-content: space-between;
}
</style>