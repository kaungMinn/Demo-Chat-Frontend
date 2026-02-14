import { EqualNot } from "lucide-react";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

function DataNotFound() {
  return (
    <Empty>

      <EmptyHeader>
        <EmptyTitle>No data found</EmptyTitle>
        <EmptyDescription>There is no match data found on our database</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <EmptyMedia variant="icon">
          <EqualNot />
        </EmptyMedia>
      </EmptyContent>
    </Empty>
  );
}

export default DataNotFound;
