<template>
  <div class="pa-5 fill-height">
    <v-card height="100%">
            <v-card-title>
                <v-row>
                    <v-col class="d-flex align-center" cols="10">
                        <span class="title-txt">Servicios</span>
                    </v-col>
                    <v-col class="d-flex align-center justify-end"
                           @click="onClickNewService"
                           cols="2"
                    >
                        <v-btn class="mx-1 base-btn_create_customer elevation-0">
                            <v-icon left="left">
                                mdi-upload
                            </v-icon>
                            Nuevo Servicio
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-divider/>

            <v-card-text>
                <v-row class="ma-0">
                    <v-col class="pa-0" cols="12">
                        <v-container fluid>
                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-header class="pa-0">
                                        <v-row class="ma-0 px-2">
                                            <v-col class="pa-0 d-flex align-center" cols="10"><span
                                                    class="spn-search-title">Busqueda avanzada：</span>
                                            </v-col>
                                            <v-col class="pa-0 d-flex align-center justify-end" cols="2">
                                                <v-btn class="mx-1 base-btn base-btn_search elevation-0"
                                                       @click="loadServices">Buscar
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pa-0">
                                        <v-row class="ma-0">
                                            <v-col class="pa-1 d-flex align-center" cols="12">
                                                <v-text-field label="Nombre, Descripcion"
                                                              v-model="search" outlined="outlined" dense="dense"
                                                              hide-details="hide-details"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                            <v-data-table
                                    class="my-4"
                                    :headers="headers"
                                    :items="data"
                                    :items-per-page="10"
                                    :page.sync="paginationCurrent"
                                    :sort-by.sync="sortBy"
                                    :sort-desc.sync="sortDesc"
                                    hide-default-footer
                                    @update:sort-desc="updateSortDesc"
                                    @click:row="onClickRow"
                            >
                            </v-data-table>
                            
                        </v-container>
                    </v-col>
                </v-row>
                <v-divider/>
                <v-row class="ma-4">
                    <v-col cols="8">
                    </v-col>
                    <v-col class="pa-0 d-flex align-center justify-start" cols="4">
                        <v-pagination
                                v-model="paginationCurrent"
                                :length="paginationCount"
                                :total-visible="3"
                                color="#004593"
                                @input="changePagination"
                        >
                        </v-pagination>
                        <v-text-field
                                v-model="pageNumberTextField"
                                class="ml-2 page-txt-field"
                                id="pageNumberTextField"
                                type="number"
                                dense
                                outlined
                                hide-details
                                @keydown.enter="onPressPagingKeyEnter"/>
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>
        <p-loader :show-default="false"></p-loader>
  </div>
</template>

<script>
import PLoader from "@/components/PLoader";
import {PAGE} from "@/helpers/data-value-common";
import axios from "axios";
import {config} from '@/config.json'

export default {
  components: {
    'p-loader': PLoader
  },
  data: () => ({
    paginationCurrent: 1,
    paginationCount: 10,
    pageNumber: 1,

    search: '',
    sortBy: "id",
    sortDesc: false,

    headers: [
      { text: 'Nombre', value: 'name' },
      { text: 'Precio', value: 'price' },
      { text: 'Categoria', value: 'category_name' }, 
      { text: 'Sub-Categoria', value: 'sub_category_name' }, 
      { text: 'Precio Min.', value: 'price_min' },      
      { text: 'Precio Max.', value: 'price_max' },   
    ],
    data: [
      
    ],
  }),
  methods: {
    updateSortDesc() {
            this.loadServices()
        },
        onClickRow(value) {
            let e = this.data.find(item => item.id === value.id)
            if (e && e.id !== undefined) {
                this.$router.push({
                    name: PAGE.CATEGORY_DETAIL.PATH,
                    params: {id: value.id}
                })
                return
            }
        },
        changePagination(number) {
            this.paginationCurrent = number
            this.loadServices()
        },
        onPressPagingKeyEnter() {
            let input = document.getElementById("pageNumberTextField")
            let val = parseInt(input.value)
            if (val > 0 && val <= this.paginationCount) {
                this.paginationCurrent = val
                this.loadServices()
            }
            this.pageNumber = this.paginationCurrent
        },
        async loadServices() {
            const url =  `${config.api.baseURL}/product/v1/services`;
            const params = {
              page: this.paginationCurrent,
              perPage: this.paginationCount,
              state: 1,
              search: this.search,
              orderColumn: this.sortBy,
              orderValue: this.sortDesc ? 'DESC' : 'ASC'
            };

            await axios.get(url, { params })
              .then(response => {
                // Handle the response data
                this.data =  response.data.data;
                this.pageNumberTextField = response.data.total;
                console.log(response.data.total)
              })
              .catch(error => {
                // Handle the error
                console.error(error);
              });   

        },
        onClickNewService() {
            this.$router.push({
            path: PAGE.CATEGORY_DETAIL.PATH,
            })
        },
        
    },
    mounted(){
        this.loadServices();
    },
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

  &_search {
    color: var(--color-white);
    background-color: var(--color-green) !important;
    border: 1px solid var(--color-green) !important;
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