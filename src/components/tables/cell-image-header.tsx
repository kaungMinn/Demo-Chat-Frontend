import type { ReactNode } from "react";

function CellImageHeader({ children}: { children: ReactNode }) {
  return (
    <div className="text-center">{children}</div>
  );
}

export default CellImageHeader;
