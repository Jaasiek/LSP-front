<<<<<<< HEAD:lsp-front-react/src/components/ui/avatar.tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
=======
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"
>>>>>>> f9d3cda118b7ab9d6ea90c8bff0f17f8fe26a86f:lsp-front-react/src/components/ui/avatar.jsx

function Avatar({ className, ...props }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

<<<<<<< HEAD:lsp-front-react/src/components/ui/avatar.tsx
export { Avatar, AvatarImage, AvatarFallback };
=======
export { Avatar, AvatarImage, AvatarFallback }

>>>>>>> f9d3cda118b7ab9d6ea90c8bff0f17f8fe26a86f:lsp-front-react/src/components/ui/avatar.jsx
