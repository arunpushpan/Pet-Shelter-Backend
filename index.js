


const express = require('express')
const cors = require('cors')
const dataService = require('./services/dataservice')
// import jsonwebtoken
const jwt = require('jsonwebtoken')

const server = express()
server.use(cors({
    origin:'http://localhost:4200'
}))

server.use(express.json())

server.listen(3000,()=>{
    console.log('Pet server is listening at port number 3000');
})




// token verify middleware
const jwtMiddleware = (req,res,next)=>{
    console.log('Inside router specific middleware');
    // get token from request headers
    const token = req.headers['access-token']
    try{
        // verify the token
    const data = jwt.verify(token,'supersecretkey123')
    console.log('data');
    req.fromPhno = data.currentPhno
    console.log('valid Token');
    next()
    }
    catch{
        console.log('invalid token');
        res.status(401).json({
            message:'please login!'
        })
    }
}

// register api call
server.post('/register', (req, res) => {
    console.log('Inside register function');
    console.log(req.body);
    // asynchronous
    dataService.register(req.body.uname, req.body.phno, req.body.pswd, req.body.address)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})



    // rehome api call
    server.post('/rehome', (req, res) => {
        console.log('Inside rehome function');
        console.log(req.body);
        // asynchronous
        dataService.rehome(req.body.uname, req.body.email, req.body.phno,  req.body.address, req.body.breed, req.body.age, req.body.gender, req.body.photo, req.body.rstatus)
            .then((result) => {
                res.status(result.statusCode).json(result)
            })
    })
    

// login
server.post('/login', (req, res) => {
    console.log('Inside login function');
    console.log(req.body);
    // asynchronous
    dataService.login(req.body.phno, req.body.pswd)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})




// all-pet api
server.get('/all-pets',(req,res)=>{
    dataService.allPets()
        .then((result)=>{
            res.status(result.statusCode).json(result)
        })
    })

    // view-pets api
server.get('/view-pets/:petId',jwtMiddleware,(req,res)=>{
    dataService.viewPet(req.params.petId)
            .then((result)=>{
                res.status(result.statusCode).json(result)
            })
        }) 

    // addtowishlist  api
    server.post('/add-to-wishlist',(req,res)=>{
        dataService.addtowishlist(req.body)
                .then((result)=>{
                    res.status(result.statusCode).json(result)
                })
            }) 

// get wishlist api
server.get('/get-wishlist',jwtMiddleware,(req,res)=>{
    dataService.getwishlist()
        .then((result)=>{
            res.status(result.statusCode).json(result)
        })
    })
 // remove-item- wishlist api
server.delete('/remove-item-wishlist/:petId',(req,res)=>{
    dataService.deleteItemWishlist(req.params.petId)
        .then((result)=>{
            res.status(result.statusCode).json(result)
        })
    })   

 // remove-item- pet api
server.delete('/remove-item-pet/:petId',(req,res)=>{
    dataService.deletepet(req.params.petId)
        .then((result)=>{
            res.status(result.statusCode).json(result)
        })
    })   
    
  // savepet api call
  server.post('/savepet', (req, res) => {
    console.log('Inside savepet function');
    console.log(req.body);
    // asynchronous
    dataService.savepet(
        req.body.id,
        req.body.title,
        req.body.gender,
        req.body.price,
        req.body.description,
        req.body.size,
        req.body.height,
        req.body.image,
        req.body.weight,
        req.body.coat,
        req.body.energy,
        req.body.activities,
        req.body.category
        )
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// get user applications api
server.get('/getuserapps',(req,res)=>{
    dataService.getuserapps()
        .then((result)=>{
            res.status(result.statusCode).json(result)
        })
    })

    // remove-item- user app api
server.delete('/removeuserapp/:phno',(req,res)=>{
    dataService.deleteuserapp(req.params.phno)
        .then((result)=>{
            res.status(result.statusCode).json(result)
        })
    })   

    // update user app api
  server.put('/updatestatus/:_id',(req,res)=>{
    dataService.updatestatus(req.params._id,req.body.rstatus)
    .then((result)=>{
        res.status(result.statusCode).json(result)   
    })
  })  

  