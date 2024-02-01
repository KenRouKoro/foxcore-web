<script setup>
import config from "../config.js";

</script>

<template>
  <footer class="footer">
    <p style="margin: 0">&copy;2024 {{config.common.actor}} All Rights Reserved | Power By FoxApplication</p>
  </footer>

</template>

<style scoped>
.footer {
  position: static;
  bottom: 0;
  left: 0;
  width : calc(100% - 32px);
  padding: 16px;
  height: 99px;
  overflow: hidden;
  font-size: 16px;
  border-top:1px solid rgba(128, 128, 128,0.2);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
</style>