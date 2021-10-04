const passport = require("passport");
const {Request,User,Performance,Feedback} = require("../models");
const { param } = require("../routers");

// super user function to create first user
// TODO:secure it
module.exports.superUser = async function(req,res){
  // if there is any user exit in data base that mean we already used the super user
  try {
    let users = await User.find({userType:'admin'});
    if(users.length>0){
      return res.end('<h1>you already used super user</h1>')
    }
    await User.create({
      userType:"admin",
      name:"wizzenalum",
      email:"wizzenalum@wizzenalum",
      password:"wizzenalum",
      confirmPassword:"wizzenalum",
      department:"HR"
    })
    return res.end(`<h3>user credentials</h3> <p>email:  wizzenalum@wizzenalum <br> paasword :  wizzenalum</p> <h2>please delete wizzeanlum as soon as you create new user</h2> </h2> `)
  } catch (error) {
    console.log(error);
    return res.end('<h1>server end error please try again</h1>');
  }
}


// create user 
module.exports.create = function (req, res) {
  User.create(req.body)
  .then(user=>{
    console.log(user);Performance
  return res.redirect('back');

  }).catch(err=>{
    if(err.code === 11000){
      console.log("email already exist");
      return res.redirect("back");
    }
    console.log(err);
    return res.redirect('back');
  })
  
};

//update user name, name,dpartment.
module.exports.update = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    if(req.body.name) user.name = req.body.name;
    if(req.body.email) user.email = req.body.email;
    if(req.body.department) user.department = req.body.department;
    if(req.body['joiningDate']) user.joiningDate = req.body.joiningDate;
    
    // to change the userType.
    if(req.body['userType'] &&
      (req.body['userType']==="employee" ||
       req.body['userType']==="admin")){
      if(req.body['userType']==='admin'){
        await Request.findOneAndRemove({requestBy:user.id});
        user.isRequested = null;
      }
      user['userType'] = req.body['userType'];
    }
    
    
    await user.save();    
    return res.redirect('back');

  } catch (error) {
    console.log(error);
    return res.redirect('back');
    
  }

};


// delete user 
module.exports.delete = async function (req, res) {
  console.log(req.params);
  // deleting the request if it made for admin
  try {
    await Request.findOneAndRemove({requestBy:req.params.id})
    await Feedback.deleteMany({feedbackBy:req.params.id});
    await Performance.deleteMany({reviewBy:req.params.id});
    await User.findByIdAndRemove(req.params.id)
    return res.redirect('/admin');
    
  } catch (err) {
    console.log("error during the deletion",err);
    return res.redirect('back');    
  }
  
   

};

// create session for user 
module.exports.sessionCreate = function (req, res) {
  console.log(typeof req.params.isAdmin);
  if(req.isAuthenticated()){
    if(req.params.isAdmin==="true"){
      return res.redirect('/admin');
    }
    return res.redirect('/employee'); 

  }else{
    return redirect('back');
  }
};
  
  //sessionDestroy for user 
module.exports.sessionDestroy = function (req, res) {
  console.log("session destoring");
  req.logout();
  return res.redirect('/')
};
  
  
  // pushReivews to user
module.exports.pushReivews = async function (req, res) {
  // TODO not checked of verified the logic.
  try {
    console.log(req.params)
    console.log(req.body)
    let reviewedUser = await User.findById(req.params.id)
    if(reviewedUser && req.body.asign){
      if(typeof(req.body.asign)==='string'){
        await User.findByIdAndUpdate(req.body.asign,{$push:{"listToReview":reviewedUser.id}});
        return res.redirect('back');
      }
      for(let reviewer of req.body.asign){
        try {
          await User.findByIdAndUpdate(reviewer,{$push:{"listToReview":reviewedUser.id}});
        } catch (error) {
          console.log(reviewer, "not granted access for review",error);
        }
      }
    }
    return res.redirect('back')
    
  } catch (error) {
    console.log(error);
    return res.redirect('back')
  }
  
};