import { Grid2X2 } from "lucide-react";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

function EmptyHere() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Grid2X2 />
        </EmptyMedia>
        <EmptyTitle>No Items Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any item yet. Get started by creating
          your first item.
        </EmptyDescription>
      </EmptyHeader>

    </Empty>
  );
}

export default EmptyHere;
