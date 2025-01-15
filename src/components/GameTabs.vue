<template>
  <div v-if="game">
    <Toast />
    <h1>{{ game.name }}</h1>
    <AddEditGame title="Edit Name" :game="game" @gameUpdated="editGame"></AddEditGame>
    <Tabs value="0">
      <TabList>
        <Tab value="0">Board</Tab>
        <Tab value="1">Hands</Tab>
        <Tab value="2">Questions</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div>TODO</div>
        </TabPanel>
        <TabPanel value="1">
          <HandTable :game="game" :hands="hands" @fetch-hands="fetchHands" />
        </TabPanel>
        <TabPanel value="2">
          <QuestionTable
            :hands="hands"
            :game="game"
            :questions="questions"
            @fetch-questions="fetchQuestions"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import GameService from '@/services/game.service.js'
import AddEditGame from '../components/AddEditGame.vue'
import HandTable from './HandTable.vue'
import HandService from '@/services/hand.service'
import questionService from '@/services/question.service'
import QuestionTable from './QuestionTable.vue'

const game = ref()
const hands = ref()
const questions = ref()

const { gameId } = defineProps({
  gameId: String,
})

const editGame = async (data) => {
  await GameService.update(gameId, data)
  fetchGame(gameId)
}

const fetchGame = async (id) => {
  game.value = await GameService.getGame(gameId)
}

const fetchHands = async () => {
  hands.value = await HandService.getHands(gameId)
  fetchQuestions() //because it could be deleted
}

const fetchQuestions = async () => {
  questions.value = await questionService.getQuestions(gameId)
}

onMounted(() => {
  Promise.all([fetchHands(), fetchGame()])
})
</script>
