// ./src/extensions/upload/strapi-server.ts
import imageOptimizerService from "upload-image-optimizer/dist/server/src/services/image-optimizer-service"
import { LoadedPlugin } from "@strapi/types/dist/plugin";
// import imageOptimizerService from "upload-image-optimizer/dist/server/src/services/image-optimizer-service"
// import { LoadedPlugin } from "@strapi/types/dist/types/core/plugins";

module.exports = (plugin: LoadedPlugin) => {
  plugin.services["image-manipulation"] = imageOptimizerService;
  return plugin;
};
