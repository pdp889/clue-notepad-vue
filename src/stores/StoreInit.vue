<template>
  <span></span>
</template>

<script setup lang="ts">
import { useCardStore } from './cardStore'

const cardStore = useCardStore()
cardStore.fetchCardCategories()
</script>
