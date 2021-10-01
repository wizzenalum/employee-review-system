{
//  for view home and signup-list following code will hide and unhide the 4 forms
    // visibility of the form is managed here.
    const signinForm = $("#signin-form");
    const asEmployeeBtn = $("#signin-employee-btn");
    const asAdminBtn = $("#signin-admin-btn");
    const activeColor = "rgb(35, 240, 144)"
    const deadColor = "black"
        // initializing the visibility hidden
    asEmployeeBtn.css("color",activeColor);
    asAdminBtn.css("color",deadColor);
    signinForm.attr('action','/user/session/create/false')



    // 1. for signin creation form
    asEmployeeBtn.click(()=>{
        asEmployeeBtn.css("color",activeColor);
        asAdminBtn.css("color",deadColor)
        signinForm.attr('action','/user/session/create/false')
    
    })

    // 2. for signup creation form
    asAdminBtn.click(()=>{
        asEmployeeBtn.css("color",deadColor)
        asAdminBtn.css("color",activeColor);
        signinForm.attr('action','/user/session/create/true')
    })
    // here i will set the default value to the html input tags    
}