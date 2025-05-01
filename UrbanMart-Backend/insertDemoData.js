const mongoose = require('mongoose');
// Old (incorrect) import:
// const { Customer, Product, ... } = require('./models');

// New (correct) import:
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Supplier = require('./models/Supplier');
const Purchase = require('./models/Purchase');
const InventoryLog = require('./models/InventoryLog');
const Sale = require('./models/Sale');
const SaleItem = require('./models/SaleItem');
const Employee = require('./models/Employee');
const DeliveryPersonnel = require('./models/DeliveryPersonnel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UrbanMartDB')
  .then(() => console.log('Connected to MongoDB for demo data insertion'))
  .catch(err => console.error('Connection error:', err));

// Clear existing data (optional)
async function clearData() {
  await Customer.deleteMany();
  await Product.deleteMany();
  await Category.deleteMany();
  await Supplier.deleteMany();
  await Purchase.deleteMany();
  await InventoryLog.deleteMany();
  await Sale.deleteMany();
  await SaleItem.deleteMany();
  await Employee.deleteMany();
  await DeliveryPersonnel.deleteMany();
  console.log('Old data cleared!');
}

// Insert fresh demo data
async function insertDemoData() {
  // Categories
  const categories = await Category.insertMany([
    { category_name: 'Fruits', description: 'Fresh fruits' },
    { category_name: 'Vegetables', description: 'Organic vegetables' },
    { category_name: 'Dairy', description: 'Milk, cheese, etc.' }
  ]);

  // Suppliers
  const suppliers = await Supplier.insertMany([
    { supplier_name: 'Fresh Farms', contact_person: 'John Doe', email: 'john@freshfarms.com', phone: '1234567890', address: '123 Farm Rd' },
    { supplier_name: 'Dairy King', contact_person: 'Jane Smith', email: 'jane@dairyking.com', phone: '9876543210', address: '456 Dairy Ave' }
  ]);

  // Products
  const products = await Product.insertMany([
    { product_name: 'Organic Apples', category_id: categories[0]._id, brand: 'Nature\'s Best', price: 2.99, stock_quantity: 100, unit: 'lb' },
    { product_name: 'Carrots', category_id: categories[1]._id, brand: 'Farm Fresh', price: 1.49, stock_quantity: 200, unit: 'kg' },
    { product_name: 'Milk', category_id: categories[2]._id, brand: 'DairyPure', price: 3.49, stock_quantity: 50, unit: 'gallon' }
  ]);

  // Customers
  const customers = await Customer.insertMany([
    { first_name: 'Alice', last_name: 'Johnson', email: 'alice@example.com', phone: '5551234567' },
    { first_name: 'Bob', last_name: 'Smith', email: 'bob@example.com', phone: '5557654321' }
  ]);

  // Purchases (supplier restocks)
  const purchases = await Purchase.insertMany([
    { supplier_id: suppliers[0]._id, product_id: products[0]._id, quantity: 50, purchase_price: 1.99, purchase_date: new Date() },
    { supplier_id: suppliers[1]._id, product_id: products[2]._id, quantity: 30, purchase_price: 2.49, purchase_date: new Date() }
  ]);

  // Inventory Logs
  await InventoryLog.insertMany([
    { product_id: products[0]._id, change_type: 'IN', quantity_changed: 50, change_date: new Date() },
    { product_id: products[2]._id, change_type: 'IN', quantity_changed: 30, change_date: new Date() }
  ]);

  // Employees
  await Employee.insertMany([
    { name: 'Emma Watson', position: 'Store Manager', email: 'emma@urbanmart.com', phone: '5558889999' },
    { name: 'Michael Scott', position: 'Cashier', email: 'michael@urbanmart.com', phone: '5557776666' }
  ]);

  // Delivery Personnel
  await DeliveryPersonnel.insertMany([
    { name: 'David Wilson', phone: '5554443333', email: 'david@urbanmart.com' },
    { name: 'Sarah Lee', phone: '5552221111', email: 'sarah@urbanmart.com' }
  ]);

  console.log('Demo data inserted successfully!');
  mongoose.disconnect();


}

// Run the functions
clearData().then(insertDemoData);

// In insertDemoData.js
const moreCategories = [
  { category_name: "Cold Drinks & Juices", description: "Beverages" },
  { category_name: "Snacks & Munchies", description: "Chips and snacks" }
];

const moreProducts = [
  { 
    product_name: "Lays Chips", 
    price: 20, 
    category_id: categories.find(c => c.category_name === "Snacks & Munchies")._id,
    imageName: "lays-chips.jpg",
    salesCount: 85
  },
  {
    product_name: "Tropicana Juice",
    price: 99,
    category_id: categories.find(c => c.category_name === "Cold Drinks & Juices")._id,
    imageName: "tropicana.jpg",
    salesCount: 42
  }
];

await Category.insertMany(moreCategories);
await Product.insertMany(moreProducts);