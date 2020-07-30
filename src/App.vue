<template>
  <!-- header -->
  <div class="flex flex-col h-full bg-gray-200">
    <div class="h-20 flex-shrink-0 flex">
      <div class>
        <div class="inline-flex m-5">
          <button class="btn btn-gray rounded-l-full">
            <c-icon
              viewBox="0 0 20 20"
              data-icon="test"
              path="M10,1 L20,7 L10,13 L0,7 L10,1 Z M16.6666667,11 L20,13 L10,19 L0,13 L3.33333333,11 L10,15 L16.6666667,11 Z"
              class="icon icon-md text-gray-800 mr-3"
            />button
          </button>
          <button
            class="btn btn-gray rounded-none"
            @click="changeColor('237, 137, 54')"
          >
            <div class="rounded-full w-5 h-5 bg-orange-500"></div>
          </button>
          <button
            class="btn btn-gray rounded-none"
            @click="changeColor('56, 178, 172')"
          >
            <div class="rounded-full w-5 h-5 bg-teal-500"></div>
          </button>
          <button
            class="btn btn-gray rounded-r-full"
            @click="changeColor('160, 123, 234')"
          >
            <div class="rounded-full w-5 h-5 bg-purple-500"></div>
          </button>
        </div>
      </div>
      <div class="flex-1 flex justify-end items-end mr-16">
        <div class="flex items-center">
          <button
            class="rounded-full hover:bg-gray-500 hover:bg-opacity-25 p-2 focus:outline-none"
            @click="week--"
          >
            <c-icon
              viewBox="0 0 24 24"
              data-icon="test"
              path="M11.64 5.23a1 1 0 0 0-1.41.13l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37a1 1 0 0 0 .78-1.63L7.29 12l4.48-5.37a1 1 0 0 0-.13-1.4z"
              path2="M14.29 12l4.48-5.37a1 1 0 0 0-1.54-1.28l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37a1 1 0 0 0 .78-1.63z"
              class="icon icon-lg text-gray-800"
            />
          </button>
          <button
            class="rounded-full hover:bg-gray-500 hover:bg-opacity-25 p-2 focus:outline-none"
            @click="day--"
          >
            <c-icon
              viewBox="0 0 24 24"
              data-icon="test"
              path="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
              class="icon icon-lg text-gray-800"
            />
          </button>
<<<<<<< HEAD
          <button
            class="border-2 border-gray-600 rounded px-3 py-1 font-bold mx-2 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none"
            @click="selectedDate = Date.now()"
          >
            Aujoud'hui
          </button>
=======
          <button class="border border-gray-600 rounded px-3 py-1 font-bold text-lg mx-2 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none" @click="selectedDate = Date.now()">Aujoud'hui</button>
>>>>>>> e7a7e76dfa2351b805eaa4cc7bfe9a9e0224803b
          <button
            class="rounded-full hover:bg-gray-500 hover:bg-opacity-25 p-2 focus:outline-none"
            @click="day++"
          >
            <c-icon
              viewBox="0 0 24 24"
              data-icon="test"
              path="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
              class="icon icon-lg text-gray-800"
            />
          </button>
          <button
            class="rounded-full hover:bg-gray-500 hover:bg-opacity-25 p-2 focus:outline-none"
            @click="week++"
          >
            <c-icon
              viewBox="0 0 24 24"
              data-icon="test"
              path="M18.78 11.37l-4.78-6a1 1 0 0 0-1.41-.15a1 1 0 0 0-.15 1.41L16.71 12l-4.48 5.37a1 1 0 0 0 .13 1.41A1 1 0 0 0 13 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 .01-1.27z"
              path2="M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z"
              class="icon icon-lg text-gray-800"
            />
          </button>
          <div class="mx-3 text-xl font-bold capitalize w-56">
            {{ currentMonthAndYear }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-start items-center pl-5 pr-5">
      <v-tabBar :titles="['titre 1','titre 2','titre 3','titre 4']" />
      <v-tabBar :titles="['titre 1','titre 2','titre 3','titre 4']" inset />
    </div>-->

    <div
      class="flex-grow flex bg-gray-100 overflow-hidden px-5 pt-3 pb-5 shadow-neuro1 rounded-xxl mx-8 mt-8 mb-16"
    >
      <!-- <guide /> -->
      <v-guide />
      <!-- <agenda /> -->
      <v-calandar
        :moveByDay="day"
        :moveByWeek="week"
        :selectedDate="selectedDate"
        @current-dates-view="setCurrentDatesView"
      />
    </div>

    <!-- footer -->
    <!-- <div
      class="h-12 flex-shrink-0 bg-gray-100 text-2xl text-gray-800 font-bold flex justify-start items-center pl-2 -mt-px z-10"
    >
      Footer
    </div> -->
  </div>
</template>

<script>
import Calandar from "./components/Calandar.vue";
import Guide from "./components/Guide.vue";
import Icon from "./components/Icon.vue";
import TabBar from "./components/TabBar.vue";
import { ref } from "vue";
import { isSameMonth, isSameYear, format } from "date-fns";
import { fr } from "date-fns/locale";
import { query, mutation } from "./api";

export default {
  name: "App",
  components: {
    "v-calandar": Calandar,
    "v-guide": Guide,
    "c-icon": Icon,
    "v-tabBar": TabBar,
  },
  data: () => ({ day: 0 }),
  setup() {
    const selectedDate = ref(Date.now());
    const day = ref(0);
    const week = ref(0);
    const currentMonthAndYear = ref("");
    function setCurrentDatesView(dates) {
      const { start, end } = dates;
      currentMonthAndYear.value = isSameMonth(start, end)
        ? format(start, "LLLL RRRR", { locale: fr })
        : isSameYear(start, end)
        ? `${format(start, "LLL", { locale: fr })} - ${format(
            end,
            "LLL  RRRR",
            { locale: fr }
          )}`
        : `${format(start, "LLL RRRR", { locale: fr })} - ${format(
            end,
            "LLL  RRRR",
            { locale: fr }
          )}`;
    }
    function changeColor(color) {
      document.documentElement.style.setProperty("--primary-color", color);
    }
    return {
      changeColor,
      day,
      week,
      selectedDate,
      setCurrentDatesView,
      currentMonthAndYear,
    };
  },
};
</script>
