// config-overrides.js
const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');

module.exports = function override(config, env) {
  config.devtool = 'source-map';

  // CKEditor 관련 Webpack 플러그인 추가
  config.plugins.push(
    new CKEditorWebpackPlugin({
      language: 'en', // 사용 언어
      additionalLanguages: 'all', // 모든 언어 포함
    })
  );

  // CKEditor 빌드와 React 연결을 위한 alias 설정
  config.resolve.alias = {
    ...config.resolve.alias,
    '@ckeditor/ckeditor5-react': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-react'),
    '@ckeditor/ckeditor5-build-classic': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-build-classic'),
    '@ckeditor/ckeditor5-link': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-link'),
    '@ckeditor/ckeditor5-image': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-image'),
    '@ckeditor/ckeditor5-essentials': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-essentials'),
    '@ckeditor/ckeditor5-basic-styles': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-basic-styles'),
    '@ckeditor/ckeditor5-alignment': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-alignment'),
    '@ckeditor/ckeditor5-heading': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-heading'),
    '@ckeditor/ckeditor5-paragraph': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-paragraph'),
    '@ckeditor/ckeditor5-list': path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-list'),
  };

  // Webpack 5에서 Node.js core 모듈(polyfills) 문제 해결
  config.resolve.fallback = {
    fs: false, // fs 모듈 사용 안함
    path: require.resolve('path-browserify'), // path 모듈을 브라우저에서 사용할 수 있게 설정
    os: require.resolve('os-browserify/browser'), // os 모듈을 브라우저에서 사용할 수 있게 설정
  };

  return config;
};