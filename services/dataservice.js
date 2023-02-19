

const db = require('./db')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// register
const register = (uname, phno, pswd, address) => {
    // check phno is in mongodb 
    return db.User.findOne({
        phno
    }).then((result) => {
        console.log(result);
        if (result) {
            // if phno exists
            return {
                statusCode: 401,
                message: 'Already a Member'
            }
        }
        else {
            // to add new user
            const newUser = new db.User({
                username: uname,
                phno: phno,
                password: pswd,
                address: address
            })
            newUser.save()
            return {
                statusCode: 200,
                message: 'Registration successful'
            }
        }
    })
}
// login
const login = (phno, pswd) => {
    console.log('inside login function');
    // check phno ,pswd is in mongodb - db.users.findOne()
    return db.User.findOne({
        phno,
        password: pswd
    }).then((result) => {
        if (result) {

            // generate token
            const token = jwt.sign({
                currentPhno:phno
            },'supersecretkey123')
            return {
                statusCode: 200,
                message: 'login successful',
                username: result.username,
                currentPhno: phno,
                token
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'Invalid Credentials'
            }
        }
    })

}

// all-products 
const allPets = ()=>{
    return db.Pet.find().then(
        (result)=>{
    if(result){
    return{
        statusCode:200,
        pets:result
    }
    }
        else{
            return{
                statusCode:404,
                message:"No data is present"
            }
        }
    })
}


// view-pet
const viewPet = (id)=>{
    return db.Pet.findOne({
        id
    }).then((result)=>{

        if(result){
            return{
                statusCode:200,
                pet:result
            }
        }
        else{
            return{
                statusCode:404,
                message:"Pet is not available"
            }
        }
    })
}

// add to wishlist
const addtowishlist = (pet)=>{
    return db.Wishlist.findOne({
        id:pet.id
    }).then(result=>{
        if(result){
            return{
                statusCode:401,
                message:"Already Added to Favouite Pets"
            }
        }
        else{
            let newPet = new db.Wishlist({
                id: pet.id,
                title: pet.title,
                gender: pet.gender,
                price: pet.price,
                description: pet.description,
                size: pet.size,
                height: pet.height,
                image: pet.image,
                weight: pet.weight,
                coat: pet.coat,
                energy: pet.energy,
                activities: pet.activities,
                category: pet.category
            })
            newPet.save()
            return{
                statusCode:200,
                message:"Pet added to your favourite pets list"
            }
        }
    })
}

// get wishlist
const getwishlist =()=>{
    return db.Wishlist.find().then(
        (result)=>{
    if(result){
    return{
        statusCode:200,
        wishlist:result
    }
    }
        else{
            return{
                statusCode:404,
                message:"Favourite Pet List is Empty"
            }
        }
    })
}

// deleteItemWishlist api
const deleteItemWishlist = (id)=>{
    return db.Wishlist.deleteOne({id})
    .then((result)=>{
        if(result){
            // if deletion is successful then get the updated wishlist
            return db.Wishlist.find().then(
                (result)=>{
            if(result){
            return{
                statusCode:200,
                wishlist:result
            }
            }
                else{
                    return{
                        statusCode:404,
                        message:"Favourite Pets List is Empty!"
                    }
                }
            })
        }
        else{
            return{
                statusCode:404,
                message:"Pet not Found"
            }
        }
    })
}




// Rehome registration
const rehome = (uname, email,phno,address,breed,age,gender,photo,rstatus) => {
    // check phno is in mongodb 
    return db.Contact.find().then((result) => {
        console.log(result);
       
       
        // add new registeration
            const newContact = new db.Contact({
                username:uname,
  email:email,
  phno:phno,
  address:address,
  breed:breed,
  age:age,
  gender:gender,
  photo:photo,
  rstatus:rstatus
            })
            newContact.save()
            return {
                statusCode: 200,
                message: 'Request Submitted successfully'
        }
    })
}


// deleteItem pets api
const deletepet = (id)=>{
    return db.Pet.deleteOne({id})
    .then((result)=>{
        if(result){
            // if deletion is successful then get the updated wishlist
            return db.Pet.find().then(
                (result)=>{
            if(result){
            return{
                statusCode:200,
                petlist:result
            }
            }
                else{
                    return{
                        statusCode:404,
                        message:"Pets List is Empty!"
                    }
                }
            })
        }
        else{
            return{
                statusCode:404,
                message:"Pet not Found"
            }
        }
    })
}


// Rehome registration
const savepet = (
    id,
    title,
    gender,
    price,
    description,
    size,
    height,
    image,
    weight,
    coat,
    energy,
    activities,
    category) => {
    // check id is in mongodb 
    return db.Pet.findOne({
        id
    }).then((result) => {
        console.log(result);
        if (result) {
            // if id already exists
            return {
                statusCode: 401,
                message: 'Already added'
            }
        }
        else {
            // add new registeration
            const newPet = new db.Pet({
                id:id,
    title:title,
    gender:gender,
    price:price,
    description:description,
    size:size,
    height:height,
    image:image,
    weight:weight,
    coat:coat,
    energy:energy,
    activities:activities,
    category:category 
            })
            newPet.save()
            return {
                statusCode: 200,
                message: 'Pet Added successfully'
            }
        }
    })
}


// get user applications
const getuserapps =()=>{
    return db.Contact.find().then(
        (result)=>{
    if(result){
    return{
        statusCode:200,
        contact:result
    }
    }
        else{
            return{
                statusCode:404,
                message:"Application List is Empty"
            }
        }
    })
}


// delete user app api
const deleteuserapp = (phno)=>{
    return db.Contact.deleteOne({phno})
    .then((result)=>{
        if(result){
            // if deletion is successful then get the updated wishlist
            return db.Contact.find().then(
                (result)=>{
            if(result){
            return{
                statusCode:200,
                contact:result
            }
            }
                else{
                    return{
                        statusCode:404,
                        message:"Applications List is Empty!"
                    }
                }
            })
        }
        else{
            return{
                statusCode:404,
                message:"Pet not Found"
            }
        }
    })
}

// update status
const updatestatus = (_id,rstatus)=>{
    return db.Contact.updateOne( 
        {_id}, 
        {
            $set:{
                rstatus:rstatus
            }
        }
        )
    .then((result)=>{
        if(result){
            // if updation is successful then get the updated wishlist
            return db.Contact.find().then(
                (result)=>{
            if(result){
            return{
                statusCode:200,
                contact:result
            }
            }
                else{
                    return{
                        statusCode:404,
                        message:"Applications List is Empty!"
                    }
                }
            })
        }
        else{
            return{
                statusCode:404,
                message:"Application not Found"
            }
        }
    })
}




module.exports = {
   login,
   register, 
   allPets,
   viewPet,
   addtowishlist,
   getwishlist,
   deleteItemWishlist,
   rehome,
   deletepet,
   savepet,
   getuserapps,
   deleteuserapp,
   updatestatus
   
   
}