var lexGenerator = {};

lexGenerator.controls = function(preferenceSchema, controlAreasQuerySelector) {

    console.log("lexGenerator.controls");

    // parse the preference schema
    var preferenceKeys = Object.keys(preferenceSchema.preferences);

    var controlsArea = document.querySelector(controlAreasQuerySelector);

    var controlsGroup = document.createElement("fieldset");
    var controlsGroupLegend = document.createElement("legend");
    controlsGroupLegend.innerHTML = preferenceSchema.name;
    controlsGroup.appendChild(controlsGroupLegend);

    controlsArea.appendChild(controlsGroup);

    preferenceKeys.forEach(function (preferenceKey) {
        var preference = preferenceSchema.preferences[preferenceKey];

        var controlElement = lexGenerator.getControl(preference.name, preference.type, preference.control, preferenceSchema.class, preferenceKey);

        controlsGroup.appendChild(controlElement);
    });

    lexGenerator.events(preferenceSchema);
};

lexGenerator.getControl = function (preferenceName, preferenceType, preferenceControlConfig, schemaKey, preferenceKey) {
    var controlElement = document.createElement("div");

    var labelElement = document.createElement("label");

    labelElement.innerHTML = preferenceName;

    var inputElement = lexGenerator.getInputElement[preferenceType](schemaKey, preferenceKey, preferenceControlConfig);

    labelElement.appendChild(inputElement);
    controlElement.appendChild(labelElement);

    return controlElement;
};

lexGenerator.getInputElement = {};

lexGenerator.getInputElement.numeric = function (schemaKey, preferenceKey, preferenceControlConfig) {
    var inputElement = document.createElement("input");

    inputElement.classList.add(schemaKey);

    inputElement.classList.add(schemaKey + "-" + preferenceKey);

    inputElement.name = preferenceKey;
    inputElement.type = "number";
    inputElement.min = preferenceControlConfig.min;
    inputElement.max = preferenceControlConfig.max;
    inputElement.step = preferenceControlConfig.step;

    return inputElement;
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
            // TODO: this does the entire CSS enactment again
            // it would be more efficient to target based on
            // the change
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
            value: preference.value ? preference.value : preference.defaultValue
        };
    });
    console.log(preferenceStore);
};
