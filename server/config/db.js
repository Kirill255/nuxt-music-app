if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // 1) import не работает внутри условий 2) https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import-
}

export default {
  // dbUrl: "mongodb://localhost:27017/",
  dbUrl: process.env.DB_URL,
  secret: process.env.SECRET
};
