const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const ReviewController=require("../controllers/reviews.js")


//post 
router.post("/",isLoggedIn,validateReview,wrapAsync(ReviewController.createReview))

//delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.destroyReview))

module.exports=router;
