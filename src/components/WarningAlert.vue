<template>
  <transition name="fade">
    <v-card v-if="visible" class="mb-4 alert-card" elevation="1">
      <v-card-text>
        <v-row no-gutters align="center">
          <v-icon color="black" size="28" class="mr-2">
            mdi-alert-circle-outline
          </v-icon>
          <p class="font-weight-bold text-h6 mb-0">Attenzione:</p>
        </v-row>
        <p class="text-body-1 mt-2">
          Scansiona il codice QR con Google Authenticator o un'altra app.
        </p>
        <p class="text-body-2 font-italic">
          Non sarà possibile accedere in futuro se non configurato.
        </p>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script>
export default {
  name: "WarningAlert",
  data() {
    return {
      visible: true, // L'avviso è visibile inizialmente
    };
  },
  mounted() {
    // Nasconde l'avviso dopo 10 secondi
    setTimeout(() => {
      this.visible = false;
    }, 10000);
  },
};
</script>

<style scoped>
.alert-card {
  background-color: #ffe066;
  /* Giallo chiaro */
  border-radius: 8px;
  /* Arrotondamento uniforme */
  padding: 16px;
  /* Spaziatura interna */
}

.text-body-1 {
  color: #333;
  /* Colore scuro per una buona leggibilità */
}

.text-body-2 {
  color: rgba(0, 0, 0, 0.7);
  margin-top: 4px;
  /* Leggero margine superiore */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
