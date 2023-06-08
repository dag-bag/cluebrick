"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

async function createShippingOptionAfterDelegation(shippingOption) {
  const {
    region,
    profile: shipping_profile,
    requirements: shipping_option_requirements,
    provider: fulfillment_provider,
    ...createPayload
  } = shippingOption;

  if (region) {
    createPayload.region = await strapi
      .service("api::region.region")
      .handleManyToOneRelation(region, "shipping-option");
  }

  if (shipping_profile) {
    createPayload.shipping_profile = await strapi
      .service("api::shipping-profile.shipping-profile")
      .handleManyToOneRelation(shipping_profile, "shipping-option");
  }

  if (shipping_option_requirements && shipping_option_requirements.length) {
    createPayload.shipping_option_requirements = await strapi
      .service("api::shipping-option-requirement.shipping-option-requirement")
      .handleOneToManyRelation(shipping_option_requirements, "shipping-option");
  }

  if (fulfillment_provider) {
    createPayload.fulfillment_provider = await strapi
      .service("api::fulfillment-provider.fulfillment-provider")
      .handleManyToOneRelation(fulfillment_provider, "shipping-option");
  }

  const create = await strapi.entityService.create(
    "api::shipping-option.shipping-option",
    { data: createPayload }
  );
  return create.id;
}

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::shipping-option.shipping-option");
