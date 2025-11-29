
<template>
  <h1>Quanto manca...?</h1>
  <br><br>
  <p class="flex">Oggi devo lavorare:
    <div class="btn-incr" @click="editTotalHour(0.5)">+</div>
    {{ totalHour }}
    <div class="btn-incr" @click="editTotalHour(-0.5)">-</div>
    ore
  </p>
  
  <p class="flex">Stamattina ho trimbrato alle
  <InputTime v-model:time="inTime" />
  </p>
  
  <p class="flex">Durata della pausa pranzo
  <InputTime v-model:time="lunchBreakTime" />
  </p>

  <p>Posso uscire alle: {{ formatTimeMs(outTime) }}</p>
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
const totalHour = ref( '07:00' );
const inTime = ref( '08:30' );
const lunchBreakTime = ref( '00:45' );

const outTime = computed(() => {
  const initT = timeToMilliseconds(inTime.value);
  const breakT = timeToMilliseconds(lunchBreakTime.value);
  const totNowT = initT + breakT;
  const totDayT = timeToMilliseconds(totalHour.value);
  return totNowT + totDayT;
});



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

function editTotalHour(incr) {
  const [h, m] = totalHour.value.split(':').map(Number);
  let val = h + m / 60;
  val += incr;
  val = Math.max(1, Math.min(12, val));
  const hh = String(Math.floor(val)).padStart(2, '0');
  const mm = val % 1 === 0 ? '00' : '30';
  totalHour.value = `${hh}:${mm}`;
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

.btn-incr {
  cursor: pointer;
  background-color: #18b918ff;
  border-radius: 12px;
  margin: 0px 12px;
  width: 60px;
  height: 60px;
  font-size: 34px;
  display: grid;
  place-items: center;
}
</style>
