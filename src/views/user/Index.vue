<template>
   <div class="pa-5 fill-height">
    <v-card height="100%">
      <v-card-title>
        <v-row>
          <v-col class="d-flex align-center" cols="10">
            <span class="title-txt">Usuarios</span>
          </v-col>
          <v-col class="d-flex align-center justify-end"
                 @click="onClickNewUser"
                 cols="2"
          >
            <v-btn class="mx-1 base-btn_create_customer elevation-0">
              <v-icon left="left">
                mdi-upload
              </v-icon>
              Nuevo usuario
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
                      <v-col class="pa-0 d-flex align-center" cols="10"><span class="spn-search-title">Busqueda avanzada：</span>
                      </v-col>
                      <v-col class="pa-0 d-flex align-center justify-end" cols="2">
                        <v-btn class="mx-1 base-btn base-btn_search elevation-0" @click="loadUsers">Buscar</v-btn>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="pa-0">
                    <v-row class="ma-0">
                      <v-col class="pa-1 d-flex align-center" cols="12">
                        <v-text-field label="Nombres, apellidos, teléfono o correo electrónico" v-model="search" outlined="outlined" dense="dense" hide-details="hide-details"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-data-table
                  class="my-4"
                  :headers="headers"
                  :items="data"
                  :items-per-page="itemsPerPage"
                  :page.sync="paginationCurrent"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  hide-default-footer
                  @update:sort-desc="updateSortDesc"
                  @click:row="onClickRow">
                 
                  <template v-slot:[`item.state`]="{ item }">
                    <v-chip
                      :color="getColor(item.state)"
                      dark>
                    {{ getStateName(item.state) }}
                    </v-chip>
                  </template>
              </v-data-table>
            </v-container>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row class="ma-4">
          <v-col class="pa-0 d-flex align-center justify-center" cols="12">
            <v-pagination
                v-model="paginationCurrent"
                :length="paginationCount"
                :total-visible="6"
                color="#004593"
                @input="changePagination">
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
        paginationCount: 0,
        itemsPerPage: 10,
        pageNumber: 1,

        search: '',
        sortBy: "id",
        sortDesc: true,

    headers: [
      { text: 'Nombres', value: 'name' },
      { text: 'Apellidos', value: 'lastname' },
      { text: 'Correo Electronico', value: 'mail' },
      { text: 'Estado',  value: 'state', key:'state' },
      { text: 'Celular', value: 'phone' },
    ],
    data: [],
    user_states: [ {id: 1, name: 'Valido'}, 
                  {id: 2, name: 'Invalido'},
                  {id: 3, name: 'Pendiente'},
                  {id: 4, name: 'Rechazado'} 
                 ],
  }),
  methods: {
    updateSortDesc() {
      this.loadUsers()
    },
    onClickRow(value) {
      let e = this.data.find(item => item.id === value.id)
      if (e && e.id !== undefined) {
        this.$router.push({
          name: PAGE.USER_DETAIL.NAME,
          params: {uid: value.uid}
        })
        return
      }
    },
    changePagination(number) {
      this.paginationCurrent = number
      this.loadUsers()
    },
    async loadUsers() {
      this.$root.$emit('loader-show')
            const url = `${config.api.baseURL}/user/v1/users`;
            const params = {
                page: this.paginationCurrent,
                perPage: this.itemsPerPage,
                state: 1,
                search: this.search,
                orderColumn: this.sortBy,
                orderValue: this.sortDesc ? 'DESC' : 'ASC'
            };

            await axios.get(url, {params})
                .then(response => {
                    // Handle the response data
                    this.data = response.data.data;
                    this.paginationCount= response.data.lastPage;
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                })
                .finally(() => {
                    this.$root.$emit('loader-hide')
                })
    },
    onClickNewUser(value) {
            this.$router.push({
                path: PAGE.USER_DETAIL.PATH,
            })
    },
    async loadUser(value) {
      this.$root.$emit('loader-show')
            const url = `${config.api.baseURL}/user/v1/user/`;
            const params = {
                page: this.paginationCurrent,
                perPage: this.itemsPerPage,
                state: 1,
                search: this.search,
                orderColumn: this.sortBy,
                orderValue: this.sortDesc ? 'DESC' : 'ASC'
            };

            await axios.get(url, {params})
                .then(response => {
                    // Handle the response data
                    this.data = response.data.data;
                    this.paginationCount= response.data.lastPage;
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                })
                .finally(() => {
                    this.$root.$emit('loader-hide')
                })
    },
    getColor (state) {
      switch(state){
        case 1: 
          return 'green';
        case 2: 
          return 'blue';
        case 3: 
          return 'purple';
        case 4: 
          return 'red';
      }
    },
    getStateName(id) {
          const state = this.user_states.find(state => state.id === id);
          return state ? state.name : '';
    },
  },
  mounted() {
        this.loadUsers();
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
.enabled-state {
  color: green;
}

.disabled-state {
  color: red;
}
</style>


