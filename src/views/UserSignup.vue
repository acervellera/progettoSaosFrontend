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
            <ErrorMessage v-model:message="errorMessage" />
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
import ErrorMessage from "@/components/ErrorMessage.vue"; // Importa il componente

export default {
  name: "UserSignup",
  components: {
    ErrorMessage, // Registra il componente
  },
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isValid: false,
      errorMessage: "", // Variabile per il messaggio di errore
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
      try {
        const response = await axios.post("http://localhost:8081/auth/signup", {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        });

        if (response.status === 201) {
          alert("Registrazione completata con successo!");
          this.redirectToLogin();
        }
      } catch (error) {
        // Cattura il messaggio del backend
        if (error.response && error.response.data) {
          // Se il backend restituisce una stringa semplice
          this.errorMessage =
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data.message || "Errore sconosciuto.";
        } else {
          this.errorMessage = "Errore di connessione. Riprovare più tardi.";
        }
      }
    },
    redirectToLogin() {
      this.$router.push("/"); // Redirect alla pagina di login
    },
  },

  redirectToLogin() {
    this.$router.push("/"); // Redirect alla pagina di login
  },
};
</script>
