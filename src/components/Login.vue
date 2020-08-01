<template>
  <div>
    <button class="btn btn-gray rounded-none" @click="login()">Login</button>
  </div>
</template>

<script>
import { login } from "../actions/login";
export default {
  name: "v-login",

  setup() {
    return { login };
  },
};
</script>
