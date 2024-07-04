import axios from "axios";

export const getAllOrder = async () => {
  try {
    const res = await axios.get("/api/order/create-order");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (id: any) => {
  try {
    const res = await axios.post("api/order/delete-order", {
      id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//get order by admin
export const addOrder = async (data: any) => {
  try {
    const res = await axios.post("/api/order/create-order", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//get order by operator
export const getOperatorTask = async (id: any) => {
  try {
    const res = await axios.post("api/order/operator-order", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getTaskCount = async (id: any) => {
  try {
    const res = await axios.post("api/operator/operator-task", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getOperator = async () => {
  try {
    const res = await axios.get("/api/user/get-operator");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPrintingTask = async (id: any) => {
  try {
    const res = await axios.post("/api/operator/printing-task", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getFinishingTask = async (id: any) => {
  try {
    const res = await axios.post("/api/operator/finishing-task", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getOrder = async (id: any) => {
  try {
    const res = await axios.post("/api/operator/printing-order", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const postStatus = async (id: any, status: any) => {
  try {
    const res = await axios.post("/api/order/task-status", {
      id: id,
      status: status,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const postFinish = async (id: any, status: any, type: any) => {
  try {
    const res = await axios.post("/api/order/finish-task", {
      id: id,
      status: status,
      type: type,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// manager
export const getOperatorOnProgress = async (id: any) => {
  try {
    const res = await axios.post("/api/manager/workin-progress", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
