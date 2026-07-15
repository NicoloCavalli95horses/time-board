<template>
  <div class="main">
    <Nav />

    <div class="time-info">
      <div class="wrapper">
        <p>{{ translate("exit time") }}<span>{{ minutesToTime(outTimeMin) }}</span> </p>
        <TimeProgress :min="timeToMinutes(inTime)" :max="outTimeMin" />
      </div>
    </div>

    <h2>{{ translate("settings") }}</h2>
    <div class="grid">
      <div class="card">
        <p>{{ translate("working hours") }}</p>
        <Counter v-model:count="workingHours" :label="translate('hours')" />
      </div>

      <div class="card">
        <p>{{ translate("entry time") }}</p>
        <InputTime v-model:time="inTime" />
      </div>

      <div class="card">
        <p>{{ translate("lunch break duration") }}</p>
        <Counter v-model:count="lunchBreakTimeMin" :incr="15" :label="translate('minutes')" />
      </div>

      <div class="card">
        <p>{{ translate("notify me before") }}</p>
        <Counter v-model:count="notifyTimeMin" :incr="5" :label="translate('minutes')" />
      </div>
    </div>

    <Footer />
  </div>

</template>


<script setup>
//===========================
// Import
//===========================
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { minutesToTime } from './utils';
import { translate } from './i18n.js';

import InputTime from './components/InputTime.vue'
import Counter from './components/Counter.vue'
import TimeProgress from './components/TimeProgress.vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';


//===========================
// Consts
//===========================
const workingHours = ref(8);
const lunchBreakTimeMin = ref(45);
const notifyTimeMin = ref(15);
const inTime = ref("08:30");

let notificationTimer = null;

const outTimeMin = computed(() =>
  timeToMinutes(inTime.value) +
  workingHours.value * 60 +
  lunchBreakTimeMin.value
);

const notifyAtMin = computed(() => outTimeMin.value - notifyTimeMin.value);


//===========================
// Functions
//===========================
function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function scheduleNotification() {
  // reset timer
  if (notificationTimer !== null) {
    clearTimeout(notificationTimer);
    notificationTimer = null;
  }

  const notificationDate = new Date();
  notificationDate.setHours(Math.floor(notifyAtMin.value / 60), notifyAtMin.value % 60,0,0);
  const delay = notificationDate.getTime() - Date.now();

  // Do not schedule if the time is already passed
  if (delay <= 0) { return; }

  notificationTimer = setTimeout(() => {
    new Notification(`⏰ ${notifyTimeMin.value} ${translate('minutes')} ${translate('and you can go home')}`);
    notificationTimer = null;
  }, delay);
}



//===========================
// Watch
//===========================
watch(
  [workingHours, lunchBreakTimeMin, inTime, notifyTimeMin],
  () => {
    localStorage.setItem("workingHours", workingHours.value);
    localStorage.setItem("lunchBreakTimeMin", lunchBreakTimeMin.value);
    localStorage.setItem("inTime", inTime.value);
    localStorage.setItem("notifyTimeMin", notifyTimeMin.value);

    if (Notification.permission === "granted") {
      scheduleNotification();
    }
  }
);



//===========================
// Life cycle
//===========================
onMounted(async () => {
  // set from local storage
  workingHours.value = Number(localStorage.getItem("workingHours") ?? 8);
  lunchBreakTimeMin.value = Number(localStorage.getItem("lunchBreakTimeMin") ?? 45);
  notifyTimeMin.value = Number(localStorage.getItem("notifyTimeMin") ?? 15);
  inTime.value = localStorage.getItem("inTime") ?? "08:30";

  // handle notification
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    scheduleNotification();
  }
});

</script>

<style lang="scss" scoped>
.main {
  max-width: 900px;
  margin: 0 auto;

  .grid {
    display: flex;
    flex-direction: column;
  }

  @media (width <=900px) {
    margin: 0 22px;
  }
}

span {
  font-family: monospace;
  font-size: 42px;
}

.time-info {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.5), rgba(12, 1, 111, 0.4));
  height: 100%;
  margin-top: 22px;
  border-radius: 12px;

  .wrapper {
    margin: 0 20px 0 20px;
    padding-top: 24px;
    padding-bottom: 84px;
  }

  span {
    font-size: 32px;
    border: 1px solid white;
    padding: 4px;
    margin-left: 10px;
    border-radius: 4px;
  }
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 18px;
  padding: 8px 24px;
  margin-top: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, .05);
  background-color: rgba(51, 68, 68, 0.4);

  &:first-of-type {
    margin-top: 0px;
  }
}
</style>
