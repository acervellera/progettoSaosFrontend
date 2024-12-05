<template>
  <v-container
    class="d-flex justify-center align-center"
    style="height: 100vh; background: #f5f5f5"
  >
    <v-card
      elevation="10"
      max-width="700"
      class="pa-6"
      style="width: 100%; max-height: 90vh"
    >
      <v-card-title class="text-h4 text-center">
        Crea il tuo account
      </v-card-title>
      <v-card-text>
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
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "UserSignup",
  data() {
    return {
      fullName: "", // Modificato da "name" a "fullName"
      email: "",
      password: "",
      confirmPassword: "",
      isValid: false,
      rules: {
        required: (value) => !!value || "Campo obbligatorio",
        email: (value) =>
          /.+@.+\..+/.test(value) || "Inserisci un'email valida",
        minPasswordLength: (value) =>
          value.length >= 6 || "La password deve contenere almeno 6 caratteri",
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
          fullName: this.fullName, // Cambiato per corrispondere al backend
          email: this.email,
          password: this.password,
        });

        if (response.status === 201) {
          alert("Registrazione completata con successo!");
          console.log("Token ricevuto:", response.data.token);
          this.redirectToLogin();
        }
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        alert(
          "Registrazione fallita. Controlla i dati inseriti o riprova più tardi."
        );
      }
    },
    redirectToLogin() {
      this.$router.push("/"); // Redirect alla pagina di login (homepage)
    },
  },
};
</script>
<style scoped>
.v-card {
  min-height: 550px;
  max-width: 700px;
  padding: 24px;
}

.v-card-title {
  font-size: 24px;
}
</style>
