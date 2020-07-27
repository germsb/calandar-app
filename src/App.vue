<template>
  <!-- header -->
  <div class="flex flex-col h-full bg-gray-200">
    <div class="h-20 flex-shrink-0 flex justify-start items-center pl-2">
      <div class="inline-flex m-5">
        <button class="btn btn-gray rounded-l-full">
          <c-icon
            viewBox="0 0 20 20"
            data-icon="test"
            path="M10,1 L20,7 L10,13 L0,7 L10,1 Z M16.6666667,11 L20,13 L10,19 L0,13 L3.33333333,11 L10,15 L16.6666667,11 Z"
            class="icon icon-md text-gray-800 mr-3"
          />button
        </button>
        <button class="btn btn-gray rounded-none" @click="changeColor('237, 137, 54')">
          <div class="rounded-full w-5 h-5 bg-orange-500"></div>
        </button>
        <button class="btn btn-gray rounded-none" @click="changeColor('56, 178, 172')">
          <div class="rounded-full w-5 h-5 bg-teal-500"></div>
        </button>
        <button class="btn btn-gray rounded-r-full" @click="changeColor('160, 123, 234')">
          <div class="rounded-full w-5 h-5 bg-purple-500"></div>
        </button>
        <button class="btn btn-gray rounded-l-full ml-3" @click="week--">prev week</button>
        <button class="btn btn-gray rounded-none " @click="day--">prev day</button>
         <button class="btn btn-gray rounded-none text-gray-800" @click="selectedDate = Date.now()">
           <c-icon
            viewBox="0 0 24 24"
            data-icon="test"
            path="M7 10h5v5H7m12 4H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
            class="icon icon-lg mx-1"
          />
         </button>
         <button class="btn btn-gray rounded-none text-gray-800">
           <c-icon
            viewBox="0 0 24 24"
            data-icon="test"
            path="M9 10v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2m2-7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1h2v2h8V1h2v2h1m0 16V8H5v11h14M9 14v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2z"
            class="icon icon-lg mx-1"
          />
         </button>
        <button class="btn btn-gray rounded-none" @click="day++">next day</button>
         <button class="btn btn-gray rounded-r-full" @click="week++">next week</button>
      </div>
    </div>
    <!-- <div class="flex justify-start items-center pl-5 pr-5">
      <v-tabBar :titles="['titre 1','titre 2','titre 3','titre 4']" />
      <v-tabBar :titles="['titre 1','titre 2','titre 3','titre 4']" inset />
    </div> -->

    <div class="flex-grow flex bg-gray-100 overflow-hidden p-5 shadow-neuro1 rounded-xxl m-8">
      <!-- <guide /> -->
      <v-guide />
      <!-- <agenda /> -->
      <v-calandar :moveByDay="day" :moveByWeek="week" :selectedDate="selectedDate"/>
    </div>

    <!-- footer -->
    <div
      class="h-16 flex-shrink-0 bg-gray-100 text-2xl text-gray-800 font-bold flex justify-start items-center pl-2 -mt-px z-10"
    >Footer</div>
  </div>
</template>

<script>
import Calandar from "./components/Calandar.vue";
import Guide from "./components/Guide.vue";
import Icon from "./components/Icon.vue";
import TabBar from "./components/TabBar.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    "v-calandar": Calandar,
    "v-guide": Guide,
    "c-icon": Icon,
    "v-tabBar": TabBar
  },
  data: ()=>({day: 0}),
  setup() {
    const selectedDate = ref(Date.now());
    const day = ref(0);
    const week = ref(0);
    function changeColor(color) {
      document.documentElement.style.setProperty("--primary-color", color);
    }
    return { changeColor, day, week, selectedDate};
  }
};
</script>
