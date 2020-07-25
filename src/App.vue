<template>
  <!-- header -->
  <div class="flex flex-col h-full bg-gray-100">
    <div
      class="h-20 flex-shrink-0 bg-gray-100 flex justify-start items-center pl-2"
    >
      <div class="inline-flex m-5">
        <button class="btn btn-gray rounded-l-full">
          <c-icon
            viewBox="0 0 20 20"
            data-icon="test"
            path="M10,1 L20,7 L10,13 L0,7 L10,1 Z M16.6666667,11 L20,13 L10,19 L0,13 L3.33333333,11 L10,15 L16.6666667,11 Z"
            class="icon icon-md text-gray-800 mr-3"
          />
          button
        </button>
        <button class="btn btn-gray rounded-none" @click="changeColor('#ed8936')">
          <div class="rounded-full w-5 h-5 bg-orange-500"></div>
        </button>
        <button class="btn btn-gray rounded-r-full" @click="changeColor('#9f7aea')">
          <div class="rounded-full w-5 h-5 bg-purple-500"></div>
        </button>
      </div>
    </div>
    <div class="flex-grow flex bg-gray-100 overflow-hidden p-5 shadow-neuro1 rounded-xxl m-8">
      <!-- <guide /> -->
      <v-guide />
      <!-- <agenda /> -->
      <v-calandar />
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

export default {
  name: "App",
  components: {
    "v-calandar": Calandar,
    "v-guide": Guide,
    "c-icon": Icon
  },
  setup() {
    function changeColor(color) {
      document.documentElement.style.setProperty("--color-primary", color);
    }
    return { changeColor };
  }
};
</script>
