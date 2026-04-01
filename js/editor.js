resize();
ace.require("ace/ext/language_tools");
var editor = ace.edit("editor", {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  mode: "ace/mode/python"
});
editor.$blockScrolling = Infinity;
editor_exists = true;

editor.setTheme("ace/theme/tomorrow_night");

function getCode() {
    return editor.getValue();
}

function setCode(src) {
    if (enable_editor) {
        editor.setValue(src, -1);
    }
}

function saveCode() {
    localStorage.setItem("code", getCode())
}

function loadCode(prefix) {
    src = localStorage.getItem("code");
    if (src === null || src == "") {
        openCode("dijkstra", prefix);
    }

    if (prefix) {
        src = prefix + src;
    }

    else {
        editor.setValue(src, -1);
    }
}

var vimEnabled = false;
var vimLoaded  = false;

function toggleVimMode() {
    vimEnabled = !vimEnabled;
    var btn = document.getElementById('vimToggleBtn');
  

    if (vimEnabled) {
        editor.setKeyboardHandler('ace/keyboard/vim');
        if (!vimLoaded) {
          ace.config.loadModule('ace/keyboard/vim', function(module) {
              var VimApi = module.CodeMirror.Vim
              VimApi.defineEx("write", "w", function(cm, input) {
                  document.getElementById("runPlay").click()
              })
              module.CodeMirror.Vim.map('jk', '<Esc>', 'insert');
              vimLoaded = true;
          });
        }
        btn.style.opacity = '1';
        btn.title = 'Vim mode ON';
    } else {
        editor.setKeyboardHandler(null);
        btn.style.opacity = '0.4';
        btn.title = 'Vim mode OFF';
    }
}

function openCode(name, prefix) {
    var client = new XMLHttpRequest();
    client.open("GET", "pynode_projects/" + name + ".py");
    client.onreadystatechange = function () {
        if (client.readyState == 4) {
            if (editor_exists) {
                editor.setValue((prefix || "") + client.responseText, -1);
                saveCode();
            }
        }
    };
    client.send();
}

if (read_storage) {
    loadCode();
}

if (project_src !== undefined) {
    editor.setValue(project_src, -1);
}
var PythonMode = ace.require("ace/mode/python").Mode;
editor.session.setMode(new PythonMode());
ace.require("ace/ext/language_tools");
editor.setOptions({
    fontSize: "11pt",
    enableBasicAutocompletion: true
});

editor.on("change", function () {
    if (pynode_editor !== undefined) {
        enable_editor = false;
        if (pynode_editor.enable_editor) pynode_editor.setCode(editor.getValue());
        enable_editor = true;
    }
});

document.getElementById("editorBox").style.visibility = "visible";
