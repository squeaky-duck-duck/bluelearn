import { createFileRoute } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/review/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-[1280px] border-x bg-background">
      <section className="border-b px-8 py-8 lg:px-16">
        <div className="mb-6">
          <h1 className="data-label text-[14px] tracking-[0.08em] text-muted-foreground uppercase">
            Review
          </h1>
        </div>

        <Separator className="mb-4 bg-border" />
      </section>
    </div>
  );
}
