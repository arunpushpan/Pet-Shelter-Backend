
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/petshelter',()=>{
    console.log('MongDB Connected Successfully!');
})

// members model
const User = mongoose.model('User',{
  username:String,
  phno:Number,
  password:String,
  address:String

})

// Creating a model
 const Pet = mongoose.model('Pet',{
      
  id: Number,
  title: String,
  gender: String,
  price: Number,
  description: String,
  size: String,
  height: String,
  image: String,
  weight: String,
  coat: String,
  energy: String,
  activities: String,
  category: String

 })

//  to store wishlist
const Wishlist = mongoose.model('Wishlist',{
  id: Number,
  title: String,
  gender: String,
  price: Number,
  description: String,
  size: String,
  height: String,
  image: String,
  weight: String,
  coat: String,
  energy: String,
  activities: String,
  category: String

 })

// members model
const Contact = mongoose.model('Contact',{
  username:String,
  email:String,
  phno:Number,
  address:String,
  breed:String,
  age:String,
  gender:String,
  photo:String,
  rstatus:String

})


 module.exports = {
    User,
    Pet,
    Wishlist,
    Contact
  }