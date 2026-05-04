# CODEX_MENU_HOA_IMPLEMENTATION.md

## 0. Vai trò của Codex

Bạn là kỹ sư full-stack chịu trách nhiệm hoàn thiện dự án website **Menu Hoa** từ bộ giao diện Stitch đã xuất ra, chuyển sang ứng dụng **ExpressJS + Pug + MongoDB + Tailwind build + Cloudinary**.

Mục tiêu: biến giao diện trong `project/design` thành một website hoàn chỉnh, có trang khách hàng và khu vực admin CRUD, giữ tinh thần thiết kế pastel Hàn Quốc, ưu tiên mobile trước nhưng vẫn đẹp trên desktop.

---

## 1. Nguyên tắc làm việc bắt buộc

Trước khi sửa code:

1. Đọc toàn bộ cấu trúc project hiện tại.
2. Đọc folder giao diện Stitch tại:
   ```txt
   project/design
   ```
3. Không xóa hoặc ghi đè file Stitch gốc.
4. Không phá thiết kế đã có nếu không cần thiết.
5. Khi cần chỉnh giao diện, chỉ chỉnh để phù hợp với Pug, Express, responsive layout, accessibility và khả năng bảo trì.
6. Luôn lập plan trước khi code.
7. Chia nhỏ task, commit/ghi chú theo từng phase nếu môi trường hỗ trợ.
8. Nếu phát hiện thiếu file, thiếu cấu hình hoặc lỗi không thể tự suy luận an toàn, hãy ghi rõ trong plan và dùng giá trị placeholder hợp lý.
9. Không thêm giỏ hàng, checkout, thanh toán, tài khoản khách hàng hoặc flow đặt hàng.
10. Dự án phải dễ mở rộng về sau: controller riêng, model riêng, route riêng, middleware riêng, service riêng khi cần.

---

## 2. Bối cảnh sản phẩm

Website tên: **Menu Hoa**

Website dùng để hiển thị menu các mẫu hoa cho khách xem. Khách hàng có thể:

- Xem danh sách hoa.
- Tìm kiếm hoa.
- Lọc theo danh mục, trạng thái, khoảng giá.
- Xem chi tiết sản phẩm.
- Liên hệ cửa hàng qua điện thoại, Zalo hoặc bản đồ.

Website **không** có đặt hàng trực tiếp, không có giỏ hàng, không có checkout.

Ngoài trang khách hàng, cần có khu vực admin để quản trị menu hoa:

- Đăng nhập admin.
- Dashboard.
- CRUD sản phẩm hoa.
- Upload nhiều ảnh sản phẩm.
- Sắp xếp ảnh.
- Đặt ảnh chính.
- Ẩn/hiện sản phẩm.
- Đánh dấu nổi bật.
- Quản lý danh mục.
- Quản lý cài đặt cửa hàng.
- Soft delete sản phẩm.
- Chặn xóa danh mục nếu đang có sản phẩm sử dụng.

Ngôn ngữ giao diện: **Tiếng Việt**.

---

## 3. Công nghệ bắt buộc

### 3.1 Runtime

- Node.js: `v22`
- Module system: **ES Modules**
- `package.json` cần có:
  ```json
  {
    "type": "module"
  }
  ```

### 3.2 Backend

Dùng:

- `express`
- `pug`
- `mongoose`
- `dotenv`
- `method-override`
- `express-session`
- `connect-mongo`
- `bcrypt`
- `express-validator`
- `helmet`
- `express-rate-limit`
- `cookie-parser`
- `connect-flash`
- `cloudinary`
- `multer`
- `multer-storage-cloudinary` hoặc service upload Cloudinary riêng
- thư viện sanitize phù hợp, ví dụ:
  - `express-mongo-sanitize`
  - `sanitize-html`
  - hoặc cách sanitize tương đương

### 3.3 Frontend

- Template engine: **Pug**
- CSS: **Tailwind build**, không phụ thuộc CDN trong production.
- Có thể tham khảo Tailwind config từ Stitch nhưng cần chuyển thành file build chính thức.
- Dùng JavaScript nhỏ trong `public/js` cho:
  - Gallery ảnh sản phẩm.
  - Preview ảnh upload.
  - Sắp xếp ảnh admin nếu cần.
  - Bulk action UI.
  - Confirm modal.
  - Toast.

### 3.4 Font và icon

Giao diện Stitch đang dùng:

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet"/>

<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

Trong Pug layout cần giữ font và Material Symbols.

Không dùng trực tiếp:

