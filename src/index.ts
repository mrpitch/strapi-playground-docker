import type { Core } from '@strapi/strapi';
import {errors} from '@strapi/utils'

const {ApplicationError} = errors

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::upload.file"],

      beforeCreate(event) {

        const { data, where, select, populate } = event.params;

        console.log("mime type: ", data?.mime);
        console.log("ext: ", data?.ext);
        if (data?.mime === "image/svg+xml") {
          throw new ApplicationError(`Invalid mime type: ${data?.mime}`);
        }
      },
    });
  },
};
