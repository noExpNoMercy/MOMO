// Chủ: Văn. Chuyền dữ liệu giữa các trang trong cùng tab: Radar (/) → Chuyển tiền (/chuyen-tien) → M3 (/doi-thoai).
// Dùng sessionStorage, bọc try/catch vì có thể bị chặn (tab ẩn danh, chế độ riêng tư).
// Component đọc bằng hook (useSyncExternalStore): phía server trả null, trình duyệt đọc giá trị thật, không lệch hydration.

import { useMemo, useSyncExternalStore } from "react";
import type { AnalyzeResult } from "./types";

const ANALYSIS_KEY = "llc.last_analysis";
const AMOUNT_KEY = "llc.transfer_amount_vnd";

export type LastAnalysis = { conversation: string; result: AnalyzeResult; saved_at: string };

function write(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {}
}

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

const noSubscribe = () => () => {};
/** Chuỗi thô làm snapshot (so sánh theo giá trị nên ổn định), parse sau bằng useMemo. */
const useStored = (key: string) => useSyncExternalStore(noSubscribe, () => read(key), () => null);

export function saveLastAnalysis(conversation: string, result: AnalyzeResult) {
  const value: LastAnalysis = { conversation, result, saved_at: new Date().toISOString() };
  write(ANALYSIS_KEY, JSON.stringify(value));
}

export function useLastAnalysis(): LastAnalysis | null {
  const raw = useStored(ANALYSIS_KEY);
  return useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as LastAnalysis) : null;
    } catch {
      return null;
    }
  }, [raw]);
}

export function saveTransferAmount(amount_vnd: number) {
  write(AMOUNT_KEY, String(amount_vnd));
}

export function useTransferAmount(): number | null {
  const value = Number(useStored(AMOUNT_KEY));
  return Number.isInteger(value) && value > 0 ? value : null;
}
