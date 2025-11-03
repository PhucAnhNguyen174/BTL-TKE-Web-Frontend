// ===================================
// Form Handlers (Contact & Newsletter)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    const { qs, on } = LuxAuto.dom;

    // Intercept contact submissions so the demo can show feedback without a backend.
    const handleContactForm = form => {
        on(form, 'submit', event => {
            event.preventDefault();

            const formData = {
                firstName: form.querySelector('#firstName')?.value || '',
                lastName: form.querySelector('#lastName')?.value || '',
                email: form.querySelector('#email')?.value || '',
                phone: form.querySelector('#phone')?.value || '',
                subject: form.querySelector('#subject')?.value || '',
                message: form.querySelector('#message')?.value || ''
            };

            console.log('Contact Form Submitted:', formData);
            alert('Thank you for contacting us! We will get back to you soon.');
            form.reset();
        });
    };

    // Fake newsletter enrollment and emit a friendly confirmation toast.
    const handleNewsletterForm = form => {
        on(form, 'submit', event => {
            event.preventDefault();
            const email = form.querySelector('input[type="email"]')?.value || '';
            console.log('Newsletter Subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            form.reset();
        });
    };

    // Attach the lightweight handlers to whichever forms are present on the page.
    const initForms = () => {
        const contactForm = qs('#contactForm');
        if (contactForm) {
            handleContactForm(contactForm);
        }

        const newsletterForm = qs('#newsletterForm');
        if (newsletterForm) {
            handleNewsletterForm(newsletterForm);
        }
    };

    LuxAuto.components.forms = {
        initForms
    };
})(window);
