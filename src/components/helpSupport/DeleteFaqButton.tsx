import { Button } from "@/components/ui/button";

export function DeleteFaqButton({ onDelete }) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={onDelete}
    >
      Delete
    </Button>
  );
}
