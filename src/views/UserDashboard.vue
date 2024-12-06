<template>
  <v-container fluid class="py-5">
    <h1 class="text-center mb-5">Benvenuto nella Dashboard Utente</h1>
    <v-row justify="center" align="center" dense>
      <!-- Card: Profilo Utente -->
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="4" class="pa-4 hover-card">
          <v-icon size="48" color="primary" class="mb-3"
            >mdi-account-circle</v-icon
          >
          <v-card-title class="font-weight-bold">Profilo</v-card-title>
          <v-card-text>
            <p>Email: {{ userDetails.email || "email@esempio.com" }}</p>
            <p>Ruolo: {{ userDetails.role || "Utente" }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text>Vai al profilo</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card: Statistiche -->
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="4" class="pa-4 hover-card">
          <v-icon size="48" color="info" class="mb-3">mdi-chart-line</v-icon>
          <v-card-title class="font-weight-bold">Statistiche</v-card-title>
          <v-card-text>
            Visualizza le statistiche delle tue attività per migliorare.
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" text>Vedi statistiche</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card: Supporto -->
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="4" class="pa-4 hover-card">
          <v-icon size="48" color="error" class="mb-3">mdi-lifebuoy</v-icon>
          <v-card-title class="font-weight-bold">Supporto</v-card-title>
          <v-card-text>
            Hai bisogno di aiuto? Contatta il nostro supporto tecnico.
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" text>Richiedi supporto</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card: Messaggi -->
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="4" class="pa-4 hover-card">
          <v-icon size="48" color="purple" class="mb-3">mdi-email</v-icon>
          <v-card-title class="font-weight-bold">Messaggi</v-card-title>
          <v-card-text>
            Controlla i tuoi messaggi o le notifiche ricevute.
          </v-card-text>
          <v-card-actions>
            <v-btn color="purple" text>Vedi messaggi</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card: Preferenze -->
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="4" class="pa-4 hover-card">
          <v-icon size="48" color="green" class="mb-3">mdi-tune</v-icon>
          <v-card-title class="font-weight-bold">Preferenze</v-card-title>
          <v-card-text>
            Personalizza la tua esperienza e aggiorna le preferenze.
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" text>Imposta preferenze</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card: Logout -->
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="4" class="pa-4 hover-card">
          <v-icon size="48" color="grey darken-1" class="mb-3"
            >mdi-logout</v-icon
          >
          <v-card-title class="font-weight-bold">Logout</v-card-title>
          <v-card-text> Esci in sicurezza dal tuo account. </v-card-text>
          <v-card-actions>
            <v-btn color="grey darken-1" text @click="handleLogout">Esci</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "UserDashboard",
  data() {
    return {
      userDetails: {
        name: "Mock User",
        email: "mockuser@example.com",
        role: "USER",
      },
    };
  },
  async mounted() {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      if (!jwtToken) {
        this.$router.push("/"); // Reindirizza se il token non è presente
        return;
      }

      // Ottieni i dettagli dell'utente dal token
      const response = await axios.get(
        "http://localhost:8081/api/users/profile",
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      this.userDetails = response.data;
    } catch (error) {
      console.error(
        "Errore durante il caricamento dei dettagli utente:",
        error
      );
      this.$router.push("/"); // Reindirizza al login in caso di errore
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("jwtToken");
      this.$router.push("/"); // Reindirizza al login
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

.v-card {
  text-align: center;
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.hover-card {
  border: 1px solid #f0f0f0;
  background-color: #ffffff;
}
</style>
