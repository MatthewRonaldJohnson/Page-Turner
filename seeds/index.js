const seedPost = require("./post-seeds");
const seedUser = require("./user-seeds");
const seedComment = require("./comment-seeds");
const seedBook = require("./books-seeds"); 

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n ----DATABASE SYNCED ----\n");

  await seedUser();
  console.log("\n-----USER SEEDED -----\n");

  await seedBook();
  console.log ("\n ---- BOOKS SEEDED ----\n")

  await seedPost();
  console.log("\n----POSTS SEEDED----\n");

  await seedComment();
  console.log("\n----COMMENTS SEEDED----\n");


  process.exit(0);
};

seedAll();
