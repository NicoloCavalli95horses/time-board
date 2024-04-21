
<template>
  <div class="main">
    <div class="col">
      <h2>Entrance</h2>
      <InputTime v-model:time="time[0]" />
      <h2>Exit</h2>
      <InputTime v-model:time="time[1]" />
    </div>
    <div class="col">
      <h2>Entrance</h2>
      <InputTime v-model:time="time[2]" />
      <h2>Exit</h2>
      <InputTime v-model:time="time[3]" />
    </div>
    <div class="col">
      <h2>Total time</h2>
      <span :class="{ 'green' : totTimeMs >= EIGHT_HOURS_MS }">{{ totTimeF }}</span>
      <h2>Remaining time</h2>
      <span :class="[ totTimeMs >= EIGHT_HOURS_MS ? 'green' : 'red']">{{ remainingTimeF }}</span>
    </div>
  </div>
</template>


<script setup>
//===========================
// Import
//===========================
import { computed, ref } from 'vue'
import InputTime from './components/InputTime.vue'


//===========================
// Consts
//===========================
const time = ref( [
  '09:00',
  '12:30',
  '13:30',
  '18:00'
] );

const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

const totTimeMs = computed(() => {
  const morning = Math.abs(timeToMilliseconds(time.value[0]) - timeToMilliseconds(time.value[1]));
  const afternoon = Math.abs(timeToMilliseconds(time.value[2]) - timeToMilliseconds(time.value[3]));
  return morning + afternoon;
});

const totTimeF       = computed( () => formatTimeMs( totTimeMs.value ));
const remainingTimeF = computed( () => formatTimeMs( Math.abs(EIGHT_HOURS_MS - totTimeMs.value) ));


//===========================
// Functions
//===========================
function formatTimeMs( ms ) {
  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  return `${hh}:${mm}`;
}

function timeToMilliseconds(time) {
  const [h, m] = time.split(':');
  return (parseInt(h, 10) * 60 + parseInt(m, 10)) * 60 * 1000;
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr) );
  grid-gap: 22px;
  width: calc(100% - 44px);
  height: calc(100vh - 44px);
  margin: 22px;
  .col {
    display: flex;
    flex-direction: column;
  }
}

span {
  font-family: monospace;
  font-size: 42px;
}
.green {
  color: greenyellow;
}
.red {
  color: orangered;
}
</style>
