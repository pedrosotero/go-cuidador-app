var user = Alloy.createCollection('user');
user.deleteAll();

function onLoginClick() {
    Ti.API.info($.email.textField.value);
    var params = {
        'email': $.email.textField.value,
        'password': $.password.textField.value
    };

    callXhr('/auth', params);
}

function onFacebookLoginClick() {
    var win = Alloy.createController('feed/index').getView();
    Alloy.Globals.navcontroller.open(win);
}


function onRegisterClick() {
    var win = Alloy.createController('login/register').getView();
    Alloy.Globals.navcontroller.open(win);
}

function callXhr(url, params) {
    Alloy.Globals.callXhr(Alloy.Globals.baseApiUrl + url, params, "POST", $.win, function (e) {
        Ti.API.info('>>> header token ' + e.responseToken);
        Ti.API.info(e.responseText);
        data = {
            "id": e.responseJSON.user_id,
            "token": e.responseToken
        };

        var user = Alloy.createModel('user', data);
        user.save();

        Alloy.Globals.User = user;

        var win = Alloy.createController('feed/index').getView();
        Alloy.Globals.navcontroller.open(win);
    });
}