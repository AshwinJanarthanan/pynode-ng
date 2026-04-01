function writeOutput(data, append) {
    if (append) document.getElementById("console").innerHTML += data;
    else document.getElementById("console").innerHTML = data;
    if (pynode_output === undefined && pynode_console !== undefined) pynode_console.writeOutput(data, append);
}
