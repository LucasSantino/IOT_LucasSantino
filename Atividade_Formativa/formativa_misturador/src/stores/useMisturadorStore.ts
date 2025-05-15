import { defineStore } from 'pinia'

export const useMisturadorStore = defineStore('misturador', {
  state: () => ({
    ingredientes: [] as string[],
  }),
  actions: {
    adicionarIngrediente(nome: string) {
      this.ingredientes.push(nome)
    }
  }
})
