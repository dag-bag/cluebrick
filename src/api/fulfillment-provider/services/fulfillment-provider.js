"use strict";

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::fulfillment-provider.fulfillment-provider"
);
