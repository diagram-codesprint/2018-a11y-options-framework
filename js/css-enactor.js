var cssEnactor = {};

cssEnactor.transforms = {};

cssEnactor.transforms.rawValue = function (value) {
    return value;
};

cssEnactor.transforms.toRem = function (value) {
    return value + "rem";
};

cssEnactor.enactmentMap = {};

cssEnactor.enactmentMap.textSpacing = {
        lineHeight: {
            selectorSets: {
                "page": ["body"],
                "preview": ["#preview-area"]
            },
            properties: {
                "line-height": {
                    transform: cssEnactor.transforms.rawValue
                }
            }
        },
        paragraphSpacing: {
            selectorSets: {
                "page": ["p"],
                "preview": ["#preview-area p"]
            },
            properties: {
                "margin-bottom": {
                    transform: cssEnactor.transforms.toRem
                }
            }
        },
        letterSpacing: {
            selectorSets: {
                "page": ["body"],
                "preview": ["#preview-area"]
            },
            properties: {
                "letter-spacing": {
                    transform: cssEnactor.transforms.rawValue
                }
            }
        },
        wordSpacing: {
            selectorSets: {
                "page": ["body"],
                "preview": ["#preview-area"]
            },
            properties: {
                "word-spacing": {
                    transform: cssEnactor.transforms.rawValue
                }
            }
        }
};

cssEnactor.enact = function (preferenceStore, selectorSet) {
    var preferenceTypes = Object.keys(preferenceStore);
    preferenceTypes.forEach(function (preferenceType) {

        var preferenceSettings = preferenceStore[preferenceType];

        var preferenceEnactors = cssEnactor.enactmentMap[preferenceType];

        var enactorKeys = Object.keys(preferenceEnactors);
        enactorKeys.forEach(function (enactorKey) {
            var preferenceSetting = preferenceSettings[enactorKey];
            var value = preferenceSetting.value;
            var enactor = preferenceEnactors[enactorKey];
            if(enactor.selectorSets && enactor.properties) {
                var selectors = enactor.selectorSets[selectorSet];
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
