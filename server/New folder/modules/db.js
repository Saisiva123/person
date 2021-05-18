const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://one_mg_app:one_mg_app@clusterforonemg.a2ass.mongodb.net/one_mg_app?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true},(err)=>
{
    !err?console.log("mongo connected"):console.log(err);
});

const productsData = new mongoose.Schema({},{strict:false});
const navCatSchema = new mongoose.Schema({}, { strict: false });
const itemModel=new mongoose.Schema({ 
    name:{
        type:String,
        required:true
    },
    src:
    {
        type:String,
        required:true
    },
    desc:
    {
        type:String,
        required:true
    },
    rating:
    {
        type:Number,
        required:true
    },
    totRating:
    {
        type:Number,
        required:true
    },
    cost:
    {
        type:Number,
        required:true
    }
})

var productDetails=mongoose.model('productData',productsData,"productsData");
var navCategories= mongoose.model('navigationCategories', navCatSchema,"navigationCategories");
var itemsData=mongoose.model("items",itemModel,"items");
module.exports = {navCategories,itemsData,productDetails};