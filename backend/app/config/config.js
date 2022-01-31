module.exports = {
  db : {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Hate_you",
    DB: "lab4db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  perPage : 10
};