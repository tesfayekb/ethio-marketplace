import { Input } from "@/components/ui/input";

/** Bundle 2 (INC-1146) — a table filter's TEXT box: the dialog field, 44 px on touch. */
export function FilterText({
  id,
  value,
  onChange,
  placeholder,
  testId,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  testId?: string;
}) {
  return (
    <Input
      id={id}
      type="search"
      data-testid={testId}
      className="min-h-11 md:pointer-fine:min-h-9"
      value={value}
      placeholder={placeholder}
      autoComplete="off"
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
