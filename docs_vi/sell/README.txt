Sell Page
=========

Files liên quan
---------------
- HTML: pages/sell/sell.html
- CSS: pages/sell/sell-css/sell.css + pages/sell/css/* (sell-form-card.css, sell-preview-card.css, sell-form-inputs.css, sell-progress.css)
- JS: pages/sell/sell-js/sell.js + assets/js/select-enhance.js + assets/js/navbar.js + assets/js/utils.js
- Thư viện: Bootstrap 5 (cards/progress/buttons/badges/tooltips), Icons

Chức năng & Công nghệ
---------------------
1) Progress Steps & Bars
   - sell.js: updateProgressSteps(), cập nhật % các thanh formProgress + formProgressTop, đổi màu theo ngưỡng.
2) Toast/Thông báo
   - sell.js: showToast(type,title,msg,duration) -> container cố định, auto-hide + progress bar nhỏ.
3) Dropdown năm & Select nâng cao
   - populateYearDropdown(): từ năm hiện tại về 1990.
   - select-enhance.js: panel nổi (portal), drop-up, wheel lock.
4) Preview theo thời gian thực
   - Lắng nghe input/change -> cập nhật previewTitle, giá, năm, ảnh chính; counter ký tự.
5) Ảnh: Upload + kéo thả + sắp xếp
   - handleImageFiles() + renderImagePreviews(): kiểm file <5MB, FileReader, tạo thumb, drag&drop reorder, nút xoá.
6) Validate
   - validatePhone(/^(0|\+84).../), validateEmail(); thêm/loại .invalid-feedback.
7) Tiến độ biểu mẫu
   - updateFormProgress(): tính % dựa trên trường bắt buộc + số ảnh.
8) Gợi ý giá & So sánh giá
   - updatePriceSuggestion(): basePrice theo brand (luxury/premium/economy) -> khấu hao theo tuổi -> hệ số mileage -> condition multiplier -> range min/max.
   - checkPriceComparison(): đánh giá "Above/Below/Fair".
9) Thống kê quan tâm
   - updateStatistics(): ước views/interest theo year/images/price, animateCounter().
10) Gợi ý mô tả (AI mô phỏng)
   - Click -> spinner 1.5s -> chèn template dựa trên brand/model/year/condition.
11) Lưu nháp (localStorage)
   - Save/Load từ 'carListingDraft', đổi trạng thái nút.
12) Reset/Submit mô phỏng
   - Clear có xác nhận 2 bước; Submit: kiểm tra + overlay loading -> overlay success + confetti -> reset.
13) Tooltip & Scroll progress
   - initializeTooltips(): tooltip thuần; initializeScrollProgress(): thanh tiến độ cuộn top.

Logic tổng quát
---------------
- Khi load: khởi tạo dropdown năm, gắn listener inputs, nâng cấp select, thiết lập progress/tooltip.
- Khi người dùng nhập/chọn: cập nhật preview, tiến độ, gợi ý giá, so sánh giá, thống kê.
- Khi upload ảnh: hiển thị thumb, cho phép reorder, cập nhật preview chính.
- Khi submit: validate tối thiểu -> overlay -> kết thúc -> reset.

Sơ đồ
-----
- Xem diagram.mmd để theo dõi pipeline biểu mẫu -> preview -> tính toán -> submit.
