<template>
  <v-container fluid fill-height class="loginOverlay">
    <div style="position:absolute;height:100%;width:100%;">
        <v-img 
          src="@/assets/fondo1.png"
          height="100%"
          aspect-ratio="1.5"   
          cover>
        </v-img>
    </div>
    <v-row>      
      <v-col cols="4"></v-col>
      <v-col cols="8">        
        <v-card class="elevation-12" width="500px">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Restablecer contraseña</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn 
              icon 
              @click="hideForgot()">
            <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
                 <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation>
                    <v-text-field
                       prepend-icon="mdi-email"
                       name="Email"
                       label="Email"
                       type="text"
                    ></v-text-field>
                 </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" block>Restablecer Contraseña</v-btn>
              </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PAGE } from '@/helpers/data-value-common';

export default {
  data: () => ({
    valid: true,
    showPass: true,
  }),
  methods: {
    hideForgot() {      
      this.$router.push({ name: PAGE.LOGIN.NAME});
      return;  
    },
    
  }
}
</script>

<style>

</style>