import { PropsWithChildren } from "react";
import { cn } from "@/ui/components/lib/utils";

type PropsWithChildrenAndClassName<P = unknown> = P &
  PropsWithChildren<{ className?: string }>;

interface HeadingProps {
  as: "h1" | "h2" | "h3" | "h4";
}

export const Heading = ({
  as,
  className,
  children,
}: PropsWithChildrenAndClassName<HeadingProps>) => {
  if (as === "h1") {
    return (
      <h1
        className={cn(
          className,
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        )}
      >
        {children}
      </h1>
    );
  }

  if (as === "h2") {
    return (
      <h2
        className={cn(
          className,
          "scroll-m-20 text-3xl font-semibold tracking-tight"
        )}
      >
        {children}
      </h2>
    );
  }

  if (as === "h3") {
    return (
      <h3
        className={cn(
          className,
          "scroll-m-20 text-2xl font-semibold tracking-tight"
        )}
      >
        {children}
      </h3>
    );
  }

  if (as === "h4") {
    return (
      <h4
        className={cn(
          className,
          "scroll-m-20 text-xl font-semibold tracking-tight"
        )}
      >
        {children}
      </h4>
    );
  }
};

export const Paragraph = ({
  children,
  className,
}: PropsWithChildrenAndClassName) => {
  return (
    <p className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}>
      {children}
    </p>
  );
};

export const InlineCode = ({
  children,
  className,
}: PropsWithChildrenAndClassName) => {
  return (
    <code
      className={cn(
        className,
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      )}
    >
      {children}
    </code>
  );
};

export const Large = ({
  children,
  className,
}: PropsWithChildrenAndClassName) => {
  return (
    <div className={cn(className, "text-lg font-semibold")}>{children}</div>
  );
};

export const Small = ({
  children,
  className,
}: PropsWithChildrenAndClassName) => {
  return (
    <small className={cn(className, "text-sm font-medium leading-none")}>
      {children}
    </small>
  );
};

export const Muted = ({
  children,
  className,
}: PropsWithChildrenAndClassName<{ href: string }>) => {
  return (
    <p className={cn(className, "text-sm text-muted-foreground")}>{children}</p>
  );
};
