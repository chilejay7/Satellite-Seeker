const { User } = require("../models");

const userData = [
  {
    user_name: "Test Testerson",
    email: "test@gmail.com",
    password: "qwertyui",
  },
  {
    user_name: "Second Person",
    email: "second@gmail.com",
    password: "12345678",
  },
  {
    user_name: "Third Person",
    email: "third@gmail.com",
    password: "ABCDEFGH",
  },
];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;
