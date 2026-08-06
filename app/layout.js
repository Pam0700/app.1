import "./globals.css";

export const metadata = {
  title: "Shopee Hoàn Tiền",
  description: "Tạo link Shopee affiliate và ước tính hoa hồng"
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
