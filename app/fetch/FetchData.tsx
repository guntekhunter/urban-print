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

export const getTask = async () => {
  try {
    const res = await axios.get("api/operator/printing-order");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getFinishTask = async () => {
  try {
    const res = await axios.get("/api/operator/finishing-order");
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

export const getUser = async (id: number) => {
  try {
    const res = await axios.post("/api/admin/get-user", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPrintingTask = async (data: any) => {
  try {
    const res = await axios.post("/api/operator/printing-task", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPrintingPosterTask = async () => {
  try {
    const res = await axios.get("/api/operator/printing-poster-task");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPrintingStickersTask = async () => {
  try {
    const res = await axios.post("/api/operator/printing-stickers-task");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getFinishingTask = async (data: any) => {
  try {
    const res = await axios.post("/api/operator/finishing-task", data);
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
export const postStatus = async (
  id: any,
  status: any,
  operator: any,
  late: any
) => {
  try {
    const res = await axios.post("/api/order/task-status", {
      id: id,
      status: status,
      operator: operator,
      late: late,
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
export const getOperatorOnProgress = async (data: any) => {
  try {
    const res = await axios.post("/api/manager/workin-progress", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getPerformance = async (data: any) => {
  try {
    const res = await axios.post("/api/manager/performance", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addCustumer = async (data: any) => {
  try {
    const res = await axios.post("/api/admin/add-custumer", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCustumers = async () => {
  try {
    const res = await axios.get("/api/admin/get-custumers");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getCustumer = async (id: any) => {
  try {
    const res = await axios.post("/api/admin/get-custumer", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createSale = async (data: any) => {
  try {
    const res = await axios.post("/api/sale/create-sale", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getSales = async () => {
  try {
    const res = await axios.get("/api/sale/create-sale");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSale = async (id: any) => {
  try {
    const res = await axios.post("/api/sale/find-sale", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editSale = async (data: any) => {
  try {
    const res = await axios.post("/api/sale/edit-sale", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSalesPerson = async () => {
  try {
    const res = await axios.get("/api/user/get-sales-person");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDaily = async (data: any) => {
  try {
    const res = await axios.post("/api/sale/daily", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMountly = async () => {
  try {
    const res = await axios.get("/api/sale/mountly");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCustumer = async () => {
  try {
    const res = await axios.get("/api/admin/add-custumer");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCustumer = async (id: any) => {
  try {
    const res = await axios.post("/api/admin/delete-customer", { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getOperators = async (id: any) => {
  try {
    const res = await axios.post("/api/admin/get-operators", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (data: any) => {
  try {
    const res = await axios.post("/api/user/create-user", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get("/api/user/get-users");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const res = await axios.post("/api/user/delete-user",
      id);
    return res;
  } catch (error) {
    console.log(error);
  }
};


