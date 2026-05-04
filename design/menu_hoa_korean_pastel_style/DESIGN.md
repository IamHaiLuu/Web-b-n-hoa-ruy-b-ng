---
name: Menu Hoa - Korean Pastel Style
colors:
  surface: '#fff8f7'
  surface-dim: '#e8d6d5'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f0'
  surface-container: '#fceae9'
  surface-container-high: '#f6e4e3'
  surface-container-highest: '#f0dede'
  on-surface: '#231919'
  on-surface-variant: '#504346'
  inverse-surface: '#382e2e'
  inverse-on-surface: '#ffedec'
  outline: '#837376'
  outline-variant: '#d5c2c5'
  surface-tint: '#81505d'
  primary: '#81505d'
  on-primary: '#ffffff'
  primary-container: '#f6b8c6'
  on-primary-container: '#754652'
  inverse-primary: '#f4b6c4'
  secondary: '#69567e'
  on-secondary: '#ffffff'
  secondary-container: '#e8d1ff'
  on-secondary-container: '#6a577f'
  tertiary: '#40655d'
  on-tertiary: '#ffffff'
  tertiary-container: '#a9d1c7'
  on-tertiary-container: '#365b53'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#f4b6c4'
  on-primary-fixed: '#330f1a'
  on-primary-fixed-variant: '#663945'
  secondary-fixed: '#eedbff'
  secondary-fixed-dim: '#d4beeb'
  on-secondary-fixed: '#241337'
  on-secondary-fixed-variant: '#513f65'
  tertiary-fixed: '#c3ebe1'
  tertiary-fixed-dim: '#a7cfc5'
  on-tertiary-fixed: '#00201b'
  on-tertiary-fixed-variant: '#284d46'
  background: '#fff8f7'
  on-background: '#231919'
  surface-variant: '#f0dede'
  bg-main: '#FFFDF9'
  bg-soft-rose: '#FFF8F7'
  bg-ash-rose: '#F8EFEF'
  text-primary: '#3F3434'
  text-secondary: '#8A7777'
  border-light: '#F1DCDC'
  status-available: '#BFE7DD'
  status-unavailable: '#F1DCDC'
  accent-mint: '#BFE7DD'
  accent-lavender: '#D9C2F0'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  price:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  section-padding: 80px
  card-gap: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

# Prompt thiết kế Stitch — Website Menu Hoa

## 1. Mục tiêu sản phẩm

Thiết kế một website desktop cho cửa hàng hoa tên **Menu Hoa**.

Website dùng để **hiển thị menu nhiều loại hoa cho khách hàng xem**, không có chức năng đặt hàng trực tiếp, không có giỏ hàng, không có checkout.  
Khách có thể xem danh sách hoa, lọc theo danh mục, tìm kiếm, xem chi tiết sản phẩm và liên hệ cửa hàng nếu muốn mua hoặc hỏi thêm.

Ngoài giao diện khách hàng, thiết kế thêm **khu vực admin** để quản trị menu hoa ở mức UI design, bao gồm đăng nhập admin và các màn hình CRUD: thêm, xem, sửa, xóa, ẩn/hiện sản phẩm hoa.

Ngôn ngữ toàn bộ giao diện: **Tiếng Việt**.  
Thiết bị ưu tiên: **Desktop web**.

---

## 2. Phong cách thiết kế

Thiết kế theo phong cách **pastel Hàn Quốc**:

- Nhẹ nhàng, tinh tế, nhiều khoảng trắng.
- Màu chủ đạo: hồng pastel, kem, trắng ngà, xanh mint nhạt, tím lavender nhạt.
- Cảm giác: nữ tính, hiện đại, sạch sẽ, dễ xem menu.
- Bo góc lớn, card mềm mại, shadow nhẹ.
- Typography thanh lịch, dễ đọc.
- Hình ảnh hoa là điểm nhấn chính.
- Tránh cảm giác thương mại điện tử nặng nề.
- Không dùng màu quá gắt hoặc layout quá đông đúc.

