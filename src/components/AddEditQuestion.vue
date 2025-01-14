<template>
    <Button :label="title" @click="show" />
    
    <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '75rem' }">
        <div class="flex items-center gap-2">
            <label> Hand: </label>
            <Select v-model="editable.hand" :options="hands" optionLabel="playerName" filter display="chip" placeholder="Select Hand" class="font-bold block mb-2"></Select>        
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="cardTypes" class="font-bold block mb-2"> Cards Asked:</label>
            <MultiSelect input-id="cardTypes" v-model="editable.cardTypes" :options="cardStore.cardCategories" optionLabel="label" optionValue="value" filter optionGroupLabel="label" optionGroupChildren="cardTypes" display="chip" placeholder="Select Cards" class="font-bold block mb-2">
                <template #optiongroup="slotProps">
                    <div class="flex items-center">
                        <div>{{ slotProps.option.label }}</div>
                    </div>
                </template>
            </MultiSelect>
        </div>
        <div class="flex items-center gap-2">
            <label for="showingCard"> Showing Card? </label>
            <Checkbox v-model="editable.showingCard" inputId="showingCard" binary  />
        </div>
        <div class="flex items-center gap-2"  v-if="editable.showingCard">
            <label for="cardTypeShown"> Card Type Shown: </label>
            <Select input-id="cardTypeShown" v-model="editable.cardTypeShown" :options="cardStore.cardCategories" optionLabel="label" optionValue="value" filter optionGroupLabel="label" optionGroupChildren="cardTypes" display="chip" placeholder="Select Cards" class="font-bold block mb-2">
                <template #optiongroup="slotProps">
                    <div class="flex items-center">
                        <div>{{ slotProps.option.label }}</div>
                    </div>
                </template>
            </Select>        
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="ok"></Button>
        </div>
    </Dialog>
    </template>
    
    <script setup>
    import { ref, defineEmits, watch } from "vue";
    import { useCardStore } from "@/stores/cardStore";

    const emit = defineEmits(['questionUpdated'])
    
    
    const visible = ref(false);
    const editable = ref({});
    const cardStore = useCardStore(); 

    const {question, title } = defineProps({
        question: Object,
        title: String,
        hands: Array
    });

    watch(
        () => editable.value.showingCard, 
        (showingCard) => { 
            if (!showingCard) {
            editable.value.cardTypeShown = null; 
            }
        },
    )
    
    const show = () => {
        editable.value = question ? {...question} : {}
        visible.value = true;
    }
    
    const ok = () => {
        emit('questionUpdated', editable.value);
        visible.value = false;
    }
    
    </script>
    