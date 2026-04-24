import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export default function PageHeader({ title, children, onBack }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="size-8 text-gray-900 hover:text-main-theme transition-colors" />

          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="size-8 text-gray-900 hover:text-main-theme transition-colors"
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">{children}</div>
      </div>
      <Separator className="mt-4 border" />
    </div>
  );
}
