import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

// Ãcones do lucide-react
import { Utensils, CookingPot, Flower } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:from-orange-400 hover:to-red-400",
        secondary:
          "bg-gradient-to-r from-green-400 to-green-600 text-white shadow hover:from-green-300 hover:to-green-500",
        ghost:
          "bg-transparent text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/30",
        outline:
          "border border-orange-300 bg-white text-orange-700 hover:bg-orange-50 shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-xl",
        sm: "h-8 px-3 text-xs rounded-lg",
        lg: "h-12 px-7 text-base rounded-2xl",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});
Button.displayName = "Button";

// ---------- Header estilizado com colheres e panelas ----------
const AppHeader = () => {
  return (
    <header className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-200 via-pink-100 to-yellow-100 rounded-b-2xl shadow">
      <CookingPot className="text-orange-600 w-8 h-8" />
      <h1 className="text-2xl font-bold text-orange-700 flex items-center gap-2">
        Cozinha Criativa
        <Utensils className="text-green-600 w-5 h-5" />
        <Flower className="text-pink-500 w-5 h-5" />
      </h1>
    </header>
  );
};

export { Button, buttonVariants, AppHeader };


