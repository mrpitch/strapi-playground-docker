import imageOptimizerService from "upload-image-optimizer/dist/server/src/services/image-optimizer-service"
import { LoadedPlugin } from "@strapi/types/dist/plugin"

module.exports = (plugin: LoadedPlugin) => {
  plugin.services["image-manipulation"] = imageOptimizerService;
  return plugin;
};
