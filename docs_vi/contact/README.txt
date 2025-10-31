Contact Page
===========

Files liên quan
---------------
- HTML: pages/contact/contact.html
- CSS: pages/contact/contact-css/contact.css (+ contact-header.css, contact-info-cards.css, contact-stats.css)
- JS: pages/contact/contact-js/contact.js + assets/js/select-enhance.js + assets/js/navbar.js + assets/js/utils.js
- Thư viện: Bootstrap 5 (cards/tables/buttons/badges), Icons

Chức năng & Công nghệ
---------------------
1) Navbar và bố cục
   - Dùng Bootstrap Collapse/Container; navbar hiển thị sớm.
2) Toast/Thông báo
   - showToast(): thống nhất container; các hành động (save, delete, mark-read) đều phản hồi tức thời.
3) Custom Select & Wheel Lock
   - enhanceSelects(): biến thể trong contact (ưu tiên dùng select-enhance dùng chung), wheel lock để không cuộn trang.
4) Form liên hệ + LocalStorage
   - Lưu message vào localStorage('contacts'); render bảng + bộ lọc tìm kiếm + đếm số lượng.
   - Char-counter 1000 ký tự; validate email/phone.
5) Message actions & Modal
   - Xem chi tiết (modal dựng tay), đánh dấu đã đọc, xóa; cập nhật badge trạng thái.
6) Replies feed & Thống kê
   - Sắp xếp newest/oldest; render reply nếu có.
   - updateWorkingStatus(): hiển thị trạng thái giờ làm việc.
7) Hiệu ứng UI phụ
   - Particles nền, counter easing, form progress bar, confetti, Ctrl+Enter gửi.

Logic tổng quát
---------------
- Khi load: nạp danh sách từ localStorage, render bảng, gắn handler tìm kiếm/lọc, setup form progress.
- Khi submit form: validate -> lưu -> cập nhật bảng -> toast.
- Khi click hàng: mở modal chi tiết; thao tác mark-read/delete cập nhật lại bảng + localStorage.

Sơ đồ
-----
- Xem diagram.mmd để thấy vòng đời message và các thao tác liên quan.
