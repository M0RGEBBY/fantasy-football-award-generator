import { useState, forwardRef } from "react";
import { useAwardStore } from "../../store/UseAwardStore";

export default forwardRef(function EditableText({ field, className }, ref) {
  const value = useAwardStore((s) => s[field]);
  const setField = useAwardStore((s) => s.setField);
  const [editing, setEditing] = useState(false);

  return editing ? (
    <input
      ref={ref}
      autoFocus
      className={`border px-2 ${className}`}
      value={value}
      onChange={(e) => setField(field, e.target.value)}
      onBlur={() => setEditing(false)}
    />
  ) : (
    <div
      ref={ref}
      className={className}
      onClick={() => setEditing(true)}
      style={{ cursor: "pointer" }}
    >
      {value || `[${field}]`}
    </div>
  );
});
