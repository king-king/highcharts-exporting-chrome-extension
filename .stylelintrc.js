module.exports = {
    "plugins": [
        "stylelint-no-unsupported-browser-features",
        "stylelint-csstree-validator",
        "stylelint-declaration-block-no-ignored-properties"
    ],
    "rules": {
        "color-no-invalid-hex": true,
        "font-family-no-duplicate-names": true,
        "font-family-no-missing-generic-family-keyword": true,
        "function-linear-gradient-no-nonstandard-direction": true,
        "string-no-newline": true,
        "unit-no-unknown": true,
        "property-no-unknown": true,
        "keyframe-declaration-no-important": true,
        "declaration-block-no-duplicate-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "block-no-empty": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-no-unknown": true,
        "selector-type-no-unknown": true,
        "media-feature-name-no-unknown": true,
        "at-rule-no-unknown": true,
        "comment-no-empty": true,
        "no-descending-specificity": true,
        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,
        "no-empty-source": true,
        "no-extra-semicolons": true,
        "no-invalid-double-slash-comments": true,
        "shorthand-property-no-redundant-values": true,
        "declaration-block-no-redundant-longhand-properties": true,
        "declaration-block-single-line-max-declarations": 1,
        "number-no-trailing-zeros": true,
        "length-zero-no-unit": true,
        "unit-case": "lower",
        "value-keyword-case": "lower",
        "property-case": "lower",
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-element-case": "lower",
        "selector-type-case": "lower",
        "media-feature-name-case": "lower",
        "csstree/validator": true,
        "plugin/declaration-block-no-ignored-properties": true,
        "plugin/no-unsupported-browser-features": [
            true, {
                "browsers": [
                    "Chrome > 57"
                ]
            }
        ]
    }
};