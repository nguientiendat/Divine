import axios from "axios"
import {    deleteProductStart,deleteProductSuccess,deleteProductFailed,loginStart ,loginFailed, loginSuccess, registerStart, registerSuccess, registerFailed,addProductStart,addProductSuccess,addProductFailed } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());

    try{
        const res = await axios.post("http://localhost:8000/v1/auth/login",user)
        dispatch(loginSuccess(res.data))
        navigate("/")
    }catch(err){
        dispatch(loginFailed())
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());

    try{
        const res = await axios.post("http://localhost:8000/v1/auth/register",user)
        dispatch(registerSuccess(res.data))
        navigate("/login")
    }catch(err){
        dispatch(registerFailed())
    }

}
export const addToCart = async (data, dispatch)=>{
    dispatch(addProductStart());
    
    try{
        const res = await axios.post("http://localhost:5000/cart",data
            
        )
        dispatch(addProductSuccess(res.data));

    }catch(err){
        dispatch(addProductFailed())
    }
}
export const deleteCartProduct = async(data,dispatch)=>{
    dispatch(deleteProductStart());

        try{
            const res = await axios.delete("http://localhost:5000/cart",data)
            dispatch(deleteProductSuccess(res.data))
        }catch(err){
            dispatch(deleteProductFailed())
        }
}