```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

Thay vào đó cấu hình Tailwind build local.

---

## 4. Cấu trúc thư mục đề xuất

Tổ chức project rõ ràng như sau:

```txt
project/
├─ app.js
├─ server.js
├─ package.json
├─ .env
├─ .env.example
├─ tailwind.config.js
├─ postcss.config.js
├─ src/
│  ├─ config/
│  │  ├─ db.js
│  │  ├─ cloudinary.js
│  │  └─ session.js
│  ├─ controllers/
│  │  ├─ publicController.js
│  │  ├─ authController.js
│  │  ├─ adminDashboardController.js
│  │  ├─ adminFlowerController.js
│  │  ├─ adminCategoryController.js
│  │  └─ adminSettingsController.js
│  ├─ middleware/
│  │  ├─ authMiddleware.js
│  │  ├─ uploadMiddleware.js
│  │  ├─ validationMiddleware.js
│  │  ├─ securityMiddleware.js
│  │  └─ errorMiddleware.js
│  ├─ models/
│  │  ├─ Admin.js
│  │  ├─ Flower.js
│  │  ├─ Category.js
│  │  └─ StoreSettings.js
│  ├─ routes/
│  │  ├─ publicRoutes.js
│  │  ├─ authRoutes.js
│  │  ├─ adminRoutes.js
│  │  ├─ adminFlowerRoutes.js
│  │  ├─ adminCategoryRoutes.js
│  │  └─ adminSettingsRoutes.js
│  ├─ services/
│  │  ├─ cloudinaryService.js
│  │  ├─ slugService.js
│  │  └─ imageService.js
│  ├─ utils/
│  │  ├─ formatCurrency.js
│  │  ├─ pagination.js
│  │  └─ queryBuilder.js
│  ├─ validators/
│  │  ├─ authValidators.js
│  │  ├─ flowerValidators.js
│  │  ├─ categoryValidators.js
│  │  └─ settingsValidators.js
│  └─ styles/
│     └─ tailwind.css
├─ views/
│  ├─ layouts/
│  │  ├─ public.pug
│  │  └─ admin.pug
│  ├─ partials/
│  │  ├─ public/
│  │  │  ├─ header.pug
│  │  │  ├─ footer.pug
│  │  │  ├─ flower-card.pug
│  │  │  ├─ category-filter.pug
│  │  │  ├─ contact-cta.pug
│  │  │  └─ pagination.pug
│  │  └─ admin/
│  │     ├─ sidebar.pug
│  │     ├─ topbar.pug
│  │     ├─ toast.pug
│  │     ├─ status-badge.pug
│  │     ├─ confirmation-modal.pug
│  │     └─ pagination.pug
│  ├─ public/
│  │  ├─ home.pug
│  │  ├─ flower-detail.pug
│  │  ├─ contact.pug
│  │  └─ not-found.pug
│  ├─ auth/
│  │  └─ login.pug
│  └─ admin/
│     ├─ dashboard.pug
│     ├─ flowers/
│     │  ├─ index.pug
│     │  ├─ new.pug
│     │  ├─ edit.pug
│     │  └─ show.pug
│     ├─ categories/
│     │  └─ index.pug
│     └─ settings/
│        └─ index.pug
├─ public/
│  ├─ css/
│  │  └─ app.css
│  ├─ js/
│  │  ├─ public-gallery.js
│  │  ├─ admin-flowers.js
│  │  ├─ image-uploader.js
│  │  ├─ bulk-actions.js
│  │  └─ toast.js
│  ├─ images/
│  │  ├─ placeholders/
│  │  └─ seed/
│  └─ uploads/
│     └─ .gitkeep
├─ scripts/
│  ├─ seedAdmin.js
│  └─ seedCategories.js
└─ design/
   └─ [Stitch export files]
```

Ghi chú:

- `design/` là folder giao diện Stitch, chỉ đọc để chuyển đổi sang Pug.
- Không đưa logic lớn vào route file.
- Route chỉ định tuyến, controller xử lý request/response.
- Service xử lý logic phụ như upload ảnh, xóa ảnh Cloudinary, tạo slug.

---

## 5. Environment variables

Tạo `.env.example`:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://127.0.0.1:27017/menu_hoa

SESSION_SECRET=replace_with_a_long_random_secret

ADMIN_SEED_EMAIL=BanHoa@gmail.com
ADMIN_SEED_PASSWORD=1234567890

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=menu-hoa

STORE_NAME=Menu Hoa
STORE_PHONE=
STORE_ZALO=
STORE_ADDRESS=
STORE_GOOGLE_MAPS_URL=
```

Không hard-code Cloudinary secret, Mongo URI, session secret trong code.

---

## 6. Package scripts

Trong `package.json`, tạo các script:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "build:css": "tailwindcss -i ./src/styles/tailwind.css -o ./public/css/app.css --minify",
    "watch:css": "tailwindcss -i ./src/styles/tailwind.css -o ./public/css/app.css --watch",
    "seed:admin": "node scripts/seedAdmin.js",
    "seed:categories": "node scripts/seedCategories.js"
  }
}
```

Có thể bổ sung script `dev:css` hoặc dùng song song nếu cần.

---

## 7. Tailwind theme

Tạo `tailwind.config.js` để map tinh thần Stitch:

```js
export default {
  content: [
    './views/**/*.pug',
    './src/**/*.js',
    './public/js/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Be Vietnam Pro', 'system-ui', 'sans-serif']
      },
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF8F7',
          200: '#F8EFEF'
        },
        rosePastel: {
          100: '#FCE7EC',
          200: '#F6B8C6',
          300: '#EE9DAF'
        },
        lavender: {
          100: '#F1E8FB',
          200: '#D9C2F0'
        },
        mint: {
          100: '#E4F6F1',
          200: '#BFE7DD'
        },
        textMain: '#3F3434',
        textSoft: '#8A7777',
        borderSoft: '#F1DCDC'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(63, 52, 52, 0.08)',
        card: '0 12px 30px rgba(63, 52, 52, 0.06)'
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
```

Nếu project ES Modules gây vấn đề với `tailwind.config.js`, dùng `tailwind.config.cjs`.

---

## 8. Data model

### 8.1 Admin model

`Admin.js`

Fields:

```js
{
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Admin'
  },
  role: {
    type: String,
    enum: ['owner'],
    default: 'owner'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: Date
}
```

Chỉ cần 1 admin duy nhất trong phase đầu.

Seeder admin:

- Email: `BanHoa@gmail.com`
- Password: `1234567890`
- Password phải hash bằng `bcrypt`.

### 8.2 Category model

`Category.js`

Fields:

```js
{
  name: String,
  slug: String,
  description: String,
  icon: String,
  image: {
    url: String,
    publicId: String
  },
  isVisible: Boolean,
  sortOrder: Number,
  deletedAt: Date
}
```

Rules:

- `name` bắt buộc.
- `slug` unique.
- Không xóa cứng nếu có sản phẩm đang dùng.
- Nếu không có sản phẩm đang dùng, có thể soft delete category.
- Chỉ hiển thị category `isVisible: true` và `deletedAt: null` ở trang khách.

Danh mục seed nên có:

- Hoa sinh nhật
- Hoa cưới
- Hoa khai trương
- Hoa chia buồn
- Bó hoa tươi
- Giỏ hoa
- Hoa theo mùa
- Hoa sáp
- Set quà tặng

### 8.3 Flower model

`Flower.js`

Fields đề xuất:

```js
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  referencePrice: {
    type: Number,
    required: true,
    min: 0
  },
  shortDescription: {
    type: String,
    maxlength: 160
  },
  description: String,
  suitableOccasions: [String],
  mainColors: [String],
  sizeNote: String,
  tags: [String],
  internalNote: String,
  images: [
    {
      url: String,
      publicId: String,
      alt: String,
      isPrimary: Boolean,
      sortOrder: Number
    }
  ],
  availabilityStatus: {
    type: String,
    enum: ['available', 'out_of_stock'],
    default: 'available'
  },
  visibilityStatus: {
    type: String,
    enum: ['visible', 'hidden'],
    default: 'visible'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}
