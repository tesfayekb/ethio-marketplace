import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ethio.com — coming soon" },
      { name: "description", content: "Ethiopia's marketplace — coming soon." },
      { property: "og:title", content: "ethio.com — coming soon" },
      { property: "og:description", content: "Ethiopia's marketplace — coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        ethio.com — coming soon
      </h1>
    </div>
  );
}
