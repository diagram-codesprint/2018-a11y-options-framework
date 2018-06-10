// namespacing should be better
var preferenceSchema = {};

preferenceSchema.textSpacing = {
    name: "Text Spacing",
    class: "textSpacing",
    preferences: {}
};

preferenceSchema.textSpacing.preferences.lineHeight = {
    name: "Line Height",
    value: "initial"
};

preferenceSchema.textSpacing.preferences.paragraphSpacing = {
    name: "Paragraph Spacing",
    value: "initial"
};

preferenceSchema.textSpacing.preferences.letterSpacing = {
    name: "Letter Spacing",
    value: "initial"
};

preferenceSchema.textSpacing.preferences.wordSpacing = {
    name: "Word Spacing",
    value: "initial"
};