Gợi ý visual:

- Background: `#FFF8F7`, `#FFFDF9`, `#F8EFEF`
- Accent: `#F6B8C6`, `#D9C2F0`, `#BFE7DD`
- Text chính: `#3F3434`
- Text phụ: `#8A7777`
- Border: `#F1DCDC`

---

## 3. Kiến trúc website

Website gồm 2 khu vực chính:

1. **Trang khách hàng**
   - Trang chủ/menu hoa.
   - Trang chi tiết sản phẩm hoa.
   - Có nút liên hệ nhưng không có đặt hàng.

2. **Trang admin**
   - Đăng nhập admin.
   - Dashboard quản lý menu.
   - Danh sách sản phẩm hoa.
   - Thêm sản phẩm.
   - Chỉnh sửa sản phẩm.
   - Xem chi tiết sản phẩm trong admin.
   - Xóa sản phẩm.
   - Quản lý trạng thái hiển thị.

---

# PHẦN A — GIAO DIỆN KHÁCH HÀNG

## 4. Trang chủ / Trang menu hoa

### 4.1 Header

Header desktop cố định ở trên cùng hoặc sticky nhẹ khi cuộn.

Nội dung header:

- Logo chữ: **Menu Hoa**
- Navigation:
  - Trang chủ
  - Danh mục hoa
  - Hoa nổi bật
  - Liên hệ
- Nút CTA nhỏ:
  - “Liên hệ cửa hàng”

Không có:

- Giỏ hàng
- Tài khoản khách hàng
- Checkout
- Nút “Mua ngay”
- Nút “Thêm vào giỏ”

### 4.2 Hero section

Hero section cần tạo cảm giác nhẹ nhàng, pastel, sang trọng.

Nội dung:

- Tiêu đề lớn:  
  **Menu hoa tươi mỗi ngày**
- Mô tả:  
  “Khám phá các mẫu hoa tươi, bó hoa, giỏ hoa và set hoa theo dịp. Menu chỉ dùng để tham khảo, vui lòng liên hệ cửa hàng để được tư vấn.”
- CTA chính:
  - “Xem menu hoa”
- CTA phụ:
  - “Liên hệ Zalo”
- Bên phải hero:
  - Ảnh hoa lớn dạng card bo góc.
  - Có thể thêm vài chip trang trí như “Hoa mới”, “Pastel style”, “Tư vấn theo dịp”.

### 4.3 Section danh mục hoa

Hiển thị các danh mục bằng card hoặc pill filter.

Danh mục mẫu:

- Tất cả
- Hoa sinh nhật
- Hoa cưới
- Hoa khai trương
- Hoa chia buồn
- Bó hoa tươi
- Giỏ hoa
- Hoa theo mùa
- Hoa sáp
- Set quà tặng

Mỗi danh mục có icon/emoji nhỏ hoặc hình minh họa nhẹ.

### 4.4 Thanh tìm kiếm và bộ lọc

Vị trí: phía trên grid sản phẩm.

Thành phần:

- Ô tìm kiếm: placeholder “Tìm tên hoa, màu sắc, dịp tặng...”
- Dropdown danh mục
- Dropdown khoảng giá:
  - Dưới 300.000đ
  - 300.000đ - 500.000đ
  - 500.000đ - 1.000.000đ
  - Trên 1.000.000đ
- Bộ lọc trạng thái:
  - Tất cả
  - Còn mẫu
  - Tạm hết
- Nút reset filter: “Xóa lọc”

### 4.5 Grid menu sản phẩm hoa

Hiển thị dạng grid desktop 3 hoặc 4 cột.

Mỗi card sản phẩm gồm:

- Ảnh chính của sản phẩm.
- Badge danh mục.
- Badge trạng thái:
  - “Còn mẫu”
  - “Tạm hết”
