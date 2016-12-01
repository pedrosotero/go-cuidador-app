var args = arguments[0] || {};

Alloy.Models.caregiver.set(args);
Alloy.Models.caregiver.fetch();

function setTitleActionBar() {
    var actionBar = $.win.activity.actionBar;
    if (actionBar) {
        actionBar.title = Alloy.Models.caregiver.get('first_name') + ' ' + Alloy.Models.caregiver.get('last_name');
    }
}

function close() {
    Alloy.Globals.navcontroller.close();
}

function onRateClick() {
    $.transparentView.show();
}

function onCloseButtonClick() {
    $.transparentView.hide();
}

function onCallClick() {
    Ti.Platform.openURL('tel:' + Alloy.Models.caregiver.get('phone'));
}

function onSubmitClick() {
    var params = {
        rate: rate,
        caregiver_id: Alloy.Models.caregiver.get('id'),
        client_id: Alloy.Globals.User.id,
        description: $.textField.value
    };


    Ti.API.info('>>>> tretou');
    Ti.API.info(rate);
    Ti.API.info(Alloy.Models.caregiver.get('id'));
    Ti.API.info(Alloy.Globals.User.id);
    Ti.API.info($.textField.value);

    Alloy.Globals.callXhr(Alloy.Globals.baseApiUrl + '/rate', params, "POST", $.win, function (e) {
        Ti.API.info(e.responseText);
        $.transparentView.hide();
    });
}
function onMailClick() {
    var emailDialog = Titanium.UI.createEmailDialog();
    emailDialog.subject = "CuidadorGO! App";
    emailDialog.toRecipients = Alloy.Models.caregiver.get('email');
    emailDialog.messageBody = 'Olá !';

    emailDialog.open();
}

var rate = 1;

function report(e) {
    Ti.API.info('User selected: ' + e.row.title);
    rate = e.row.title;
}
