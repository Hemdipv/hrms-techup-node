module.exports = {
  HOST: "p3nlmysql7plsk.secureserver.net",
  USER: "dbHRMS_User", //"dbtechupusr210923",
  PASSWORD: "l7OYBi0e!@G9", //"1iy0P4o4@",
  DB: "dbHRMS",
  // DB: "dbMNMSession",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "Durgesh@123",
//   DB: "hrms",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
