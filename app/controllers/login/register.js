function close() {
    Alloy.Globals.navcontroller.close();
}

function onRegisterClick() {
    if ($.password.textField.value == $.repassword.textField.value) {
        var params = {
            'first_name': $.first_name.textField.value,
            'last_name': $.last_name.textField.value,
            'email': $.email.textField.value,
            'password': $.password.textField.value
        };

        callXhr("/users", params);

    } else {
        Alloy.Globals.error($.win, 'As senhas não coincidem.');
    }
}

function callXhr(url, params) {
    Alloy.Globals.callXhr(Alloy.Globals.baseApiUrl + url, params, "POST", $.win, function (e) {
        Ti.API.info(e.responseJSON.user_id);

        data = {
            "id": e.responseJSON.id,
            "token": e.responseToken
        };

        var user = Alloy.createModel('user', data);
        user.save();

        Ti.API.info(user.id);
        Alloy.Globals.User = user;
        var win = Alloy.createController('feed/index').getView();
        Alloy.Globals.navcontroller.open(win);

    });
}

function onFacebookLoginClick() {
    var win = Alloy.createController('feed/index').getView();
    Alloy.Globals.navcontroller.open(win);
}
