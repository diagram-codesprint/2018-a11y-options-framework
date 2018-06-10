var persistence = {};

persistence.controlIds = {
    filename: "persistence-filename",
    save: "persistence-save",
    load: "persistence-load"
};

persistence.controlMarkup =
`
<fieldset>
    <legend>
        Persistence
    </legend>
    <label for="${persistence.controlIds.filename}">File Name</label>
    <input id="${persistence.controlIds.filename}" name="fileName" />
    <button id="${persistence.controlIds.save}" name="save">Save</button>
    <button id="${persistence.controlIds.load}" name="load">Load</button>
</fieldset>
`;

persistence.appendControlMarkup = function (controlAreaSelector) {
    var controlArea = document.querySelector(controlAreaSelector);
    controlArea.innerHTML = persistence.controlMarkup;
    persistence.bindControls();
};

persistence.bindControls = function () {
    var saveButton = document.querySelector("#" + persistence.controlIds.save);
    var loadButton = document.querySelector("#" + persistence.controlIds.load);

    saveButton.onclick = persistence.save;
    loadButton.onclick = persistence.load;
};

persistence.save = function () {
    console.log("persistence.save");
    var req = new XMLHttpRequest();
    req.open("POST", "/preferences");
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    var filename = document.querySelector("#" + persistence.controlIds.filename).value;

    var saveDetails = {
        filename: filename,
        preferences: preferenceStore
    };

    var saveDetailsAsJSON = JSON.stringify(saveDetails);

    console.log("saveDetails as JSON", saveDetailsAsJSON);

    req.addEventListener("load", function (evt) {
        console.log("save call completed", evt);
    });

    req.addEventListener("error", function (evt) {
        console.log("load call error", evt);
    });

    req.send(saveDetailsAsJSON);
};

persistence.load = function () {
    console.log("persistence.load");
    var req = new XMLHttpRequest();
    req.open("GET", "/preferences");

    req.addEventListener("load", function (evt) {
        console.log("load call completed", evt);
    });

    req.addEventListener("error", function (evt) {
        console.log("load call error", evt);
    });

    var filename = document.querySelector("#" + persistence.controlIds.filename).value;

    var loadDetails = {
        filename: filename
    };

    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    req.send(JSON.stringify(loadDetails));
};
