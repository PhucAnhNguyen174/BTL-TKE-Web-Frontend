Tài liệu kỹ thuật (Tiếng Việt) - Mục lục
=====================================

Mục tiêu: Mỗi phần/trang có 1 README.txt mô tả rõ
- Sử dụng JS/CSS/Bootstrap nào
- Phân tích logic từng chức năng
- Sơ đồ (Mermaid .mmd) để dễ hình dung luồng xử lý

Cấu trúc tài liệu
-----------------
- docs_vi/
  - shared/ (tài nguyên dùng chung)
    - README.txt
    - diagram.mmd
  - home/
    - README.txt
    - diagram.mmd
  - sell/
    - README.txt
    - diagram.mmd
  - contact/
    - README.txt
    - diagram.mmd
  - auth/
    - login/
      - README.txt
      - diagram.mmd
    - register/
      - README.txt
      - diagram.mmd
    - forgot/
      - README.txt
      - diagram.mmd

Quy ước tham chiếu mã nguồn
---------------------------
- Tệp chia sẻ:
  - assets/style/base.css, assets/style/header.css
  - assets/css/select-enhance.css
  - assets/js/utils.js, assets/js/navbar.js, assets/js/select-enhance.js
- Thư viện:
  - assets/bootstrap/css/bootstrap.min.css
  - assets/bootstrap/js/bootstrap.bundle.min.js
  - assets/bootstrap/font/bootstrap-icons.css
  - assets/bootstrap/fontawesome/css/all.min.css
- Trang:
  - pages/home/*, pages/sell/*, pages/contact/*, pages/auth/*

Ghi chú sơ đồ
-------------
- Mỗi thư mục có 1 file diagram.mmd (Mermaid). Có thể xem trực tiếp trong VS Code (tiện ích Mermaid) hoặc chuyển sang PNG/SVG.
- Trong README.txt cũng có mô tả tóm tắt luồng để đọc nhanh.

Liên hệ giữa phần chung và từng trang
-------------------------------------
- Navbar/Section Menu dùng chung: assets/js/navbar.js + assets/style/header.css
- Custom Select (portal): assets/js/select-enhance.js + assets/css/select-enhance.css
- Các trang có thể có biến thể logic riêng, nhưng cố gắng tái sử dụng tối đa 2 thành phần trên.
