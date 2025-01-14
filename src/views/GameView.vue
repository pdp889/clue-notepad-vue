<template>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <GameTabs :game-id="gameId" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const gameId = computed(() => {
  return route.params.id
})

</script>
