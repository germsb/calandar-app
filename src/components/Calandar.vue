<template>
  <div class="flex-grow flex overflow-hidden">
    <div id="tt" class="min-h-full min-w-full overflow-auto flex">
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
      <div
        v-for="(date, i) in rref"
        :key="date + 'f'"
        :id="date"
        class="flex-shrink-0 min-h-full h-full"
        style="width: max(13.85%, 170px);"
      >
        <div class="flex flex-col min-h-full">
          <div
            class="h-12 sticky top-0 flex justify-center border-b items-center px-2 bg-gray-100 font-bold text-base"
          >{{getDate(date)}}</div>

          <div v-for="i in getHourArray" :key="i" class="min-h-14 flex-grow flex">
            <div
              v-if="!isOffHour(i)"
              :class="[isPastHour(date, i)]"
              class="flex-grow p-4 font-bold text-gray-600 text-sm cursor-pointer"
            >
              <div class="w-32 h-5 rounded bg-gray-300 shadow-inner">
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
</template>

<script>
import {
  addDays,
  subDays,
  format,
  getISODay,
  isThisHour,
  isPast,
  isToday,
  setHours,
  getHours,
  setDay
} from "date-fns";
import { fr } from "date-fns/locale";
import { computed, watchEffect, ref, onMounted } from "vue";
export default {
  props: {
    timeSlotsStart: { type: Number, default: 9 },
    timeSlotsEnd: { type: Number, default: 18 },
    offHour: { type: Array, default: [13] },
    selectedDate: { type: Number, default: Date.now() }
  },
  setup({ timeSlotsStart, timeSlotsEnd, offHour, selectedDate }) {
    const getHourArray = computed(() => {
      const h = [];
      for (let i = timeSlotsStart; i <= timeSlotsEnd; i++) {
        h.push(i);
      }
      return h;
    });

    const rref = ref([]);
    let elemId = "";
    watchEffect(() => {
      elemId = setDay(selectedDate, 1, { weekStartsOn: 1 }).toString();
      // console.log(elemId);
      // console.log(getISODay(selectedDate));
      const date = addDays(
        selectedDate,
        -Math.abs(getISODay(selectedDate) + 6)
      );
      for (let i = 0; i < 21; i++) {
        // console.log(i);
        const date2 = addDays(selectedDate, i);
        rref.value.push(date2);
        // console.log(format(date2, "cccc dd LLL", { locale: fr }));
      }
    });

    onMounted(() => {
      // document
      //   .getElementById(elemId)
      //   .scrollIntoView({ behavior: "auto", block: "start", inline: "start" });
      // document.getElementById("tt").scrollBy({ left: -48 });
    });

    const calandarData = computed(() => {
      //console.log(getISODay(selectedDate));
      return;
    });

    function isPastHour(date, hour) {
      if (isToday(date)) {
        const localHour = getHours(Date.now());
        return localHour > hour
          ? "bg-gray-100 border border-gray-100"
          : localHour === hour
          ? "bg-white border border-primary rounded"
          : "bg-white border border-dashed border-dashed border-white hover:border-primary";
      } else {
        return isPast(date)
          ? "bg-gray-100 border border-gray-200"
          : "bg-white border border-dashed border-white hover:border-primary";
      }
    }
    function isOffHour(hour) {
      return offHour.some(v => v === hour);
    }

    function getDate(index) {
      //const date = addDays(Date.now(), index);
      return format(index, "ccc dd LLL", { locale: fr });
    }
    function cc(id, id2) {
      console.log(id, id2);
    }
    return { getDate, cc, getHourArray, isOffHour, rref, isPastHour };
  }
};
</script>

<style scoped>
.shasha {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.overflow-auto::-webkit-scrollbar {
  overflow: hidden;
}
</style>