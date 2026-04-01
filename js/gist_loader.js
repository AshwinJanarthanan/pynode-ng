var read_storage = true;
var project_src;

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("project")) {
    project_name = pair[1];
    read_storage = false;
    var client = new XMLHttpRequest();
    client.open("GET", "pynode_projects/" + project_name + ".py");
    client.onreadystatechange = function () {
        if (client.readyState == 4) {
            project_src = client.responseText;
            if (editor_exists) {
                editor.setValue(project_src, -1);
            }
        }
        else {
            read_storage = true;
            if (editor_exists) {
                loadCode()
            }
        }
    };
    client.send();
} else if (searchParams.get("gist")) {

    read_storage = false;

    const gist_slug = searchParams.get("gist");

    console.log("Gist parameter found, value: " + gist_slug);

    if (gist_slug.includes("-") && gist_slug.split("-")[1].length === 32) {

        console.log("Gist slug seems to be valid, fetching...");

        fetch(`https://gist.githubusercontent.com/${gist_slug.replace("-", "/")}/raw`).then(r => {

            console.log("Response status: " + r.status);

            if (r.status == 200) {
                return r.text()
            } else {
                read_storage = true;
                if (editor_exists) {
                    loadCode("# Couldn't load gist  (http != 200).\n# Please try again later.\n\n")
                }
                return null;
            }

        }).then(t => {
            if (t) {

                console.log("Gist content fetched, setting code...");

                editor_text = `# Content loaded from Github gist on ${new Date().toLocaleString()}\n# https://gist.github.com/${gist_slug.replace("-", "/")}\n\n${t}`;

                console.log(editor_text);

                if (editor_exists) {
                    editor.setValue(editor_text, -1);
                    saveCode();
                } else {

                    console.log("The editor hasn't loaded yet. Retrying every second.");

                    window.loadInGistInterval = setInterval(() => {
                        if (editor_exists) {
                            console.log("The editor loaded, setting code...");
                            editor.setValue(editor_text, -1);
                            saveCode();
                            clearInterval(window.loadInGistInterval);
                        } else {
                            console.log("The editor hasn't loaded yet.");
                        }
                    }, 100);

                }
            }
        }).catch(e => {

            read_storage = true;
            if (editor_exists) {
                loadCode("# Couldn't load gist (fetch error).\n# Please try again later.\n\n")
            }

        });

    } else {
        read_storage = true;
        if (editor_exists) {
            loadCode("# Couldn't load gist (invalid gist slug).\n# Please try again later.\n\n")
        }
    }

}

function loadGistFromUrl() {
    const url = document.getElementById("gisturl").value;
    const slug = url.replace("https://gist.github.com/", "").replace("/", "-");
    const newUrl = `${location.href.replace(window.location.search,"")}?gist=${slug}`;
    window.location.href = newUrl;
}
