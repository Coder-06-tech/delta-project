const Listing=require("../models/listing.js")

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","The Listing you are trying to access does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}

module.exports.createListing=async (req,res,next)=>{ 
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename},
    await newlisting.save();
    req.flash("success","New Listing added")
    res.redirect("/listings");
      // let {title,description,image,price,location,country}=req.body;  
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","The Listing you are trying to access does not exist");
        return res.redirect("/listings");
    }
    let orgImg=listing.image.url;
    orgImg=orgImg.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs",{listing,orgImg });
}

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted")    
    res.redirect("/listings")
}