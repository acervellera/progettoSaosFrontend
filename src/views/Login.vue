<template>
    <v-container class="d-flex justify-center align-center" style="height: 100vh; background: #f5f5f5;">
        <v-card elevation="10" max-width="500" class="pa-4">
            <v-card-title class="text-h5 text-center">Accedi al tuo account</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="isValid" @submit.prevent="login">
                    <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" outlined dense
                        clearable></v-text-field>
                    <v-text-field label="Password" v-model="password" :rules="[rules.required]" type="password" outlined
                        dense clearable></v-text-field>
                    <v-btn :disabled="!isValid" color="primary" block large type="submit" class="mt-3">
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
import axios from 'axios'; // Oppure import axiosInstance da './plugins/axios'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            isValid: false,
            rules: {
                required: (value) => !!value || 'Campo obbligatorio',
                email: (value) =>
                    /.+@.+\..+/.test(value) || "Inserisci un'email valida",
            },
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:8081/auth/login', {
                    email: this.email,
                    password: this.password,
                });

                // Gestione della risposta
                if (response.status === 200) {
                    alert('Accesso effettuato con successo!');
                    console.log('Token ricevuto:', response.data.token); // Gestisci il token
                }
            } catch (error) {
                // Gestione degli errori
                console.error(error);
                alert('Accesso fallito. Verifica email e password.');
            }
        },
        forgotPassword() {
            alert('Funzione non implementata.');
        },
    },
};
</script>

<style>
/* Stile personalizzato */
</style>