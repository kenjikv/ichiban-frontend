<template>
    <v-container fluid fill-height class="loginOverlay">
        <div style="position:absolute;height:100%;width:100%;">
            <v-img
                    src="@/assets/fondo1.png"
                    height="100%"
                    aspect-ratio="1.5"
                    cover>
            </v-img>
        </div>
        <v-row>
            <v-col cols="4"></v-col>
            <v-col cols="8">
                <v-card class="elevation-12" width="500px">
                    <v-toolbar
                            dark
                            color="primary">
                        <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation>
                            <v-text-field
                                    prepend-icon="mdi-email"
                                    name="Email"
                                    label="Email"
                                    type="text"
                                    required
                                    v-model="email"
                                    :rules="emailRules"
                            ></v-text-field>
                            <v-text-field
                                    id="password"
                                    prepend-icon="mdi-form-textbox-password"
                                    name="Password"
                                    label="Contraseña"
                                    required
                                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="rulesPassword"
                                    :type="showPass ? 'text' : 'password'"
                                    hint="La contraseña debe contener al menos 8 caracteres"
                                    v-model="password"
                                    @click:append="showPass = !showPass"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                @click="login()">
                            Inicio de sesión
                        </v-btn>
                    </v-card-actions>
                    <v-card-subtitle class="text-center">¿Olvidaste tu contraseña?
                        <v-btn
                                color="primary"
                                outlined
                                small
                                rounded
                                @click="showForgot()">
                            <v-icon
                                    small
                                    aria-hidden="true">
                                mdi-account
                            </v-icon>
                            Restablecela Aquí
                        </v-btn>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

import {PAGE} from '@/helpers/data-value-common';
import axios from "axios";
import {config} from '@/config.json'
import * as Utils from "@/helpers/utils";

export default {

    data: () => ({
        valid: true,
        showPass: false,

        rulesPassword: [
            v => !!v || 'Obligatorio.',
        ],
        emailRules: [
            v => !!v || 'E-mail es obligatorio',
            v => /.+@.+/.test(v) || 'E-mail debe ser valido',
        ],

        email: 'admin@gmail.com',
        password: '123',
    }),
    methods: {
        showForgot() {
            this.$router.push({name: PAGE.FORGOT.NAME});
            return;
        },
        showDashboard(user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.$router.push({name: PAGE.BASE.NAME});
        },
        login() {
            let self = this;

            let user = {
                "mail": self.email,
                "password": self.password,
            };

            self.$root.$emit("app-show-loader");
            axios({
                method: 'post',
                url: `${config.api.baseURL}/user/v1/login`,
                data: Utils.toJSON(user),
                headers: {'Content-Type': 'application/json'}
            })
                .then((response) => {
                    console.log('Login', response);
                    if (response.data.error !== undefined) {
                        alert(response.data.error);
                        return;
                    }

                    self.showDashboard(response.data.data);
                })
                .catch((err) => {
                    console.log('Login', err);
                })
                .finally(() => {
                    self.$root.$emit("app-hide-loader");
                });
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("user"));
        if (this.user !== undefined && this.user !== null) {
            this.$router.push({name: PAGE.BASE.NAME});
        }
    },
    beforeCreate() {
        this.$root.$emit('p-menu-hide');
    }


}
</script>

<style>

</style>