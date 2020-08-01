<template>
  <div class="flex h-full justify-center items-center bg-gray-200 h-24">
    <form class="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="checkForm">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Utilisateur</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          v-model="email"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe</label>
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          v-model="password"
          placeholder="******************"
        />
        <p v-if="er" class="text-red-500 text-xs italic">Email ou mot de passe incorrect.</p>
      </div>
      <div class="flex items-center justify-between">
        <input type="submit" value="Connexion" class="btn btn-gray rounded-full" />
      </div>
    </form>
  </div>
</template>

<script>
import { login } from "../actions/login";
import { ref } from "vue";
import { error } from "../store";
export default {
  name: "v-login",
  setup() {
    const email = ref("");
    const password = ref("");
    const er = error;

    const checkForm = e => {
      e.preventDefault();
      login(email.value, password.value);
      return false;
    };
    return { email, password, checkForm, er };
  }
};
</script>
