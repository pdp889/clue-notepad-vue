import cardService from '@/services/card.service'
import { defineStore } from 'pinia'

export const useCardStore = defineStore('card', {
  state: () => ({
    cardCategories: [],
    cardLabelLookup: {},
    cardTypes: [],
    error: null,
  }),
  actions: {
    async fetchCardCategories() {
      if (this.cardCategories.length === 0) {
        try {
          const response = await cardService.getCardCategories()
          this.cardCategories = response
          this.cardCategories
            .flatMap((category) => category.cardTypes)
            .forEach((type) => {
              this.cardLabelLookup[type.value] = type.label
              this.cardTypes.push(type.value)
            })
        } catch (error) {
          console.error('Error fetching card categories:', error)
          this.error = error
        }
      }
    },
  },
})
