<template>
  <v-alert v-if="message" :type="type" dismissible class="mb-3">
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    message: {
      type: String,
      required: false, // Non obbligatorio, per evitare errori in caso di assenza
    },
    type: {
      type: String,
      default: "error", // Tipo di alert (default: "error")
    },
    duration: {
      type: Number,
      default: 10000, // Durata in millisecondi (default: 10 secondi)
    },
  },
  watch: {
    message(newMessage) {
      if (newMessage) {
        setTimeout(() => {
          this.$emit("clear-message"); // Evento personalizzato per resettare il messaggio
        }, this.duration);
      }
    },
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
</style>
