<template>
  <input type="time" v-model="input" />
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
const input = ref( props.time );


//===========================
// Watchers
//===========================
watch( input, (newVal) => {
  emit('update:time', newVal);
});

</script>

<style lang="scss" scoped>
input[type="time"] {
  font-size: 55px;
  padding: 12px 18px;
  background-color: rgb(33,33,33); 
  border: none;
  outline: none; 
  border-radius: 12px;
  font-family: monospace;
}
</style>