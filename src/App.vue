<template>
  <!-- <dashboard /> -->
  <v-dashboard v-if="loginuser" />
  <v-login v-else />
</template>

<script>
import Dashboard from "./views/Dashboard.vue";
import Login from "./components/Login.vue";
import loginuser from "./store";
import { me } from "./actions/me";

export default {
  name: "App",
  components: {
    "v-dashboard": Dashboard,
    "v-login": Login,
  },
  setup() {
    me();
    console.log(loginuser);
    return { loginuser };
  },
};
</script>

<style></style>
