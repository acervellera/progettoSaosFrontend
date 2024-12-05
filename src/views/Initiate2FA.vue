<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 100vh; background: #f5f5f5"
  >
    <v-card elevation="10" class="pa-6" style="max-width: 500px">
      <v-card-title class="text-h4 text-center">
        Configura la tua 2FA
      </v-card-title>
      <v-card-text>
        <div v-if="qrCodeUrl">
          <p>
            Scansiona il codice QR con la tua app di autenticazione per
            configurare la 2FA.
          </p>
          <img :src="qrCodeUrl" alt="QR Code per la 2FA" class="qr-code" />
        </div>
        <div v-else>
          <p>Caricamento del codice QR...</p>
        </div>
        <v-btn color="primary" block class="mt-3" @click="redirectToLogin">
          Torna al Login
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Initiate2FA",
  data() {
    return {
      qrCodeUrl: null, // URL per visualizzare il QR Code
    };
  },
  mounted() {
    this.loadQrCode();
  },
  methods: {
    async loadQrCode() {
      try {
        const email = this.$route.query.email;

        if (!email) {
          alert("Email mancante. Impossibile procedere.");
          this.$router.push("/");
          return;
        }

        const response = await axios.post(
          "http://localhost:8081/auth/initiate-2fa",
          { email },
          { responseType: "blob" }
        );

        this.qrCodeUrl = URL.createObjectURL(response.data);
      } catch (error) {
        console.error("Errore durante il caricamento del QR Code:", error);
        alert("Impossibile caricare il codice QR. Riprova più tardi.");
      }
    },
    redirectToLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.v-card {
  max-width: 500px;
  margin: auto;
}

.qr-code {
  width: 100%;
  max-width: 300px;
  margin: auto;
  display: block;
}
</style>
