function onLoginClick() {

    var params = {
        data: {
            'email': $.email.textField.value,
            'password': $.password.textField.value
        }
    };

    var win = Alloy.createController('tabs/index').getView();
    win.open();
}

function onFacebookLoginClick() {

}


function onRegisterClick() {

}
