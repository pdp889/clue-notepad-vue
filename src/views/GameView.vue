<template>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <div v-if="game">
      <h1>Game View {{game.name}}!</h1>
      <AddEditGame title="Edit Name" :game="game" @gameUpdated="editGame"></AddEditGame>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router'
import GameService from "@/services/game.service.js";
import AddEditGame from "../components/AddEditGame.vue";

const route = useRoute()
const game = ref();

const editGame = async (data) => {
  await GameService.update(game.value.id, data);
  fetchGame(game.value.id);
};

const fetchGame = async (id) => {
  game.value = await GameService.getGame(id);
}

onMounted(() => {
  fetchGame(route.params.id);
});

</script>
