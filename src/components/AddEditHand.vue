<template>
    <Button :label="title" @click="show" />
    
    <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '75rem' }">
        <div class="flex items-center gap-4 mb-4">
            <label for="playerName" class="font-semibold w-24">Player Name:</label>
            <InputText id="playerName" class="flex-auto" autocomplete="off" v-model="editable.playerName" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="cardCount" class="font-bold block mb-2"> Card Count:</label>
            <InputNumber v-model="editable.cardCount" inputId="cardCount" fluid />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="cards" class="font-semibold w-24">Cards:</label>
            <MultiSelect input-id="cards" v-model="editable.cards" :options="cardStore.cardCategories" optionLabel="label" optionValue="value" filter optionGroupLabel="label" optionGroupChildren="cardTypes" display="chip" placeholder="Select Cards" class="font-bold block mb-2">
                <template #optiongroup="slotProps">
                    <div class="flex items-center">
                        <div>{{ slotProps.option.label }}</div>
                    </div>
                </template>
            </MultiSelect>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="ok"></Button>
        </div>
    </Dialog>
    </template>
    
    <script setup>
    import { ref, defineEmits } from "vue";
    import { useCardStore } from "@/stores/cardStore";

    const emit = defineEmits(['handUpdated'])
    
    
    const visible = ref(false);
    const editable = ref({});
    const cardStore = useCardStore(); 

    const {hand, title } = defineProps({
        hand: Object,
        title: String
    });
    
    const show = () => {
        editable.value = hand ? {...hand} : {}
        visible.value = true;
    }
    
    const ok = () => {
        emit('handUpdated', editable.value);
        visible.value = false;
    }
    
    </script>
    