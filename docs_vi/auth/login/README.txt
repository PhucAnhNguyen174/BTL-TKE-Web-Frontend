Auth - Login
===========

Files liên quan
---------------
- HTML: pages/auth/login.html
- CSS: pages/auth/auth-css/auth.css + assets/style/header.css
- JS: pages/auth/auth-js/auth.js + assets/js/navbar.js + assets/js/utils.js
- Thư viện: Bootstrap 5 (cards/forms/buttons), Icons

Chức năng & Công nghệ
---------------------
1) Quản lý người dùng (auth.js - dùng chung cho auth)
   - getUsers()/saveUsers(): thao tác localStorage danh sách users.
   - getCurrentUser()/setCurrentUser()/logout()/isLoggedIn(): quản lý phiên hiện tại.
   - validateLogin(email,password)/loginUser(email,password): kiểm tra và xác thực đơn giản (demo, chưa hash).
2) UI Login form
   - Toggle hiển thị mật khẩu (icon mắt), Remember me lưu email.
   - showAlert()/showToast() khi lỗi/thành công; shakeCard() khi sai thông tin.
   - Overlay Loading -> Success -> redirect sang trang chính.

Logic chi tiết (luồng)
----------------------
- Submit form -> validateLogin -> nếu đúng: loginUser + setCurrentUser -> Overlay Loading (fake) -> Success -> chuyển trang.
- Nếu sai: hiện Toast/Alert + rung thẻ login.
- Nếu Remember me: lưu email vào localStorage để tự điền lần sau.

Bootstrap/CSS
-------------
- Bootstrap forms/cards/buttons cho layout.
- auth.css: nền trang, hiệu ứng card, input states; header.css cho navbar.

Sơ đồ
-----
- Xem diagram.mmd để thấy các bước từ nhập form đến redirect.
