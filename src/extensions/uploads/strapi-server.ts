const imageManipulation = require("strapi-plugin-responsive-image/server/services/image-manipulation");

export default (plugin) => {
  plugin.services["image-manipulation"] = imageManipulation();

  return plugin;
};