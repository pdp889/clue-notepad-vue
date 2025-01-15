<template>
  <Button @click="show" :icon="icon" />
  <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '20%' }">
    <div class="flex align-items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name:</label>
      <InputText
        id="name"
        class="flex-auto"
        autocomplete="off"
        v-model="editable.name"
        :invalid="!editable.name"
      />
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

const emit = defineEmits(['gameUpdated'])

const visible = ref(false)
const editable = ref({})

const { game, isAdd } = defineProps({
  game: Object,
  isAdd: Boolean,
})

const title = computed(() => {
  if (isAdd) {
    return 'Add Game'
  }
  return 'Edit Game'
})

const icon = computed(() => {
  if (isAdd) {
    return PrimeIcons.PLUS
  }
  return PrimeIcons.PENCIL
})

const show = () => {
  editable.value = game ? { ...game } : {}
  visible.value = true
}

const ok = () => {
  emit('gameUpdated', editable.value)
  visible.value = false
}

const canSave = computed(() => {
  return !!editable.value.name
})
</script>
