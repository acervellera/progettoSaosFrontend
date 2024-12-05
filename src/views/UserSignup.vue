<template>
  <v-container
    class="d-flex justify-center align-center"
    fluid
    style="min-height: 100vh; background: #f5f5f5"
  >
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" sm="8" xs="10">
        <v-card elevation="10" class="pa-6">
          <v-card-title class="text-h4 text-center">
            Crea il tuo account
          </v-card-title>
          <v-card-text>
            <!-- Utilizzo del componente ErrorMessage -->
            <ErrorMessage :message="errorMessage" />
            <v-form ref="form" v-model="isValid" @submit.prevent="register">
              <v-text-field
                label="Nome completo"
                v-model="fullName"
                :rules="[rules.required]"
                outlined
                dense
                clearable
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="[rules.required, rules.email]"
                outlined
                dense
                clearable
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                :rules="[rules.required, rules.minPasswordLength]"
                type="password"
                outlined
                dense
                clearable
              ></v-text-field>
              <v-text-field
                label="Conferma Password"
                v-model="confirmPassword"
                :rules="[rules.required, passwordMatchRule]"
                type="password"
                outlined
                dense
                clearable
              ></v-text-field>
              <v-btn
                :disabled="!isValid"
                color="primary"
                block
                large
                type="submit"
                class="mt-3"
              >
                Registrati
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn text small @click="redirectToLogin">
              Hai già un account? Accedi
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "UserSignup",
  components: {
    ErrorMessage,
  },
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isValid: false,
      errorMessage: "",
      rules: {
        required: (value) => !!value || "Campo obbligatorio",
        email: (value) =>
          /.+@.+\..+/.test(value) || "Inserisci un'email valida",
        minPasswordLength: (value) =>
          value.length >= 8 || "La password deve contenere almeno 8 caratteri",
      },
    };
  },
  computed: {
    passwordMatchRule() {
      return (value) =>
        value === this.password || "Le password non corrispondono";
    },
  },
  methods: {
    async register() {
      console.log("Avvio della registrazione..."); // Log iniziale
      if (!this.isValid) {
        console.log("Validazione fallita. Campi non validi."); // Log in caso di campi non validi
        this.errorMessage = "Compila correttamente tutti i campi.";
        return;
      }

      try {
        console.log("Dati inviati per la registrazione:", {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        });

        const response = await axios.post("http://localhost:8081/auth/signup", {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        });

        console.log("Risposta dal server:", response); // Log della risposta del server

        if (response.status === 201 || response.status === 200) {
          alert("Registrazione completata con successo!");
          console.log("Reindirizzo a /initiate-2fa con email:", this.email);

          // Reindirizza alla pagina di configurazione della 2FA
          this.$router.push({
            path: "/initiate-2fa",
            query: { email: this.email },
          });
        } else {
          console.log("Stato non 201. Qualcosa è andato storto:", response);
        }
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        this.errorMessage =
          error.response?.data?.message || "Errore durante la registrazione.";
      }
    },
    redirectToLogin() {
      console.log("Reindirizzo alla pagina di login.");
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
</style>
