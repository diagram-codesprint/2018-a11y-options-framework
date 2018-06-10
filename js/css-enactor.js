var cssEnactor = {};

cssEnactor.transforms = {};
cssEnactor.transforms.rawValue = function (value) {
    return value;
};

cssEnactor.enactmentMap = {};

cssEnactor.enactmentMap.textSpacing = {
        lineHeight: {
            selectors: [
                "body"
            ],
            properties: {
                "line-height": {
                    transform: cssEnactor.transforms.rawValue
                }
            }
        },
        paragraphSpacing: {

        },
        letterSpacing: {

        },
        wordSpacing: {

        }
};

cssEnactor.enact = function (preferenceStore) {
    var preferenceTypes = Object.keys(preferenceStore);
    preferenceTypes.forEach(function (preferenceType) {

        var preferenceSettings = preferenceStore[preferenceType];

        var preferenceEnactors = cssEnactor.enactmentMap[preferenceType];

        var enactorKeys = Object.keys(preferenceEnactors);
        enactorKeys.forEach(function (enactorKey) {
            var preferenceSetting = preferenceSettings[enactorKey];
            var value = preferenceSetting.value;
            var enactor = preferenceEnactors[enactorKey];
            if(enactor.selectors && enactor.properties) {
                var selectors = enactor.selectors;
                var properties = Object.keys(enactor.properties);
                selectors.forEach(function (selector) {
                    var matched = document.querySelectorAll(selector);
                    for(var i=0; i<matched.length; i++) {
                        properties.forEach(function (property) {
                            var transformFunc = enactor.properties[property].transform;
                            matched[i].style.setProperty(property, transformFunc(value), "important");
                        });

                    }
                });
            }
        });
    });
};
