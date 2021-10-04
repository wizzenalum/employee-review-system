const {Request,User, Feedback,Performance} = require("../models");
const { populate } = require("../models/User");

// show the signin or signup page which willbe decided by the client side js.
module.exports.home = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/employee');
  }
  let context = { title: "login or signup page" };
  return res.render("home", context);

};


module.exports.admin = async function (req, res) {
  try {
    let revieweeList = [];
    let loginUser = res.locals.user;
    if(loginUser.userType==='admin'){
      revieweeList = await User.find({});
    }else{
      revieweeList = await(User.find(loginUser.listToReview))
    }
    let context = {
      title:"admin dashboard",
      revieweeList
    }
    return res.render("admin-dashboard", context);
  } catch (error) {
    return res.redirect('/')
  }
  
};
// admin can edit empolyee data and can also review it self
module.exports.employeeForAdmin = async function (req, res) {
  try {
    let revieweeList = [];
    let loginUser = res.locals.user;
    console.log(loginUser.listToReview)
    const userReadUpdate = await User.findById(req.params.id)
        .populate({
            path:'performanceList',
            populate:[
              {path:"feedback"},
              {path:"reviewBy"}
            ]
        });
    if(loginUser.userType==='admin'){
      revieweeList = await User.find({});
    }else{
      let list = [];
      for(let r of loginUser.listToReview){
        list.push(r.toString());
        console.log(r.toString());
      }
      // let list =  loginUser.listToReview.map((i,v)=>listToReview[v].toString())
      revieweeList = await(User.find({_id: {$in: list}}));
    }

    let context = {
      title:"admin dashboard",
      userReadUpdate,
      revieweeList,
    }
    return res.render("admin-dashboard", context);
  } catch (error) {
    console.log(error)
    return res.redirect('/')
  }
};

// employee can see performance reviews by athorised users and can give feed back
module.exports.employee = async function (req, res) {
  try {
    let revieweeList = [];
    const loginUser = res.locals.user;
    if(loginUser.userType==='employee'){
      revieweeList = await User.find({_id:loginUser.listToReview});
    }
    const userReadUpdate = await User.findById(res.locals.user.id)
        .populate({
            path:'performanceList',
            populate:[
              {path:"feedback"},
              {path:"reviewBy"}
            ]
        });
    let context = {
      title:"employee dashboard",
      revieweeList,
      userReadUpdate
    }
    return res.render("employee-dashboard", context);
  } catch (error) {
    console.log(error)
    return res.redirect('/user/session/destroy');
  }
  
  
};
