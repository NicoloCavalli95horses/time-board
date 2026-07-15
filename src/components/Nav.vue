<template>
  <nav>
    <div class="time-icon">⏳</div>
    <h1>{{translate("clock out time") }}</h1>
    <div class="grow"></div>
    <LangToggle />
  </nav>
</template>

<script setup>
//===========================
// Import
//===========================
import { translate } from '../i18n.js';
import LangToggle from './LangToggle.vue';


</script>

<style lang="scss" scoped>
nav {
  height: 100px;
  display: flex;
  align-items: center;

  .time-icon {
    font-size: 44px;
  }
}
</style>