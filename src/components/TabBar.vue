<template>
  <div
    :class="'bg-gray-100 m-3 '+(inset ? 'shadow-neuro2': 'shadow-neuro1')+' rounded-full w-full grid grid-cols-'+titles.length+''"
  >
    <div
      v-for="(title, i) in titles"
      :class="'flex items-center hover:font-bold transition-all duration-200 justify-center h-10 cursor-pointer capitalize '+(select == i ? 'tabon' : 'taboff')+' '+(i == 0 ? 'rounded-l-full' : '')+' '+(i == titles.length-1 ? 'rounded-r-full' : '')"
      :key="i"
      @click="change(i)"
    >{{ title }}</div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "v-tabBar",
  props: {
    titles: {
      type: Array,
      required: true,
      default: [""]
    },
    inset: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(props) {
    const select = ref(0);

    function change(i) {
      select.value = i;
    }

    return { change, select };
  }
};
</script>