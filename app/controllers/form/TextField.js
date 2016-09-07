var args = arguments[0] || {};

var hintText = args.hintText || "";

var type = args.type || "";

$.hintText.setText(hintText);

if (args.tipo == "password") {
    $.textField.passwordMask = true;
}

function onTextAreaFocus() {
    $.hintText.opacity = 0.3;
}
console.log($.textField.value);

function onTextAreaChange() {
    console.log($.textField.value);
    $.hintText.visible = false;

    $.trigger('notify', {
        textField: $.textField.value
    });

    if ($.textField.value == "") {
        $.hintText.visible = true;
    } else {
        $.hintText.visible = false;
    }
}

function onHintTextClick() {
    onTextAreaFocus();
    $.textField.focus();
}

