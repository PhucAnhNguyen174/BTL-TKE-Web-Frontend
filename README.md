### Bài tập thiết kế web Frontend - Nhóm 5

## Thành viên
- Nguyễn Phúc Anh - 242630903
- Lê Đình Long - 242630959
- Đàm Đức Trung - 242630981

## Tổng quan
- Dự án xây dựng giao diện web cho nền tảng mua bán xe, bao gồm trang chủ, danh sách xe nổi bật, tìm kiếm xe mua, đăng bán xe, liên hệ nhân viên chăm sóc khách hàng và các trang đăng nhập đăng kí. Toàn bộ ứng dụng được triển khai bằng HTML5, CSS3+, JavaScript (ES6+) kết hợp Bootstrap 5 để đảm bảo giao diện hiện đại, tối ưu cho nhiều kích thước màn hình.

## Cấu trúc thư mục chính
- `main/`: Trang đích tổng quan, giới thiệu thương hiệu và điều hướng tới các phân hệ khác.
- `buy-cars/`: Trang tìm kiếm, lọc và xem chi tiết xe cần mua.
- `featured-cars/`: Trang trưng bày danh sách xe nổi bật với các bộ lọc nâng cao.
- `sell_cars-login-register-contact/`: Cụm trang cho người bán đăng tin, đăng nhập/đăng ký và liên hệ hỗ trợ.
- `shared/`: Tài nguyên dùng chung (navbar, section menu, tiện ích CSS/JS).

Mỗi thư mục con đều có cấu trúc `assets/css`, `assets/js` hoặc `css`, `js` riêng để quản lý tiện ích, thành phần và trang, đồng thời sử dụng bộ Bootstrap 5 đi kèm.

## Tính năng chính
- **Trang chủ**: Giới thiệu thương hiệu, dịch vụ và điểm nổi bật của nền tảng, đồng thời khả năng điều hướng tới từng trang thông qua trang chủ.
- **Mua xe**: Lọc theo hãng, tầm giá, loại xe; tìm kiếm theo từ khóa; xem chi tiết từng xe với thông tin mô tả.
- **Xe nổi bật**: Lưới hiển thị xe nổi bật, được đề xuất, xe mới.
- **Đăng bán**: Biểu mẫu đăng bán xe với các bộ lọc đầy đủ, chi tiết.
- **Đăng nhập/Đăng kí**: Cửa sổ đăng nhập/đăng ký kèm chức năng quên mật khẩu.
- **Thành phần dùng chung**: Thanh điều hướng, menu theo khu vực, hiệu ứng chuyển trang, nút quay về đầu trang.

## Công nghệ sử dụng
- HTML5 semantic để tối ưu cấu trúc nội dung.
- CSS3/SCSS module hóa theo `base`, `components`, `layout`, `pages` và `utils`.
- JavaScript ES6+ với phân tách logic theo `core`, `components` và `pages`.
- Bootstrap 5 (kèm bootstrap-icons) cho lưới, tiện ích và thành phần UI.
- DevTools cho việc xử lý, chỉnh sửa trang web một cách chuyên nghiệp.

## Hướng dẫn sử dụng nhanh
1. Cài đặt tiện ích web server như **Live Server** trên VS Code hoặc sử dụng bất kỳ HTTP server tĩnh nào.
2. Mở tệp `main/main.html` để xem trang chủ, từ đây có thể truy cập trực tiếp vào từng trang con.

## Quy tắc phát triển
- Giữ nguyên chuẩn đặt tên tiếng Anh, mô tả rõ ràng cho class, id, biến và hàm.
- Mọi khối mã quan trọng phải có chú thích ngắn gọn, dễ hiểu bằng tiếng Anh.
- Ưu tiên sử dụng lại các tiện ích trong `shared/` hoặc các module `core/` hiện có.
- Xử lý responsive cho mọi trang web.

## Kiểm tra & triển khai
- Kiểm tra hiển thị trên các trình duyệt base chromium (bao gồm Chrome, Edge, Firefox) ở nhiều độ phân giải.
- Kiểm tra khả năng chạy local, ngoại tuyến hoàn toàn thông qua Console - DevTools.
