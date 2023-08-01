<template>
  <v-container fluid>    
            <v-card>
                <v-card-title class="py-2 ma-1">
                <h4>Producto </h4>   
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
                      type="text"
                      placeholder="Primer Nombre"
                      mobile-breakpoint="580">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.middle_name"
                      label="Segundo Nombre"
                      type="text"
                      placeholder="Segundo Nombre"
                      mobile-breakpoint="580">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-3 ma-1">
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.last_name"
                      label="Apellido"
                      type="text"
                      placeholder="Apellido">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.gender"
                      label="Genero"
                      type="text"
                      placeholder="Genero">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-3 mx-1">
                    <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.salary"
                      label="Salario"
                      type="text"
                      placeholder="Salario">
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.password"
                      label="Contraseña"
                      type="text"
                      placeholder="Contraseña">
                      </v-text-field>
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
  }),
  methods: {
      async loadEmployee() {
          let self = this;

          self.$root.$emit('loader-show')

          const url = `${config.api.baseURL}/employees/${this.$route.params.id}`
            await axios.get(url)
                .then(response => {
                    this.data = response.data
                    console.log(this.data)
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    this.$root.$emit('loader-hide')
                })
      },
      async onClickSave() {
          const self = this;
          self.$root.$emit('loader-show');

          let url = `${config.api.baseURL}/employees/`;
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

          console.log(sendData)
          axios[method](url, sendData)
              .then(response => {
                  console.error(response);
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