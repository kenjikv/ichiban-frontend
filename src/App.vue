<template>
    <v-app class="app">
        <p-menu></p-menu>
        <v-main>
            <router-view :key="$route.fullPath"/>
        </v-main>

        <!--TODO: Add dialog logout-->
    </v-app>
</template>

<script>
import PMenu from "@/components/base/PMenu";
import {PAGE} from "@/helpers/data-value-common";

export default {
    name: 'App',
    components: {
        'p-menu': PMenu,
    },
    data: () => ({
        drawer: null,
        isShow: false,
    }),
    methods: {
        onClickedMenuLogoutButton() {
            this.isShow = true
        },
    },
    created() {
        this.$root.$on('t-menu-logout-on-click', this.onClickedMenuLogoutButton)
    },
    beforeDestroy() {
        this.$root.$on('t-menu-logout-on-click', this.onClickedMenuLogoutButton)
    }
};
</script>

<style>
:root {
    --font-primary: 'Roboto', sans-serif;
    --font-secondary: 'M PLUS 1p', sans-serif;

    --color-background: #F3F6FA;
    --color-main: #3C71AC;
    --color-base: #004593;
    --color-base-sub: #00326A;
    --color-base-blue: #1A95B5;
    --color-white: #FFFFFF;
    --color-black: #000000;
    --color-yellow: #EDCC09;
    --color-red: #EA5D55;
    --color-lightcoral: #F08080;
    --color-gray: #CFD4DE;
    --color-gray-dark: #9DA9C0;
    --color-gray-light: #EBEFF6;
    --color-gray-oslo: #7F8C8D;
    --color-green: #2DA65B;
    --color-orange: #E67E22;
    --color-sky-blue: #F3F6FA;
    --color-shift-bg: #9DA9C0;
}

.app {
    background: var(--color-background) !important;
}
</style>