- Tên sản phẩm.
- Giá tham khảo.
- Mô tả ngắn 1–2 dòng.
- Tags:
  - Pastel
  - Sang trọng
  - Bán chạy
  - Theo mùa
- Nút:
  - “Xem chi tiết”
  - “Liên hệ tư vấn”

Lưu ý:

- “Liên hệ tư vấn” không được hiểu là đặt hàng.
- Không hiển thị số lượng.
- Không có nút thêm vào giỏ hàng.

### 4.6 Section hoa nổi bật

Hiển thị 4–6 sản phẩm nổi bật.

Tiêu đề:

**Mẫu hoa được yêu thích**

Mỗi sản phẩm có card lớn hơn, tập trung vào ảnh đẹp, tên, giá tham khảo và nút xem chi tiết.

### 4.7 Section thông tin cửa hàng

Nội dung:

- Tên cửa hàng: **Menu Hoa**
- Mô tả ngắn về cửa hàng.
- Địa chỉ placeholder: “123 Đường Hoa, Quận 1, TP. Hồ Chí Minh”
- Số điện thoại placeholder: “0900 000 000”
- Zalo placeholder: “0900 000 000”
- Giờ mở cửa:
  - “08:00 - 20:00, Thứ 2 - Chủ nhật”

Có các nút:

- “Gọi cửa hàng”
- “Nhắn Zalo”
- “Xem bản đồ”

### 4.8 Footer

Footer gồm:

- Logo **Menu Hoa**
- Mô tả ngắn.
- Link nhanh:
  - Trang chủ
  - Danh mục
  - Hoa nổi bật
  - Liên hệ
- Thông tin liên hệ.
- Dòng nhỏ:  
  “Menu chỉ mang tính tham khảo. Mẫu hoa có thể thay đổi theo mùa và tình trạng hoa trong ngày.”

---

## 5. Trang chi tiết sản phẩm hoa

Khi khách bấm “Xem chi tiết”, mở trang chi tiết riêng.

### 5.1 Layout

Desktop layout 2 cột:

- Cột trái: thư viện ảnh sản phẩm.
- Cột phải: thông tin sản phẩm.

### 5.2 Thư viện nhiều ảnh

Cần hỗ trợ xem nhiều ảnh về sản phẩm:

- Ảnh chính lớn.
- Dải thumbnail bên dưới hoặc bên trái.
- Khi chọn thumbnail, ảnh chính thay đổi.
- Có trạng thái hover/selected rõ ràng.
- Có thể có 4–6 ảnh mẫu cho mỗi sản phẩm.

### 5.3 Thông tin sản phẩm

Hiển thị:

- Tên sản phẩm.
- Danh mục.
- Giá tham khảo.
- Trạng thái:
  - Còn mẫu
  - Tạm hết
- Mô tả chi tiết.
- Phù hợp cho dịp:
  - Sinh nhật
  - Kỷ niệm
  - Khai trương
  - Cưới hỏi
  - Chia buồn
- Màu sắc chủ đạo.
- Kích thước tham khảo.
- Tags.

### 5.4 CTA liên hệ

Các nút liên hệ:

- “Nhắn Zalo để tư vấn”
- “Gọi cửa hàng”
- “Quay lại menu”

Không có:

- “Đặt hàng”
- “Thanh toán”
- “Thêm vào giỏ”
- “Mua ngay”

### 5.5 Gợi ý sản phẩm liên quan

Phía dưới trang chi tiết:

- Section “Có thể bạn cũng thích”
- Hiển thị 3–4 sản phẩm cùng danh mục hoặc cùng phong cách.

---

# PHẦN B — GIAO DIỆN ADMIN

## 6. Trang đăng nhập admin

URL gợi ý: `/admin/login`

### 6.1 Layout

Giao diện desktop chia 2 cột:

