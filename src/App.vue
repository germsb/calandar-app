<template>
  <!-- header -->
   <div class=" h-20 flex-shrink-0 bg-gray-700 text-xl text-white flex justify-start items-center pl-2">
     <!-- boutton defini a la volé -->
     <button class="rounded capitalize px-4 py-1 text-lg font-bold bg-blue-400 text-white hover:bg-blue-600 focus:outline-none">hello</button>
     <!-- defini dans ./assets/styles/components/button.css -->
     <button class="ml-3 btn btn-blue">hello</button>
     <button class="ml-3 btn btn-gray">hello</button>
     <input
     class="ml-3 rounded-md shadow-inner border-2 border-blue-600 bg-gray-200 focus:outline-none px-3 py-1 text-gray-900 placeholder-gray-800"
     type="text"
     placeholder="Rechercher une reservation"
     spellcheck="false"/>

   </div>
  
  <!-- <agenda /> -->
  <v-calandar/>


  <!-- footer -->
  <div class=" h-16 flex-shrink-0 bg-white text-xl text-gray-700 flex justify-start items-center pl-2 -mt-px border-t z-10 ">Footer</div>
 
  
</template>

<script>
import Calandar from "./components/Calandar.vue";
export default {
  name: 'App',
  components: {
    "v-calandar": Calandar
  }
}
</script>
