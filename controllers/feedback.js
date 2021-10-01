const {Request,User,Performance,Feedback} = require("../models")

// create feedback 
module.exports.create = async function (req, res) {
  try {
    if(res.locals.user.id === req.body.feedbackBy){
      const feedback = await Feedback.create(req.body)
      await Performance.findByIdAndUpdate(req.body.feedbackFor,{$push:{"feedback":feedback.id}});
      return res.redirect('back');
    }else{
      console.log("you are not same user ")
      return res.redirect('/')
    }
    
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  }  
  
};

//update feedback 
module.exports.update = async function (req, res) {
  try {
    if(res.locals.user.id === req.body.feedbackBy){
      await Feedback.findByIdAndUpdate(req.params.id,req.body)
      return res.redirect('back');
    }else{
      console.log("you are not same user ")
      return res.redirect('/')
    }
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  } 
};


// delete feedback 
module.exports.delete = async function (req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if(res.locals.user.id === feedback.feedbackBy.toString()){
      await Performance.findByIdAndUpdate(feedback.feedbackFor,{$pull:{"feedback":feedback.id}});
      return res.redirect('back');
    }else{
      console.log("you are not same user ")
      return res.redirect('/')
    }
    
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  } 
};