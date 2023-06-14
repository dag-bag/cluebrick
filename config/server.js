const forgotPasswordTemplate = require("./email-template/forgot-password");
module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    forgotPassword: {
      from: "support@mywebsite.fr",
      replyTo: "support@mywebsite.fr",
      emailTemplate: forgotPasswordTemplate,
    },
  },
  app: {
    keys: env.array("APP_KEYS"),
  },
});
