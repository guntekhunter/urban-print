import bcrypt from "bcrypt";

async function bycript(params: any) {
  const pass = await bcrypt.hash(params, 10);
  return pass;
}

export const users = [
  {
    email: "burhan@gmail.com",
    name: "burhan",
    type: "manager",
    password: bycript("060820"),
  },
  {
    email: "samsul@gmail.com",
    name: "samsul",
    type: "operator",
    password: bycript("060820"),
  },
  {
    email: "agunghaeruddin270@gmail.com",
    name: "agung",
    type: "admin",
    password: bycript("060820"),
  },
];
