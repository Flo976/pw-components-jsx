"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showModal = showModal;
var _renderVue = require("../vue/helper/renderVue");
function showModal(component, config) {
  var {
    onShow = () => {}
  } = config;
  (0, _renderVue.setChildView)("#app_modal_wrapper", component, config);
  config.instance.$$$show();
  onShow(config.instance);
  return config.instance;
}