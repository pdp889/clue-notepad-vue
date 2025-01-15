<template>
  <Button :icon="icon" @click="show" />
  <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '25%' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="playerName" class="font-semibold w-2">Player Name:</label>
      <InputText
        id="playerName"
        class="w-8"
        autocomplete="off"
        v-model="editable.playerName"
        :invalid="!editable.playerName"
      />
    </div>
    <div class="flex items-center gap-4">
      <label for="cardCount" class="font-semibold w-2"> Card Count:</label>
      <InputNumber
        v-model="editable.cardCount"
        inputId="cardCount"
        autocomplete="off"
        class="w-8"
        :invalid="cardCountInvalid || !editable.cardCount"
      />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <div class="w-2"></div>
      <span v-if="cardCountInvalid" class="w-8 mt-2" style="color: red">
        Card Count must match number of cards chosen.
      </span>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="cards" class="font-semibold w-2">Cards:</label>
      <MultiSelect
        input-id="cards"
        v-model="editable.cards"
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
        maxSelectedLabels="3"
      >
        <template #optiongroup="slotProps">
          <div class="flex items-center">
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </MultiSelect>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Save" @click="ok" :disabled="!canSave"></Button>
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { PrimeIcons } from '@primevue/core/api'
import { useCardStore } from '@/stores/cardStore'

const emit = defineEmits(['handUpdated'])

const visible = ref(false)
const editable = ref({})
const cardStore = useCardStore()

const { hand, isAdd } = defineProps({
  hand: Object,
  isAdd: Boolean,
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

const show = () => {
  editable.value = hand ? { ...hand } : {}
  visible.value = true
}

const ok = () => {
  emit('handUpdated', editable.value)
  visible.value = false
}

const cardCountInvalid = computed(() => {
  const cardCount = editable.value.cardCount || 0
  const cardTypesLength = editable.value.cards?.length || cardCount
  return cardTypesLength != cardCount
})

const canSave = computed(() => {
  return !!editable.value.cardCount && !!editable.value.playerName && !cardCountInvalid.value
})
</script>
