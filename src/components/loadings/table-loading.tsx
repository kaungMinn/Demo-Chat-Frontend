import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "../ui/skeleton";

function TableLoading({
  rows = 10,
  columns = 5,
  showActions = true,
  showBadges = true,
  showAvatars = false,
}: {
  rows?: number;
  columns?: number;
  showActions?: boolean;
  showBadges?: boolean;
  showAvatars?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-gray-300 w-[75vw] shadow-sm">
      <Table>
        <TableHeader className="bg-sidebar-accent h-14 sticky top-0 z-10">
          <TableRow>
            {/* Checkbox Column */}
            <TableHead className="w-12">
              <Skeleton className="h-4 w-4" />
            </TableHead>

            {/* Avatar Column (Optional) */}
            {showAvatars && (
              <TableHead className="w-16">
                <Skeleton className="h-4 w-12" />
              </TableHead>
            )}

            {/* Header Columns */}
            {Array.from({ length: columns }, (_, i) => (
              <TableHead key={`header-${i}`} className="min-w-30">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-3" />
                </div>
              </TableHead>
            ))}

            {/* Actions Column */}
            {showActions && (
              <TableHead className="w-24">
                <Skeleton className="h-4 w-16" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <TableRow
              key={`row-${rowIndex}`}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Checkbox Cell */}
              <TableCell className="w-12">
                <Skeleton className="h-4 w-4 rounded" />
              </TableCell>

              {/* Avatar Cell (Optional) */}
              {showAvatars && (
                <TableCell className="w-16">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </TableCell>
              )}

              {/* Data Cells */}
              {Array.from({ length: columns }, (_, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`} className="py-4">
                  <div className="space-y-2">
                    {/* Primary Content */}
                    <Skeleton
                      className={`h-4 ${colIndex === 0
                        ? "w-32"
                        : colIndex === 1
                          ? "w-24"
                          : colIndex === 2
                            ? "w-16"
                            : colIndex === 3
                              ? "w-20"
                              : "w-28"
                      }`}
                    />

                    {/* Secondary Content (for some columns) */}
                    {(colIndex === 0 || colIndex === 1) && (
                      <Skeleton className="h-3 w-16 opacity-70" />
                    )}

                    {/* Badge (for some columns) */}
                    {showBadges && colIndex === 2 && (
                      <Skeleton className="h-5 w-16 rounded-full" />
                    )}
                  </div>
                </TableCell>
              ))}

              {/* Actions Cell */}
              {showActions && (
                <TableCell className="w-24">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Enhanced Footer */}
      <div className="border-t bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton
                key={`page-${i}`}
                className={`h-8 w-8 ${i === 2 ? "bg-primary/20" : ""}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableLoading;
