const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const webpack = require('webpack'); // Add this import

module.exports = function override(config, env) {

  config.resolve.modules = [
    ...config.resolve.modules,
    path.resolve(__dirname, "node_modules"),
  ];
  
  config.devtool = 'source-map';

  // CKEditor 관련 Webpack 플러그인 추가
  config.plugins.push(
    new CKEditorWebpackPlugin({
      language: 'en',
      additionalLanguages: 'all',
    })
  );

  // CKEditor 빌드와 React 연결을 위한 alias 설정
  config.resolve.alias = {
    ...config.resolve.alias,
    '@ckeditor/ckeditor5-react': path.resolve(__dirname, 'src/node_modules/@ckeditor/ckeditor5-react'),
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
    fs: false,
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    process: require.resolve('process/browser.js'), // process polyfill 추가
  };

  // ProvidePlugin을 사용하여 process를 글로벌로 정의
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // process가 정의되지 않은 오류 해결
    })
  );

  return config;
};
