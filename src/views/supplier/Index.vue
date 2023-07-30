<template>
  <div class="pa-5 fill-height">
    <v-card height="100%">
      <v-card-title>
        <h3>Turnos</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>

      </v-card-text>
    </v-card>
    <p-loader :show-default="false"></p-loader>
  </div>
</template>

<script>
import PLoader from "@/components/PLoader";

export default {
  components: {
    'p-loader': PLoader
  }
}
</script>

<style>

</style>