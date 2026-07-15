import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeSection, setActiveSection] = useState("account");
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [appearance, setAppearance] = useState("system");

  const handleSave = () => {
    // TODO: Implement API call to save settings
  };

  return (
    <div className="mx-auto max-w-[1280px] border-x bg-background">
      <div className="flex min-h-[calc(100svh_-_64px)]">
        {/* Left Sidebar Navigation */}
        <div className="w-[300px] border-r border-border bg-background p-6">
          <div className="space-y-3">
            <button
              onClick={() => {
                setActiveSection("account");
                setAppearanceOpen(false);
              }}
              className={cn(
                "w-full rounded-md border px-4 py-3 text-left font-mono text-sm font-medium tracking-[0.08em] transition-colors",
                activeSection === "account"
                  ? "border-border bg-muted text-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted/50"
              )}
            >
              Account
            </button>

            <button
              onClick={() => {
                setActiveSection("notifications");
                setAppearanceOpen(false);
              }}
              className={cn(
                "w-full rounded-md border px-4 py-3 text-left font-mono text-sm font-medium tracking-[0.08em] transition-colors",
                activeSection === "notifications"
                  ? "border-border bg-muted text-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted/50"
              )}
            >
              Notifications
            </button>

            <button
              onClick={() => {
                setActiveSection("advanced");
                setAppearanceOpen(false);
              }}
              className={cn(
                "w-full rounded-md border px-4 py-3 text-left font-mono text-sm font-medium tracking-[0.08em] transition-colors",
                activeSection === "advanced"
                  ? "border-border bg-muted text-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted/50"
              )}
            >
              Advanced
            </button>

            {/* Appearance Button with Dropdown */}
            <div className="space-y-2">
              <button
                onClick={() => setAppearanceOpen(!appearanceOpen)}
                className={cn(
                  "w-full rounded-md border px-4 py-3 text-left font-mono text-sm font-medium tracking-[0.08em] transition-colors",
                  appearanceOpen
                    ? "border-border bg-muted text-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted/50"
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
                      "w-full rounded px-3 py-2 text-left text-sm text-foreground transition-colors",
                      appearance === "light"
                        ? "border-b-2 border-foreground bg-transparent"
                        : "bg-transparent hover:bg-muted/20"
                    )}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setAppearance("dark")}
                    className={cn(
                      "w-full rounded px-3 py-2 text-left text-sm font-medium text-foreground transition-colors",
                      appearance === "dark"
                        ? "border-b-2 border-foreground bg-transparent"
                        : "bg-transparent hover:bg-muted/20"
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
            <div className="space-y-8">
              <div>
                <h2 className="mb-1 font-mono text-sm font-bold tracking-[0.08em] uppercase">
                  Account
                </h2>
                <p className="font-mono text-sm text-muted-foreground">
                  Make changes to your account details
                </p>
                <Separator className="mt-4 bg-border" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-mono text-sm font-medium">
                    Display Name
                  </label>
                  <p className="mb-3 font-mono text-xs text-muted-foreground">
                    The name others can see | If blank, defaults to username
                  </p>
                  <Input
                    defaultValue="Johnny Doeser"
                    className="border border-border"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-medium">
                    Username
                  </label>
                  <Input
                    defaultValue="John_Doe99"
                    className="border border-border"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    defaultValue="johndoe29@gmail.com"
                    className="border border-border"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-medium">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="reset your password"
                    className="border border-border"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="border border-border bg-muted text-foreground hover:bg-muted/90"
                >
                  Save
                </Button>
              </div>
            </div>
          )}
          {activeSection === "notifications" && (
            <div className="space-y-8">
              <div>
                <h2 className="mb-1 font-mono text-sm font-bold tracking-[0.08em] uppercase">
                  Notifications
                </h2>
                <p className="font-mono text-sm text-muted-foreground">
                  Make changes to your notification preferences
                </p>
                <Separator className="mt-4 bg-border" />
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 font-mono text-sm font-medium">In-App</h3>
                  <Input
                    defaultValue="Turn off In-App notifications"
                    className="border border-border"
                  />
                </div>

                <div>
                  <h3 className="mb-3 font-mono text-sm font-medium">
                    Email Preference
                  </h3>
                  <Input
                    defaultValue="Unsubscribe from Emails"
                    className="border border-border"
                  />
                </div>

                <div>
                  <h3 className="mb-3 font-mono text-sm font-medium">
                    Promotional Updates
                  </h3>
                  <Input
                    defaultValue="Opt out of promotional offers"
                    className="border border-border"
                  />
                </div>

                <div>
                  <h3 className="mb-3 font-mono text-sm font-medium">
                    BlueLearn News
                  </h3>
                  <Input
                    defaultValue="Unsubscribe to BlueLearn news"
                    className="border border-border"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="bg-input text-foreground hover:bg-input/90"
                >
                  Save
                </Button>
              </div>
            </div>
          )}

          {/* Advanced Section */}
          {activeSection === "advanced" && (
            <div className="space-y-8">
              <div>
                <h2 className="mb-1 font-mono text-sm font-bold tracking-[0.08em] uppercase">
                  Advanced
                </h2>
                <Separator className="mt-4 bg-border" />
              </div>

              <div className="space-y-6">
                <div>
                  <a
                    href="#"
                    className="font-mono text-sm underline hover:text-muted-foreground"
                  >
                    Terms of Service
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="font-mono text-sm underline hover:text-muted-foreground"
                  >
                    Privacy Policy
                  </a>
                </div>

                <div className="pt-4">
                  <Button
                    variant="destructive"
                    className="font-mono text-sm font-bold tracking-[0.08em] text-white uppercase hover:bg-red-700"
                  >
                    Delete Account
                  </Button>
                  <p className="mt-3 font-mono text-sm font-bold tracking-[0.08em] text-red-600 uppercase">
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
