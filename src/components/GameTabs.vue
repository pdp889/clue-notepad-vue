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
      </template>
    </Card>
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
import { PrimeIcons } from '@primevue/core/api'
import { useToast } from 'primevue'

const toast = useToast()
const game = ref()
const hands = ref()
const questions = ref()

const { gameId } = defineProps({
  gameId: String,
})

const editGame = async (data) => {
  await GameService.update(gameId, data)
  toast.add({ severity: 'success', summary: 'Game Updated', life: 3000 })
  fetchGame(gameId)
}

const fetchGame = async () => {
  game.value = await GameService.getGame(gameId)
}

const fetchHands = async () => {
  hands.value = await HandService.getHands(gameId)
  fetchQuestions()
}

const fetchQuestions = async () => {
  questions.value = await questionService.getQuestions(gameId)
}

onMounted(() => {
  Promise.all([fetchHands(), fetchGame()])
})
</script>
