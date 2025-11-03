// ===================================
// Featured Page Section Menu Tweaks
// ===================================
(function (global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    /**
     * Post-processes the shared section menu so the inline navigation reflects
     * featured-page terminology instead of default heading-derived labels.
     */
    const initFeaturedSectionMenu = () => {
        const { document } = global;
        const renameMap = new Map([
            ['#featured', 'Signature Collections'],
            ['#continue-exploring', 'Continue Exploring']
        ]);

    /**
     * Loops over the lookup table and swaps visible link labels whenever
     * the shared menu regenerates its DOM entries.
     */
    const renameLinks = () => {
            const menuList = document.getElementById('sectionMenuList');
            if (!menuList) {
                return;
            }

            renameMap.forEach((label, target) => {
                const anchor = menuList.querySelector(`a[href="${target}"] span`);
                if (anchor) {
                    anchor.textContent = label;
                }
            });
        };

        // Run twice to cover menu builds triggered after first paint.
        renameLinks();
        global.requestAnimationFrame(renameLinks);
    };

    LuxAuto.components.featuredSectionMenu = {
        initFeaturedSectionMenu
    };
})(window);
