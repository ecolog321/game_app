module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-prettier/recommended',
    ],
    overrides: [
        {
            files: '**/*.scss',
            customSyntax: 'postcss-scss',
        },
    ],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'selector-class-pattern': '^([a-z]+[\\-_a-z0-9]*[^\\-]|[a-z]+)$',
        'declaration-block-no-redundant-longhand-properties': null,
    },
}
