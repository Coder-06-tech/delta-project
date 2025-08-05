const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}

const initDB =async()=>{
   await Listing.deleteMany({});
   const listings=initData.data.map((obj)=>({...obj,owner:'6887c203b348da0ad69f2866'}))
   await Listing.insertMany(listings);
   console.log("data was intialized");
}

initDB();