- Cột trái:
  - Background pastel có ảnh hoa hoặc illustration nhẹ.
  - Quote: “Quản lý menu hoa dễ dàng mỗi ngày.”
- Cột phải:
  - Form đăng nhập.

### 6.2 Form đăng nhập

Thành phần:

- Logo **Menu Hoa Admin**
- Tiêu đề: “Đăng nhập quản trị”
- Input email
- Input mật khẩu
- Checkbox “Ghi nhớ đăng nhập”
- Link “Quên mật khẩu?”
- Button “Đăng nhập”

Trạng thái UI cần có:

- Default
- Focus
- Loading
- Error:
  - “Email hoặc mật khẩu không đúng.”

---

## 7. Admin layout chung

Sau đăng nhập, admin dùng layout dashboard desktop.

### 7.1 Sidebar

Sidebar bên trái gồm:

- Logo: **Menu Hoa**
- Menu:
  - Tổng quan
  - Quản lý hoa
  - Danh mục
  - Trạng thái hiển thị
  - Cài đặt cửa hàng
- Nút dưới cùng:
  - Đăng xuất

### 7.2 Top bar

Top bar gồm:

- Tiêu đề trang hiện tại.
- Search nhanh.
- Avatar admin.
- Tên admin: “Admin”
- Badge trạng thái: “Đang online”

---

## 8. Admin dashboard tổng quan

URL gợi ý: `/admin`

### 8.1 Cards thống kê

Hiển thị 4 card:

- Tổng số mẫu hoa
- Đang hiển thị
- Tạm ẩn
- Tạm hết

### 8.2 Biểu đồ/khối thống kê nhẹ

Có thể dùng chart đơn giản hoặc card danh sách:

- Số mẫu theo danh mục.
- Sản phẩm mới cập nhật gần đây.
- Top mẫu nổi bật.

### 8.3 Quick actions

Nút nhanh:

- “Thêm mẫu hoa”
- “Quản lý danh mục”
- “Xem menu khách hàng”

---

## 9. Trang quản lý hoa

URL gợi ý: `/admin/flowers`

### 9.1 Header trang

- Tiêu đề: “Quản lý hoa”
- Mô tả: “Thêm, chỉnh sửa và quản lý các mẫu hoa hiển thị trên menu.”
- Nút chính: “Thêm mẫu hoa”

### 9.2 Bộ lọc admin

Gồm:

- Tìm kiếm theo tên hoa.
- Lọc theo danh mục.
- Lọc trạng thái:
  - Đang hiển thị
  - Đang ẩn
  - Tạm hết
- Lọc nổi bật:
  - Tất cả
  - Hoa nổi bật
- Sắp xếp:
  - Mới cập nhật
  - Giá thấp đến cao
  - Giá cao đến thấp
  - Tên A-Z

### 9.3 Bảng danh sách sản phẩm

Dạng table desktop.

Cột gồm:

- Checkbox chọn dòng.
- Ảnh thumbnail.
- Tên hoa.
- Danh mục.
- Giá tham khảo.
- Trạng thái hàng:
  - Còn mẫu
  - Tạm hết
- Trạng thái hiển thị:
  - Đang hiển thị
  - Đang ẩn
- Nổi bật:
  - Có/Không
- Ngày cập nhật.
- Hành động:
  - Xem
  - Sửa
  - Ẩn/Hiện
  - Xóa

### 9.4 Bulk actions

Khi chọn nhiều dòng, hiển thị thanh hành động:

- Ẩn khỏi menu
- Hiện trên menu
- Đánh dấu nổi bật
- Bỏ nổi bật
- Xóa

### 9.5 Empty state

Khi chưa có sản phẩm:

- Illustration hoa nhẹ.
- Text: “Chưa có mẫu hoa nào.”
- Button: “Thêm mẫu hoa đầu tiên”

---

## 10. Form thêm / sửa sản phẩm hoa

URL gợi ý:

