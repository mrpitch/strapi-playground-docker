
export default {
  async afterCreate(event) {
    const { result, params } = event;
    console.log("New sample created", result);
    await strapi.documents("api::history.history").create({
      data: {
        title: result.title,
        inhaltsTyp: "article",
        action: "create",
      },
    });
  },
  async afterUpdate(event) {
    const { result, params } = event;
    console.log("afterUpdate", result);
    await strapi.documents("api::history.history").create({
      data: {
        title: result.title,
        inhaltsTyp: "article",
        action: "update",
      },
    });
  },
};
