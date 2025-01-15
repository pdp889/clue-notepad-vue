<template>
  <div class="p-1 m-auto w-3 min-w-min">
    <GameTabs :game-id="gameId" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const gameId = computed(() => {
  return route.params.id
})
</script>
