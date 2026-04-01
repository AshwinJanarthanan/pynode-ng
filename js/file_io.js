function userLoadCode(event) {
    var files = event.target.files;
    var file = null;
    if (files.length > 0) file = files[0];
    else return;
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {
            setCode(e.target.result);
        };
    })(file);
    reader.readAsText(file);
}

function userSaveCode() {
    var text = getCode();
    var blob = new Blob([text], {type: "text/plain;charset=utf-8;"});
    saveAs(blob, "project.pynode");
}

document.getElementById('file-input').addEventListener('change', userLoadCode, false);
