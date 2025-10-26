const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs", { chats });
});

// New Route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})

// Create Route
app.post("/chats", async (req, res) => {
  let { from, to, message } = req.body;
  let newchat = new Chat({
    from,
    to,
    message,
    created_at: new Date(),
  });
  await newchat.save(); // <-- important!
  console.log("New chat saved:", newchat);
  res.redirect("/chats"); // redirect to the list after saving
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { message: newMessage } = req.body;

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMessage },
    { runValidators: true, new: true }
  );

  console.log("Chat updated:", updatedChat);
  res.redirect("/chats");
});

// Destory Route
app.delete("/chats/:id",async (req,res)=>{
  let {id} = req.params;
  let DeletedChat = await Chat.findByIdAndDelete(id);
  console.log(DeletedChat);
  res.redirect("/chats");
})

app.get("/", (req, res) => {
  res.send("working root");
});

app.listen(3000, () => {
  console.log(`Server is Running on Port: 3000`);
});
