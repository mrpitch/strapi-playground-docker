module.exports = (plugin) => {
    console.log("I am inside a plugin!");
    const orig = plugin.controllers['collection-types'].find;
    plugin.controllers['collection-types'].find = async (ctx) => {

        const { userAbility } = ctx.state;
        const { model } = ctx.params;
        const { query } = ctx.request;

        if (model === 'api::standard-article.standard-article') {
            return orig(ctx);
        }

        const entityManager = strapi.plugin('content-manager').service('entity-manager');
        const permissionChecker = strapi.plugin('content-manager').service('permission-checker').create({ userAbility, model });

        if (permissionChecker.cannot.read()) {
            return ctx.forbidden();
        }

        const permissionQuery = await permissionChecker.sanitizedQuery.read(query);

        // @ts-expect-error populate builder needs to be called with a UID
        const populate = await strapi.plugin('content-manager').service('populate-builder')(model)
            .populateFromQuery(permissionQuery)
            .populateDeep(1)
            .countRelations({ toOne: false, toMany: true })
            .build();

        const { results, pagination } = await entityManager.findPage(
            { ...permissionQuery, populate },
            model
        );

        const sanitizedResults = await Promise.all(
            results.map((result) => permissionChecker.sanitizeOutput(result))
        );

        // patch here!
        const finalResults = sanitizedResults.filter((entry) => {
            if (entry.createdBy.id === ctx.state.user.id || ctx.state.user.id === 1) {
                return true;
            }
        });


        ctx.body = {
            results: finalResults,
            pagination,
        };
    }
    return plugin;

};
