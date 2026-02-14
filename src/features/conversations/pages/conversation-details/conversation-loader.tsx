import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function ConversationLoader() {
  return (
    <Card className="m-4 h-[97vh]">
      <CardContent className="p-0 h-full">
        <ScrollArea className="h-full">
          {/* Loading skeleton for load more section */}
          <div className="sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-10 p-4 border-b">
            <div className="flex justify-center">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>

          {/* Loading skeletons for messages */}
          <div className="p-4 space-y-4">
            {/* Date separator skeleton */}
            <div className="flex items-center gap-4 my-4">
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-px flex-1" />
            </div>

            {/* Bot message skeleton */}
            <div className="flex gap-3 justify-start">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="max-w-[70%] space-y-2">
                <Skeleton className="h-16 w-48 rounded-2xl" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            {/* User message skeleton */}
            <div className="flex gap-3 justify-end">
              <div className="max-w-[70%] space-y-2">
                <Skeleton className="h-12 w-36 rounded-2xl" />
                <Skeleton className="h-3 w-12 ml-auto" />
              </div>
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            {/* Another bot message skeleton */}
            <div className="flex gap-3 justify-start">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="max-w-[70%] space-y-2">
                <Skeleton className="h-20 w-56 rounded-2xl" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>

        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ConversationLoader;
