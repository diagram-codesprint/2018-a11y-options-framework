var cssEnactor = {};

cssEnactor.enactmentMap = {
    textSpacing: {
        lineHeight: {
            selectors: {
                "body": true
            },
            properties: {
                "line-height": true
            }
        },
        paragraphSpacing: {

        },
        letterSpacing: {

        },
        wordSpacing: {

        }
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
            if(enactor.selectors) {
                var selectors = Object.keys(enactor.selectors);
                var properties = Object.keys(enactor.properties);
                selectors.forEach(function (selector) {
                    var matched = document.querySelectorAll(selector);
                    for(var i=0; i<matched.length; i++) {
                        properties.forEach(function (property) {
                            matched[i].style.setProperty(property, value, "important");
                        });

                    }
                });
            }
        });
    });
};
