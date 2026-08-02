<template>
  <div class="flex">
    <div class="flex">
      <div class="btn-incr" @click="emit('update:count', Math.max(min, count - incr))">
        <svg viewBox="0 0 24 24">
          <path d="M6 12L18 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <span>{{ count }}</span>
      <div class="btn-incr" @click="emit('update:count', count + incr)">
        <svg viewBox="0 0 24 24">
          <path d="M4 12H20M12 4V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    {{ label }}
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
  count: Number,
  min: {
    type: Number,
    default: 0,
  },
  incr: {
    type: Number,
    default: 0.5
  },
  label: String,
});

const emit = defineEmits([
  'update:count'
]);


</script>

<style lang="scss" scoped>
.btn-incr {
  width: 34px;
  height: 34px;
  margin: 8px;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  transition: .2s;
}

span {
  width: 34px;
  text-align: center;
}

.btn-incr:hover {
  transform: scale(1.08);
}

.btn-incr:active {
  transform: scale(.95);
}

</style>