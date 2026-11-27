// Chủ: Khánh. TẦNG 3 phòng hộ link: classifier URL học từ dữ liệu THẬT (OpenPhish + Phishing.Database
// + Majestic benign), logistic regression, CHẠY OFFLINE trên thiết bị — KHÔNG gọi API lúc chạy.
// Trọng số huấn luyện sẵn (held-out: acc 93.8%, precision 98.8%, recall 88.7%, AUC 0.985, FP 1.05%).
// Train lại: scratchpad/urldata/data_prep.py -> train_url.py. feats() PHẢI khớp y hệt bản python.

const BAD_TLD = new Set(["top", "vip", "xyz", "cc", "icu", "buzz", "click", "live", "online", "win",
  "loan", "rest", "shop", "site", "fit", "tk", "gq", "work", "support", "cfd", "sbs"]);
const BRAND = ["vcb", "vietcombank", "bidv", "techcombank", "mbbank", "acb", "vietinbank", "agribank",
  "tpbank", "vpbank", "sacombank", "shopee", "tiki", "lazada", "sendo", "momo", "zalopay", "ghn", "ghtk",
  "evn", "bhxh", "vssid", "vneid", "dichvucong", "etax", "paypal", "facebook", "apple", "microsoft",
  "amazon", "netflix", "google"];
const SUS = ["secure", "verify", "update", "login", "signin", "account", "confirm", "wallet", "bonus",
  "gift", "xacthuc", "capnhat", "uudai", "nhanthuong", "dangnhap", "khuyenmai"];

function entropy(s) {
  if (!s) return 0;
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  const n = s.length;
  let e = 0;
  for (const k in freq) { const p = freq[k] / n; e -= p * Math.log2(p); }
  return e;
}

/** 17 đặc trưng lexical — THỨ TỰ và CÔNG THỨC phải khớp data_prep.py. */
export function feats(url) {
  const u = String(url).trim();
  if (!u || u.includes(" ")) return null;
  const low = u.toLowerCase();
  const ns = low.replace(/^[a-z][a-z0-9+.-]*:\/\//, "");
  const firstSeg = ns.split("/")[0];
  const host = firstSeg.split("?")[0].split(":")[0];
  if (!host.includes(".")) return null;
  const path = ns.slice(firstSeg.length);
  const parts = host.split(".");
  const tld = parts[parts.length - 1];
  let dig = 0;
  for (const c of host) if (c >= "0" && c <= "9") dig++;
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) ? 1 : 0;
  const ent = Math.round(entropy(host) * 1e4) / 1e4;
  return [
    u.length,
    host.length,
    (host.match(/\./g) || []).length,
    (host.match(/-/g) || []).length,
    dig,
    dig / Math.max(host.length, 1),
    isIp,
    u.includes("@") ? 1 : 0,
    host.includes("xn--") ? 1 : 0,
    BAD_TLD.has(tld) ? 1 : 0,
    tld.length,
    parts.length,
    path.length,
    (u.match(/=/g) || []).length,
    ent,
    SUS.some((w) => low.includes(w)) ? 1 : 0,
    BRAND.some((b) => host.includes(b)) ? 1 : 0,
  ];
}

const MODEL = {
  mean: [62.91671875, 17.44225, 1.50946875, 0.2269375, 1.682, 0.07954268611628885, 0.055125,
    0.01340625, 0.0005, 0.02875, 2.7218125, 2.50946875, 38.4719375, 0.44453125, 3.3090527812499664,
    0.144375, 0.02096875],
  std: [90.77450961301513, 12.765210630361155, 0.9046948893263177, 0.6523031282261664,
    4.823140937190725, 0.19824457376001278, 0.22822408806912853, 0.11500661920483991,
    0.022355088906101578, 0.16710307447803366, 0.6396184134651361, 0.9046948893263177,
    87.85853558416906, 1.9728908276361008, 0.4827863652387066, 0.35146957105123877,
    0.14327966193233052],
  weights: [1.984283562315354, 0.6925032707072586, 0.3902417158191655, 0.2887171609308718,
    0.2965826879858778, 0.56758439835926, 0.2141115661639856, 0.2349584631197164,
    -0.1225338505756626, 0.3665300646055731, -0.01843495532175624, 0.3902417158191655,
    1.9492156171192039, 0.4098238542845708, 0.6053960748687373, 0.79850101468694,
    -0.04544398024472067],
  bias: 1.3758434130334978,
  threshold: 0.5,
};

/** Xác suất phishing [0,1] cho một URL, tính cục bộ. */
export function scoreUrl(url) {
  const x = feats(url);
  if (!x) return { ok: false, prob: 0, isPhishing: false };
  let z = MODEL.bias;
  for (let j = 0; j < x.length; j++) z += MODEL.weights[j] * ((x[j] - MODEL.mean[j]) / MODEL.std[j]);
  const prob = 1 / (1 + Math.exp(-z));
  return { ok: true, prob, isPhishing: prob >= MODEL.threshold };
}
