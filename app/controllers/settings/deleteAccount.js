function close() {
    Alloy.Globals.navcontroller.close();
}

function onDeleteClick() {
    var params = {
        'password': $.password.textField.value
    };

    callXhr("/delete_account/" + Alloy.Globals.User.id, params);
}

function callXhr(url, params) {
    Alloy.Globals.callXhr(Alloy.Globals.baseApiUrl + url, params, "POST", $.win, function (e) {
        Ti.API.info(e.responseText);

        var user = Alloy.createCollection('user');
        user.deleteAll();

        Alloy.Globals.navcontroller.close(3);
    });
}