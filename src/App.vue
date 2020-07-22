<template>
  <!-- header -->
   <div class=" h-16 flex-shrink-0 bg-gray-700 text-xl text-white flex justify-start items-center pl-2">Header</div>
  
  <!-- <agenda /> -->
  <div class="flex-grow flex bg-pink-500 overflow-hidden">
    
    <div class="flex-grow flex overflow-auto">
     <!-- bar sticky vertical gauche -->
      <div class="sticky left-0 flex flex-col z-10 ">
        <div class="sticky top-0 bg-gray-100 w-16 h-12 flex-shrink-0 border-b">
          <div class="absolute h-full right-0 w-2 -mr-2" style="background: linear-gradient(to right, #f7fafc, transparent);"></div>
          <div class="absolute w-full bottom-0 h-2 -mb-2" style="background: linear-gradient(to bottom, #f7fafc, transparent);"></div>
        </div> 
        <div
          v-for="i in 30"
          :key="i"
          class="flex-1 flex justify-center items-center bg-gray-100 w-16  min-h-14 border-r border-b"
        >
          {{i}}
        </div>
      </div>
     <!-- collumn date et cellule -->
      <div
        v-for="i in 20"
        :key="i + 'f'"
        class="flex flex-col"
        style="flex: 0 0 max(14.28%, 180px);"
        
      >
        <!-- bar sticky haut -->
        <div
          class="sticky top-0 h-12 flex-shrink-0 flex justify-center items-center px-2 bg-gray-100 border-b"
        >
          hello{{i}}
        </div>
        <!-- cellule -->
        <div
          v-for="a in 30"
          :key="a"
          class="flex-grow flex justify-center items-center  min-h-14 bg-white border-b border-r p-1"
        >
          view {{`${i}-${a}`}}
        </div>
      </div>
    </div>
  </div>


  <!-- footer -->
  <div class=" h-16 flex-shrink-0 bg-white text-xl text-gray-700 flex justify-start items-center pl-2 -mt-px border-t z-10 ">Footer</div>
 
  
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>
