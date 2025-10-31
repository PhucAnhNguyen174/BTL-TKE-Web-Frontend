# LuxAuto - Car Trading Website

## 📁 Final Clean Structure

```
btl/
├── assets/
│   ├── bootstrap/         # Bootstrap framework (CSS, JS, Icons, FontAwesome)
│   ├── css/               # Shared custom CSS
│   ├── js/                # Shared custom JS (utils, navbar, select-enhance)
│   ├── style/             # Base styles (base.css, header.css)
│   ├── img/               # Images
│   └── logo/              # Logos
│
└── pages/
    ├── home/              # index.html + home-css/ + home-js/
    ├── sell/              # sell.html + sell-css/ + sell-js/ + css/
    ├── contact/           # contact.html + contact-css/ + contact-js/ + css/
    └── auth/              # login.html, register.html, forgot.html + auth-css/ + auth-js/
```

## ✅ Completed

- Reorganized all CSS/JS into dedicated page folders
- Bootstrap moved to `assets/bootstrap/` (clean path)
- All HTML files updated with new paths
- Removed old bootstrap-5.3.8-dist folder
- Created modular shared files (base, header, utils, navbar)
- Fixed dropdown z-index with portal approach

**Next**: Translate Vietnamese to English
