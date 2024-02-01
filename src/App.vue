
<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <n-message-provider placement="bottom-left">
      <n-loading-bar-provider>
        <div id="app" class="full-height">
          <Header></Header>
          <n-back-top />
          <div id="box">
            <div  class="view">
              <div class="index-card">
                <router-view v-slot="{ Component }">
                  <transition name="router-view">
                    <component :is="Component" class="component"/>
                  </transition>
                </router-view>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {dateZhCN, zhCN} from "naive-ui";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";



const themeOverrides = {
  common: {
    primaryColor: "#ff7c0aFF",
    primaryColorHover: "#FFA85CFF",
    primaryColorPressed: "#E7710AFF",
    primaryColorSuppl: "#EF9D55FF",
    borderRadius: 0,
    borderRadiusSmall: 0
  }
}
</script>


<style scoped>
.full-height {
  min-height: 100vh;
}
#app{
  padding: 0;
  width: 100vw;
}
#box{
  display: flex;
}

a {
  margin-right: 10px;
}
.view{
  min-height: calc(100vh - 132px - 60px - 40px) ;
  width: 100%;
  margin: 0;
  overflow: hidden;
  background-color: rgba(243, 243, 243, 0.64);
}

.index-card{
  background-color: white;
  overflow: hidden;
  min-height: calc(100vh - 132px - 60px - 80px) ;
  position: relative;
}
.component{
  width: calc(100% - 80px);
}
.router-view-move,
.router-view-enter-active,
.router-view-leave-active {
  transition: all 0.5s ease;
}
.router-view-enter-from,
.router-view-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.router-view-leave-active {
  position: absolute;
}

@media (max-width: 1024px) {
  .index-card{
    width: 100vw;
    padding-top: 40px;
    padding-bottom: 40px;
  }
}

@media (min-width: 1024px) {
  .index-card{
    width: 1024px;
    box-shadow:
        0px 0px 2.1px -1px rgba(0, 0, 0, 0.033),
        0px 0px 6.9px -1px rgba(0, 0, 0, 0.05),
        0px 0px 31px -1px rgba(0, 0, 0, 0.15);
    margin: 40px auto;

  }

}
</style>
