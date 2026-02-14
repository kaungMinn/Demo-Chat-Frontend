function checkStatus(value: string) {
  // Define the mapping of values to labels and colors
  const statusMap: Record<string, { label: string; color: string }> = {
    0: { label: "New Question", color: "bg-emerald-100 text-emerald-700" }, // Green
    1: { label: "Pending", color: "bg-amber-100 text-amber-700" }, // Amber/Yellow
    2: { label: "Awaiting", color: "bg-blue-100 text-blue-700" }, // Blue
    3: { label: "Rejected", color: "bg-red-100 text-red-700" }, // Red
    4: { label: "Closed", color: "bg-slate-100 text-slate-600" }, // Gray
    5: { label: "Verified", color: "bg-purple-100 text-purple-700" }, // Purple/Violet
  };

  // Return the mapped status or a default fallback
  return statusMap[value] || { label: value, color: "bg-gray-100 text-gray-600" };
}

export const QuestionUtils = { checkStatus };
