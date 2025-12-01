// src/stores/useModalStore.js
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        isContactOpen: false, // état de la modal contact
    }),
    actions: {
        openContact() {
            this.isContactOpen = true
        },
        closeContact() {
            this.isContactOpen = false
        },
        toggleContact() {
            this.isContactOpen = !this.isContactOpen
        }
    }
})
