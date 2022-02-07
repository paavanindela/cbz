module.exports = {
  db : {
    HOST: "localhost",
    USER: "pk",
    PASSWORD: "password",
    DB: "lab3db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    PORT: 5433
  },
  perPage : 10
};
