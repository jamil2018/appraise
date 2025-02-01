import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-10">
      <span className="mr-2 text-muted-foreground">
        <LoaderCircle className="animate-spin w-5 h-5" />
      </span>
      <span className="text-sm font-medium text-muted-foreground">
        Loading...
      </span>
    </div>
  );
}
