import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "../ui/breadcrumb";
import { Item } from "../ui/item";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export type BreadCrumbViewTypes = { name: string; url: string }[];
function BreadcrumbView({ items }: { items: BreadCrumbViewTypes }) {
  return (
    <Item variant="outline" className="bg-linear-to-r from-[#00B843] to-[#0E63EF] rounded-none border-l-0 fixed top-0 w-full z-50 ">

      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-sidebar-accent" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-primary"
        />
      </div>

      <Breadcrumb className="">
        <BreadcrumbList>
          {
            items.map((item, index) => (
              <BreadcrumbItem key={item.name}>

                {
                  index !== items.length - 1
                    ? (
                        <>
                          <BreadcrumbLink className="text-white hover:text-gray-200" asChild><Link to={item.url}>{item.name}</Link></BreadcrumbLink>
                          <ChevronRight size={18} className="text-white" />
                        </>
                      )

                    : <BreadcrumbPage className="text-white hover:text-gray-200">{item.name}</BreadcrumbPage>
                }

              </BreadcrumbItem>
            ))
          }
        </BreadcrumbList>
      </Breadcrumb>

    </Item>
  );
}

export default BreadcrumbView;
