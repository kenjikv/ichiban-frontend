<template>
<v-app-bar 
  app
  dense
  flat
  color="transparent"
  style="height: 75px; margin-top: 0px; left:260px; right: 0px;">
    <v-btn
        class="mr-3"
        elevation="1"
        fab
        small
      >
        <v-icon v-if="value">
          mdi-view-quilt
        </v-icon>

        <v-icon v-else>
          mdi-dots-vertical
        </v-icon>
    </v-btn>
    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      text="$route.name"
    />
    <v-divider></v-divider>
    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
</v-app-bar>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>