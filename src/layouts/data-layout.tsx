import type { ReactNode } from "react";

import type { BreadCrumbViewTypes } from "@/components/dashboard/breadcrumb-view";

import BreadcrumbView from "@/components/dashboard/breadcrumb-view";

function DataLayout({ children, breadCrumbs }: { children: ReactNode; breadCrumbs: BreadCrumbViewTypes; title: string }) {
  return (
    <div className="space-y-5 bg-gray-100">
      <BreadcrumbView items={breadCrumbs} />
      <div className="h-15" />
      {/* <Label className="text-xl font-semibold mt-10">
        {title}
      </Label> */}

      <div className="space-y-5 px-5 ">
        {children}
      </div>
    </div>
  );
}

export default DataLayout;
