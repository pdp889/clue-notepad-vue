<template>
  <div>
    <Toast />
    <Card v-if="game">
      <template #title>
        <div class="flex align-items-center justify-content-between">
          <h1 class="text-center mb-5">{{ game.name }}</h1>
          <div class="flex align-items-center gap-2 justify-content-end">
            <AddEditGame :game="game" @gameUpdated="editGame"></AddEditGame>
            <RouterLink :to="'/'">
              <Button :icon="PrimeIcons.HOME"></Button>
            </RouterLink>
          </div>
        </div>
      </template>
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0">Board</Tab>
            <Tab value="1">Hands</Tab>
            <Tab value="2">Questions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <Board :board="board" v-if="hands && hands.length >= 2" />
              <div v-else>Board will display when at least 2 hands are added.</div>
            </TabPanel>
            <TabPanel value="1">
              <HandTable :game="game" :hands="hands" @hands-updated="handsUpdated" />
            </TabPanel>
            <TabPanel value="2">
              <QuestionTable
                :hands="hands"
                :game="game"
                :questions="questions"
                @questions-updated="questionsUpdated"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import GameService from '@/services/game.service.js'
import AddEditGame from './game/AddEditGame.vue'
import HandTable from './hand/HandTable.vue'
import HandService from '@/services/hand.service'
import questionService from '@/services/question.service'
import QuestionTable from './question/QuestionTable.vue'
import { PrimeIcons } from '@primevue/core/api'
import { useToast } from 'primevue'
import Board from './board/BoardTable.vue'

const toast = useToast()
const game = ref()
const hands = ref()
const questions = ref()
const board = ref()

const { gameId } = defineProps({
  gameId: String,
})

const editGame = async (data) => {
  await GameService.update(gameId, data)
  toast.add({ severity: 'success', summary: 'Game Updated', life: 3000 })
  fetch({ GAME: true })
}

const handsUpdated = async () => {
  return fetch({ HANDS: true, QUESTIONS: true, BOARD: true })
}

const questionsUpdated = async () => {
  return fetch({ QUESTIONS: true, BOARD: true })
}

onMounted(() => {
  fetch({ HANDS: true, QUESTIONS: true, BOARD: true, GAME: true })
})

const fetch = async (items) => {
  const results = await Promise.all([
    items.GAME ? GameService.getGame(gameId) : Promise.resolve(null),
    items.HANDS ? HandService.getHands(gameId) : Promise.resolve(null),
    items.QUESTIONS ? questionService.getQuestions(gameId) : Promise.resolve(null),
    items.BOARD ? GameService.getBoard(gameId) : Promise.resolve(null),
  ])

  if (items.GAME) game.value = results[0]
  if (items.HANDS) hands.value = results[1]
  if (items.QUESTIONS) questions.value = results[2]
  if (items.BOARD) board.value = results[3]
}
</script>
