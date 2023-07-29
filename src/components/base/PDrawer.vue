<template>
  <v-row 
    class="fill-height"  
    style="height: 100%; overflow-y: auto; overflow-x: hidden !important;">
    <v-col cols="2">
      <v-navigation-drawer
          dark
          color="primary"
          style="height: 100vh; top: 0px; max-height: calc(100% - 0px); transform: translateX(0%); width: 260px;"
          permanent
      >
        <v-list
            dense
            nav
            height="100%"
        >
        <v-list-item-group v-model="selectedItem">
          <!--info of user-->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="align-content:center">Usuario Administrador</v-list-item-title>
              <v-list-item-subtitle>Admin</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <!--items of navigation drawer-->
          <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.path"
            >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <!--content of navigation drawer-->
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-col>
    <v-col cols="10">
    </v-col>
</v-row>
</template>

<script>

export default {
    data () {
      return {
        items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', path:"/dashboard"},
        {title: 'Usuarios', icon: 'mdi-account', path:"/users"},
        {title: 'Roles', icon: 'mdi-account-details', path:"/roles"},
        {title: 'Clientes', icon: 'mdi-account-group', path:"/customer"},
        {title: 'Zonas', icon: 'mdi-radar', path:"/zones"},
        {title: 'Turnos', icon: 'mdi-turnstile', path:"/turns"},
        {title: 'Categorías', icon: 'mdi-table-of-contents', path:"/categories"},
        {title: 'Productos', icon: 'mdi-store-plus', path:"/product"},
        {title: 'Servicios', icon: 'mdi-face-agent', path:"/services"},
        {title: 'Vacunas', icon: 'mdi-medication',path:"/vaccines"},
        {title: 'Cobranzas', icon: 'mdi-cash-clock',path:"/collections"},
        {title: 'Caja', icon: 'mdi-cash-multiple',path:"/cashregister"},
        {title: 'Reportes', icon: 'mdi-chart-line',path:"/reports"},
      ],
      contentFlag: "Dashboard",
      selectedItem: 1,
      }
    },
    methods: {
    
    },      
}
</script>

<style>

</style>