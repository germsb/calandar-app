<template>
  <div class="flex-grow flex overflow-hidden">
    <div id="calandarElem" class="min-h-full min-w-full overflow-y-auto overflow-x-hidden flex">
      <div class="w-12 min-h-full h-full sticky flex-shrink-0 left-0 z-20">
        <div class="flex flex-col min-h-full border-r">
          <div class="h-12 bg-gray-100 sticky top-0"></div>
          <div
            v-for="i in getHourArray"
            :key="i"
            class="min-h-14 flex-grow bg-gray-100 flex items-center justify-center font-bold text-sm"
          >{{i}}h</div>
        </div>
      </div>
      <div id="date-container" class="flex flex-grow min-w-full overflow-x-hidden">
        <div
          v-for="(date, i) in dateArray"
          :key="date + 'f'"
          :id="date"
          class="flex-shrink-0 min-h-full h-full"
          :style="`width: max(calc((100% - 3rem) / 7), 120px);`"
        >
          <div class="flex flex-col min-h-full">
            <div
              class="h-12 sticky top-0 flex justify-center border-b items-center px-2 bg-gray-100 font-bold text-base"
            >{{formatDate(date)}}</div>
            <div class="flex flex-col flex-grow border-r">
              <div v-for="i in getHourArray" :key="i" class="min-h-14 flex-grow flex">
                <div
                  v-if="!isOffHour(i)"
                  :class="[isPastHour(date, i)]"
                  class="flex-grow p-4 font-bold text-gray-600 text-sm cursor-pointer"
                >
                  <div class="w-full h-5 rounded bg-gray-300 shadow-inner">
                    <div
                      class="w-6 h-5 rounded bg-primary text-xs text-white font-bold tracking-widest flex justify-center items-center"
                    >4/4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addDays,
  subDays,
  format,
  getISODay,
  isThisHour,
  isSameDay,
  isPast,
  isToday,
  setHours,
  getHours,
  setDay,
  differenceInWeeks
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  computed,
  watchEffect,
  watch,
  ref,
  onMounted,
  toRefs,
  nextTick
} from "vue";
export default {
  props: {
    timeSlotsStart: { type: Number, default: 9 },
    timeSlotsEnd: { type: Number, default: 18 },
    offHour: { type: Array, default: [13] },
    selectedDate: { type: Number, default: Date.now() },
    moveByDay: { type: Number, default: 0 },
    moveByWeek: { type: Number, default: 0 }
  },
  setup(props, { emit }) {
    const dateArray = ref([]);
    let elemId = "";
    let canScroll = true;

    watch(
      () => props.selectedDate,
      async (newDate, oldDate) => {
        let refreshView = false;
        if (dateArray.value.length) {
          refreshView = true;
          dateArray.value.length = 0;
        }
        elemId = addDays(props.selectedDate, 5);
        const date = addDays(
          props.selectedDate,
          -Math.abs(getISODay(props.selectedDate) + 6)
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
        }
        emitCurrentDatesView();
      },
      { immediate: true }
    );

    onMounted(() => {
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      const ro = new ResizeObserver(entries => {
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
      await new Promise(resolve => setTimeout(resolve, 300));
      await addNextWeek();
      return true;
    }

    async function dayPrev() {
      elemId = subDays(elemId, 1);
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      await new Promise(resolve => setTimeout(resolve, 300));
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

    function weekNext() {
      const res = setDay(elemId, 0, { weekStartsOn: 1 });
      elemId = isSameDay(elemId, res) ? addDays(elemId, 7) : res;
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      addNextWeek();
      return true;
    }

    function weekPrev() {
      const res = setDay(elemId, 0, { weekStartsOn: 0 });
      elemId = isSameDay(elemId, res) ? subDays(elemId, 7) : res;
      document
        .getElementById(elemId)
        .scrollIntoView({ behavior: "auto", block: "end", inline: "end" });
      addPrevWeek();
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
          ? "bg-gray-100 border border-dashed border-gray-100 hover:border-gray-400"
          : localHour === hour
          ? "bg-white border border-primary rounded"
          : "bg-white border border-dashed border-white hover:border-primary";
      } else {
        return isPast(date)
          ? "bg-gray-100 border border-dashed border-gray-100 hover:border-gray-400"
          : "bg-white border border-dashed border-white hover:border-primary";
      }
    }
    function isOffHour(hour) {
      return props.offHour.some(v => v === hour);
    }

    function formatDate(index) {
      return format(index, "ccc dd LLL", { locale: fr });
    }

    return { formatDate, getHourArray, isOffHour, dateArray, isPastHour };
  }
};
</script>

<style scoped>
.overflow-auto::-webkit-scrollbar {
  overflow: hidden;
}
</style>