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
        Accedi al tuo account
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid" @submit.prevent="login">
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
            :rules="[rules.required]"
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
            Accedi
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn text small @click="forgotPassword">Password dimenticata?</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios"; // Assicurati di aver installato Axios

export default {
  name: "UserLogin", // Nome multi-word per rispettare le regole ESLint
  data() {
    return {
      email: "",
      password: "",
      isValid: false,
      rules: {
        required: (value) => !!value || "Campo obbligatorio",
        email: (value) =>
          /.+@.+\..+/.test(value) || "Inserisci un'email valida",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8081/auth/login", {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          alert("Accesso effettuato con successo!");
          console.log("Token ricevuto:", response.data.token);
        }
      } catch (error) {
        console.error("Errore durante il login:", error);
        alert("Accesso fallito. Verifica email e password.");
      }
    },
    forgotPassword() {
      alert("Funzione non implementata.");
    },
  },
};
</script>

<style scoped>
.v-card {
  min-height: 500px;
  /* Altezza minima per rendere la card più grande */
  max-width: 700px;
  /* Larghezza massima */
  padding: 24px;
  /* Spazi interni */
}

.v-card-title {
  font-size: 24px;
  /* Testo più grande per il titolo */
}
</style>
