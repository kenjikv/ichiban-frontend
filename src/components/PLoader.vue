<template>
  <v-overlay
      :absolute="true"
      color = black
      opacity="0.5"
      :value="isShow"
  >
    <v-progress-circular
        indeterminate
        color="green"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  props: {
    showDefault: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    showLoader() {
      this.isShow = true;
    },
    hideLoader() {
      this.isShow = false;
    }
  },
  created() {
    this.isShow = this.showDefault

    this.$root.$on('loader-show', this.showLoader)
    this.$root.$on('loader-hide', this.hideLoader)
  },
  beforeDestroy() {
    this.$root.$off('loader-show', this.showLoader)
    this.$root.$off('loader-hide', this.hideLoader)
  }
}
</script>

<style scoped>
</style>