var lexGenerator = {};

lexGenerator.controls = function(preferenceSchema, controlAreasQuerySelector) {

    console.log("lexGenerator.controls");

    // parse the preference schema
    var preferenceKeys = Object.keys(preferenceSchema.preferences);
    preferenceKeys.forEach(function (preferenceKey) {
        var preference = preferenceSchema.preferences[preferenceKey];

        var controlsArea = document.querySelector(controlAreasQuerySelector);

        var controlElement = document.createElement("div");

        var labelElement = document.createElement("label");
        labelElement.innerHTML = preference.name;

        var inputElement = document.createElement("input");

        inputElement.classList.add(preferenceSchema.class);

        inputElement.name = preferenceKey;

        labelElement.appendChild(inputElement);
        controlElement.appendChild(labelElement);

        controlsArea.appendChild(controlElement);
    });

    lexGenerator.events(preferenceSchema);
};

lexGenerator.events = function (preferenceSchema) {
    var inputElements = document.querySelectorAll("." + preferenceSchema.class);
    for(var i=0; i < inputElements.length; i++) {
        inputElements[i].onchange = function (event) {
            var target = event.target;
            var name = target.name,
                value = target.value;
            // User feedback
            console.log("Preference change", name, value);
            preferenceStore[preferenceSchema.class][target.name].value = target.value;
            // TODO: this is bad
            cssEnactor.enact(preferenceStore, "preview");
            console.log(preferenceStore);
        };
    }
};

lexGenerator.preferenceStoreInit = function (preferenceSchema) {
    preferenceStore[preferenceSchema.class] = preferenceStore[preferenceSchema.class] ? preferenceStore[preferenceSchema.class] : {};

    var preferenceKeys = Object.keys(preferenceSchema.preferences);
    preferenceKeys.forEach(function (preferenceKey) {
        var preference = preferenceSchema.preferences[preferenceKey];
        preferenceStore[preferenceSchema.class][preferenceKey] = {
            name: preference.name,
            value: preference.value
        };
    });
    console.log(preferenceStore);
};
