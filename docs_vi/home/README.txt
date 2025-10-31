Home Page
=========

Files liên quan
---------------
- HTML: pages/home/index.html
- CSS: pages/home/home-css/home.css + assets/style/header.css + assets/css/select-enhance.css
- JS: pages/home/home-js/home.js + assets/js/navbar.js + assets/js/select-enhance.js + assets/js/utils.js
- Thư viện: Bootstrap 5 (grid/navbar/cards/buttons), Bootstrap Icons

Chức năng & Công nghệ
---------------------
1) Landing animation & Navbar
   - home.js: ẩn/hiện lớp phủ landing theo cuộn; navbar hiện ra khi vượt ngưỡng.
   - header.css: trạng thái navbar-hidden/navbar-visible.
2) Smooth scroll & Nav highlight
   - home.js: chặn click anchor, tính offset trừ chiều cao navbar, scrollTo({behavior:'smooth'}).
   - Tô sáng mục nav trùng với trang hiện tại (data-page).
3) Bộ lọc Landing (brand/region/price)
   - home.js: custom select nhẹ cho landing (tạo trigger + panel), wheel lock.
   - select-enhance.css: tái dùng style chung cho panel.
4) Featured filter & UI actions
   - Lọc card theo category; hiệu ứng fadeInUp.
   - Wishlist / Quick view / Compare: tạo thông báo nhỏ (notification) chèn bằng CSS động.
5) IntersectionObserver reveal
   - Quan sát section và phần tử (card, stat-card, feature-card) để thêm class reveal khi vào viewport.

Logic tổng quát
---------------
- Khi load: thiết lập observer, nâng cấp bộ lọc, gắn handler scroll.
- Khi chọn bộ lọc/nhập query: lọc featured, cuộn xuống section.
- Khi cuộn: cập nhật navbar + hiển thị các khối qua observer.

Sơ đồ
-----
- Xem diagram.mmd để nắm luồng tương tác và sự kiện chính.
