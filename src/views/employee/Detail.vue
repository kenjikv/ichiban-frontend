<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="py-2 ma-1">
                <h4>Empleado</h4>
                <v-icon class="pa-4 d-flex align-center justify-end"
                        color="primary"
                        size="large">
                    mdi-account
                </v-icon>
            </v-card-title>
            <v-row class="px-3 mx-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.first_name"
                                  label="Primer Nombre"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.middle_name"
                                  label="Segundo Nombre"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="px-3 ma-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.last_name"
                                  label="Apellido"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-select
                            :items="genders"
                            v-model="data.gender"
                            label="Genero"
                            outlined
                            color="primary"
                            hide-details="auto">
                    </v-select>
                </v-col>
            </v-row>
            <v-row class="px-3 mx-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.salary"
                                  label="Salario"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                outlined
                                color="primary"
                                hide-details="auto"
                                v-model="data.hired_at"
                                label="Fecha de contrato"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="data.hired_at" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="px-3 mx-1">
                <v-col cols="6">
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                outlined
                                color="primary"
                                hide-details="auto"
                                v-model="data.birthed_at"
                                label="Fecha de nacimiento"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="data.birthed_at" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.address"
                                  label="Dirección"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="px-3 mx-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.phone"
                                  label="Teléfono"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.email"
                                  label="Correo Electrónico"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="px-3 mx-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.password"
                                  label="Contraseña"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                </v-col>
            </v-row>

            <v-card-actions class="pa-4 d-flex align-center justify-end">
                <v-btn class="mx-1 base-btn base-btn_save_product elevation-0" @click="onClickSave">Guardar</v-btn>
                <v-btn class="mx-1 base-btn base-btn_cancel elevation-0" @click="onClickCancel">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
        <p-loader :show-default=false></p-loader>
    </v-container>
</template>

<script>
import PLoader from "@/components/PLoader";
import axios from "axios";
import {config} from '@/config.json'
import {PAGE} from "@/helpers/data-value-common";

export default {
    components: {
        'p-loader': PLoader
    },
    data: () => ({
        menu1: false,
        menu2: false,
        data: {
            id: 0,
            first_name: '',
            middle_name: '',
            last_name: '',
            gender: '',
            salary: '',
            hired_at: '',
            birthed_at: '',
            address: '',
            phone: '',
            email: '',
            password: '',
        },
        genders: ["male", "female", "non-binary"],
        rules: {
            required: value => !!value || 'Campo requerido',
        }
    }),
    methods: {
        async loadEmployee() {
            let self = this;
            if (self.$route.params.id) {
                self.$root.$emit('loader-show')

                const url = `${config.api.baseURL}/employees/${this.$route.params.id}`
                await axios.get(url)
                    .then(response => {
                        let employeeData = response.data
                        employeeData.hired_at = new Date(employeeData.hired_at).toISOString().substr(0, 10);
                        employeeData.birthed_at = new Date(employeeData.birthed_at).toISOString().substr(0, 10);
                        self.data = employeeData
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        self.$root.$emit('loader-hide')
                    })
            }
        },
        async onClickSave() {
            const self = this;
            self.$root.$emit('loader-show');

            let url = `${config.api.baseURL}/employees/`;
            let method = 'post';
            let sendData = {...self.data};

            sendData.hired_at = new Date(sendData.hired_at).toISOString();
            sendData.birthed_at = new Date(sendData.birthed_at).toISOString();

            // Si data.id no es 0, entonces estamos actualizando un producto existente
            if (self.data.id !== 0) {
                url += `${self.data.id}/`;
                method = 'put';
            } else {
                // Si estamos insertando hay que quitar el campo id
                delete sendData.id;
            }

            console.log(sendData)
            axios[method](url, sendData)
                .then(response => {
                    self.$router.push({
                        path: PAGE.EMPLOYEE.PATH,
                    })
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    self.$root.$emit('loader-hide');
                });
        },
        onClickCancel() {
            this.$router.push({
                path: PAGE.EMPLOYEE.PATH,
            })
        }
    },
    created() {
        this.loadEmployee();
    }
}
</script>

<style lang="scss" scoped>
.match-parent {
  height: 90%;
}

.spn-search-title {
  font-family: var(--font-secondary);
  color: var(--color-base-sub);
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
}

.base-btn {
  font-family: var(--font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 36px;

  &_create_customer {
    color: var(--color-white);
    background-color: var(--color-main) !important;
    border: 1px solid var(--color-main) !important;
  }

  &_save_product {
    color: var(--color-white);
    background-color: var(--color-green) !important;
    border: 1px solid var(--color-green) !important;
  }

  &_cancel {
    color: var(--color-white);
    background-color: var(--color-red) !important;
    border: 1px solid var(--color-red) !important;
  }
}

.title-txt {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: var(--color-base-sub);
}

.page-txt-field {
  font-size: 14px;
}
</style>