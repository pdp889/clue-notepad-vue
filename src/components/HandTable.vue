<template>
  <div>
    <Card>
      <template #title>
        <div class="flex align-items-center justify-content-between">
          <span>Hands</span>
          <AddEditHand isAdd @hand-updated="addHand" :is-user="!userAlreadyPresent"></AddEditHand>
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
                <AddEditHand
                  @hand-updated="editHand"
                  :hand="data"
                  :is-user="data.cards && data.cards.length > 0"
                ></AddEditHand>
                <Button
                  @click="deleteHand(data.id)"
                  severity="danger"
                  :icon="PrimeIcons.TRASH"
                ></Button>
              </div>
            </template>
          </Column>
          <template #empty>
            <div class="flex align-items-center justify-content-center">
              No hands created.
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
import HandService from '@/services/hand.service'
import AddEditHand from './AddEditHand.vue'
import { useCardStore } from '@/stores/cardStore'
import { PrimeIcons } from '@primevue/core/api'
import { computed } from 'vue'

const confirm = useConfirm()
const toast = useToast()

const { game, hands } = defineProps({
  game: Object,
  hands: Array,
})
const cardStore = useCardStore()

const emit = defineEmits(['handsUpdated'])

const addHand = async (hand) => {
  await HandService.create(game.id, hand)
  toast.add({ severity: 'success', summary: 'Hand Added', life: 3000 })
  fetchHands()
}

const editHand = async (data) => {
  await HandService.update(data.id, data)
  toast.add({ severity: 'success', summary: 'Hand Updated', life: 3000 })
  fetchHands()
}

const userAlreadyPresent = computed(() => {
  return hands.some((h) => h.cards?.length > 0)
})

const deleteHand = (handId) => {
  confirm.require({
    message: 'Do you want to delete this hand?',
    rejectLabel: 'Delete',
    acceptLabel: 'Cancel',
    header: 'Delete Confirmation',
    rejectProps: {
      severity: 'danger',
    },
    acceptProps: {
      severity: 'secondary',
    },
    reject: () => deleteHandConfirmed(handId),
  })
}

const deleteHandConfirmed = async (handId) => {
  await HandService.delete(handId)
  toast.add({ severity: 'success', summary: 'Hand Deleted', life: 3000 })
  fetchHands()
}

const fetchHands = () => {
  emit('handsUpdated')
}
</script>
