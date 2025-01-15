<template>
  <div class="card">
    <Toast />
    <Card>
      <template #title
        >Games <AddEditGame title="Add" @gameUpdated="addGame"></AddEditGame>
      </template>
      <template #content>
        <DataTable :value="games" tableStyle="width: 100%">
          <Column field="name" header="Name"></Column>
          <Column field="id" header="Open">
            <template #body="{ data }">
              <RouterLink :to="'/game/' + data.id">Open</RouterLink>
            </template>
          </Column>
          <Column field="actions" header="Actions">
            <template #body="{ data }">
              <Button @click="deleteGame(data.id)" label="Delete" severity="danger"></Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GameService from '@/services/game.service.js'
import AddEditGame from './AddEditGame.vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { RouterLink } from 'vue-router'

const confirm = useConfirm()
const toast = useToast()
const games = ref()

const fetchGames = async () => {
  games.value = await GameService.getGames()
}

const addGame = async (game) => {
  await GameService.create(game)
  fetchGames()
}

const deleteGame = (gameId) => {
  confirm.require({
    message: 'Do you want to delete this game?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    header: 'Confirmation',
    icon: 'pi pi-info-circle',
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => deleteGameConfirmed(gameId),
  })
}

const deleteGameConfirmed = async (gameId) => {
  await GameService.delete(gameId)
  toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
  fetchGames()
}

onMounted(() => {
  fetchGames()
})
</script>
