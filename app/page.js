"use client";

import { useMemo, useState } from "react";

const demoProduct = {
  title: "[MIX] Combo 10 Mặt Nạ Dưỡng Da",
  price: 220000,
  commissionRate: 8,
  image:
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80"
};

function formatVnd(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

function isShopeeUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.hostname.includes("shopee.vn") ||
      url.hostname.includes("s.shopee.vn") ||
      url.hostname.includes("vn.shp.ee")
    );
  } catch {
    return false;
  }
}

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const estimatedCommission = useMemo(() => {
    if (!result) return 0;
    return Math.round(result.price * (result.commissionRate / 100));
  }, [result]);

  function handleSubmit(event) {
    event.preventDefault();
    setCopied(false);

    if (!url.trim()) {
      setMessage("Vui lòng dán link Shopee.");
      setResult(null);
      return;
    }

    if (!isShopeeUrl(url.trim())) {
      setMessage("Link chưa đúng định dạng Shopee.");
      setResult(null);
      return;
    }

    const token = Math.random().toString(36).slice(2, 10);
    setResult({
      ...demoProduct,
      originalUrl: url.trim(),
      affiliateUrl: `${window.location.origin}/${token}/shopee`
    });
    setMessage("");
  }

  async function copyLink() {
    if (!result?.affiliateUrl) return;
    await navigator.clipboard.writeText(result.affiliateUrl);
    setCopied(true);
  }

  return (
    <main className="shell">
      <section className="hero">
        <div className="badge">Shopee Affiliate Cashback</div>
        <h1>Chuyển link Shopee<br />nhận hoàn tiền</h1>
        <p className="subtitle">
          Dán link sản phẩm, hệ thống sẽ tạo link affiliate và hiển thị hoa hồng dự kiến.
        </p>

        <form onSubmit={handleSubmit} className="linkForm">
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Dán link Shopee tại đây..."
            aria-label="Link Shopee"
          />
          <button type="submit">Tạo link</button>
        </form>

        {message && <div className="alert">{message}</div>}

        <div className="notice">
          <strong>Lưu ý quan trọng</strong>
          <span>1. Xóa sản phẩm cũ khỏi giỏ hàng trước khi mua.</span>
          <span>2. Không mở livestream hoặc link affiliate khác sau khi bấm link.</span>
          <span>3. Hoa hồng hiển thị là số tiền ước tính, không phải cam kết thanh toán.</span>
        </div>
      </section>

      <section className="resultPanel">
        {!result ? (
          <div className="emptyState">
            <div className="emptyIcon">🔗</div>
            <h2>Kết quả sẽ hiện ở đây</h2>
            <p>Dùng link sản phẩm Shopee để xem bản demo.</p>
          </div>
        ) : (
          <article className="productCard">
            <img src={result.image} alt={result.title} />
            <div className="productInfo">
              <div className="eyebrow">Sản phẩm đã nhận diện</div>
              <h2>{result.title}</h2>
              <div className="price">{formatVnd(result.price)}</div>

              <div className="stats">
                <div>
                  <span>Hoa hồng</span>
                  <strong>{result.commissionRate}%</strong>
                </div>
                <div>
                  <span>Tiền hoàn dự kiến</span>
                  <strong>{formatVnd(estimatedCommission)}</strong>
                </div>
              </div>

              <div className="affiliateBox">
                <span>Link affiliate</span>
                <div className="copyRow">
                  <input readOnly value={result.affiliateUrl} />
                  <button type="button" onClick={copyLink}>
                    {copied ? "Đã copy" : "Copy"}
                  </button>
                </div>
              </div>

              <a
                className="openButton"
                href={result.originalUrl}
                target="_blank"
                rel="noreferrer"
              >
                Mở sản phẩm Shopee
              </a>
            </div>
          </article>
        )}
      </section>

      <section className="steps">
        <h2>Cách hoạt động</h2>
        <div className="stepGrid">
          <div><b>01</b><span>Dán link sản phẩm</span></div>
          <div><b>02</b><span>Hệ thống tạo link affiliate</span></div>
          <div><b>03</b><span>Mua hàng qua link</span></div>
          <div><b>04</b><span>Đối soát và hoàn tiền</span></div>
        </div>
      </section>
    </main>
  );
}
