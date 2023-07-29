<template>
  <v-container fluid>    
            <v-card>
                <v-card-title class="py-2 ma-1">
                <h4>Usuario </h4>   
                <v-icon class="pa-4 d-flex align-center justify-end" 
                        color="primary" 
                        size="large"> 
                        mdi-account 
                </v-icon>
                </v-card-title>
                <v-row class="px-3 mx-1">
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.name"
                      label="Nombre"
                      type="text"
                      placeholder="Nombre usuario"
                      mobile-breakpoint="580">
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.lastname"
                      label="Apellido"
                      type="text"
                      placeholder="Apellido del usuario"
                      mobile-breakpoint="580">
                      </v-text-field>
                  </v-col>
                </v-row>
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
                      label="Telefono"
                      type="number"
                      placeholder="77029999">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-3 ma-1">
                  <v-col cols="6">
                      <v-combobox outlined color="primary" hide-details="auto"
                      :value= getRoleName(roleSelected)
                      label="Rol"
                      :items="user_roles"
                      item-value="id"
                      item-text="name">
                      </v-combobox>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field outlined color="primary" hide-details="auto"
                      v-model="data.commission"
                      label="Comisión % "
                      type="number"
                      placeholder="3">
                      </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-3 ma-1">
                  <v-col cols="6">
                    <v-combobox outlined color="primary" hide-details="auto"
                      :value= getStateName(stateSelected)
                      label="Estado"
                      :items="user_states"
                      item-value="id"
                      item-text="name">
                      </v-combobox>
                  </v-col>
                </v-row>
                <v-card-actions class="pa-4 d-flex align-center justify-end">
                  <v-btn class="mx-1 base-btn base-btn_save_user elevation-0">Guardar</v-btn>
                  <v-btn class="mx-1 base-btn base-btn_cancel elevation-0" @click="onClickCancel">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
    <p-loader :show-default=false></p-loader>
  </v-container>  
</template>

<script>
import PLoader from "@/components/PLoader";
import axios from "axios";
import {PAGE} from "@/helpers/data-value-common";
import {config} from '@/config.json'

export default {
    components: {
        'p-loader': PLoader
    },
    data: () => ({
        data: {
            id: 0,
            name: '',
            lastname: '',
            mail: '',
            role: 0,
            state: 0,
            phone: '',
            uid: '',
            register_date: '',
            commission: 0,
           
        },
        stateSelected: 0,
        roleSelected: 0,
        user_roles: [ {id: 1, name: 'Administrador'},
                      {id: 2, name: 'Empleado'},
                      {id: 3, name: 'Conductor/a'}
                    ],
        user_states: [ {id: 1, name: 'Valido'}, 
                       {id: 2, name: 'Invalido'},
                       {id: 3, name: 'Pendiente'},
                       {id: 4, name: 'Rechazado'} 
                     ] 

    }),
    methods: {
      async loadUser() {
            this.$root.$emit('loader-show')
            const url = `${config.api.baseURL}/user/v1/user/${this.$route.params.uid}`
            await axios.get(url)
                .then(response => {
                    this.data = response.data.data 
                    this.stateSelected = this.data.state 
                    this.roleSelected = this.data.role                
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
                path: PAGE.USER.PATH,
            })
      },
      getStateName(id) {
          const state = this.user_states.find(state => state.id === id)
          return state ? state.name : ''
      },
      getRoleName(id) {
          const role = this.user_roles.find(role => role.id === id)
          return role ? role.name : ''
      },
   
    },
    created() {
        this.loadUser()
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

  &_save_user {
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