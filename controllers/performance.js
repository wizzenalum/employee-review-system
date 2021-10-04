const {Request,User,Performance,Feedback} = require("../models")


// create performance 
module.exports.create = async function (req, res) {
  console.log(req.body,req.body.reviewFor);
  if(req.body.reviewBy===res.locals.user.id){
    const user = await User.findById(req.body.reviewFor);
    if(user){
      const performance = await Performance.create(req.body);
      user.performanceList.push(performance.id);
      await user.save();
    }
    else{
      console.log("user not found")
      return res.redirect('back');
    }
    return res.redirect('back');
  }
  return res.end("your are not autherized");

};

//update performance 
module.exports.update = async function (req, res) {
  try {
    if(req.body.reviewBy===res.locals.user.id){
      await Performance.findByIdAndUpdate(req.params.id,req.body);
    }else{
      console.log('you are not same user');
    }
    return res.redirect('back');
  } catch (error) {
    console.log(error);
    return res.redirect('back')
  }
};


// delete performance 
module.exports.delete = async function (req, res) {
  try {
    let performance = await Performance.findById(req.params.id);
    await Feedback.deleteMany({feedbackBy:performance.feedback});
    await performance.remove();
    return res.redirect('back');
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  }
};