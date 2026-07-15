<template>
  <div class="input-wrapper">
    <input type="time" v-model="input" />
  </div>
</template>

<script setup>
//===========================
// Import
//===========================
import { ref, watch } from "vue";


//===========================
// Props and emits
//===========================
const props = defineProps({
  time: String,
});

const emit = defineEmits([
  'update:time'
]);


//===========================
// Consts
//===========================
const input = ref(props.time);


//===========================
// Watchers
//===========================
watch(input, (newVal) => {
  emit('update:time', newVal);
});

</script>

<style lang="scss" scoped>
.input-wrapper {
  
  input[type="time"] {
    width: 100%;
    max-width: 320px;
    font-size: 44px;
    background-color: #2563eb;
    border: none;
    border-radius: 12px;
    font-family: monospace;
  }
}
</style>