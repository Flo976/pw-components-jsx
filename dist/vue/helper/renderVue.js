"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getView = getView;
exports.getViewHTML = getViewHTML;
exports.renderVue = renderVue;
exports.setChildView = setChildView;
var _vue = _interopRequireDefault(require("vue"));
var _pwComponentsCoreDev = require("pw-components-core-dev");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function renderVue(Component, query, config) {
  var element = {};
  if (!config) {
    config = {};
  }
  config.element = element;
  var vueElement = new _vue.default({
    el: query,
    render: createElement => {
      return createElement(Component, {
        props: {
          config: config
        }
      });
    }
  });
  return config;
}
function getViewHTML(Component, config) {
  var element = {};
  if (!config) {
    config = {};
  }
  var id = "pseudo_" + _pwComponentsCoreDev.Random.generateToken();
  var query = "#" + id;
  var pseudo = $('<div>');
  $(document.body).append(pseudo);
  $(pseudo).attr('id', id);
  config.element = element;
  var vueElement = renderVue(Component, query, config);
  var parent = $('<div>');
  $(parent).append(vueElement.instance.$el);
  var html = $(parent).html();
  $(parent).remove();
  return html;
}
function getView(Component, config) {
  var element = {};
  if (!config) {
    config = {};
  }
  var id = "pseudo_" + _pwComponentsCoreDev.Random.generateToken();
  var query = "#" + id;
  var pseudo = $('<div>');
  $(document.body).append(pseudo);
  $(pseudo).attr('id', id);
  config.element = element;
  var vueElement = renderVue(Component, query, config);
  return vueElement.instance.$el;
}
function setChildView(parent, Component, config) {
  var element = {};
  if (!config) {
    config = {};
  }
  var id = "pseudo_" + _pwComponentsCoreDev.Random.generateToken();
  var query = "#" + id;
  var pseudo = $('<div>');
  $(document.body).append(pseudo);
  $(pseudo).attr('id', id);
  config.element = element;
  var vueElement = renderVue(Component, query, config);
  var elt = $(vueElement.instance.$el);
  $(parent).html('');
  $(parent).append(elt);
  return elt;
}