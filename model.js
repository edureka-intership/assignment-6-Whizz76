const mongoose= require("mongoose");

const RestaurantSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city_name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    thumb:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:[{
        mealtype:Number,
        name: String
    }],
    Cuisine:[{
        cuisine:Number,
        name:String

    }]
});
module.exports=mongoose.model('restaurants',RestaurantSchema);
