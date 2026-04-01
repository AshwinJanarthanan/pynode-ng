function outputPopup(w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    if (pynode_output !== undefined) {
        pynode_output.close()
    }
    pynode_output = window.open("pynode_output.html", "PyNode Output", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,width=" + w + ",height=" + h + ",left=" + left + ",top=" + top);
    pynode_output.onbeforeunload = function () {
        pynode_output = undefined;
    };
    if (window.focus) {
        pynode_output.focus()
    }
    return false;
}

function editorPopup(w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    if (pynode_editor !== undefined) {
        pynode_editor.close()
    }
    pynode_editor = window.open("pynode_editor.html", "PyNode Editor", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,width=" + w + ",height=" + h + ",left=" + left + ",top=" + top);
    pynode_editor.onbeforeunload = function () {
        pynode_editor = undefined;
    };
    if (window.focus) {
        pynode_editor.focus()
    }
    return false;
}

function consolePopup(w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    if (pynode_console !== undefined) {
        pynode_console.close()
    }
    pynode_console = window.open("pynode_console.html", "PyNode Console", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,width=" + w + ",height=" + h + ",left=" + left + ",top=" + top);
    pynode_console.onbeforeunload = function () {
        pynode_console = undefined;
    };
    if (window.focus) {
        pynode_console.focus()
    }
    return false;
}

window.onbeforeunload = function () {
    if (pynode_output !== undefined) {
        pynode_output.close();
    }
    if (pynode_editor !== undefined) {
        pynode_editor.close();
    }
    if (pynode_console !== undefined) {
        pynode_console.close();
    }
    if (editor_exists) {
        saveCode();
    }
}
