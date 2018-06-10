// namespacing should be better
var preferenceSchema = {};

preferenceSchema.textSpacing = {
    name: "Text Spacing",
    class: "textSpacing",
    preferences: {}
};

preferenceSchema.textSpacing.preferences.lineHeight = {
    name: "Line Height",
    value: "normal"
};

preferenceSchema.textSpacing.preferences.paragraphSpacing = {
    name: "Paragraph Spacing",
    value: 1
};

preferenceSchema.textSpacing.preferences.letterSpacing = {
    name: "Letter Spacing",
    value: "normal"
};

preferenceSchema.textSpacing.preferences.wordSpacing = {
    name: "Word Spacing",
    value: 0
};
