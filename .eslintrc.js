module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": ["error", { "forbid": ["any"]}],
        "react/prefer-stateless-function": "off",
        "class-methods-use-this": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/valid-expect": "error"
      },
      "globals": { "fetch": false },
};