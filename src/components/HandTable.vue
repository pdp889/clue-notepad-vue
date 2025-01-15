<template>
  <div class="card">
    <AddEditHand title="Add" @hand-updated="addHand"></AddEditHand>
    <DataTable :value="hands" tableStyle="min-width: 50rem">
      <Column field="playerName" header="Player Name"></Column>
      <Column field="cardCount" header="Card Count"></Column>
      <Column field="cards" header="Cards">
        <template #body="{ data }">
          <!-- <div v-for="(card, i) in data.cardTypes" v-bind:key="'card-' + i">
            <Chip :label="cardStore.cardLabelLookup[card]"></Chip>
          </div> -->
          <div v-for="(card, i) in data.cards" v-bind:key="'card-' + i">
            <Chip :label="cardStore.cardLabelLookup[card]"></Chip>
          </div>
        </template>
      </Column>
      <Column field="actions" header="Actions">
        <template #body="{ data }">
          <AddEditHand title="Edit" @hand-updated="editHand" :hand="data"></AddEditHand>
          <Button @click="deleteHand(data.id)" label="Delete" severity="danger"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import HandService from '@/services/hand.service'
import AddEditHand from './AddEditHand.vue'
import { useCardStore } from '@/stores/cardStore'

const confirm = useConfirm()
const toast = useToast()

const { game, hands } = defineProps({
  game: Object,
  hands: Array,
})
const cardStore = useCardStore()

const emit = defineEmits(['fetchHands'])

const addHand = async (hand) => {
  await HandService.create(game.id, hand)
  fetchHands()
}

const editHand = async (data) => {
  await HandService.update(data.id, data)
  fetchHands()
}

const deleteHand = (handId) => {
  confirm.require({
    message: 'Do you want to delete this hand?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    header: 'Confirmation',
    icon: 'pi pi-info-circle',
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => deleteHandConfirmed(handId),
  })
}

const deleteHandConfirmed = async (handId) => {
  await HandService.delete(handId)
  toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
  fetchHands()
}

const fetchHands = () => {
  emit('fetchHands')
}
</script>
