<template>
  <Button :label="title" @click="show" />

  <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name:</label>
      <InputText id="name" class="flex-auto" autocomplete="off" v-model="editable.name" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="ok"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['gameUpdated'])

const visible = ref(false)
const editable = ref({})

const { game, title } = defineProps({
  game: Object,
  title: String,
})

const show = () => {
  editable.value = game ? { ...game } : {}
  visible.value = true
}

const ok = () => {
  emit('gameUpdated', editable.value)
  visible.value = false
}
</script>
