function close() {
    Alloy.Globals.navcontroller.close();
}

function onSubmitClick() {
    if ($.password.textField.value == $.repassword.textField.value) {
        var params = {
            'password': $.password.textField.value
        };

        callXhr("/change_password/" + Alloy.Globals.User.id, params);

    } else {
        Alloy.Globals.error($.win, 'As senhas não coincidem.');
    }
}

function callXhr(url, params) {
    Alloy.Globals.callXhr(Alloy.Globals.baseApiUrl + url, params, "POST", $.win, function (e) {
        Ti.API.info(e.responseText);
        Alloy.Globals.navcontroller.close();
    });
}

