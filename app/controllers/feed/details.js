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
    Ti.Platform.openURL('tel:' + "021986436361");
}

function onMailClick() {
    var emailDialog = Titanium.UI.createEmailDialog();
    emailDialog.subject = "CuidadorGO! App";
    emailDialog.toRecipients = "pedrosoteroth@gmail.com.br";
    emailDialog.messageBody = 'Olá !';

    emailDialog.open();
}