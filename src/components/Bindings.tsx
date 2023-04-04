import { SquiggleChart } from "@quri/squiggle-components";
import { forwardRef } from "react";
import { useFileState } from "../lib/useFileState";

export const Bindings = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const code = useFileState((state) => state.project?.squiggle ?? "");
  return (
    <div ref={ref} className="h-full overflow-auto">
      <SquiggleChart code={code} />
    </div>
  );
});