// ===================================
// Section & Element Reveal Animations (IntersectionObserver orchestration)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    const { qs, qsa, on, addClass, removeClass } = LuxAuto.dom;
    const { createInViewObserver } = LuxAuto.scroll;

    const notifyHeroReady = () => {
        const landing = LuxAuto.components.landing;
        if (landing && typeof landing.markHeroReady === 'function') {
            landing.markHeroReady();
        }
    };

    // Orchestrate IntersectionObservers that sequence section reveals and FAQ animations.
    const initSectionReveal = () => {
        const sections = qsa('section[id]');
        if (!sections.length) {
            return;
        }

    // Certain sections (e.g., hero) wait for the landing overlay to dismiss before revealing.
    const manualRevealSections = new Set(['why-choose-us']);

        const sectionObserver = createInViewObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    removeClass(entry.target, 'section-hidden');
                    addClass(entry.target, 'section-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '0px 0px -10% 0px'
        });

        sections.forEach(section => {
            if (!section.classList.contains('section-transition')) {
                return;
            }
            if (manualRevealSections.has(section.id)) {
                removeClass(section, 'section-visible');
                addClass(section, 'section-hidden');
                return;
            }
            if (!section.classList.contains('section-hidden')) {
                addClass(section, 'section-hidden');
            }
            sectionObserver.observe(section);
        });

        const heroSection = qs('#why-choose-us');
        if (heroSection) {
            // Ping the landing module once the hero is actually visible in the viewport.
            const heroObserver = createInViewObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        notifyHeroReady();
                    }
                });
            }, {
                threshold: 0.45,
                rootMargin: '0px 0px -20% 0px'
            });
            heroObserver.observe(heroSection);
        }

        const revealTargets = qsa('.card, .stat-card, .partner-card, .blog-card, .testimonial-card, .feature-card, .selling-step, .selling-benefits-card, .benefit-item, .contact-item');

        if (revealTargets.length) {
            const elementObserver = createInViewObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        addClass(entry.target, 'reveal-visible');
                        removeClass(entry.target, 'reveal-ready');
                        elementObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px'
            });

            revealTargets.forEach(target => {
                addClass(target, 'reveal-ready');
                elementObserver.observe(target);
            });
        }

        const faqButtons = qsa('#faq .accordion-button');
        faqButtons.forEach(button => {
            // Fake a material-style ripple for keyboard and mouse interactions.
            const triggerRipple = () => {
                button.classList.remove('ripple-active');
                void button.offsetWidth;
                button.classList.add('ripple-active');
                setTimeout(() => button.classList.remove('ripple-active'), 650);
            };

            on(button, 'click', triggerRipple);
            on(button, 'keyup', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    triggerRipple();
                }
            });
        });

        const faqAccordion = qs('#faqAccordion');
        if (faqAccordion) {
            faqAccordion.addEventListener('show.bs.collapse', event => {
                const answer = event.target.querySelector('.faq-answer');
                if (!answer) {
                    return;
                }
                removeClass(answer, 'faq-answer-visible');
                void answer.offsetWidth;
                addClass(answer, 'faq-answer-visible');
            });

            faqAccordion.addEventListener('hide.bs.collapse', event => {
                const answer = event.target.querySelector('.faq-answer');
                if (answer) {
                    removeClass(answer, 'faq-answer-visible');
                }
            });
        }
    };

    LuxAuto.components.sectionReveal = {
        initSectionReveal
    };
})(window);
