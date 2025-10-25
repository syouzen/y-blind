import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const DefaultLoading = () => {
  return (
    <div
      className={cn(
        "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]"
      )}
    >
      <Spinner className="size-8 text-gray700" />
    </div>
  );
};

export default DefaultLoading;
