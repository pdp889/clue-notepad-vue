<template>
  <Card>
    <template #content>
      <DataTable :value="rows" tableStyle="width: 100%">
        <Column field="cardType"></Column>
        <Column
          v-for="(column, i) in board.columns"
          :field="'' + i"
          :header="column.name"
          :key="column.handId + '-col-' + i"
        >
          <template #body="{ data }">
            <i :class="getIcon(data[i])"> </i>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup>
import { useCardStore } from '@/stores/cardStore'
import { computed } from 'vue'
import { PrimeIcons } from '@primevue/core/api'

const { board } = defineProps({
  board: Object,
})

const cardStore = useCardStore()

const rows = computed(() => {
  let labels = Object.values(cardStore.cardLabelLookup)
  return labels.map((label, rowIndex) => {
    let row = {
      cardType: label,
    }

    board.columns.forEach((col, colIndex) => (row[colIndex] = board.cells[rowIndex][colIndex]))
    return row
  })
})

const getIcon = (cellStatus) => {
  if (cellStatus === 'YES') {
    return PrimeIcons.CHECK
  }
  if (cellStatus === 'NO') {
    return PrimeIcons.TIMES
  }
  return null
}
</script>
