import axiosInstance from '../lib/axiosInstance';
import { create } from 'zustand'
// import { Product } from './useProductStore';


// export type CouponType = {
//     _id: string,
//     couponCode: string,
//     discountValue: 845,
//     isActive: true,
//     minimumCartValue: 1145,
//     name: string,
//     type:string,
// }

// export type CartItem = {
//     _id:string,
//     product:Product,
//     quantity:number,
// }

// type Cart = {
//     _id:string,
//     cartTotal:number,
//     items:CartItem[],
//     discountedTotal:number,
//     coupon:CouponType
// }

// interface CartStore {
//     cart: Cart;
//     getCart : () => Promise<boolean>;
//     addTOCart : (productId:string,quantity:number)=> Promise<boolean>;
//     removeItem : (productId:string)=> Promise<boolean>;
//     applyCoupon : (coupon:string)=> Promise<boolean>;
//     removeCoupon : (coupon:string)=> Promise<boolean>;
// }

export const useCartStore = create((set) => ({
    cart: null,
    getCart: async()=>{
        try{
            const res = await axiosInstance.get(`/ecommerce/cart`)
            if(res.data.success){
                set({cart:res.data.data})
                return true
            }
            return false
        }catch(e){
            console.log(e)
            return false
        }
    },
    addTOCart: async(productId,quantity)=>{
        try{
            const res = await axiosInstance.post(`/ecommerce/cart/item/`+productId,{quantity})
            if(res.data.success){
                set({cart:res.data.data})
                return true
            }
            return false
        }catch(e){
            console.log(e)
            return false
        }
    },
    removeItem: async(productId)=>{
        try{
            const res = await axiosInstance.delete(`/ecommerce/cart/item/`+productId)
            if(res.data.success){
                set({cart:res.data.data})
                return true
            }
            return false
        }catch(e){
            console.log(e)
            return false
        }
    },
    applyCoupon: async(coupon)=>{
        try{
            const res = await axiosInstance.post(`/ecommerce/coupons/c/apply`,{couponCode:coupon})
            if(res.data.success){
                set({cart:res.data.data})
                return true
            }
            else return false
        }catch(e){
            console.log(e)
            return false
        }
    },
    removeCoupon: async(coupon)=>{
        try{
            const res = await axiosInstance.post(`/ecommerce/coupons/c/remove`,{couponCode:coupon})
            if(res.data.success){
                set({cart:res.data.data})
                return true
            }
            else return false
        }catch(e){
            console.log(e)
            return false
        }
    },
}))