```

Rules:

- Tự tạo slug từ tên.
- Nếu trùng slug, thêm hậu tố `-2`, `-3`, ...
- Soft delete: set `deletedAt`, không xóa khỏi DB ngay.
- Khi soft delete product, xóa ảnh Cloudinary nếu yêu cầu của action là xóa vĩnh viễn asset.
- Trang khách chỉ hiển thị:
  ```js
  deletedAt: null
  visibilityStatus: 'visible'
  ```
- Sản phẩm tạm hết vẫn có thể hiển thị nếu `visibilityStatus = visible`.

### 8.4 StoreSettings model

`StoreSettings.js`

Fields:

```js
{
  storeName: String,
  phone: String,
  zalo: String,
  address: String,
  openingHours: String,
  googleMapsUrl: String,
  description: String,
  logo: {
    url: String,
    publicId: String
  },
  banner: {
    url: String,
    publicId: String
  }
}
```

Default:

```js
{
  storeName: 'Menu Hoa',
  phone: '',
  zalo: '',
  address: '',
  openingHours: '08:00 - 20:00, Thứ 2 - Chủ nhật',
  googleMapsUrl: '',
  description: 'Menu hoa tươi mỗi ngày với phong cách pastel nhẹ nhàng.'
}
```

---

## 9. Routing

### 9.1 Public routes

```txt
GET /                         Trang chủ/menu hoa
GET /flowers                  Alias hoặc route danh sách menu hoa
GET /flowers/:slug            Chi tiết sản phẩm
GET /contact                  Thông tin liên hệ
```

Có thể giữ `/` là menu chính và `/flowers` redirect về `/`.

Query string cho server-side filtering:

```txt
/?q=hoa+hồng&category=hoa-sinh-nhat&price=300-500&status=available&page=1
```

Supported filters:

- `q`: tìm theo tên, mô tả ngắn, tags.
- `category`: slug danh mục.
- `price`:
  - `under-300`
  - `300-500`
  - `500-1000`
  - `over-1000`
- `status`:
  - `available`
  - `out_of_stock`
- `page`: pagination.

### 9.2 Auth routes

```txt
GET  /admin/login
POST /admin/login
POST /admin/logout
```

Sau login thành công redirect về:

```txt
/admin
```

Trang quên mật khẩu chỉ là UI, không cần flow thật trong phase đầu.

### 9.3 Admin routes

```txt
GET /admin
```

Dashboard.

### 9.4 Admin flower routes

```txt
GET    /admin/flowers
GET    /admin/flowers/new
POST   /admin/flowers
GET    /admin/flowers/:id
GET    /admin/flowers/:id/edit
PUT    /admin/flowers/:id
POST   /admin/flowers/:id/toggle-visibility
POST   /admin/flowers/:id/toggle-featured
POST   /admin/flowers/:id/delete
POST   /admin/flowers/bulk
```

Vì form HTML không hỗ trợ PUT/DELETE trực tiếp, dùng `method-override` hoặc POST action rõ ràng. Ưu tiên submit form bình thường, không cần AJAX cho toggle.

### 9.5 Admin category routes

```txt
GET  /admin/categories
POST /admin/categories
PUT  /admin/categories/:id
POST /admin/categories/:id/toggle-visibility
POST /admin/categories/:id/delete
```

Chặn xóa category nếu có product đang dùng.

### 9.6 Admin settings routes

```txt
GET  /admin/settings
POST /admin/settings
```

---

## 10. Authentication và security

### 10.1 Auth đề xuất

Dùng:

- `express-session`
- `connect-mongo`
- `bcrypt`
- Session lưu trong MongoDB.

Lý do:

- Phù hợp admin server-rendered Pug.
- Dễ bảo vệ route admin.
- Không cần JWT cho app không có frontend SPA.

### 10.2 Auth middleware

Tạo middleware:

```js
requireAdmin(req, res, next)
redirectIfAuthenticated(req, res, next)
attachCurrentAdmin(req, res, next)
```

Rules:

- Nếu chưa login mà vào `/admin` hoặc `/admin/*`, redirect `/admin/login`.
- Nếu đã login mà vào `/admin/login`, redirect `/admin`.
- `res.locals.currentAdmin` luôn có khi admin đã login.

### 10.3 Password

- Hash password bằng `bcrypt`.
- Không lưu password plain text.
- Seeder admin dùng `.env`:
  - `ADMIN_SEED_EMAIL`
  - `ADMIN_SEED_PASSWORD`

### 10.4 Rate limit login

Dùng `express-rate-limit` cho `POST /admin/login`.

Gợi ý:

```js
windowMs: 15 * 60 * 1000
max: 10
message: 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.'
```

### 10.5 CSRF

Nên có CSRF protection cho form admin.

Có thể dùng thư viện CSRF phù hợp với Express hiện tại. Nếu dùng thư viện như `csrf-csrf`, đảm bảo:

- Token được gắn vào `res.locals.csrfToken`.
- Tất cả form POST/PUT/DELETE admin có hidden input `_csrf`.
- Exclude static assets.

Nếu triển khai CSRF gây xung đột lớn trong phase đầu, ghi rõ trong plan và tối thiểu phải có:

- session auth
- helmet
- rate limit login
- server-side validation
- sanitize input

### 10.6 Sanitize

- Sanitize text fields trước khi lưu.
- Không render HTML không tin cậy từ database nếu chưa sanitize.
- Dùng Pug escaped output mặc định.
- Không dùng `!=` với dữ liệu user/admin nhập, trừ khi đã sanitize rõ ràng.

---

## 11. Upload ảnh Cloudinary

### 11.1 Yêu cầu

- Sản phẩm hỗ trợ nhiều ảnh.
- Có ảnh chính.
- Có ảnh phụ.
- Có thể sắp xếp thứ tự ảnh.
- Có thể xóa từng ảnh.
- Có preview ảnh dạng grid.
- Có validate loại file và dung lượng.

### 11.2 Validation ảnh

Đề xuất:

- MIME type:
  - `image/jpeg`
  - `image/png`
  - `image/webp`
- Max file size: `5MB` mỗi ảnh.
- Max số ảnh/sản phẩm: `8`
- Min số ảnh/sản phẩm: `1`

### 11.3 Cloudinary folder

Dùng folder:

```txt
menu-hoa/flowers
menu-hoa/categories
menu-hoa/settings
```

### 11.4 Image object

Mỗi ảnh trong DB gồm:

```js
{
  url,
  publicId,
  alt,
  isPrimary,
  sortOrder
}
```

### 11.5 Reorder ảnh

Cách làm đơn giản, server-rendered:

- Admin form render danh sách ảnh hiện tại.
- Mỗi ảnh có hidden input:
  - `existingImages[index][publicId]`
  - `existingImages[index][sortOrder]`
  - `existingImages[index][isPrimary]`
  - `existingImages[index][shouldDelete]`
- JS cho phép kéo thả hoặc dùng nút lên/xuống.
- Khi submit, controller nhận payload và cập nhật thứ tự.
- Ảnh bị đánh dấu xóa thì xóa Cloudinary bằng `publicId`.

Nếu drag-and-drop phức tạp, dùng thư viện nhỏ như `SortableJS`.

---

## 12. Toast notification

Dùng thư viện nhẹ, ví dụ:

- `notyf`
- hoặc `toastify-js`

Yêu cầu:

- Hiển thị success/error sau khi:
  - Login lỗi.
  - Tạo sản phẩm thành công.
  - Cập nhật sản phẩm thành công.
  - Xóa sản phẩm thành công.
  - Toggle hiển thị thành công.
  - Bulk action thành công.
  - Lưu settings thành công.

Kết hợp `connect-flash`:

```js
req.flash('success', 'Đã lưu thay đổi.')
req.flash('error', 'Có lỗi xảy ra.')
```

Trong Pug layout, render flash message vào script JSON an toàn để JS toast hiển thị.

---

## 13. Public UI requirements

### 13.1 Header

- Logo: **Menu Hoa**
- Navigation:
  - Trang chủ
  - Danh mục hoa
  - Hoa nổi bật
  - Liên hệ
- CTA: **Liên hệ cửa hàng**
- Mobile:
  - Có hamburger menu.
  - Menu mở dạng panel/dropdown.

Không có:

- Giỏ hàng
- Tài khoản khách hàng
- Checkout
- Mua ngay

### 13.2 Home/Menu page

Route:

```txt
GET /
```

Sections:

1. Hero
2. Category filter
3. Search + filters
4. Product grid
5. Featured flowers
6. Store info
7. Footer

Hero content:

- Title: `Menu hoa tươi mỗi ngày`
- Description:
  `Khám phá các mẫu hoa tươi, bó hoa, giỏ hoa và set hoa theo dịp. Menu chỉ dùng để tham khảo, vui lòng liên hệ cửa hàng để được tư vấn.`
- CTA chính: `Xem menu hoa`
- CTA phụ: `Liên hệ Zalo`

### 13.3 Product card

Fields:

- Ảnh chính.
- Badge danh mục.
- Badge trạng thái:
  - `Còn mẫu`
  - `Tạm hết`
- Tên sản phẩm.
- Giá tham khảo.
- Mô tả ngắn.
- Tags.
- CTA:
  - `Xem chi tiết`
  - `Liên hệ tư vấn`

Không dùng:

- `Mua ngay`
- `Đặt hàng ngay`
- `Thêm vào giỏ`

### 13.4 Product detail page

Route:

```txt
GET /flowers/:slug
```

Layout:

- Mobile-first: ảnh trước, thông tin sau.
- Desktop: 2 cột.
- Gallery nhiều ảnh:
  - Main image.
  - Thumbnail list.
  - Selected state.
- Info:
  - Tên sản phẩm.
  - Danh mục.
  - Giá tham khảo.
  - Trạng thái.
  - Mô tả chi tiết.
  - Dịp phù hợp.
  - Màu sắc chủ đạo.
  - Kích thước tham khảo.
  - Tags.
- CTA:
  - `Nhắn Zalo để tư vấn`
  - `Gọi cửa hàng`
  - `Quay lại menu`
- Related products:
  - 3-4 sản phẩm cùng danh mục hoặc cùng tags.

### 13.5 Empty states

Cần có:

- Không tìm thấy sản phẩm phù hợp.
- Chưa có sản phẩm.
- Không có sản phẩm nổi bật.
- Ảnh placeholder nếu sản phẩm chưa có ảnh.

---

## 14. Admin UI requirements

### 14.1 Login page

Route:

```txt
GET /admin/login
```

Desktop:

- 2 cột nếu đủ rộng:
  - Cột trái: pastel visual/quote.
  - Cột phải: form.
- Mobile:
  - Form full width.
  - Visual thu gọn hoặc ẩn.

Form fields:

- Email
- Mật khẩu
- Checkbox `Ghi nhớ đăng nhập`
- Link `Quên mật khẩu?` chỉ UI
- Button `Đăng nhập`

States:

- Default
- Focus
- Loading
- Error: `Email hoặc mật khẩu không đúng.`

### 14.2 Admin layout

Sau đăng nhập dùng layout dashboard.

Sidebar:

- Logo: **Menu Hoa**
- Menu:
  - Tổng quan
  - Quản lý hoa
  - Danh mục
  - Cài đặt cửa hàng
- Logout

Topbar:

- Tiêu đề trang.
- Search nhanh nếu phù hợp.
- Avatar admin.
- Tên admin: `Admin`.
- Badge: `Đang online`.

Mobile admin:

- Sidebar chuyển thành drawer.
- Table có thể scroll ngang.
- Action buttons không vỡ layout.

### 14.3 Dashboard

Route:

```txt
GET /admin
```

Cards thống kê:

- Tổng số mẫu hoa
- Đang hiển thị
- Tạm ẩn
- Tạm hết

Blocks:

- Số mẫu theo danh mục.
- Sản phẩm mới cập nhật gần đây.
- Top mẫu nổi bật.

Quick actions:

- `Thêm mẫu hoa`
- `Quản lý danh mục`
- `Xem menu khách hàng`

### 14.4 Admin flower list

Route:

```txt
GET /admin/flowers
```

Header:

- Title: `Quản lý hoa`
- Description: `Thêm, chỉnh sửa và quản lý các mẫu hoa hiển thị trên menu.`
- Button: `Thêm mẫu hoa`

Filters:

- Search theo tên hoa.
- Category.
- Visibility:
  - Đang hiển thị
  - Đang ẩn
- Availability:
  - Còn mẫu
  - Tạm hết
- Featured:
  - Tất cả
  - Hoa nổi bật
- Sort:
  - Mới cập nhật
  - Giá thấp đến cao
  - Giá cao đến thấp
  - Tên A-Z

Table columns:

- Checkbox.
- Thumbnail.
- Tên hoa.
- Danh mục.
- Giá tham khảo.
- Trạng thái hàng.
- Trạng thái hiển thị.
- Nổi bật.
- Ngày cập nhật.
- Hành động:
  - Xem
  - Sửa
  - Ẩn/Hiện
  - Xóa

Bulk actions:

- Ẩn khỏi menu.
- Hiện trên menu.
- Đánh dấu nổi bật.
- Bỏ nổi bật.
- Xóa.

Bulk action submit bằng form thường.

### 14.5 New/Edit flower form

Routes:

```txt
GET  /admin/flowers/new
POST /admin/flowers
GET  /admin/flowers/:id/edit
PUT  /admin/flowers/:id
```

Layout:

- Mobile: 1 cột.
- Desktop: 2 cột.
  - Cột trái: thông tin chính.
  - Cột phải: ảnh, trạng thái, preview.

Fields:

- Tên sản phẩm.
- Danh mục.
- Giá tham khảo.
- Mô tả ngắn.
- Mô tả chi tiết.
- Dịp phù hợp.
- Màu sắc chủ đạo.
- Kích thước tham khảo.
- Tags.
- Ghi chú nội bộ.
- Upload nhiều ảnh.
- Ảnh chính.
- Ảnh phụ.
- Thứ tự ảnh.
- Toggle hiển thị.
- Toggle nổi bật.
- Select trạng thái:
  - Còn mẫu.
  - Tạm hết.

Buttons:

- `Lưu thay đổi`
- `Lưu nháp`
- `Hủy`
- Với edit:
  - `Xóa mẫu hoa`

Validation:

- Tên sản phẩm bắt buộc.
- Danh mục bắt buộc.
- Giá phải là số hợp lệ và >= 0.
- Cần ít nhất 1 ảnh sản phẩm khi tạo mới.
- Mô tả ngắn không vượt quá 160 ký tự.
- Tags parse từ chuỗi, phân tách bằng dấu phẩy.
- Dịp phù hợp parse từ chuỗi hoặc checkbox.
- Màu sắc chủ đạo parse từ chuỗi hoặc checkbox.

### 14.6 Admin flower detail

Route:

```txt
GET /admin/flowers/:id
```

Show:

- Gallery ảnh.
- Thông tin chính.
- Trạng thái hiển thị.
- Trạng thái còn/tạm hết.
- Lần cập nhật gần nhất.
- Người cập nhật.
- Preview card giống trang khách.

Actions:

- `Chỉnh sửa`
- `Ẩn khỏi menu` hoặc `Hiện trên menu`
- `Đánh dấu nổi bật` hoặc `Bỏ nổi bật`
- `Xóa`

### 14.7 Delete confirmation modal

Khi admin bấm xóa:

- Hiển thị modal xác nhận.
- Title: `Xóa mẫu hoa?`
- Description:
  `Hành động này sẽ xóa mẫu hoa khỏi hệ thống quản lý menu. Bạn không thể hoàn tác.`
- Button phụ: `Hủy`
- Button nguy hiểm: `Xóa mẫu hoa`

Vì hệ thống dùng soft delete, text có thể bổ sung nhỏ:

`Sản phẩm sẽ bị ẩn khỏi hệ thống quản lý chính và không hiển thị trên menu khách hàng.`

### 14.8 Categories

Route:

```txt
GET /admin/categories
```

Features:

- Danh sách category.
- Thêm category.
- Sửa category.
- Ẩn/hiện category.
- Soft delete category nếu không có sản phẩm đang dùng.
- Chặn xóa nếu category đang có sản phẩm.

Fields:

- Tên danh mục.
- Mô tả.
- Icon/emoji hoặc ảnh đại diện.
- Trạng thái hiển thị.
- Sort order.

### 14.9 Settings

Route:

```txt
GET  /admin/settings
POST /admin/settings
```

Fields:

- Tên cửa hàng.
- Số điện thoại.
- Zalo.
- Địa chỉ.
- Giờ mở cửa.
- Link Google Maps.
- Mô tả cửa hàng.
- Ảnh banner.
- Logo.

Buttons:

- `Lưu cài đặt`
- `Xem trang khách hàng`

Thông tin thật sẽ được chủ dự án thêm sau, nên ban đầu cho phép field rỗng.

---

## 15. Server-side query design

### 15.1 Public flower query

Trong `publicController.home`, build query từ `req.query`.

Base filter:

```js
{
  deletedAt: null,
  visibilityStatus: 'visible'
}
```

Search:

- Nếu có `q`, dùng regex an toàn trên:
  - `name`
  - `shortDescription`
  - `tags`

Category:

- Nếu có `category`, tìm category theo slug, sau đó filter `category: category._id`.

Price:

- `under-300`: `< 300000`
- `300-500`: `>= 300000 && <= 500000`
- `500-1000`: `>= 500000 && <= 1000000`
- `over-1000`: `> 1000000`

Status:

- `available`
- `out_of_stock`

Sort:

- mặc định: mới cập nhật.
- featured section riêng lấy `isFeatured: true`.

Pagination:

- page size public: `12`.

### 15.2 Admin flower query

Base filter:

```js
{
  deletedAt: null
}
```

Filters:

- `q`
- `category`
- `visibilityStatus`
- `availabilityStatus`
- `isFeatured`
- `sort`

Pagination:

- page size admin: `10` hoặc `20`.

Sort mapping:

```js
recent: { updatedAt: -1 }
price_asc: { referencePrice: 1 }
price_desc: { referencePrice: -1 }
name_asc: { name: 1 }
```

---

## 16. Slug service

Tạo service:

```js
generateSlug(text)
createUniqueSlug(Model, text, currentId = null)
```

Rules:

- Bỏ dấu tiếng Việt.
- Lowercase.
- Replace space/symbol bằng `-`.
- Trim `-`.
- Nếu trùng, thêm `-2`, `-3`, ...
- Khi edit sản phẩm:
  - Nếu tên đổi thì update slug.
  - Nếu không đổi tên thì giữ slug.

---

## 17. Seed policy

### 17.1 Seed admin

Bắt buộc tạo `scripts/seedAdmin.js`.

Admin mặc định:

```txt
Email: BanHoa@gmail.com
Password: 1234567890
```

Dùng `.env` để override.

### 17.2 Seed categories

Nên tạo `scripts/seedCategories.js`.

Seed danh mục mặc định theo danh sách sản phẩm.

### 17.3 Không seed 8 sản phẩm vào DB

Không tự động seed 8 sản phẩm mẫu từ spec vào database vì yêu cầu hiện tại là **không seed product data**.

Tuy nhiên:

- Có thể dùng ảnh placeholder/seed trong `public/images/placeholders`.
- Có thể hiển thị empty state đẹp khi chưa có sản phẩm.
- Nếu cần demo nội bộ, có thể tạo file riêng `scripts/seedSampleFlowers.js` nhưng không chạy mặc định và không thêm vào flow chính nếu chưa được yêu cầu.

---

## 18. Placeholder image policy

Vì chưa có ảnh thật:

1. Tạo placeholder local trong `public/images/placeholders`.
2. Product không có ảnh thì dùng:
   ```txt
   /images/placeholders/flower-placeholder.svg
   ```
3. Admin form vẫn bắt buộc ít nhất 1 ảnh khi tạo sản phẩm thật.
4. Public UI không được vỡ nếu ảnh thiếu.
5. Seed ảnh placeholder chỉ dùng để làm giao diện không trống, không thay thế upload Cloudinary.

---

## 19. Validation rules

Dùng `express-validator`.

### 19.1 Login

- Email bắt buộc, đúng format.
- Password bắt buộc.
- Login error không tiết lộ email tồn tại hay không.

### 19.2 Flower

- `name`: required, max 120.
- `category`: required, valid ObjectId.
- `referencePrice`: required, number, min 0.
- `shortDescription`: max 160.
- `description`: sanitize.
- `tags`: sanitize + normalize.
- `suitableOccasions`: sanitize + normalize.
- `mainColors`: sanitize + normalize.
- `availabilityStatus`: enum.
- `visibilityStatus`: enum.
- Images:
  - create: tối thiểu 1 ảnh.
  - update: sau khi xóa/thêm vẫn phải còn ít nhất 1 ảnh.

### 19.3 Category

- `name`: required, max 80.
- `description`: max 300.
- `icon`: max 10.
- `sortOrder`: number.

### 19.4 Settings

- `storeName`: required.
- `phone`: optional.
- `zalo`: optional.
- `googleMapsUrl`: optional URL.
- `description`: max 500.

---

## 20. Error handling

Tạo error middleware:

- 404 page public.
- 404 admin hoặc redirect phù hợp.
- 500 page thân thiện.
- Log lỗi ở development.
- Không show stack trace ở production.

Admin form lỗi:

- Render lại form với dữ liệu cũ.
- Hiển thị error ngay dưới field.
- Giữ ảnh cũ khi edit nếu validation lỗi.
- Không upload trùng ảnh nếu validation fail sau upload; nếu đã upload mà fail, xóa ảnh vừa upload khỏi Cloudinary để tránh orphan file.

---

## 21. Accessibility và UX

Yêu cầu:

- Button có text rõ ràng.
- Input có label.
- Ảnh có alt.
- Focus state rõ.
- Modal trap focus nếu có thể.
- Mobile menu accessible.
- Không dùng màu quá gắt.
- Table admin scroll ngang trên mobile.
- Toast không che form quan trọng.
- CTA khách hàng dùng wording liên hệ, không dùng wording mua hàng.

---

## 22. Mapping từ Stitch sang Pug

Codex cần làm theo quy trình:

1. Mở các file trong `project/design`.
2. Xác định các màn hình Stitch:
   - Home/menu.
   - Product detail.
   - Admin login.
   - Admin dashboard.
   - Admin flowers table.
   - Admin flower form.
   - Admin flower detail.
   - Admin categories.
   - Admin settings.
   - Delete modal.
3. Tách layout lặp lại:
   - Public layout.
   - Admin layout.
   - Header.
   - Footer.
   - Sidebar.
   - Topbar.
   - Product card.
   - Status badge.
   - Form components.
4. Chuyển HTML sang Pug.
5. Chuyển class Tailwind sang Pug syntax.
6. Không copy Tailwind CDN script.
7. Đưa font links vào layout.
8. Đưa JS page-specific vào block script.
9. Đảm bảo route render đúng view.

Ví dụ Pug layout cần có block:

```pug
doctype html
html(lang="vi")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title #{pageTitle || 'Menu Hoa'}
    link(rel="preconnect", href="https://fonts.googleapis.com")
    link(rel="preconnect", href="https://fonts.gstatic.com", crossorigin)
    link(href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap", rel="stylesheet")
    link(rel="stylesheet", href="/css/app.css")
    block head
  body(class="bg-cream-50 text-textMain font-sans")
    block content
    script(src="/js/toast.js")
    block scripts
```

---

## 23. Business rules

### 23.1 Không có e-commerce flow

Không được thêm:

- Cart.
- Checkout.
- Payment.
- Order.
- Customer account.
- Product review.
- Stock quantity.
- Buy now.
- Add to cart.

Allowed CTA:

- `Liên hệ tư vấn`
- `Nhắn Zalo`
- `Gọi cửa hàng`
- `Xem chi tiết`
- `Xem menu`

### 23.2 Visibility rules

Product public visible khi:

```js
deletedAt === null
visibilityStatus === 'visible'
```

Product admin list visible khi:

```js
deletedAt === null
```

Category public visible khi:

```js
deletedAt === null
isVisible === true
```

### 23.3 Delete rules

Flower delete:

- Soft delete.
- Không hiển thị public.
- Không hiện trong list chính admin.
- Có thể chưa cần trang recycle bin.

Category delete:

- Nếu còn flower active dùng category đó: chặn.
- Nếu không còn flower active: soft delete.

### 23.4 Bulk action rules

Admin bulk action:

- Validate selected IDs.
- Chỉ tác động item `deletedAt: null`.
- Sau action redirect về list với flash message.
- Nếu không chọn item, báo lỗi.

---

## 24. Phase plan

Codex cần lập plan và triển khai theo phase sau.

### Phase 1 — Project foundation

Tasks:

- Tạo `package.json`.
- Cài dependencies.
- Cấu hình ES Modules.
- Tạo `server.js`, `app.js`.
- Cấu hình Express:
  - static files.
  - Pug.
  - body parser.
  - method override.
  - cookie parser.
  - session.
  - flash.
  - security middleware.
  - routes.
  - error middleware.
- Tạo `.env.example`.
- Kết nối MongoDB local.
- Cấu hình Tailwind build.
- Tạo base layouts.

Acceptance:

- `npm run dev` chạy được.
- `npm run build:css` chạy được.
- Vào `/` thấy page tạm.
- Vào `/admin/login` thấy page tạm.

### Phase 2 — Models, seeders, auth

Tasks:

- Tạo models:
  - Admin.
  - Category.
  - Flower.
  - StoreSettings.
- Tạo slug service.
- Tạo seed admin.
- Tạo seed categories.
- Tạo auth routes/controllers.
- Tạo login/logout.
- Tạo session-based admin middleware.
- Tạo rate limit login.
- Hash password bằng bcrypt.

Acceptance:

- Chạy `npm run seed:admin` tạo admin.
- Login bằng admin seed được.
- Chưa login không vào được `/admin`.
- Logout hoạt động.

### Phase 3 — Convert Stitch public UI to Pug

Tasks:

- Chuyển public header/footer/hero/filter/product card từ Stitch sang Pug.
- Tạo home page server-side query.
- Tạo flower detail page.
- Tạo gallery JS.
- Tạo contact block từ StoreSettings.
- Tạo empty states.
- Tạo responsive mobile-first.

Acceptance:

- `/` render danh sách sản phẩm từ MongoDB.
- Filter server-side hoạt động.
- Search server-side hoạt động.
- `/flowers/:slug` render đúng.
- Không có cart/checkout/buy wording.

### Phase 4 — Admin layout and dashboard

Tasks:

- Chuyển admin layout Stitch sang Pug.
- Sidebar/topbar.
- Dashboard stats.
- Recent flowers.
- Featured flowers.
- Category stats.
- Mobile drawer.

Acceptance:

- `/admin` có dashboard thật.
- Stats lấy từ MongoDB.
- Layout không vỡ mobile.

### Phase 5 — Admin flower CRUD

Tasks:

- Flower list với filters, sort, pagination.
- Flower new/edit form.
- Upload nhiều ảnh Cloudinary.
- Preview ảnh.
- Đặt ảnh chính.
- Sắp xếp ảnh.
- Delete image.
- Show detail.
- Soft delete.
- Toggle visibility.
- Toggle featured.
- Bulk actions.
- Validation.

Acceptance:

- Tạo sản phẩm có nhiều ảnh được.
- Sửa sản phẩm không mất ảnh.
- Xóa ảnh xóa cả Cloudinary asset.
- Xóa sản phẩm là soft delete.
- Public chỉ thấy sản phẩm visible.
- Bulk actions hoạt động bằng submit form thường.

### Phase 6 — Categories and settings

Tasks:

- Category list.
- Add/edit category.
- Toggle category visibility.
- Delete category with blocking rule.
- Settings page.
- Logo/banner upload nếu đủ thời gian.
- Contact info public lấy từ settings.

Acceptance:

- Không xóa được category đang có product.
- Settings lưu được.
- Public contact CTA dùng settings thật.

### Phase 7 — Polish, validation, security, docs

Tasks:

- Toast notification.
- Form error UI.
- 404/500 pages.
- Sanitize input.
- Helmet.
- CSRF nếu triển khai ổn định.
- Accessibility pass.
- Update README.
- Kiểm tra responsive.
- Kiểm tra no broken route.

Acceptance:

- Không có lỗi runtime cơ bản.
- Không render raw unsafe HTML.
- README có hướng dẫn setup.
- `.env.example` đầy đủ.
- `npm run dev` hoạt động.
- `npm run build:css` hoạt động.

---

## 25. README cần tạo/cập nhật

Tạo `README.md` có:

1. Tên dự án.
2. Tech stack.
3. Yêu cầu:
   - Node v22.
   - MongoDB local.
   - Cloudinary account.
4. Cài đặt:
   ```bash
   npm install
   cp .env.example .env
   npm run build:css
   npm run seed:admin
   npm run seed:categories
   npm run dev
   ```
5. Biến môi trường.
6. Admin mặc định.
7. Các route chính.
8. Cách upload ảnh.
9. Ghi chú không có checkout/cart/order.
10. Cách build CSS production.

---

## 26. Manual test checklist

### Public

- [ ] Trang chủ load được.
- [ ] Header mobile menu hoạt động.
- [ ] Search hoạt động.
- [ ] Filter category hoạt động.
- [ ] Filter price hoạt động.
- [ ] Filter status hoạt động.
- [ ] Reset filter hoạt động.
- [ ] Product card hiển thị ảnh, giá, badge.
- [ ] Product detail load đúng.
- [ ] Gallery thumbnail đổi ảnh chính.
- [ ] Related products hiển thị.
- [ ] CTA Zalo/phone/map không lỗi dù setting còn trống.
- [ ] Không có chữ `Mua ngay`.
- [ ] Không có chữ `Đặt hàng`.
- [ ] Không có cart/checkout route.

### Admin auth

- [ ] Login đúng thành công.
- [ ] Login sai báo lỗi.
- [ ] Rate limit login hoạt động.
- [ ] Logout hoạt động.
- [ ] Chưa login không vào được admin.

### Admin flowers

- [ ] List hoa load được.
- [ ] Filter admin hoạt động.
- [ ] Sort hoạt động.
- [ ] Pagination hoạt động.
- [ ] Tạo hoa mới thành công.
- [ ] Upload nhiều ảnh thành công.
- [ ] Ảnh chính đúng.
- [ ] Sắp xếp ảnh đúng.
- [ ] Edit hoa không mất ảnh.
- [ ] Delete ảnh xóa Cloudinary.
- [ ] Toggle visible hoạt động.
- [ ] Toggle featured hoạt động.
- [ ] Soft delete hoạt động.
- [ ] Bulk hide/show hoạt động.
- [ ] Bulk featured/unfeatured hoạt động.
- [ ] Bulk delete hoạt động.

### Admin categories

- [ ] Tạo category.
- [ ] Sửa category.
- [ ] Ẩn/hiện category.
- [ ] Xóa category không có product.
- [ ] Chặn xóa category đang có product.

### Settings

- [ ] Lưu store name.
- [ ] Lưu phone.
- [ ] Lưu Zalo.
- [ ] Lưu address.
- [ ] Lưu Google Maps URL.
- [ ] Public page dùng settings mới.

---

## 27. Definition of Done

Dự án được xem là hoàn thành phase đầu khi:

1. Express app chạy được bằng:
   ```bash
   npm run dev
   ```
2. MongoDB local kết nối được.
3. Admin seed login được.
4. Public home/menu page hoạt động.
5. Product detail hoạt động.
6. Admin dashboard hoạt động.
7. Admin flower CRUD hoàn chỉnh.
8. Upload nhiều ảnh qua Cloudinary hoạt động.
9. Admin category management hoạt động.
10. Settings page hoạt động.
11. Tailwind build local hoạt động.
12. Giao diện giữ phong cách pastel Hàn Quốc của Stitch.
13. Mobile layout không vỡ.
14. Không có cart/checkout/payment/order.
15. README và `.env.example` đầy đủ.
16. Có validation và sanitize input cơ bản.
17. Có flash/toast cho action quan trọng.
18. Có 404/500 page.
19. Không có secret hard-code trong repository.

---

## 28. Ghi chú triển khai quan trọng

- Ưu tiên code sạch, dễ bảo trì hơn là nhồi mọi thứ vào một file.
- Không tạo API JSON riêng nếu chưa cần; app hiện tại là server-rendered Pug.
- Không dùng React nếu Stitch export có React; hãy chuyển sang Pug.
- Nếu Stitch có Tailwind CDN config, trích theme/token rồi đưa vào Tailwind config local.
- Luôn kiểm tra wording tiếng Việt.
- Không dùng từ khiến khách hiểu là có thể đặt hàng trực tiếp.
- Các thông tin thật như phone, Zalo, địa chỉ, Google Maps sẽ được chủ dự án cập nhật sau qua settings hoặc `.env`.
- Nếu Cloudinary chưa cấu hình, admin upload phải báo lỗi rõ ràng, không crash server.
- Nếu chưa có sản phẩm, public home hiển thị empty state đẹp.
- Nếu chưa có ảnh, dùng placeholder.
- Không seed 8 sản phẩm mẫu vào database trong mặc định.

---

## 29. Prompt ngắn để Codex bắt đầu

Hãy đọc file này, đọc toàn bộ project, đặc biệt folder `project/design`, sau đó lập implementation plan theo các phase trên. Tiếp theo triển khai dự án ExpressJS + Pug + MongoDB + Tailwind build + Cloudinary theo đúng yêu cầu. Không phá file Stitch gốc, không thêm chức năng e-commerce, không dùng Tailwind CDN trong production, không hard-code secret. Ưu tiên mobile-first, code sạch, có controller/model/route/middleware/service riêng, có README và `.env.example`.
