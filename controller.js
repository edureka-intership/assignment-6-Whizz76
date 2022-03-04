const restaurants= require('./model.js');
async function filterRestaurant(req,res){
    let{mealtype,cuisine,location,lcost,hcost,page,sort}=req.body;
    page=page?page:1;
    sort=sort?sort:1;
    let pay={};
    const itpp=2;
    let st=itpp*page-itpp;
    let en=itpp*page;
   /* console.log(mealtype);
    restaurants.find({locality:location}).then(result=>console.log(result)).catch(err=>console.log(err));
   // let pay={};
    
    if(!mealtype){
        mealtype=1;
    }
    if(!cuisine){
        cuisine=[1,2,3,4,5];
    }
    if(!location){
        location="Delhi";
    }
    if(!lcost){
        lcost=0;
    }
    if(!hcost){
        restaurants.find({locality:{$in:location},cost:{
            $gte:lcost
        },"type.mealtype":mealtype,"Cuisine.cuisine":{$in:cuisine}}).sort({cost:sort}).then((result)=>{
            let filterResponse=result;
            console.log(filterResponse);
            //res.status(200).json(filterResponse);
        }).catch((err)=>{
            console.log(err);
        })
    }
    else{
        restaurants.find({locality:location,cost:{
            $gte:lcost,
            $lte:hcost
        },"type.mealtype":mealtype,"Cuisine.cuisine":{$in:cuisine}}).sort({cost:sort}).then((result)=>{
            let filterResponse=result.slice(st,en);
            console.log(filterResponse);
            //res.status(200).json(filterResponse);
        }).catch((err)=>{
            console.log(err);
        })

    }*/
    

    if(mealtype){
        pay["type.mealtype"]=mealtype;
    }
    if(mealtype && location){
        pay["type.mealtype"]=mealtype;
        pay['locality']=location;
    }
    if(mealtype && cuisine){
        pay['type.mealtype']=mealtype;
        pay['Cuisine.cuisine']={$in:cuisine};
        //pay['Cuisine.cuisine']=cuisine;
    }
    if(mealtype && lcost && hcost){
        pay['type.mealtype']=mealtype;
        pay['cost']={$lte:hcost,$gte:lcost};
    }
    if(mealtype && location && cuisine){
        pay["type.mealtype"]=mealtype;
        pay['locality']=location;
        pay['Cuisine.cuisine']={$in:cuisine};
        //pay['Cuisine.cuisine']=cuisine;
    }
    if(mealtype && location && lcost && hcost){
        pay["type.mealtype"]=mealtype;
        pay['locality']=location;
        //pay['Cuisine.cuisine']={$in:cuisine};
        pay['cost']={$lte:hcost,$gte:lcost};
    }
    if(lcost==0){
        if(mealtype && cuisine && hcost){
            pay["type.mealtype"]=mealtype;
            //pay['locality']=location;
            pay['Cuisine.cuisine']={ $in: cuisine};
            //pay['Cuisine.cuisine']=cuisine;
            pay['cost']={ $lte: hcost, $gte: lcost};
        }
    }
    else{
        if(mealtype && cuisine && lcost && hcost){
            pay["type.mealtype"]=mealtype;
            //pay['locality']=location;
            pay['Cuisine.cuisine']={ $in: cuisine};
            //pay['Cuisine.cuisine']=cuisine;
            pay['cost']={ $lte: hcost, $gte: lcost};
        } 
    }
   
    if(mealtype && location && cuisine && lcost && hcost){
        pay["type.mealtype"]=mealtype;
        pay['locality']=location;
        pay['Cuisine.cuisine']={$in:cuisine};
        //pay['Cuisine.cuisine']=cuisine;
        pay['cost']={$lte:hcost,$gte:lcost};
    }
    console.log(pay);
    restaurants.find(pay).sort({cost:sort})
    .then(response=>{
        const filterResponse=response.slice(st,en);
        console.log(filterResponse);
        res.status(200).json({
            message:"Restaurant fetched successfully",
            restaurants:filterResponse
        })
    }).catch(err=>{
        res.status(500).send({error:err});
        console.log(err);
    })

}
function add(){
    for(let i=0;i<10;i++){
        restaurants.create(data[0]);
    }
    console.log(restaurants);
}
module.exports={filterRestaurant,add};
