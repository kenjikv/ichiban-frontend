<template>
    <v-navigation-drawer v-if="isShow" v-model="drawer" width="260px" dark="dark" app="app">

        <v-list-item class="item-logo">
            <v-list-item-title><span class="title-logo">Ichiban</span></v-list-item-title>
        </v-list-item>

        <v-list class="menu-list">
            <v-list-item :class="this.activeMenu(this.CODE.DASHBOARD)" :to="this.PAGE.DASHBOARD.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.DASHBOARD.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.USER)" :to="this.PAGE.USER.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-account-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.USER.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.ROLE)" :to="this.PAGE.ROLE.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.ROLE.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.CUSTOMER)" :to="this.PAGE.CUSTOMER.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.CUSTOMER.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.CATEGORY)" :to="this.PAGE.CATEGORY.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.CATEGORY.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.PRODUCT)" :to="this.PAGE.PRODUCT.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.PRODUCT.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.PRODUCT)" :to="this.PAGE.SUPPLIER.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.SUPPLIER.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.PRODUCT)" :to="this.PAGE.EMPLOYEE.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.EMPLOYEE.NAME }}</v-list-item-title>
            </v-list-item>

            <v-list-item :class="this.activeMenu(this.CODE.REPORT)" :to="this.PAGE.REPORT.PATH" link="link">
                <v-list-item-icon>
                    <v-icon class="icon-item">mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="submenu-title">{{ this.PAGE.REPORT.NAME }}</v-list-item-title>
            </v-list-item>
        </v-list>
        <template>
            <v-list-item class="pa-3">
                <v-list-item-content class="px-2" @click="clickedProfile">
                    <v-list-item-title class="submenu-title">{{ showUserName }}</v-list-item-title>
                </v-list-item-content>
                <v-btn @click="clickedLogout" icon="icon">
                    <v-icon class="icon-item">mdi-power</v-icon>
                </v-btn>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script>
import {MENU_CODE, PAGE} from "@/helpers/data-value-common";

export default {
    name: "PMenu",
    data: () => ({
        // Constant
        CODE: MENU_CODE,
        PAGE: PAGE,

        // Variables
        drawer: true,
        isShow: true,
        activeItem: MENU_CODE.EMPTY,
    }),
    methods: {
        clickedProfile() {
        },
        clickedLogout() {
            localStorage.removeItem("user")
            this.$router.push({name: PAGE.BASE.NAME});
        },
        showMenu() {
            this.isShow = true
        },
        hideMenu() {
            this.isShow = false
        },
        setActiveItem(code) {
            this.activeItem = code
        },
        activeMenu(code) {
            return this.activeItem === code ? "menu_active" : ""
        },
    },
    computed: {
        showUserName() {
            return "User Name"
        },
    },
    created() {
        this.$root.$on('p-menu-show', this.showMenu)
        this.$root.$on('p-menu-hide', this.hideMenu)
        this.$root.$on('p-menu-active-item', this.setActiveItem)
    },
    beforeDestroy() {
        this.$root.$off('p-menu-show', this.showMenu)
        this.$root.$off('p-menu-hide', this.hideMenu)
        this.$root.$off('p-menu-active-item', this.setActiveItem)
    }
}
</script>

<style scoped lang="scss">
.menu {
  &_business {
    background: var(--color-base-sub) !important;
  }

  &_assistance {
    background: var(--color-base-blue) !important;
  }

  &_active {
    background: var(--color-main);
    border-left: 5px solid var(--color-yellow);
  }
}

.item-group {
  margin-left: -16px;
}

.item-logo {
  height: 98px;
}

.icon-item {
  color: var(--color-white) !important;
}

.title-logo {
  font-family: var(--font-primary);
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  color: var(--color-white);
}

.submenu-title {
  font-family: var(--font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: var(--color-white);
}

.submenu-menu-title {
  font-family: var(--font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: var(--color-white);
  margin-left: 30px;
}
</style>