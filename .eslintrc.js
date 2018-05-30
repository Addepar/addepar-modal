module.exports = {
  extends: ['@addepar', '@addepar/eslint-config/ember'],
  parser: 'babel-eslint',
  rules: {
    // 'emer-best-practices/require-dependent-keys' gives false positives with ember decorator
    // syntax. this is a known issue: https://github.com/ember-best-practices/eslint-plugin-ember-best-practices/issues/97
    'ember-best-practices/require-dependent-keys': false,
    // Until we drop support for < ember 2
    'ember/closure-actions': false
  }
};
