const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const mockData = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ];    

  // Fetch and display all items in mockData.
  app.get("/mockData",(req,res)=> {
    res.json(mockData);
  })

  // Retrieve a specific item by id from mockData. If the item doesn’t exist, return a 404 status and an error message.
  app.get("/mockData/:id", (req, res) => {
    const data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the item by id
    if (!data) return res.status(404).json({ message: "Item not found" }); // to send a 404 status code and a message if the item is not found
    res.json(data); // to send the item as a response
  });

  //Add a new item to mockData (send the item’s details in the request body).
  app.post("/mockData", (req, res) => {
    const { name, price } = req.body; // to get the name and price from the request body
    const newData = { id: mockData.length + 1, name, price }; // to create a new product object
    mockData.push(newData); // to add the new data to the mockData array
    res.status(201).json(newData); // to send the new data as a response
  });

  app.put("/mockData/:id", (req, res) => {
    const data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the item by id
    if (!data) return res.status(404).json({ message: "Item not found" }); // to send a 404 status code and a message if the item is not found
  
    const { name, price } = req.body; // to get the name and price from the request body
    data.name = name; // to update the name of the item
    data.price = price; // to update the price of the item
    res.json(data); // to send the updated item as a response
  });

  // to delete an item
app.delete("/mockData/:id", (req, res) => {
  const index = mockData.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the item by id
  if (index === -1) return res.status(404).json({ message: "Item  not found" }); // to send a 404 status code and a message if the item is not found

  mockData.splice(index, 1); // to delete the item from the product array
  res.status(204).send(); // to send a 204 status code
});