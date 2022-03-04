const express= require('express');
const app= express();
const uri=require('./path.js');
const url= require('url');
app.use(express.json());
const Restaurants=require('./model.js');
const mongoose=require('mongoose');
const {filterRestaurant,add}=require('./controller.js');
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(client=>{
    //let db=client.db('Restaurants');
    //db.open();
    //let restaurants=db.collection('Restaurants');
    //restaurants.insertMany(data);
    app.listen(3000,()=>{
        console.log("Server and database connected");
    });
}).catch(err=>{
    console.log(err);
})
app.get('/',(req,res)=>{
    Restaurants.find({}).then(result=>res.status(200).json(result)).catch(err=>console.error(err));
})
app.get('/detail/:name',(req,res)=>{
    console.log(typeof(req.params.name));
    Restaurants.find({name:{$regex:req.params.name}}).then(result=>res.json(result)).catch(err=>{
        console.error(err);
    })
    
})
app.get('/home/query',(req,res)=>{
    const queryObject=url.parse(req.url,true).query;
    console.log(queryObject);
    Restaurants.find(queryObject).then(result=>res.json(result)).catch(err=>{
        console.error(err);
    })
})

//app.post('/add',add);
app.post('/filter',filterRestaurant);
app.post('/add',(req,res)=>{
    Restaurants.create(req.body).then(result=>res.status(200).send("Data added")).catch(err=>console.error(err));
})
app.delete('/delete',(req,res)=>{
    Restaurants.deleteMany({}).then(result=>{
        res.status(200).send("Deleted all");
        console.log("Deleted all");
    }).catch(err=>console.error(err))

})