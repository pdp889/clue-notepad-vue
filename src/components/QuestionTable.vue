<template>
  <div class="card">
    <AddEditQuestion title="Add" @question-updated="addQuestion" :hands="hands" />
    <DataTable :value="questions" tableStyle="min-width: 50rem">
      <Column field="hand" header="Player Name">
        <template #body="{ data }">
          {{ data.hand.playerName }}
        </template>
      </Column>
      <Column field="cardTypes" header="Cards Asked">
        <template #body="{ data }">
          <div v-for="(card, i) in data.cardTypes" v-bind:key="'card-' + i">
            <Chip :label="cardStore.cardLabelLookup[card]"></Chip>
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
        </template>
      </Column>
      <Column field="actions" header="Actions">
        <template #body="{ data }">
          <AddEditQuestion
            title="Edit"
            @question-updated="editQuestion"
            :hands="hands"
            :question="data"
          />
          <Button @click="deleteQuestion(data.id)" label="Delete" severity="danger"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useCardStore } from '@/stores/cardStore'
import questionService from '@/services/question.service'
import AddEditQuestion from './AddEditQuestion.vue'

const confirm = useConfirm()
const toast = useToast()

const { game, hands } = defineProps({
  hands: Array,
  questions: Object,
  game: Object,
})

const cardStore = useCardStore()

const emit = defineEmits(['fetchQuestions'])
const fetchQuestions = () => emit('fetchQuestions')

const addQuestion = async (question) => {
  await questionService.create(game.id, question)
  fetchQuestions()
}

const editQuestion = async (data) => {
  await questionService.update(data.id, data)
  fetchQuestions()
}

const deleteQuestion = (questionId) => {
  confirm.require({
    message: 'Do you want to delete this question?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    header: 'Confirmation',
    icon: 'pi pi-info-circle',
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => deleteQuestionConfirmed(questionId),
  })
}

const deleteQuestionConfirmed = async (questionId) => {
  await questionService.delete(questionId)
  toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
  fetchQuestions()
}
</script>
