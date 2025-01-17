<template>
  <div>
    <Toast />
    <Card>
      <template #title>
        <div class="flex align-items-center justify-content-between">
          <span>Games</span>
          <AddEditGame isAdd @gameUpdated="addGame"></AddEditGame>
        </div>
      </template>
      <template #content>
        <DataTable :value="games" tableStyle="width: 100%">
          <Column field="name" header="Name"></Column>
          <Column field="actions" header="Actions" class="w-2">
            <template #body="{ data }">
              <div class="flex align-items-center justify-content-end gap-2">
                <RouterLink :to="'/game/' + data.id">
                  <Button label="Open" :icon="PrimeIcons.ARROW_UP_RIGHT" icon-pos="right" />
                </RouterLink>
                <Button
                  @click="deleteGame(data)"
                  severity="danger"
                  :icon="PrimeIcons.TRASH"
                ></Button>
              </div>
            </template>
          </Column>
          <template #empty
            ><div class="flex align-items-center justify-content-center">
              No games created.
            </div></template
          >
        </DataTable>
      </template>
    </Card>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GameService from '@/services/game.service.js'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { RouterLink } from 'vue-router'
import { PrimeIcons } from '@primevue/core/api'
import AddEditGame from './AddEditGame.vue'

const confirm = useConfirm()
const toast = useToast()
const games = ref()

const fetchGames = async () => {
  games.value = await GameService.getGames()
}

onMounted(() => {
  fetchGames()
})

const addGame = async (game) => {
  await GameService.create(game)
  toast.add({ severity: 'success', summary: 'Game Added', life: 3000 })
  fetchGames()
}

const deleteGame = (game) => {
  confirm.require({
    message: 'Do you want to delete this game?',
    rejectLabel: 'Delete',
    acceptLabel: 'Cancel',
    header: `Delete ${game.name}`,
    rejectProps: {
      severity: 'danger',
    },
    acceptProps: {
      severity: 'secondary',
    },
    reject: () => deleteGameConfirmed(game.id),
  })
}

const deleteGameConfirmed = async (gameId) => {
  await GameService.delete(gameId)
  toast.add({ severity: 'success', summary: 'Game Deleted', life: 3000 })
  fetchGames()
}
</script>
