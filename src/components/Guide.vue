<template>
  <div class="flex p-5 mr-5 flex-col">
    <div class="flex font-bold pl-3">
      <c-icon
        viewBox="0 0 20 20"
        data-icon="test"
        path="M7,8 C9.209139,8 11,6.209139 11,4 C11,1.790861 9.209139,0 7,0 C4.790861,0 3,1.790861 3,4 C3,6.209139 4.790861,8 7,8 Z M7,9 C4.852,9 2.801,9.396 0.891,10.086 L2,16 L3.25,16 L4,20 L10,20 L10.75,16 L12,16 L13.109,10.086 C11.199,9.396 9.148,9 7,9 Z M15.315,9.171 L13.66,18 L12.41,18 L12.035,20 L16,20 L16.75,16 L18,16 L19.109,10.086 C17.899,9.648 16.627,9.346 15.315,9.171 Z M13,0 C12.532,0 12.089,0.096 11.671,0.243 C12.501,1.272 13,2.578 13,4 C13,5.422 12.501,6.728 11.671,7.757 C12.089,7.904 12.531,8 13,8 C15.209,8 17,6.209 17,4 C17,1.791 15.209,0 13,0 Z"
        class="icon icon-md text-gray-800 mr-5"
      />Guides
    </div>
    <div class="mt-3 flex flex-col">
      <div
        v-for="(guide, i) in guides"
        :key="guide + 'f'"
        @click="changeGuide(i)"
        :class="
          'p-1 mb-2 bg-white rounded-full flex cursor-pointer items-center transition-all duration-200 ' +
          (guide.select ? 'w-48' : 'w-40 hover:w-48')
        "
      >
        <img
          :src="'https://i.pravatar.cc/50?u=' + guide.username"
          class="mr-3 inline rounded-full w-8"
        />
        <div class="flex-1">
          <span>{{ guide.username }}</span>
        </div>
        <div
          v-if="guide.select"
          class="rounded-full bg-primary w-4 h-4 mr-2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Icon from "./Icon.vue";
import { query, mutation } from "../api";

export default {
  name: "v-guide",
  components: {
    "c-icon": Icon,
  },
  setup() {
    const guides = ref([]);

    query(`query {users(where: {role: guide }) {id, username }}`).then(
      (result) => {
        guides.value = result.users.map((el) => {
          return { ...el, select: false };
        });
      }
    );

    function changeGuide(index) {
      guides.value = guides.value.map((el, i) => {
        if (i == index) {
          el.select = true;
        } else {
          el.select = false;
        }
        return el;
      });
    }
    return { changeGuide, guides };
  },
};
</script>
