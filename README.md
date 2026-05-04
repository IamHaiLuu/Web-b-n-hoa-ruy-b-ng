# Menu Hoa

Website menu hoa server-rendered bằng ExpressJS, Pug, MongoDB, Tailwind build local và Cloudinary. Ứng dụng dùng để hiển thị mẫu hoa và quản trị menu hoa, không có giỏ hàng, checkout, thanh toán hay đơn hàng.

## Tech stack

- Node.js v22
- ExpressJS + Pug
- MongoDB + Mongoose
- Tailwind CSS build local
- Cloudinary upload ảnh
- Session admin bằng `express-session` + `connect-mongo`

## Cài đặt

```bash
npm install
cp .env.example .env
npm run build:css
npm run seed:admin
npm run seed:categories
npm run dev
```

Trên Windows PowerShell có thể copy env bằng:

```powershell
Copy-Item .env.example .env
```

## Biến môi trường

Xem `.env.example`. Các biến quan trọng:

- `MONGODB_URI`: MongoDB local hoặc MongoDB Atlas.
- `SESSION_SECRET`: chuỗi bí mật dài cho session.
- `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`: tài khoản admin seed.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: upload ảnh sản phẩm.
- `STORE_PHONE`, `STORE_ZALO`, `STORE_ADDRESS`, `STORE_GOOGLE_MAPS_URL`: thông tin liên hệ mặc định.

## Admin mặc định

Sau khi chạy `npm run seed:admin`:

- Email: `BanHoa@gmail.com`
- Password: `1234567890`

Có thể đổi bằng `.env` trước khi seed.

## Routes chính

- Public: `/`, `/flowers`, `/flowers/:slug`, `/contact`
- Auth admin: `/admin/login`, `/admin/logout`
- Admin: `/admin`
- Quản lý hoa: `/admin/flowers`
- Danh mục: `/admin/categories`
- Cài đặt cửa hàng: `/admin/settings`

## Upload ảnh

Ảnh sản phẩm và logo/banner dùng Cloudinary. Nếu Cloudinary chưa cấu hình, form upload sẽ báo lỗi rõ ràng và server không hard-code secret. Product public thiếu ảnh sẽ dùng placeholder ở `/images/placeholders/flower-placeholder.svg`.

## CSS production

```bash
npm run build:css
```

Không dùng Tailwind CDN trong production.

## Deploy Vercel

Project đã có `vercel.json` và entry deploy ở `index.js`.

Trên Vercel cần cấu hình Environment Variables:

- `NODE_ENV=production`
- `MONGODB_URI`
- `SESSION_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STORE_NAME`
- `STORE_PHONE`
- `STORE_ZALO`
- `STORE_ADDRESS`
- `STORE_GOOGLE_MAPS_URL`

Vercel dùng `index.js` làm serverless handler. Khi chạy local, cùng file `index.js` sẽ tự gọi `app.listen()` bằng `npm run dev` hoặc `npm start`.
