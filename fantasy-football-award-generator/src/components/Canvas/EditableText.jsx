import { useState } from "react";
import { useAwardStore } from "../../store/useAwardStore";

export default function EditableText({ field, className }) {
  const value = useAwardStore((s) => s[field]);
  const setField = useAwardStore((s) => s.setField);
  const [editing, setEditing] = useState(false);

  return editing ? (
    <input
      autoFocus
      className={`border px-2 ${className}`}
      value={value}
      onChange={(e) => setField(field, e.target.value)}
      onBlur={() => setEditing(false)}
    />
  ) : (
    <div
      className={className}
      onClick={() => setEditing(true)}
      style={{ cursor: "pointer" }}
    >
      {value || `[${field}]`}
    </div>
  );
}
