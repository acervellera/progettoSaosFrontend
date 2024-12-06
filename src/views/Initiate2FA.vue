<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 100vh; background: #f5f5f5"
  >
    <v-card elevation="10" class="pa-6 text-center custom-card">
      <!-- Usa il componente WarningAlert -->
      <WarningAlert />

      <v-card-title class="text-h5 font-weight-bold">
        Configura la tua 2FA
      </v-card-title>
      <v-card-text>
        <v-divider class="mb-4"></v-divider>
        <div v-if="qrCodeUrl">
          <p class="text-body-1 mb-3">
            Scansiona il codice QR con la tua app di autenticazione per
            completare la configurazione.
          </p>
          <v-img
            :src="qrCodeUrl"
            alt="QR Code per la 2FA"
            max-height="200"
            contain
            class="mx-auto"
          ></v-img>
        </div>
        <div v-else>
          <v-progress-circular
            indeterminate
            color="primary"
            size="48"
            class="mb-3"
          ></v-progress-circular>
          <p class="text-body-2">Caricamento del codice QR...</p>
        </div>
        <v-btn
          color="primary"
          block
          class="mt-5"
          large
          @click="redirectToLogin"
        >
          Torna al Login
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import WarningAlert from "@/components/WarningAlert.vue";

export default {
  name: "Initiate2FA",
  components: {
    WarningAlert,
  },
  data() {
    return {
      qrCodeUrl: null,
    };
  },
  mounted() {
    this.loadQrCode();
  },
  methods: {
    async loadQrCode() {
      try {
        const { email, temporaryToken } = this.$route.query;

        if (!email || !temporaryToken) {
          alert("Accesso non autorizzato.");
          this.$router.push("/");
          return;
        }

        const response = await axios.post(
          "http://localhost:8081/auth/initiate-2fa",
          { email, temporaryToken },
          { responseType: "blob" }
        );

        this.qrCodeUrl = URL.createObjectURL(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Accesso non autorizzato.");
        } else {
          alert("Errore durante il caricamento del QR Code.");
        }
        this.$router.push("/");
      }
    },
    redirectToLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.custom-card {
  max-width: 500px;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.qr-code {
  width: 100%;
  max-width: 300px;
  margin: auto;
  display: block;
}
</style>
