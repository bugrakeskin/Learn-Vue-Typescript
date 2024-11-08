<template>
  <div class="grid items-center space-xy-4 mt-4 p-2">
    <input class="border" type="number" v-model="age" />

    <div class="text-1xl">
      Can you drive?
      <span :class="canDrive === 'yes' ? 'text-green-600' : 'text-red-600'">{{
        canDrive
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
let age = ref(0);

let canDrive = computed(() => {
  return age.value >= 18 ? "yes" : "no";
});
/* setTimeout(() => {
  let age = 34;
}); */
</script>

<style></style>
