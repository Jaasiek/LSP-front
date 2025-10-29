<<<<<<< HEAD:lsp-front-react/src/components/ui/progress.tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
=======
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
>>>>>>> f9d3cda118b7ab9d6ea90c8bff0f17f8fe26a86f:lsp-front-react/src/components/ui/progress.jsx

function Progress({ className, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

<<<<<<< HEAD:lsp-front-react/src/components/ui/progress.tsx
export { Progress };
=======
export { Progress }

>>>>>>> f9d3cda118b7ab9d6ea90c8bff0f17f8fe26a86f:lsp-front-react/src/components/ui/progress.jsx
