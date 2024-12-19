import Sequelize from "sequelize"; 
import { PASSWORD, DB_NAME } from "../config.js";

console.log(PASSWORD);

export const sequelize = new Sequelize(
  //"projectsdb", // db name,
  DB_NAME, // db name,
  "postgres", // username
  PASSWORD, // password
  //"mysecretpassword", // password
  {
    host: "localhost",
    dialect: "postgres",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  }
);
