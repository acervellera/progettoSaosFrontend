<template>
  <v-container
    class="d-flex justify-center align-center"
    style="height: 100vh; background: #f5f5f5"
  >
    <v-card elevation="10" max-width="500" class="pa-6 rounded-card">
      <v-card-title class="text-h5 text-center font-weight-bold">
        Accedi al tuo account
      </v-card-title>
      <v-divider class="my-3"></v-divider>
      <v-card-text>
        <!-- Messaggi di errore -->
        <ErrorMessage :message="errorMessage" @clear-message="clearError" />

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
              prepend-inner-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              :rules="[rules.required]"
              type="password"
              outlined
              dense
              clearable
              prepend-inner-icon="mdi-lock"
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
              prepend-inner-icon="mdi-key"
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
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "UserLogin",
  components: { ErrorMessage },
  data() {
    return {
      email: "",
      password: "",
      otpCode: "",
      step: 1, // Step 1: Credenziali; Step 2: OTP
      isValid: false,
      errorMessage: "", // Gestione dei messaggi di errore
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
            localStorage.setItem("jwtToken", jwtToken);

            const userResponse = await axios.get(
              "http://localhost:8081/api/users/profile",
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );

            const userRole = userResponse.data.role;

            if (userRole === "ADMIN") {
              this.$router.push("/admin/dashboard");
            } else {
              this.$router.push("/user/dashboard");
            }
          }
        }
      } catch (error) {
        console.error("Errore durante il login:", error);
        this.errorMessage =
          this.step === 1
            ? "Email o password errate."
            : "Codice OTP non valido. Riprovare.";
      }
    },

    forgotPassword() {
      this.errorMessage = "Funzione non implementata.";
    },

    clearError() {
      this.errorMessage = ""; // Pulisce il messaggio di errore
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

.rounded-card {
  border-radius: 16px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
}
</style>
