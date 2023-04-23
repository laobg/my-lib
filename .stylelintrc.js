module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-prettier'],
  customSyntax: 'postcss-html',
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    // 接入 Prettier 规则
    'stylelint-config-prettier',
    'stylelint-prettier/recommended',
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true,
    'alpha-value-notation': 'number',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'for'],
      },
    ],
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'rule-empty-line-before': [
      'never',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['lines'],
      },
    ],
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: 'min-device-pixel-ratio',
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['v-bind'],
      },
    ],
  },
};
