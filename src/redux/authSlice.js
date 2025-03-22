import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice ({
    name:"auth",
    initialState:{
        login:{
            currentUser:null,
            isFetching:false,
            error:false,
            isLoggedIn:false
        },
        register:{
            isFetching:false,
            error:false,
            success:false
        },addProduct:{
            isFetching: false,
            error: false,
            success: false,
            // isLoggedIn:false,

        },deleteCartProduct:{
            isFetching:false,
            error:false,
            success:false
        },
        logout: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers:{
        loginStart:(state)=> {
            state.login.isFetching = true;
        },
        loginSuccess:(state,action)=>{
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.login.isLoggedIn  = true;
            
        },
        loginFailed:(state) =>{
            state.login.isFetching = false;
            state.login.error = true;
        },
        
        registerStart:(state)=> {
            state.register.isFetching = true;
        },
        registerSuccess:(state,action)=>{
            state.register.isFetching = false;
     
            state.register.error = false;

            state.register.success = true;

        },
        registerFailed:(state) =>{
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false
        },
        addProductStart:(state) =>{
            state.addProduct.isFetching = true;
        },
        addProductSuccess:(state) =>{
            state.addProduct.isFetching = false;
            state.addProduct.error = false;
            state.addProduct.success = true
        },
        addProductFailed:(state) =>{
            state.addProduct.isFetching = false;
            state.addProduct.error = true;
            state.addProduct.success = false
        },
        deleteProductStart:(state) =>{
            state.deleteProduct.isFetching = true
        },
        deleteProductSuccess: (state)=>{
            state.deleteCartProduct.isFetching=false;
            state.deleteCartProduct.errow = false;
            state.deleteCartProduct.success = true
        },
        deleteProductFailed: (state)=>{
            state.deleteCartProduct.isFetchin=false;
            state.deleteCartProduct.errow = true;
            state.deleteCartProduct.success = false
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.logout.error = false;
            state.logout.success = true;
            state.login.isLoggedIn = false;
            state.login.currentUser = null;
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
            state.logout.success = false;
        },
        // Update account balance
        updateAccountBalance: (state, action) => {
            if (state.login.currentUser) {
                state.login.currentUser.account_balance = action.payload;
            }
        }
    }

})
export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess,
    addProductSuccess,
    addProductFailed,
    addProductStart,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    updateAccountBalance
}  = authSlice.actions;

// Alias for compatibility with LogOut.jsx
export const createLogoutSuccess = logoutSuccess;

export default authSlice.reducer