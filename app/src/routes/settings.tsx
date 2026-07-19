import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { client } from "@/lib/apiClient";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeSection, setActiveSection] = useState("account");
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [appearance, setAppearance] = useState("system");

  const [displayName, setDisplayName] = useState("Johnny Doeser");
  const [username, setUsername] = useState("John_Doe99");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await client.me.$patch({
        json: {
          username,
          display_name: displayName || null,
          bio: bio || null,
        },
      });
      if (!res.ok) {
        throw new Error(`Save failed: ${res.status}`);
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] border-x bg-background">
      <div className="flex min-h-[calc(100svh_-_64px)]">
        {/* Left Sidebar Navigation */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <button
              onClick={() => {
                setActiveSection("account");
                setAppearanceOpen(false);
              }}
              className={cn(
                "mono-micro rounded-full border border-badge-border p-4 tracking-[0.08em] text-badge-foreground",
                activeSection === "account"
                  ? "var(--badge-bg)"
                  : "var(--muted-bg)"
              )}
            >
              Account
            </button>

            <button
              onClick={() => {
                setActiveSection("advanced");
                setAppearanceOpen(false);
              }}
              className={cn(
                "mono-micro rounded-full border border-badge-border p-4 tracking-[0.08em] text-badge-foreground",
                activeSection === "advanced"
                  ? "var(--badge-bg)"
                  : "var(--muted-bg)"
              )}
            >
              Advanced
            </button>

            {/* Appearance Button with Dropdown */}
            <div className="space-y-2">
              <button
                onClick={() => setAppearanceOpen(!appearanceOpen)}
                className={cn(
                  "mono-micro rounded-full border border-badge-border p-4 tracking-[0.08em] text-badge-foreground",
                  appearanceOpen ? "var(--badge-bg)" : "var(--muted-bg)"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>Appearance</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      appearanceOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>

              {appearanceOpen && (
                <div className="ml-2 space-y-2 rounded-md bg-input/30 p-4">
                  <button
                    onClick={() => setAppearance("light")}
                    className={cn(
                      "mono-micro rounded-full border border-badge-border p-4 tracking-[0.08em] text-badge-foreground",
                      appearance === "light"
                        ? "var(--badge-bg)"
                        : "var(--muted-bg)"
                    )}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setAppearance("dark")}
                    className={cn(
                      "mono-micro rounded-full border border-badge-border p-4 tracking-[0.08em] text-badge-foreground",
                      appearance === "dark"
                        ? "var(--badge-bg)"
                        : "var(--muted-bg)"
                    )}
                  >
                    Dark
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 px-8 py-8 lg:px-16">
          {/* Account Section */}
          {activeSection === "account" && (
            <div className="mb-6">
              <div>
                <h1 className="data-label text-[14px] tracking-[0.08em] text-muted-foreground uppercase">
                  Account
                </h1>
                <p className="font-mono text-sm text-muted-foreground">
                  Make changes to your account details
                </p>
              </div>

              <Separator className="mb-8 bg-border" />

              <div className="space-y-2">
                <div>
                  <label className="font-mono tracking-[0.08em] uppercase">
                    Display Name
                  </label>
                  <p className="mb-3 font-sans text-xs text-muted-foreground">
                    Publicly visible (if blank, defaults to username)
                  </p>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="border border-border"
                  />
                </div>

                <div>
                  <label className="font-mono tracking-[0.08em] uppercase">
                    Username
                  </label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-border"
                  />
                </div>

                <div>
                  <label className="font-mono tracking-[0.08em] uppercase">
                    Bio
                  </label>
                  <Input
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="border border-border"
                  />
                </div>

                {saveError && (
                  <p className="font-mono text-sm text-destructive">
                    {saveError}
                  </p>
                )}

                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-pri"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}

          {/* Advanced Section */}
          {activeSection === "advanced" && (
            <div className="mb-6">
              <div>
                <h1 className="data-label text-[14px] tracking-[0.08em] text-muted-foreground uppercase">
                  Advanced
                </h1>
              </div>

              <Separator className="mb-8 bg-border" />

              <div className="space-y-2">
                <div>
                  <a
                    href="#"
                    className="font-mono tracking-[0.08em] uppercase"
                  >
                    Terms of Service
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="font-mono tracking-[0.08em] uppercase"
                  >
                    Privacy Policy
                  </a>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="destructive"
                    className="font-mono tracking-[0.08em] uppercase"
                  >
                    Delete Account
                  </Button>
                  <p className="mt-3 font-mono text-sm tracking-[0.08em] text-destructive uppercase">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
