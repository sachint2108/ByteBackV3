export const reportService = {
  getRawEarnings: async () => {
    const response = await fetch("/api/reports/earnings");
    if (!response.ok) throw new Error("Network error");
    return await response.json();
  }
};