- `/admin/flowers/new`
- `/admin/flowers/:id/edit`

### 10.1 Layout

Dạng form desktop 2 cột:

- Cột trái: thông tin chính.
- Cột phải: ảnh, trạng thái, preview.

### 10.2 Trường thông tin chính

Bao gồm:

- Tên sản phẩm
- Danh mục
- Giá tham khảo
- Mô tả ngắn
- Mô tả chi tiết
- Dịp phù hợp
- Màu sắc chủ đạo
- Kích thước tham khảo
- Tags
- Ghi chú nội bộ

### 10.3 Quản lý ảnh sản phẩm

Cần thiết kế khu vực upload/xem nhiều ảnh:

- Upload nhiều ảnh.
- Ảnh chính.
- Danh sách ảnh phụ.
- Kéo thả để sắp xếp thứ tự ảnh.
- Nút “Đặt làm ảnh chính”.
- Nút xóa từng ảnh.
- Preview ảnh dạng grid.

### 10.4 Trạng thái sản phẩm

Các controls:

- Toggle “Hiển thị trên menu”
- Toggle “Đánh dấu nổi bật”
- Select trạng thái:
  - Còn mẫu
  - Tạm hết
- Select danh mục
- Input giá tham khảo

### 10.5 Buttons

Cuối form:

- “Lưu thay đổi”
- “Lưu nháp”
- “Hủy”
- Với trang sửa có thêm:
  - “Xóa mẫu hoa”

### 10.6 Validation states

Thiết kế trạng thái lỗi cho form:

- Tên sản phẩm bắt buộc.
- Danh mục bắt buộc.
- Giá phải là số hợp lệ.
- Cần ít nhất 1 ảnh sản phẩm.
- Mô tả ngắn không vượt quá 160 ký tự.

---

## 11. Trang xem chi tiết sản phẩm trong admin

URL gợi ý: `/admin/flowers/:id`

### 11.1 Nội dung

Hiển thị:

- Thư viện ảnh sản phẩm.
- Thông tin chính.
- Trạng thái hiển thị.
- Trạng thái còn/tạm hết.
- Lần cập nhật gần nhất.
- Người cập nhật.
- Preview card giống trang khách hàng.

### 11.2 Hành động

Buttons:

- “Chỉnh sửa”
- “Ẩn khỏi menu” hoặc “Hiện trên menu”
- “Đánh dấu nổi bật”
- “Xóa”

---

## 12. Modal xác nhận xóa

Khi admin bấm xóa, hiển thị modal xác nhận.

Nội dung:

- Tiêu đề: “Xóa mẫu hoa?”
- Mô tả: “Hành động này sẽ xóa mẫu hoa khỏi hệ thống quản lý menu. Bạn không thể hoàn tác.”
- Button phụ: “Hủy”
- Button nguy hiểm: “Xóa mẫu hoa”

Style button xóa cần rõ ràng nhưng vẫn hài hòa với pastel, không quá chói.

---

## 13. Trang quản lý danh mục

URL gợi ý: `/admin/categories`

### 13.1 Chức năng UI

Thiết kế danh sách danh mục:

- Tên danh mục.
- Mô tả.
- Số lượng sản phẩm.
- Trạng thái hiển thị.
- Hành động:
  - Sửa
  - Ẩn/Hiện
  - Xóa

### 13.2 Thêm/sửa danh mục

Form modal hoặc trang riêng gồm:

- Tên danh mục.
- Mô tả.
- Icon/emoji hoặc ảnh đại diện.
- Trạng thái hiển thị.

Danh mục mẫu:

- Hoa sinh nhật
- Hoa cưới
- Hoa khai trương
- Hoa chia buồn
- Bó hoa tươi
- Giỏ hoa
- Hoa theo mùa
- Hoa sáp
- Set quà tặng

---

## 14. Trang cài đặt cửa hàng

