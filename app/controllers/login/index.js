function onLoginClick() {
    // var params = {
    //     data: {
    //         'email': $.email.textField.value,
    //         'password': $.password.textField.value
    //     }
    // };

    var win = Alloy.createController('feed/index').getView();
    Alloy.Globals.navcontroller.open(win);
}

function onFacebookLoginClick() {
    var win = Alloy.createController('feed/index').getView();
    Alloy.Globals.navcontroller.open(win);
}


function onRegisterClick() {
    var win = Alloy.createController('login/register').getView();
    Alloy.Globals.navcontroller.open(win);
}
