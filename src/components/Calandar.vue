<template>
  <div class="flex-1 flex relative overflow-x-hidden pb-12 pr-12"> 
    <div class="flex-1 flex  select-none overflow-hidden ">
    <div
      id="calandarElem"
      class="min-h-full min-w-full overflow-y-auto overflow-x-hidden flex"
    >
      <!-- sticky left bar heure vertical  -->
      <div class="w-12 min-h-full h-full sticky left-0 flex-shrink-0  z-20">
        <div class="flex flex-col min-h-full">
          <div class="h-12 bg-gray-200 sticky top-0"></div>
          <div
            v-for="i in getHourArray"
            :key="i"
            class="min-h-16 flex-grow bg-gray-200 flex items-center justify-center font-bold text-sm border-gray-400"
            
          >
            {{ i }}h
          </div>
        </div>
      </div>
      <!-- cellule container -->
      <div
        id="date-container"
        class="flex flex-grow min-w-full transform"
        :class="animateWeek"
      >
        <!-- day container -->
        <div
          v-for="date in dateArray"
          :key="date + 'f'"
          :id="date"
          class="flex-shrink-0 h-full"
          :style="`width: max(calc((100% - 2.99rem) / 7), 130px);`"
        >
          <div class="flex flex-col" :style="`height: max(100%, calc(4rem * ${getHourArray.length}) )`">
            <!-- sticky top date -->
            <div
              class="h-12 min-h-12 sticky top-0 flex justify-center items-center px-2 bg-gray-200"
            >
              <div class="font-bold text-base relative pb-2">
                {{ formatDate(date) }}
              <div
                v-if="ifSameDay(date, selectedDate)"
                class=" rounded-full absolute bottom-0 left-0 right-0  -mx-1 h-1 bg-primary"
              ></div>
              </div>
              
            </div>
            <!-- cellule -->
            <div
              v-for="hour in getHourArray"
              :key="hour"
              class="border-gray-400 flex-1 min-h-16"
              :class="`${isOffHour(hour) ? ' border-b' : 'border-b border-r'}`"
            >
              <!-- cellule active -->
              <div v-if="!isOffHour(hour)" class="h-full min-h-full flex flex-col cursor-pointer border-2 p-2 overflow-hidden" :class="isPastHour(date, hour)">
                <div class="w-full h-5 rounded bg-gray-300 shadow-inner">
                  <div
                    class="w-6 h-5 rounded bg-primary text-xs text-white font-bold tracking-widest flex justify-center items-center"
                  >
                    4/4
                  </div>
                </div>
              </div>
              <!-- cellule off -->
              <div v-else class="h-full min-h-full bg-gray-100 border-2 border-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="absolute top-0 right-0 bottom-0 left-0 shadow-xl-center z-40 mb-12 mr-12 border border-gray-400 pointer-events-none" style="margin-top: 47px; margin-left: 47px"></div>
  </div>
  
</template>

