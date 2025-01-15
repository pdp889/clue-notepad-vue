<script setup>
import { RouterView } from 'vue-router'
import StoreInit from './stores/StoreInit.vue'
</script>

<template>
  <RouterView />
  <Suspense>
    <StoreInit />
  </Suspense>
</template>

<style scoped></style>
