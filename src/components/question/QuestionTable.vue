<template>
  <div>
    <Card>
      <template #title>
        <div class="flex align-items-center justify-content-between">
          <span>Questions</span>
          <AddEditQuestion isAdd @question-updated="addQuestion" :hands="hands" />
        </div>
      </template>
      <template #content>
        <DataTable :value="questions" tableStyle="min-width: 50rem">
          <Column field="hand" header="Player Name">
            <template #body="{ data }">
              {{ data.hand.playerName }}
            </template>
          </Column>
          <Column field="cardTypes" header="Cards Asked">
            <template #body="{ data }">
              <div v-for="(card, i) in data.cardTypes" v-bind:key="'card-' + i">
                <Chip :label="cardStore.cardLabelLookup[card]" class="mb-1"></Chip>
              </div>
            </template>
          </Column>
          <Column field="showingCard" header="Card Shown">
            <template #body="{ data }">
              {{ data.showingCard ? 'Yes' : 'No' }}
            </template></Column
          >
          <Column field="cardTypeShown" header="Card Type Shown">
            <template #body="{ data }">
              <Chip
                v-if="data.cardTypeShown"
                :label="cardStore.cardLabelLookup[data.cardTypeShown]"
              ></Chip>
              <span v-else-if="data.showingCard">Unknown</span>
            </template>
          </Column>
          <Column field="actions" header="Actions" class="w-2">
            <template #body="{ data }">
              <div class="flex align-items-center justify-content-end gap-2">
                <AddEditQuestion @question-updated="editQuestion" :hands="hands" :question="data" />
                <Button
                  @click="deleteQuestion(data.id)"
                  :icon="PrimeIcons.TRASH"
                  severity="danger"
                ></Button>
              </div>
            </template>
          </Column>
          <template #empty>
            <div class="flex align-items-center justify-content-center">
              No questions created.
            </div></template
          >
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useCardStore } from '@/stores/cardStore'
import questionService from '@/services/question.service'
import AddEditQuestion from './AddEditQuestion.vue'
import { PrimeIcons } from '@primevue/core/api'

const confirm = useConfirm()
const toast = useToast()
const cardStore = useCardStore()

const { game, hands } = defineProps({
  hands: Array,
  questions: Object,
  game: Object,
})

const emit = defineEmits(['questionsUpdated'])
const fetchQuestions = () => emit('questionsUpdated')

const addQuestion = async (question) => {
  await questionService.create(game.id, question)
  toast.add({ severity: 'success', summary: 'Question Added', life: 3000 })
  fetchQuestions()
}

const editQuestion = async (data) => {
  await questionService.update(data.id, data)
  toast.add({ severity: 'success', summary: 'Question Updated', life: 3000 })
  fetchQuestions()
}

const deleteQuestion = (questionId) => {
  confirm.require({
    message: 'Do you want to delete this question?',
    rejectLabel: 'Delete',
    acceptLabel: 'Cancel',
    header: 'Delete Confirmation',
    rejectProps: {
      severity: 'danger',
    },
    acceptProps: {
      severity: 'secondary',
    },
    reject: () => deleteQuestionConfirmed(questionId),
  })
}

const deleteQuestionConfirmed = async (questionId) => {
  await questionService.delete(questionId)
  toast.add({ severity: 'success', summary: 'Hand Deleted', life: 3000 })
  fetchQuestions()
}
</script>
