<template>
  <Button :icon="icon" @click="show" />

  <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '25%' }">
    <div class="flex items-center gap-4 mb-4">
      <label class="font-semibold w-2">Hand:</label>
      <Select
        v-model="editable.hand"
        :options="handOptions"
        optionLabel="playerName"
        placeholder="Select Hand"
        class="w-8"
        :invalid="!editable.hand"
      ></Select>
    </div>
    <div class="flex items-center gap-4">
      <label for="cardTypes" class="font-semibold w-2">Cards Asked:</label>
      <MultiSelect
        input-id="cardTypes"
        v-model="editable.cardTypes"
        :options="cardStore.cardCategories"
        optionLabel="label"
        optionValue="value"
        optionGroupLabel="label"
        optionGroupChildren="cardTypes"
        display="chip"
        placeholder="Select Cards"
        :show-toggle-all="false"
        scroll-height="30rem"
        class="w-8"
        :maxSelectedLabels="3"
        :invalid="!editable.cardTypes || !threeCardsSelected"
      >
        <template #optiongroup="slotProps">
          <div class="flex items-center">
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </MultiSelect>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <div class="w-2"></div>
      <span v-if="!threeCardsSelected && !!editable.cardTypes" class="w-8 mt-2" style="color: red">
        Must have exactly 3 cards.
      </span>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="showingCard" class="font-semibold w-2">Showing Card?:</label>
      <Checkbox v-model="editable.showingCard" inputId="showingCard" binary />
    </div>
    <div class="flex items-center gap-4 mb-4" v-if="editable.showingCard">
      <label for="cardTypeShown" class="font-semibold w-2"> Card Type Shown: </label>
      <Select
        input-id="cardTypeShown"
        v-model="editable.cardTypeShown"
        :options="cardStore.cardCategories"
        optionLabel="label"
        optionValue="value"
        optionGroupLabel="label"
        optionGroupChildren="cardTypes"
        placeholder="Unknown"
        class="w-8"
        showClear
      >
        <template #optiongroup="slotProps">
          <div class="flex items-center">
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Select>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Save" @click="ok" :disabled="!canSave"></Button>
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useCardStore } from '@/stores/cardStore'
import { PrimeIcons } from '@primevue/core/api'

const visible = ref(false)
const editable = ref({})
const cardStore = useCardStore()

const { question, isAdd, hands } = defineProps({
  question: Object,
  isAdd: Boolean,
  hands: Array,
})

const title = computed(() => {
  if (isAdd) {
    return 'Add Hand'
  }
  return 'Edit Hand'
})

const icon = computed(() => {
  if (isAdd) {
    return PrimeIcons.PLUS
  }
  return PrimeIcons.PENCIL
})

watch(
  () => editable.value.showingCard,
  (showingCard) => {
    if (!showingCard) {
      editable.value.cardTypeShown = null
    }
  },
)

const handOptions = computed(() => {
  return hands.filter((h) => !(h.cards?.length > 0))
})

const show = () => {
  editable.value = question ? { ...question } : {}
  visible.value = true
}

const emit = defineEmits(['questionUpdated'])
const ok = () => {
  emit('questionUpdated', editable.value)
  visible.value = false
}

const threeCardsSelected = computed(() => {
  return editable.value.cardTypes?.length == 3
})

const canSave = computed(() => {
  return !!editable.value.hand && !!editable.value.cardTypes && threeCardsSelected.value
})
</script>
