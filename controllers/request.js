const {Request,User,Performance,Feedback} = require("../models")

// create request 
module.exports.create = async function (req, res) {
  try {
    if(res.locals.user.id === req.body.requestBy){
      let user = await User.findById(req.body.requestBy);
      if(!user.isRequested){
        const request = await Request.create(req.body);
        user.isRequested = request.id;
        await user.save();
      }else{
        console.log("you already reaquested my dear");
      }
    }else{
      console.log("not same users")
    }
    return res.redirect('/')
  } catch (error) {
    console.log(error);
    return res.redirect('back')
  }
};

// delete request 
module.exports.delete = async function (req, res) {
  try {
    if(res.locals.user.id === req.body.requestBy || res.locals.user.userType==='admin'){
      let request = await Request.findById(req.params.id);
      let user = await User.findByIdAndUpdate(request.requestBy.toString(),{isRequested:null});
      await request.remove();
    }else{
      console.log("not same users")
    }
    return res.redirect('back');
  } catch (error) {
    console.log(error);
    return res.redirect('back')
  }
    
};