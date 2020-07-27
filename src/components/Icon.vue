<template>
  <svg
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    role="img"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g>
    <path :d="path" />
    <path v-if="path2" :d="path2"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: "icon",
  props: {
    path: {
      type: String,
      required: true
    },
    path2: {
      type: String,
      default: undefined,
      required: false
    }
  }
};
</script>