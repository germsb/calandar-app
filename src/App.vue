<template>
  <!-- header -->
   <div class=" h-20 flex-shrink-0 bg-gray-700 text-xl text-white flex justify-start items-center pl-2">
     <!-- boutton defini a la volé -->
     <button class="rounded capitalize px-4 py-1 text-lg font-bold bg-blue-400 text-white hover:bg-blue-600 focus:outline-none">hello</button>
     <!-- defini dans ./assets/styles/components/button.css -->
     <button class="ml-3 btn btn-blue">hello</button>
     <button class="ml-3 btn btn-gray">hello</button>
     <button class="ml-3 btn btn-primary mr-2">hello primary color</button>
     <div> change primary color :</div>
     <button class="rounded-full w-5 h-5 bg-orange-500 mx-2 focus:outline-none" @click="changeColor('#ed8936')"></button>
     <button class="rounded-full w-5 h-5 bg-purple-500 focus:outline-none" @click="changeColor('#9f7aea')"></button>
     

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
  },
  setup() {
    function changeColor(color) {
      document.documentElement.style.setProperty('--color-primary', color);
    }
    return { changeColor }
  }
}
</script>
