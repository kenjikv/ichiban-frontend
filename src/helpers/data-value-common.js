export const MENU_CODE = {
    EMPTY: 0,
    DASHBOARD: 1,
    USER: 2,
    ROLE: 3,
    CUSTOMER: 4,
    CATEGORY: 5,
    PRODUCT: 6,
    SUPPLIER: 7,
    EMPLOYEE: 8,
    REPORT: 9,
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
    CUSTOMER_NEW: {
        PATH: "/detail-customer",
        NAME: "CustomerDetail"
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
        PATH: "/detail-product/:id",
        NAME: "ProductDetail"
    },
    PRODUCT_NEW: {
        PATH: "/detail-product",
        NAME: "ProductDetail"
    },
    SUPPLIER: {
        PATH: "/supplier",
        NAME: "Supplier"
    },
    SUPPLIER_DETAIL: {
        PATH: "/detail-supplier/:uid",
        NAME: "SupplierDetail"
    },
    EMPLOYEE: {
        PATH: "/employee",
        NAME: "Employee"
    },
    EMPLOYEE_DETAIL: {
        PATH: "/detail-employee/:uid",
        NAME: "EmployeeDetail"
    },
    EMPLOYEE_NEW: {
        PATH: "/detail-employee",
        NAME: "EmployeeDetail"
    },
    REPORT: {
        PATH: "/report",
        NAME: "Report"
    }
}