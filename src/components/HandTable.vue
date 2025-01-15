<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="flex align-items-center justify-content-between">
          <span>Hands</span>
          <AddEditHand isAdd @hand-updated="addHand"></AddEditHand>
        </div>
      </template>
      <template #content>
        <DataTable :value="hands" tableStyle="width: 100%">
          <Column field="playerName" header="Player Name"></Column>
          <Column field="cardCount" header="Card Count"></Column>
          <Column field="cards" header="Cards">
            <template #body="{ data }">
              <div v-for="(card, i) in data.cards" v-bind:key="'card-' + i">
                <Chip :label="cardStore.cardLabelLookup[card]" class="mb-1"></Chip>
              </div>
            </template>
          </Column>
          <Column field="actions" header="Actions" class="w-2">
            <template #body="{ data }">
              <div class="flex align-items-center justify-content-end gap-2">
                <AddEditHand @hand-updated="editHand" :hand="data"></AddEditHand>
                <Button
                  @click="deleteHand(data.id)"
                  severity="danger"
                  :icon="PrimeIcons.TRASH"
                ></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import HandService from '@/services/hand.service'
import AddEditHand from './AddEditHand.vue'
import { useCardStore } from '@/stores/cardStore'
import { PrimeIcons } from '@primevue/core/api'

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
