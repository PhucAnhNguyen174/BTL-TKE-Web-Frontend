Shared (Dùng chung)
===================

Phạm vi
-------
- CSS chung: assets/style/base.css, assets/style/header.css, assets/css/select-enhance.css
- JS chung: assets/js/utils.js, assets/js/navbar.js, assets/js/select-enhance.js
- Thư viện: assets/bootstrap/* (Bootstrap 5, Icons, Font Awesome)

Thành phần & Công nghệ
----------------------
1) Base styles (base.css)
   - Reset, biến màu, typography, helper classes, hiệu ứng fade-in.
2) Header & Section Menu (header.css + navbar.js)
   - Navbar hiển/ẩn theo cuộn, panel mục lục theo section (menu nổi), khoá cuộn body khi mở panel.
   - Bootstrap: .navbar, .container, grid/collapse.
3) Custom Select (select-enhance.css + select-enhance.js)
   - Nâng cấp <select> thành panel nổi (portal -> document.body, position:fixed) để tránh z-index conflict.
   - Có logic drop-up khi gần đáy, wheel/touch lock để không kéo cả trang.
4) Utils (utils.js)
   - $, $$, debounce – tiện ích nhỏ, không có side-effect.

Luồng xử lý điển hình
---------------------
- Trang load -> navbar.js gắn sự kiện scroll + build danh mục mục lục theo các section hiện diện.
- Người dùng mở Section Menu -> panel nổi canh theo nút MENU -> khoá body scroll.
- Custom Select: click trigger -> panel nổi xuất hiện -> chọn option -> đóng panel, cập nhật UI.

Xem sơ đồ
---------
- Xem file diagram.mmd (Mermaid) để nắm nhanh mối quan hệ và luồng sự kiện chính.
