Auth - Register
==============

Files liên quan
---------------
- HTML: pages/auth/register.html
- CSS: pages/auth/auth-css/auth.css
- JS: pages/auth/auth-js/auth.js
- Thư viện: Bootstrap 5 (forms/buttons), Icons

Chức năng & Công nghệ
---------------------
1) Đăng ký người dùng
   - registerUser(fullname,email,password): kiểm tra trùng email, validate cơ bản, lưu vào localStorage (demo).
   - Password strength: đánh giá yếu/vừa/mạnh (dài, số, ký tự đặc biệt,...).
2) UI Register form
   - Xác nhận nhập lại mật khẩu, hiển thị lỗi theo trường.
   - Overlay Loading -> Success -> điều hướng sang Login.

Logic chi tiết (luồng)
----------------------
- Submit -> kiểm tra rỗng/định dạng email/khớp password -> registerUser -> nếu OK: lưu user -> Overlay Loading -> Success -> chuyển Login.
- Nếu email đã tồn tại: Toast lỗi + highlight trường email.

Bootstrap/CSS
-------------
- Bootstrap form + grid bố cục.
- auth.css: hiệu ứng card, báo lỗi input, nền trang.

Sơ đồ
-----
- Xem diagram.mmd để thấy các bước từ nhập thông tin đến hoàn tất đăng ký.
