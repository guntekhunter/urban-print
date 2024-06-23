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

//get order by admin
export const addOrder = async (data:any) => {
    try{
        const res = await axios.post("/api/order/create-order",data)
        return res;
    }catch(error){
        console.log(error)
    }
}
//get order by operator
export const getOperatorTask = async (id:any) => {
    try{
        const res = await axios.post("api/order/operator-order", id)
        return res
    }catch(error){
        console.log(error)
    }
}

export const getOperator = async () => {
    try{
        const res = await axios.get("/api/user/get-operator")
        return res;
    }catch(error){
        console.log(error)
    }
}
