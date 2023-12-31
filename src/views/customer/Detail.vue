<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="py-2 ma-1">
                <h4>Cliente </h4>
                <v-icon class="pa-4 d-flex align-center justify-end"
                        color="primary"
                        size="large">
                    mdi-sale
                </v-icon>
            </v-card-title>
            <v-card-subtitle class="pl-6 ma-1">
                <span>Datos Básicos</span>
            </v-card-subtitle>
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
                                  type="text">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="px-3 mx-1">
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
                            :rules="[rules.required]"
                            hide-details="auto">
                    </v-select>
                </v-col>
            </v-row>
            <v-row class="px-3 mx-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.phone"
                                  label="Celular"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
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
            <v-row class="px-3 ma-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.city"
                                  label="Ciudad"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.email"
                                  label="Email"
                                  :rules="[rules.required]"
                                  type="email">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="px-3 ma-1">
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.postal_code"
                                  label="Codigo Postal"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field outlined color="primary" hide-details="auto"
                                  v-model="data.password"
                                  label="Contraseña"
                                  :rules="[rules.required]"
                                  type="text">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-card-actions class="pa-4 d-flex align-center justify-end">
                <v-btn class="mx-1 base-btn base-btn_save_customer elevation-0" @click="onClickSave">Guardar</v-btn>
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
        data: {
            id: 0,
            first_name: '',
            middle_name: '',
            last_name: '',
            gender: '',
            phone: '',
            address: '',
            city: '',
            postal_code: '',
            email: '',
            password: '',
            created_at: '',
            update_at: '',
        },
        genders: ["male", "female", "non-binary"],
        rules: {
            required: value => !!value || 'Campo requerido',
        }
    }),
    methods: {
        async loadCustomer() {
            let self = this;
            if (self.$route.params.id) {
                self.$root.$emit('loader-show')

                const url = `${config.api.baseURL}/customers/${this.$route.params.id}`
                await axios.get(url)
                    .then(response => {
                        self.data = response.data
                        console.log(self.data);
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

            let url = `${config.api.baseURL}/customers/`;
            let method = 'post';
            let sendData = {...self.data};

            // Si data.id no es 0, entonces estamos actualizando un producto existente
            if (self.data.id !== 0) {
                url += `${self.data.id}/`;
                method = 'put';
            } else {
                // Si estamos insertando hay que quitar el campo id
                delete sendData.id;
            }

            axios[method](url, sendData)
                .then(response => {
                    self.$router.push({
                        path: PAGE.CUSTOMER.PATH,
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
                path: PAGE.CUSTOMER.PATH,
            })
        }
    },
    created() {
        this.loadCustomer()
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

  &_save_customer {
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