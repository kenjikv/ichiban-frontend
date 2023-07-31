<template>
    <div class="pa-5 fill-height">
        <v-card height="100%">
            <v-card-title>
                <v-row>
                    <v-col class="d-flex align-center" cols="10">
                        <span class="title-txt">Clientes</span>
                    </v-col>
                    <v-col class="d-flex align-center justify-end"
                           @click="onClickNew"
                           cols="2"
                    >
                        <v-btn class="mx-1 base-btn_create_customer elevation-0">
                            <v-icon left="left">
                                mdi-upload
                            </v-icon>
                            Nuevo cliente
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
                                                       @click="loadData">Buscar
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pa-0">
                                        <v-row class="ma-0">
                                            <v-col class="pa-1 d-flex align-center" cols="12">
                                                <v-text-field label="Nombre, Codigo"
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
                    <v-col class="pa-0 d-flex align-center justify-center" cols="12">
                        <v-pagination
                            v-model="paginationCurrent"
                            :length="paginationCount"
                            :total-visible="3"
                            color="#004593"
                            @input="changePagination"
                        >
                        </v-pagination>
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
        sortDesc: true,
        pageNumberTextField: 0,
        headers: [
            {text: 'Primer nombre', value: 'first_name'},
            {text: 'Segundo nombre', value: 'middle_name'},
            {text: 'Apellido', value: 'last_name'},
            {text: 'Genero', value: 'gender'},
            {text: 'Salario', value: 'salary'},
            {text: 'Teléfono', value: 'phone'},
            {text: 'Correo Electrónico', value: 'email'},
        ],
        data: [],
    }),
    methods: {
        updateSortDesc() {
            this.loadData()
        },
        onClickRow(value) {
            let e = this.data.find(item => item.id === value.id)
            if (e && e.id !== undefined) {
                this.$router.push({
                    name: PAGE.CUSTOMER_DETAIL.NAME,
                    params: {id: value.id}
                })
                return
            }
        },
        changePagination(number) {
            this.paginationCurrent = number
            this.loadData()
        },
        async loadCustomers() {
            const url = `${config.api.baseURL}/customers`;

            await axios.get(url, {  })
                .then(response => {
                    // Handle the response data
                    this.data =  response.data;
                    this.pageNumberTextField = 0;//response.data.total;
                    // console.log(response.data.total)
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });

        },
        onClickNew() {
            this.$router.push({
                path: PAGE.CUSTOMER_DETAIL.PATH,
            })
        },

    },
    mounted(){
        this.loadCustomers();
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