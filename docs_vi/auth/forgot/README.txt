Auth - Forgot Password
======================

Files liên quan
---------------
- HTML: pages/auth/forgot.html
- CSS: pages/auth/auth-css/auth.css
- JS: pages/auth/auth-js/auth.js
- Thư viện: Bootstrap 5 (forms/buttons), Icons

Chức năng & Công nghệ
---------------------
1) Yêu cầu đặt lại mật khẩu (mô phỏng)
   - Validate email; overlay Loading -> Success; thông báo đã gửi email khôi phục (demo).
2) UI và trải nghiệm
   - Đơn giản: một trường email, nút gửi; toast/alert khi lỗi.

Logic chi tiết (luồng)
----------------------
- Submit -> validate email -> nếu hợp lệ: overlay loading -> success -> reset form.
- Nếu không hợp lệ: hiển thị thông báo lỗi.

Bootstrap/CSS
-------------
- Bootstrap form/card; auth.css cho hiệu ứng nền và khối nội dung.

Sơ đồ
-----
- Xem diagram.mmd để thấy chuỗi xử lý đơn giản của tính năng.
