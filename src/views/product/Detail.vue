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
                <v-row class="px-3 mx-1">
                    <v-col cols="6">
                        <v-select
                                :items="categories"
                                item-value="id"
                                item-text="name"
                                v-model="data.categoryId"
                                label="Categoría"
                                outlined
                                color="primary"
                                hide-details="auto">
                        </v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                                :items="suppliers"
                                item-value="id"
                                item-text="name"
                                v-model="data.supplierId"
                                label="Proveedor"
                                outlined
                                color="primary"
                                hide-details="auto">
                        </v-select>
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
          categoryId: null,
          supplierId: null,
      },
      categories: [],
      suppliers: []
  }),
  methods: {
      async loadData() {
          let self = this;

          self.$root.$emit('loader-show')

          const promiseCategories = axios.get(`${config.api.baseURL}/categories`)
          const promiseSuppliers = axios.get(`${config.api.baseURL}/suppliers`)

          const promises = [promiseCategories, promiseSuppliers];

          if(self.$route.params.id) {
              const promiseProducts = axios.get(`${config.api.baseURL}/products/${this.$route.params.id}`)
              promises.unshift(promiseProducts)
          }

          Promise.all(promises)
              .then(function (values) {
                  if (values.length === 3) {
                      self.data = values[0].data;
                      self.categories = values[1].data;
                      self.suppliers = values[2].data;
                  } else {
                      self.categories = values[0].data;
                      self.suppliers = values[1].data;
                  }
              })
              .catch(err => {
                  console.log("Product", err);
              })
              .finally(function () {
                  self.$root.$emit('loader-hide')
              });
      },
      async onClickSave() {
          const self = this;
          self.$root.$emit('loader-show');

          let url = `${config.api.baseURL}/products/`;
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
                      path: PAGE.PRODUCT.PATH,
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
              path: PAGE.PRODUCT.PATH,
          })
      }
  },
  created() {
      this.loadData();
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