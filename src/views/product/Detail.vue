<template>
  <v-container fluid>    
            <v-card>
                <v-card-title class="py-2 ma-1">
                <h4>Producto </h4>   
                <v-icon class="pa-4 d-flex align-center justify-end" 
                        color="primary" 
                        size="large"> 
                        mdi-file-cabinet
                </v-icon>
                </v-card-title>
                <v-row class="px-3 mx-1">
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.name"
                      label="Nombres"
                      type="text"
                      placeholder="Nombre producto"
                      mobile-breakpoint="580">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.description"
                      label="Descripción"
                      type="text"
                      placeholder="Descripción del  producto"
                      mobile-breakpoint="580">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-3 ma-1">
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.price"
                      label="Precio"
                      type="number"
                      placeholder="100">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.stock"
                      label="Stock"
                      type="number"
                      placeholder="500">
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
          name: '',
          description: '',
          price: 0,
          stock: 0, 
      },
  }),
  methods: {
      async loadProduct() {
          this.$root.$emit('loader-show')
          const url = `${config.api.baseURL}/products/${this.$route.params.id}`
          console.log(url)
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
        this.$root.$emit('loader-show');
        const url = `${config.api.baseURL}/products/`;
        try {
          const response = await axios.post(url, this.data);
          console.log(response.data); 
        } catch (error) {
          console.error(error);
        
        } finally {
          this.$root.$emit('loader-hide');
        }
      },
      onClickCancel() {
          this.$router.push({
              path: PAGE.PRODUCT.PATH,
          })
      }
  },
  created() {
      this.loadProduct()
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