URL gợi ý: `/admin/settings`

Các field:

- Tên cửa hàng
- Số điện thoại
- Zalo
- Địa chỉ
- Giờ mở cửa
- Link Google Maps
- Mô tả cửa hàng
- Ảnh banner
- Logo

Buttons:

- “Lưu cài đặt”
- “Xem trang khách hàng”

---

# PHẦN C — DỮ LIỆU MẪU

## 15. Sản phẩm mẫu để dựng UI

Dùng dữ liệu mẫu sau để thiết kế giao diện có nội dung thật:

### 15.1 Mẫu 1

- Tên: Bó Hoa Pastel Dịu Dàng
- Danh mục: Bó hoa tươi
- Giá tham khảo: 450.000đ
- Trạng thái: Còn mẫu
- Hiển thị: Đang hiển thị
- Nổi bật: Có
- Mô tả ngắn: Bó hoa tone hồng kem nhẹ nhàng, phù hợp sinh nhật và kỷ niệm.
- Tags: Pastel, Sinh nhật, Bán chạy
- Số ảnh: 5

### 15.2 Mẫu 2

- Tên: Giỏ Hoa Khai Trương An Nhiên
- Danh mục: Hoa khai trương
- Giá tham khảo: 950.000đ
- Trạng thái: Còn mẫu
- Hiển thị: Đang hiển thị
- Nổi bật: Có
- Mô tả ngắn: Giỏ hoa tươi sắc cam đào và vàng kem, tạo cảm giác trang trọng.
- Tags: Khai trương, Sang trọng, Tươi sáng
- Số ảnh: 4

### 15.3 Mẫu 3

- Tên: Bó Tulip Trắng Thanh Lịch
- Danh mục: Hoa theo mùa
- Giá tham khảo: 680.000đ
- Trạng thái: Tạm hết
- Hiển thị: Đang hiển thị
- Nổi bật: Không
- Mô tả ngắn: Tulip trắng tối giản, phù hợp phong cách thanh lịch.
- Tags: Tulip, Tối giản, Theo mùa
- Số ảnh: 6

### 15.4 Mẫu 4

- Tên: Set Hoa Và Quà Lavender
- Danh mục: Set quà tặng
- Giá tham khảo: 720.000đ
- Trạng thái: Còn mẫu
- Hiển thị: Đang hiển thị
- Nổi bật: Có
- Mô tả ngắn: Set hoa lavender pastel kèm hộp quà nhỏ, phù hợp tặng người thân.
- Tags: Quà tặng, Lavender, Dịu dàng
- Số ảnh: 5

### 15.5 Mẫu 5

- Tên: Hoa Cưới Baby Breath
- Danh mục: Hoa cưới
- Giá tham khảo: 1.200.000đ
- Trạng thái: Còn mẫu
- Hiển thị: Đang hiển thị
- Nổi bật: Không
- Mô tả ngắn: Bó hoa cưới baby breath trắng tinh khôi, nhẹ nhàng và lãng mạn.
- Tags: Hoa cưới, Trắng, Lãng mạn
- Số ảnh: 4

### 15.6 Mẫu 6

- Tên: Kệ Hoa Chia Buồn Trang Nhã
- Danh mục: Hoa chia buồn
- Giá tham khảo: 1.500.000đ
- Trạng thái: Còn mẫu
- Hiển thị: Đang ẩn
- Nổi bật: Không
- Mô tả ngắn: Kệ hoa chia buồn tone trắng xanh, trang nhã và tinh tế.
- Tags: Chia buồn, Trang nhã, Trắng xanh
- Số ảnh: 3

### 15.7 Mẫu 7

- Tên: Bó Hoa Hồng Kem Vintage
- Danh mục: Hoa sinh nhật
- Giá tham khảo: 520.000đ
- Trạng thái: Còn mẫu
- Hiển thị: Đang hiển thị
- Nổi bật: Có
- Mô tả ngắn: Bó hoa hồng kem phong cách vintage Hàn Quốc.
- Tags: Hoa hồng, Vintage, Sinh nhật
- Số ảnh: 5

