<template>
  <!-- <dashboard /> -->
  <v-dashboard v-if="login" />
  <v-login v-else />
</template>

<script>
import Dashboard from "./views/Dashboard.vue";
import Login from "./components/Login.vue";
import { loginuser, error } from "./store";
import { me } from "./actions/me";
import { watch } from "vue";

export default {
  name: "App",
  components: {
    "v-dashboard": Dashboard,
    "v-login": Login
  },
  setup() {
    me();
    const login = loginuser;
    return { login };
  }
};
</script>

<style></style>
