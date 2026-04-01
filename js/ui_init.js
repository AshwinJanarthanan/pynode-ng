document.getElementById("run").style.backgroundColor = "#6E6E6E";
document.getElementById("stop").style.backgroundColor = "#6E6E6E";
document.getElementById("restart").style.backgroundColor = "#6E6E6E";
document.getElementById("run").style.cursor = "pointer";
document.getElementById("stop").style.cursor = "pointer";
document.getElementById("restart").style.cursor = "pointer";
writeOutput("<p class='console-code' style='color:green;'>Done!</p>", true);

document.getElementById("layout1").onclick = function () {
    if (document.getElementById("layout1On").style.display === "none") {
        document.getElementById("layout1On").style.display = "inherit";
        document.getElementById("layout1Off").style.display = "none";
        document.getElementById("layout2On").style.display = "none";
        document.getElementById("layout2Off").style.display = "inherit";
        set_layout_type()
    }
};
document.getElementById("layout2").onclick = function () {
    if (document.getElementById("layout2On").style.display === "none") {
        document.getElementById("layout2On").style.display = "inherit";
        document.getElementById("layout2Off").style.display = "none";
        document.getElementById("layout1On").style.display = "none";
        document.getElementById("layout1Off").style.display = "inherit";
        set_layout_type()
    }
};
