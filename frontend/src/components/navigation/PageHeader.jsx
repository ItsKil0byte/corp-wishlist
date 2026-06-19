import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function PageHeader({ title, children, onBack }) {
  return (
    <div>
      <div className="mb-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="size-12 text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-6" />
            </Button>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">{children}</div>
      </div>
      <Separator className="mt-4 border" />
    </div>
  );
}
