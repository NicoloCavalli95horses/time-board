<template>
  <nav>
    <LangToggle class="lang-wrapper" />
    <h1>⏳{{translate("clock out time") }}</h1>
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
  display: flex;
  flex-direction: column;
  .lang-wrapper {
    margin: 8px;
    text-align: right;
  }
}
</style>