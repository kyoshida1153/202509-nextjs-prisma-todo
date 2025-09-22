// 用途：DBの日付のフォーマット
export function formatDate(created_at: Date): string {
  return new Date(created_at).toLocaleString();
}
