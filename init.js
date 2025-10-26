const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allchats = [
  {
    from: "Satyam",
    to: "Vaishnavi",
    message: "Hello, How Are You?",
    created_at: new Date(),
  },
  {
    from: "Vaishnavi",
    to: "Satyam",
    message: "I am good, thank you! How about you?",
    created_at: new Date(),
  },
  {
    from: "Satyam",
    to: "Vaishnavi",
    message: "Doing great! Are you free to chat later?",
    created_at: new Date(),
  },
  {
    from: "Vaishnavi",
    to: "Satyam",
    message: "Sure, let me know when.",
    created_at: new Date(),
  },
  {
    from: "Satyam",
    to: "Rohan",
    message: "Hey Rohan, did you finish the assignment?",
    created_at: new Date(),
  },
  {
    from: "Rohan",
    to: "Satyam",
    message: "Almost done, will send it in 10 mins.",
    created_at: new Date(),
  },
  {
    from: "Vaishnavi",
    to: "Rohan",
    message: "Rohan, can we discuss the project?",
    created_at: new Date(),
  },
];

Chat.insertMany(allchats)
  .then((res) => console.log("Chats inserted"))
  .catch((err) => console.log(err));
