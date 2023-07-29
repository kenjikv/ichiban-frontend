export const MENU_CODE = {
    EMPTY: 0,
    DASHBOARD: 1,
    USER: 2,
    ROLE: 3,
    CUSTOMER: 4,
    ZONE: 5,
    TURN: 6,
    CATEGORY: 7,
    PRODUCT: 8,
    SERVICE: 9,
    VACCINE: 10,
    PAYMENT: 11,
    CASH: 12,
    REPORT: 13,
}

export const PAGE = {
    BASE: {
        PATH: "/",
        NAME: "Index"
    },
    REDIRECT: {
        PATH: "*",
        NAME: "Redirect"
    },
    LOGIN: {
        PATH: "/login",
        NAME: "Login"
    },
    FORGOT: {
        PATH: "/forgot",
        NAME: "Forgot"
    },
    DASHBOARD: {
        PATH: "/dashboard",
        NAME: "Dashboard"
    },
    USER: {
        PATH: "/user",
        NAME: "User"
    },
    USER_DETAIL: {
        PATH: "/detail-user/:uid",
        NAME: "UserDetail"
    },
    ROLE: {
        PATH: "/role",
        NAME: "Role"
    },
    CUSTOMER: {
        PATH: "/customer",
        NAME: "Customer"
    },
    CUSTOMER_DETAIL: {
        PATH: "/detail-customer/:uid",
        NAME: "CustomerDetail"
    },
    ZONE: {
        PATH: "/zone",
        NAME: "Zone"
    },
    TURN: {
        PATH: "/turn",
        NAME: "Turn"
    },
    CATEGORY: {
        PATH: "/category",
        NAME: "Category"
    },
    CATEGORY_DETAIL: {
        PATH: "/detail-category/:uid",
        NAME: "CategoryDetail"
    },
    PRODUCT: {
        PATH: "/product",
        NAME: "Product"
    },
    PRODUCT_DETAIL: {
        PATH: "/DetailProduct",
        NAME: "ProductDetail"
    },
    SERVICE: {
        PATH: "/service",
        NAME: "Service"
    },
    SERVICE_DETAIL: {
        PATH: "/DetailService",
        NAME: "ServiceDetail"
    },
    VACCINE: {
        PATH: "/vaccine",
        NAME: "Vaccine"
    },
    VACCINE_DETAIL: {
        PATH: "/DetailVaccine",
        NAME: "VaccineDetail"
    },
    PAYMENT: {
        PATH: "/collection",
        NAME: "Collection"
    },
    CASH: {
        PATH: "/cash",
        NAME: "Cash"
    },
    REPORT: {
        PATH: "/report",
        NAME: "Report"
    }
}