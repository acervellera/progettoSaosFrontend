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
        <v-form ref="form" v-model="isValid" @submit.prevent="handleLogin">
          <!-- Primo Step: Email e Password -->
          <div v-if="step === 1">
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
          </div>

          <!-- Secondo Step: Codice OTP -->
          <div v-else-if="step === 2">
            <v-text-field
              label="Codice OTP"
              v-model="otpCode"
              :rules="[rules.required]"
              outlined
              dense
              clearable
              maxlength="6"
            ></v-text-field>
          </div>

          <v-btn
            :disabled="!isValid"
            color="primary"
            block
            large
            type="submit"
            class="mt-3"
          >
            {{ step === 1 ? "Accedi" : "Conferma OTP" }}
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn text color="grey darken-1" small @click="forgotPassword">
          Password dimenticata?
        </v-btn>
      </v-card-actions>
      <v-card-actions class="d-flex justify-center">
        <router-link to="/signup">
          <v-btn text color="grey darken-1" small>
            Non hai un account? Registrati
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      otpCode: "",
      step: 1, // 1: Credenziali, 2: OTP
      isValid: false,
      rules: {
        required: (value) => !!value || "Campo obbligatorio",
        email: (value) =>
          /.+@.+\..+/.test(value) || "Inserisci un'email valida",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        if (this.step === 1) {
          const response = await axios.post(
            "http://localhost:8081/auth/login",
            {
              email: this.email,
              password: this.password,
            }
          );

          if (response.status === 200) {
            alert("Inserisci il codice OTP.");
            this.step = 2;
          }
        } else if (this.step === 2) {
          const response = await axios.post(
            `http://localhost:8081/auth/login-2fa?otpCode=${this.otpCode}`,
            {
              email: this.email,
              password: this.password,
            }
          );

          if (response.status === 200) {
            const jwtToken = response.data.token;

            // Salva il token nel localStorage
            localStorage.setItem("jwtToken", jwtToken);

            // Ottieni i dettagli dell'utente dal token
            const userResponse = await axios.get(
              "http://localhost:8081/api/users/me",
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );

            const userRole = userResponse.data.role;

            // Reindirizza in base al ruolo
            if (userRole === "ADMIN") {
              this.$router.push("/admin/dashboard");
            } else {
              this.$router.push("/user/dashboard");
            }
          }
        }
      } catch (error) {
        console.error("Errore durante il login:", error);
        alert(
          this.step === 1
            ? "Email o password errate."
            : "Codice OTP non valido. Riprovare."
        );
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
  max-width: 700px;
  padding: 24px;
}

.v-card-title {
  font-size: 24px;
}
</style>
