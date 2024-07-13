import axiosInstance from '../lib/axiosInstance';
import { create } from 'zustand'

// export type ProductVariant = {
//     name: string;
//     price: number;
//     stock: number;
//     description: string;
//     mainImage: string;
//     subImages?: string[];
// }
// export type Product = {
//     name: string;
//     category: string;
//     price: number;
//     stock: number;
//     description: string;
//     mainImage: string;
//     subImages?: string[];
//     variants?: ProductVariant[];
//     _id: string
//     updatedAt: string
// };
// type PaginationType = {
//     totalProducts: number,
//     limit: number,
//     page: number,
//     totalPages: number,
//     serialNumberStartFrom: number,
//     hasPrevPage: boolean,
//     hasNextPage: boolean,
//     prevPage: number | null,
//     nextPage: number | null
// }

// interface ProductStore {
//     products: Product[];
//     pagination: PaginationType;
//     fetchProducts: (page?:number,limit?:number,append?:boolean)=> Promise<boolean>;
//     fetchProductByID: (id:string)=> Promise<boolean|Product>;
//     fetchProductsByCategory: (category:string,page:number,limit:number,append?:boolean)=> Promise<boolean>;
// }

const useProductStore = create((set) => ({
    products: null,
    pagination: {},
    categoryProducts: null,
    categoryPagination: {},
    fetchProducts: async(page=1,limit=15,append=false)=>{
        try{
            const res = await axiosInstance.get(`/ecommerce/products?page=${page}&limit=${limit}`)
            if(res.data.success){
                const data = res.data.data
                set((state)=>({
                    products: append ? [...state.products,...data.products] : data.products,
                    pagination:{
                        totalProducts: data.totalProducts,
                        limit: data.limit,
                        page: data.page,
                        totalPages: data.totalPages,
                        serialNumberStartFrom: data.serialNumberStartFrom,
                        hasPrevPage: data.hasPrevPage,
                        hasNextPage: data.hasNextPage,
                        prevPage: data.prevPage,
                        nextPage: data.nextPage
                    }
                }))
                return true
            }
            else{
                return false
            }            
        }
        catch(e){
            console.log(e)
            return false
        }
    
    },
    fetchProductByID: async(id)=>{
        try{
            const res = await axiosInstance.get('/ecommerce/products/'+id)
            if(res.data.success){
                return res.data.data
            }
        }
        catch(e){
            console.log(e)
            return false
        }
    },
    fetchProductsByCategory: async (category,page=1,limit=10,append=false) => {
        try{
            const res = await axiosInstance.get(`/ecommerce/products/category/${category}?page=${page}&limit=${limit}`)
            if(res.data.success){
                const data = res.data.data
                set((state)=>({
                    categoryProducts: append ? [...state.categoryProducts,...data.products] : data.products,
                    categoryPagination:{
                        totalProducts: data.totalProducts,
                        limit: data.limit,
                        page: data.page,
                        totalPages: data.totalPages,
                        serialNumberStartFrom: data.serialNumberStartFrom,
                        hasPrevPage: data.hasPrevPage,
                        hasNextPage: data.hasNextPage,
                        prevPage: data.prevPage,
                        nextPage: data.nextPage
                    }
                }))
                return true
            }
            else{
                return false
            }
        }
            catch(e){
                console.log(e)
                return false
            } 
    },
}))

export default useProductStore;