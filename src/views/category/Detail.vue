<template>
  <v-container fluid>    
            <v-card>
                <v-card-title class="py-2 ma-1">
                <h4>Categoría </h4>   
                <v-icon class="pa-4 d-flex align-center justify-end" 
                        color="primary" 
                        size="large"> 
                        mdi-file-tree 
                </v-icon>                
                </v-card-title>   
                <v-card-subtitle class="pl-6 ma-1">
                    <span>Datos Básicos</span>
                </v-card-subtitle>             
                <v-row class="px-3 mx-1">                 
                  <v-col cols="6">                
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.name"
                      label="Nombres"
                      type="text"
                      placeholder="Nombres del cliente">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.lastname"
                      label="Apellidos"
                      type="text"
                      placeholder="Apellidos del cliente">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-card-subtitle class="pl-6 ma-1">
                    <span>Datos de Contacto</span>
                </v-card-subtitle> 
                <v-row class="px-3 ma-1">
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.mail"
                      label="Email"
                      type="email"
                      placeholder="johndoe@email.com">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.phone"
                      label="Celular"
                      type="number"
                      placeholder="77029999">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-3 ma-1">
                    <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.frequence"
                      label="Frecuencia"
                      type="text"
                      placeholder="0">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-if="this.data.lstAddress && this.data.lstAddress.length > 0"
                      v-model="this.data.lstAddress[0].description"
                      label="Dirección"
                      type="text"
                      placeholder="av. siempre viva">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-card-subtitle class="pl-6 ma-1">
                    <span>Datos de Mascotas</span>
                </v-card-subtitle> 
                <v-row class="px-3 ma-1">
                    <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-if="this.data.lstPets && this.data.lstPets.length > 0"
                      v-model="this.data.lstPets[0].name"
                      label="Nombre"
                      type="text"
                      placeholder="Salchicha">
                      </v-text-field>
                  </v-col>                 
                </v-row>
                <v-card-actions class="pa-4 d-flex align-center justify-end">
                  <v-btn class="mx-1 base-btn base-btn_save_customer elevation-0">Guardar</v-btn>
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
            id_parent: 0,
            type: 1,
            name: '',
            description: '',
            state: 1,
            register_date: '',            
            lstCategories: [],
        },
        states: []
    }),
    methods: {
        async loadCategory() {
            this.$root.$emit('loader-show')
            const url = `${config.api.baseURL}/product/v1/categories/${this.$route.params.uid}`
            await axios.get(url)
                .then(response => {
                    this.data = response.data.data
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    this.$root.$emit('loader-hide')
                })
        },
        onClickCancel() {
            this.$router.push({
                path: PAGE.CATEGORY.PATH,
            })
        }
    },
    created() {
        this.loadCategory()
    }
  }
</script>

<style>

</style>