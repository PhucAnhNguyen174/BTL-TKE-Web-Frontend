// ===================================
// Featured Page Footer Adjustments
// ===================================
(function (global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    /**
     * Reapplies the featured page footer specifics by neutralising placeholder
     * social links and reinstating the curated description that global footer
     * helpers replace.
     */
    const initFeaturedFooter = () => {
        const { document } = global;

        /**
         * Converts decorative anchors into inert elements while keeping their
         * styling, preventing navigation away from the demo page.
         */
        const disableLinkInteractivity = link => {
            if (!link) {
                return;
            }
            link.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
            });
            link.setAttribute('aria-disabled', 'true');
        };

        const disabledFooterSelectors = [
            '.footer-social a[aria-label="Visit LuxAuto on Facebook"]',
            '.footer-social a[aria-label="Visit LuxAuto on Instagram"]',
            '.footer-social a[aria-label="Visit LuxAuto on Twitter"]',
            '.footer-social a[aria-label="Visit LuxAuto on LinkedIn"]',
            '.footer-nav a[href="../main/pages/privacy.html"]',
            '.footer-nav a[href="../main/pages/terms.html"]',
            '.footer-bottom-links a[href="../main/pages/privacy.html"]',
            '.footer-bottom-links a[href="../main/pages/terms.html"]',
        ];

        disabledFooterSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(disableLinkInteractivity);
        });

        const footerDescription = document.querySelector('.footer .footer-description');
        if (footerDescription) {
            footerDescription.textContent = 'Our featured collection represents the rarest commissions, homologated specials, and bespoke electric grand tourers sourced for discerning owners.';
        }
    };

    LuxAuto.components.featuredFooter = {
        initFeaturedFooter
    };
})(window);
