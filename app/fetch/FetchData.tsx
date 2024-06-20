import axios from "axios";

export const getAllOrder = async () => {
    try{
        const res = await axios.get("api/order/create-order")
        return res;
    }catch(error){
        console.log(error)
    }
}

export const deleteOrder = async (id:any) => {
    try{
        const res = await axios.post("api/order/delete-order", {
            id
        })
        return res;
    }catch(error){
        console.log(error)
    }
}
