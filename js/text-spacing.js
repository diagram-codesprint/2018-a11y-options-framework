// namespacing should be better
var preferenceSchema = {};

preferenceSchema.textSpacing = {
    name: "Text Spacing",
    class: "textSpacing",
    preferences: {}
};

preferenceSchema.textSpacing.preferences.lineHeight = {
    name: "Line Height",
    defaultValue: "initial",
    type: "numeric"
};

preferenceSchema.textSpacing.preferences.paragraphSpacing = {
    name: "Paragraph Spacing",
    defaultValue: "initial",
    type: "numeric"
};

preferenceSchema.textSpacing.preferences.letterSpacing = {
    name: "Letter Spacing",
    defaultValue: "initial",
    type: "numeric"
};

preferenceSchema.textSpacing.preferences.wordSpacing = {
    name: "Word Spacing",
    defaultValue: "initial",
    type: "numeric"
};
