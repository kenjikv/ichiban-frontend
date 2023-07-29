<template>
    <p-loader :show-default="false"></p-loader>
</template>

<script>
import PLoader from "../components/PLoader";
import {PAGE} from '../helpers/data-value-common';

export default {
    name: 'Index',
    components: {
        'p-loader': PLoader
    },
    data: () => ({
        user: undefined,
    }),
    methods: {
        verifyLogin() {
            this.$root.$emit('p-menu-hide');
            this.user = JSON.parse(localStorage.getItem("user"));
            if (this.user != undefined && this.user !== null) {
                this.$root.$emit('p-menu-show');
                this.$router.push({name: PAGE.DASHBOARD.NAME});
                return;
            } else {
                this.$root.$emit('p-menu-hide');
                this.$router.push({name: PAGE.LOGIN.NAME});
                return;
            }
        }
    },
    created() {
        this.verifyLogin();
    }
}
</script>
