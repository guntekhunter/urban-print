import axios from "axios";

export const getAllOrder = async () => {
    try{
        const res = await axios.get("api/order/create-order")
        return res;
    }catch(error){
        console.log(error)
    }
}