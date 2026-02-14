import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/dashboard/app-sidebar";
import PrimaryLoading from "@/components/loadings/primary-loading";
import { SidebarProvider } from "@/components/ui/sidebar";

function SidebarLayout() {
  return (

    <SidebarProvider>

      <AppSidebar />

      <main className="w-full bg-gray-50">

        <div className="w-full">

          <Suspense fallback={(
            <div className="flex items-center justify-center h-[90vh] w-[80vw] overflow-hidden">

              <PrimaryLoading />

            </div>
          )}
          >

            <Outlet />

          </Suspense>

        </div>

      </main>

    </SidebarProvider>

  );
}

export default SidebarLayout;