<script>
import {
  addDays,
  subDays,
  format,
  getISODay,
  isSameDay,
  isPast,
  isToday,
  getHours,
  setDay,
  setISODay,
  differenceInWeeks,
} from "date-fns";
import fr from "date-fns/locale/fr";
import {
  computed,
  watchEffect,
  watch,
  ref,
  onMounted,
  toRefs,
  nextTick,
  reactive,
} from "vue";
export default {
  props: {
    timeSlotsStart: { type: Number, default: 9 },
    timeSlotsEnd: { type: Number, default: 18 },
    offHour: { type: Array, default: [13] },
    selectedDate: { type: Number, default: Date.now() },
    moveByDay: {
      /* ++ move to next day, -- move to prev day */
      type: Number,
      default: 0
    },
    moveByWeek: {
      /* ++ move to next week, -- move to prev week */
      type: Number,
      default: 0
    },
    firstDayOfWeek: {
      /* dimanche: 0, lundi: 1 */
      type: Number,
      default: 1,
      validator: function(value) {
        return [0, 1].indexOf(value) !== -1
      }
    }
  },
  setup(props, { emit }) {
    const animeWeekState = reactive({
      start: false,
      end: false,
    });
    const dateArray = ref([]);
    let elemId = "";
    let canScroll = true;

    watch(
      () => props.selectedDate,
      async (newDate, oldDate) => {
        canScroll = false;
        let refreshView = false;
        if (dateArray.value.length) {
          refreshView = true;
          animeWeekState.start = true;
          await new Promise((resolve) => setTimeout(resolve, 150));
          dateArray.value.length = 0;
        }
        elemId = addDays(props.selectedDate, 5);
        const date = subDays(
          props.selectedDate,
          getISODay(props.selectedDate) + 7 - props.firstDayOfWeek
        );
        for (let i = 0; i < 21; i++) {
          const date2 = addDays(date, i);
          dateArray.value.push(date2);
        }
        if (refreshView) {
          await nextTick();
          document
            .getElementById(elemId)
            .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
          await nextTick();
          animeWeekState.start = false;
          animeWeekState.end = true;
          await new Promise((resolve) => setTimeout(resolve, 75));
          animeWeekState.end = false;
        }
        emitCurrentDatesView();
        canScroll = true;
      },
      { immediate: true }
    );

    onMounted(() => {
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      const ro = new ResizeObserver((entries) => {
        document
          .getElementById(elemId)
          .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      });
      ro.observe(document.getElementById("calandarElem"));
    });

    watch(
      () => props.moveByDay,
      async (newVal, oldVal) => {
        if (canScroll) {
          canScroll = false;
          canScroll = newVal > oldVal ? await dayNext() : await dayPrev();
          emitCurrentDatesView();
        }
      }
    );

    async function dayNext() {
      elemId = addDays(elemId, 1);
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      await new Promise((resolve) => setTimeout(resolve, 300));
      await addNextWeek();
      return true;
    }

    async function dayPrev() {
      elemId = subDays(elemId, 1);
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      await new Promise((resolve) => setTimeout(resolve, 300));
      await addPrevWeek();
      return true;
    }

    watch(
      () => props.moveByWeek,
      async (newVal, oldVal) => {
        if (canScroll) {
          canScroll = false;
          canScroll = newVal > oldVal ? await weekNext() : await weekPrev();
          emitCurrentDatesView();
        }
      }
    );

    async function weekNext() {
      const res = props.firstDayOfWeek === 1 ? setISODay(elemId, 7) : setDay(elemId, 6);
      console.log(res);
      elemId = isSameDay(elemId, res) ? addDays(elemId, 7) : res;
      animeWeekState.start = true;
      await new Promise((resolve) => setTimeout(resolve, 150));
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      await nextTick();
      animeWeekState.start = false;
      animeWeekState.end = true;
      await new Promise((resolve) => setTimeout(resolve, 75));
      animeWeekState.end = false;
      await addNextWeek();
      return true;
    }

    async function weekPrev() {
      const resp = setDay(elemId, 0, { weekStartsOn: 0 });
      const res = props.firstDayOfWeek === 1 ? resp : subDays(resp, 1);
      console.log(res);
      elemId = isSameDay(elemId, res) ? subDays(elemId, 7) : res;
      animeWeekState.start = true;
      await new Promise((resolve) => setTimeout(resolve, 150));
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      await nextTick();
      animeWeekState.start = false;
      animeWeekState.end = true;
      await new Promise((resolve) => setTimeout(resolve, 75));
      animeWeekState.end = false;
      await addPrevWeek();
      return true;
    }

    async function addNextWeek() {
      const lastDay = dateArray.value.slice(-1)[0];
      if (differenceInWeeks(lastDay, elemId) <= 0) {
        for (let i = 1; i <= 7; i++) {
          const newDay = addDays(lastDay, i);
          dateArray.value.push(newDay);
          dateArray.value.shift();
        }
        await nextTick();
        document
          .getElementById(elemId)
          .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      }
    }

    async function addPrevWeek() {
      const firstDay = dateArray.value[0];
      const calandarStartDay = subDays(elemId, 6);
      if (differenceInWeeks(calandarStartDay, firstDay) <= 0) {
        for (let i = 1; i <= 7; i++) {
          const newDay = subDays(firstDay, i);
          dateArray.value.unshift(newDay);
          dateArray.value.pop();
        }
        await nextTick();
        document
          .getElementById(elemId)
          .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      }
    }

    const animateWeek = computed(() => {
      if (animeWeekState.start) return "transition duration-150 opacity-50";
      if (animeWeekState.end) return "transition duration-75 opacity-100";
      return "";
    });

    function emitCurrentDatesView() {
      const calandarStartDay = subDays(elemId, 6);
      emit("current-dates-view", { start: calandarStartDay, end: elemId });
    }

    const getHourArray = computed(() => {
      const h = [];
      for (let i = props.timeSlotsStart; i <= props.timeSlotsEnd; i++) {
        h.push(i);
      }
      return h;
    });

    function isPastHour(date, hour) {
      if (isToday(date)) {
        const localHour = getHours(Date.now());
        return localHour > hour
          ? "bg-gray-100 border-gray-100 hover:border-gray-400"
          : localHour === hour
          ? "bg-white border-dashed border-primary hover:border-solid"
          : "bg-white border-double border-white hover:border-primary";
      } else {
        return isPast(date)
          ? "bg-gray-100 border-gray-100 hover:border-gray-400"
          : "bg-white border-white hover:border-primary";
      }
    }
    function isOffHour(hour) {
      return props.offHour.some((v) => v === hour);
    }

    function formatDate(index) {
      return format(index, "cccdd LLL", { locale: fr });
    }

    function ifSameDay(date, date2) {
      return isSameDay(date, date2);
    }

    return {
      formatDate,
      getHourArray,
      isOffHour,
      dateArray,
      isPastHour,
      animateWeek,
      ifSameDay,
    };
  },
};
</script>

<style scoped>
.overflow-auto::-webkit-scrollbar {
  overflow: hidden;
}
</style>
