import React from 'react'
import { useUserStore } from '../store/useUserStore'
import useProductStore from '../store/useProductStore'
import { useCartStore } from '../store/useCartStore'
import { useCategoryStore } from '../store/useCategoryStore'

const InitialDataLoad = () => {
    const {user, getUser} = useUserStore((state)=>({
        user:state.user,
        getUser:state.getUser
    }))
    const {products,fetchProducts} = useProductStore((state)=>({
        products:state.products,
        fetchProducts:state.fetchProducts
    }))
    const {cart,getCart} = useCartStore((state)=>({
        cart:state.cart,
        getCart:state.getCart
    }))
    const {categories, getCategories} = useCategoryStore((state)=>({
        categories:state.categories,
        getCategories:state.fetchCategories
    }))

    React.useEffect(()=>{
        if(!user){
            getUser()
        }
    },[])
    React.useEffect(()=>{
        if (user===null){
            return
        }
        if(!products){
            fetchProducts()
        }
        if(!cart){
            getCart()
        }
        if(!categories){
            getCategories()
        }
    },[user])

    return <></>
}

export default InitialDataLoad