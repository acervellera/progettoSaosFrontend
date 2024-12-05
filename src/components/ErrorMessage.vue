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
      required: true,
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
        // Avvia un timer per resettare il messaggio
        setTimeout(() => {
          this.$emit("update:message", ""); // Comunica al genitore di resettare il messaggio
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
