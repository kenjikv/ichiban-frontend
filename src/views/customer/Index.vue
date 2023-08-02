<template>
    <div class="pa-5 fill-height">
        <v-card height="100%">
            <v-card-title>
                <v-row>
                    <v-col class="d-flex align-center" cols="10">
                        <span class="title-txt">Cliente1</span>
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
                                <template v-slot:item.actions="{ item }">
                                    <v-icon small class="mr-2" @click.stop="deleteItem(item)">
                                        mdi-delete
                                    </v-icon>
                                </template>
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
            {text: 'Dirección', value: 'address'},
            {text: 'Teléfono', value: 'phone'},
            {text: 'Correo Electrónico', value: 'email'},
            {text: 'Acciones', value: 'actions', sortable: false},
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
        async loadData() {
            let self = this;
            self.$root.$emit('loader-show');
            const url = `${config.api.baseURL}/customers`;

            await axios.get(url, {})
                .then(response => {
                    // Handle the response data
                    self.data = response.data;
                    self.pageNumberTextField = 0;//response.data.total;
                    // console.log(response.data.total)
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                })
                .finally(() => {
                    self.$root.$emit('loader-hide');
                });

        },
        async deleteItem(item) {
            console.log(item)
            const self = this;
            const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar el cliente ${item.first_name}?`);
            if (confirmed) {
                self.$root.$emit('loader-show');
                await axios.delete(`${config.api.baseURL}/customers/${item.id}`)
                    .then(response => {
                        self.loadData();
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(function () {
                        self.$root.$emit('loader-hide');
                    });
            }
        },
        onClickNew() {
            this.$router.push({
                path: PAGE.CUSTOMER_NEW.PATH,
            })
        },

    },
    mounted() {
        this.loadData();
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