// namespacing should be better
var preferenceSchema = {};

preferenceSchema.textSpacing = {
    name: "Text Spacing",
    class: "textSpacing",
    preferences: {}
    // TODO: track retina angle here for future use
};

preferenceSchema.textSpacing.preferences.lineHeight = {
    name: "Line Height",
    defaultValue: "initial",
    type: "numeric",
    control: {
        min: 1,
        max: 3,
        step: 0.1
    }
};

preferenceSchema.textSpacing.preferences.paragraphSpacing = {
    name: "Paragraph Spacing",
    defaultValue: "initial",
    type: "numeric",
    control: {
        min: 1,
        max: 3,
        step: 0.1
    }
};

preferenceSchema.textSpacing.preferences.letterSpacing = {
    name: "Letter Spacing",
    defaultValue: "initial",
    type: "numeric",
    control: {
        min: 0,
        max: 3,
        step: 0.1
    }
};

preferenceSchema.textSpacing.preferences.wordSpacing = {
    name: "Word Spacing",
    defaultValue: "initial",
    type: "numeric",
    control: {
        min: 0,
        max: 3,
        step: 0.1
    }
};

preferenceSchema.font = {
    name: "Font",
    class: "font",
    preferences: {}
};

preferenceSchema.font.preferences.fontSize = {
    name: "Font Size",
    defaultValue: "initial",
    type: "numeric",
    control: {
        min: 12,
        max: 36,
        step: 1
    }
};

preferenceSchema.font.preferences.fontFamily = {
    name: "Font Family",
    defaultValue: "initial",
    type: "choice",
    control: {
        choices: [
            "Arial",
            "Comic Sans MS",
            "Times New Roman",
            "Verdana"
        ]
    }
};

preferenceSchema.colors = {
    name: "Colors",
    class: "colors",
    preferences: {}
};

preferenceSchema.colors.preferences.contrast = {
    name: "Contrast Theme",
    defaultValue: "none",
    type: "choice",
    control: {
        choices: [
            "none",
            "White on Black",
            "Black on White",
            "Yellow on Black",
            "Black on Yellow",
        ]
    }
};