### 15.8 Mẫu 8

- Tên: Hộp Hoa Sáp Pastel
- Danh mục: Hoa sáp
- Giá tham khảo: 390.000đ
- Trạng thái: Còn mẫu
- Hiển thị: Đang hiển thị
- Nổi bật: Không
- Mô tả ngắn: Hộp hoa sáp nhiều màu pastel, giữ được lâu và dễ trưng bày.
- Tags: Hoa sáp, Pastel, Quà tặng
- Số ảnh: 4

---

# PHẦN D — COMPONENTS CẦN THIẾT KẾ

## 16. Component khách hàng

Cần thiết kế các component sau:

- Header
- Hero section
- Category pills/cards
- Search bar
- Filter dropdown
- Product card
- Product gallery
- Product detail information panel
- Contact CTA block
- Related product card
- Store info section
- Footer
- Empty search state
- Loading skeleton

## 17. Component admin

Cần thiết kế các component sau:

- Login form
- Sidebar
- Top bar
- Statistic card
- Admin table
- Table row actions
- Product form
- Image uploader
- Image gallery manager
- Toggle switch
- Status badge
- Category selector
- Confirmation modal
- Empty state
- Toast notification
- Pagination

---

# PHẦN E — TRẠNG THÁI UI

## 18. Trạng thái cần thể hiện

Thiết kế cần có các trạng thái sau:

### Trang khách

- Đang tải danh sách sản phẩm.
- Không tìm thấy sản phẩm phù hợp.
- Sản phẩm tạm hết.
- Sản phẩm nổi bật.
- Ảnh sản phẩm được chọn trong gallery.
- Hover product card.
- Filter active.

### Trang admin

- Login loading.
- Login error.
- Table loading.
- Không có sản phẩm.
- Form validation error.
- Upload ảnh.
- Đang lưu.
- Lưu thành công.
- Xác nhận xóa.
- Xóa thành công.
- Toggle hiển thị thành công.

---

# PHẦN F — YÊU CẦU KHÔNG ĐƯỢC THIẾT KẾ

Không thiết kế các chức năng sau:

- Không có giỏ hàng.
- Không có checkout.
- Không có thanh toán online.
- Không có tracking đơn hàng.
- Không có tài khoản khách hàng.
- Không có đánh giá sản phẩm.
- Không có số lượng tồn kho chi tiết.
- Không có flow đặt hàng.
- Không dùng ngôn ngữ “Mua ngay” hoặc “Đặt hàng ngay”.

Thay vào đó, dùng các CTA:

- “Liên hệ tư vấn”
- “Nhắn Zalo”
- “Gọi cửa hàng”
- “Xem chi tiết”
- “Xem menu”

---

# PHẦN G — YÊU CẦU OUTPUT CHO STITCH

Hãy tạo thiết kế UI desktop hoàn chỉnh cho website **Menu Hoa** theo mô tả trên.

Ưu tiên tạo đầy đủ các màn hình sau:

1. Trang chủ / menu hoa cho khách hàng.
2. Trang chi tiết sản phẩm hoa với gallery nhiều ảnh.
3. Trang đăng nhập admin.
4. Dashboard admin.
5. Trang quản lý hoa dạng table.
6. Trang thêm/sửa sản phẩm hoa.
7. Trang xem chi tiết sản phẩm trong admin.
8. Trang quản lý danh mục.
9. Trang cài đặt cửa hàng.
10. Modal xác nhận xóa sản phẩm.

Thiết kế cần nhất quán, đẹp, rõ hierarchy, dễ chuyển thành code frontend sau này.  
Phong cách tổng thể: **pastel Hàn Quốc, mềm mại, hiện đại, desktop-first**.
