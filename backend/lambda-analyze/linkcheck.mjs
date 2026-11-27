// Chủ: Khánh. Phòng hộ link: luật tất định, KHÔNG gọi mạng. Bóc URL rồi chấm bằng ENSEMBLE:
//   Tầng 1 = heuristic (nhái thương hiệu, TLD lạ, .apk, IP, rút gọn…)
//   Tầng 3 = classifier học từ dữ liệu thật, chạy offline (urlmodel.mjs), cờ khi rất chắc (≥0.85)
// Link đáng ngờ -> normalize.mjs củng cố T35. Tầng 2 (tra threat-intel online) để sau, cần Nam.
import { scoreUrl } from "./urlmodel.mjs";

// Tên miền chính thống -> bỏ qua (danh sách mở rộng được).
const OFFICIAL = new Set([
  "vietcombank.com.vn", "bidv.com.vn", "techcombank.com.vn", "mbbank.com.vn", "acb.com.vn",
  "vietinbank.vn", "agribank.com.vn", "tpb.vn", "vpbank.com.vn", "sacombank.com.vn",
  "shopee.vn", "tiki.vn", "lazada.vn", "sendo.vn", "momo.vn", "zalopay.vn",
  "ghn.vn", "ghtk.vn", "jtexpress.vn", "evnhcmc.vn", "evn.com.vn",
  "baohiemxahoi.gov.vn", "dichvucong.gov.vn", "vneid.gov.vn", "gdt.gov.vn", "thuedientu.gdt.gov.vn",
]);
// Token thương hiệu hay bị nhái: domain chứa token nhưng KHÔNG phải trang thật = dấu hiệu mạnh.
const BRAND_TOKENS = ["vcb", "vietcombank", "bidv", "techcombank", "mbbank", "acb", "vietinbank",
  "agribank", "tpbank", "vpbank", "sacombank", "shopee", "tiki", "lazada", "sendo", "momo", "zalopay",
  "ghn", "ghtk", "evn", "bhxh", "vssid", "vneid", "dichvucong", "etax"];
const BAD_TLD = new Set(["top", "vip", "xyz", "cc", "icu", "buzz", "click", "live", "online",
  "win", "loan", "rest", "shop", "site", "fit", "tk", "gq"]);
const SHORTENERS = new Set(["s.id", "bit.ly", "tinyurl.com", "cutt.ly", "rb.gy", "t.co",
  "goo.gl", "shorturl.at", "zalo.me"]);

const URL_RE = /((?:https?:\/\/)?(?:[a-z0-9][a-z0-9-]*\.)+[a-z]{2,}(?:\/[^\s]*)?)/gi;
const registrable = (host) => host.split(".").slice(-2).join("."); // xấp xỉ 2 nhãn cuối, đủ cho heuristic

/**
 * @param {string} conversation
 * @returns {{verdict: "clean"|"suspicious"|"malicious", flagged: {url, reasons, severity}[]}}
 */
export function checkConversationLinks(conversation) {
  const text = String(conversation);
  const flagged = [];
  const seen = new Set();
  let m;
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(text))) {
    let url = m[1].replace(/[.,;:!?)\]}"'»]+$/, ""); // bỏ dấu câu dính đuôi
    if (seen.has(url)) continue;
    seen.add(url);
    const noScheme = url.replace(/^https?:\/\//i, "");
    const host = noScheme.split("/")[0].toLowerCase();
    const path = noScheme.slice(host.length);
    if (!host.includes(".")) continue;
    const reg = registrable(host);
    if (OFFICIAL.has(host) || OFFICIAL.has(reg)) continue; // trang chính thống
    const tld = host.split(".").pop();
    const reasons = [];
    let severity = 0;
    const bump = (s) => (severity = Math.max(severity, s));
    if (BRAND_TOKENS.some((b) => host.includes(b))) {
      reasons.push("dùng tên thương hiệu nhưng tên miền không phải trang chính thức"); bump(3);
    }
    if (/\.apk($|\?)/i.test(path)) { reasons.push("dẫn tới file cài đặt .apk"); bump(3); }
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) { reasons.push("là địa chỉ IP thô, không phải tên miền"); bump(3); }
    if (host.startsWith("xn--") || host.includes(".xn--")) { reasons.push("chứa ký tự đánh lừa (punycode)"); bump(3); }
    if (url.includes("@")) { reasons.push("chứa ký tự @ che tên miền thật"); bump(3); }
    if (BAD_TLD.has(tld)) { reasons.push(`đuôi tên miền lạ .${tld}`); bump(2); }
    if (SHORTENERS.has(host) || SHORTENERS.has(reg)) { reasons.push("là link rút gọn che đích đến"); bump(2); }
    const ml = scoreUrl(url);
    if (ml.ok && ml.prob >= 0.85) {
      reasons.push(`bị mô hình học (chạy offline) nhận diện có đặc điểm phishing (xác suất ${Math.round(ml.prob * 100)}%)`);
      bump(3);
    }
    if (reasons.length) flagged.push({ url, reasons, severity });
  }
  flagged.sort((a, b) => b.severity - a.severity);
  const verdict = !flagged.length ? "clean" : flagged[0].severity >= 3 ? "malicious" : "suspicious";
  return { verdict, flagged };
}
