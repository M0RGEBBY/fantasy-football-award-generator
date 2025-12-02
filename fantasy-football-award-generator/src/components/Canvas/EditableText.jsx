import { useState, useRef, useEffect, forwardRef } from "react";
import { useAwardStore } from "../../store/UseAwardStore";

export default forwardRef(function EditableText({ field, className = "" }, ref) {
  const value = useAwardStore((s) => s[field]);
  const setField = useAwardStore((s) => s.setField);
  const [editing, setEditing] = useState(false);

  // local ref so we can focus the input; forward to parent ref if provided
  const localRef = useRef(null);
  useEffect(() => {
    if (editing) {
      const el = localRef.current ?? (ref && ref.current);
      el?.focus();
      // move caret to end if applicable
      if (el?.setSelectionRange) {
        const len = el.value?.length ?? 0;
        el.setSelectionRange(len, len);
      }
    }
  }, [editing, ref]);

  const assignRef = (el) => {
    localRef.current = el;
    if (!ref) return;
    if (typeof ref === "function") ref(el);
    else ref.current = el;
  };

  return editing ? (
    <input
      ref={assignRef}
      autoFocus
      value={value}
      onChange={(e) => setField(field, e.target.value)}
      onBlur={() => setEditing(false)}
      onKeyDown={(e) => { if (e.key === "Enter") setEditing(false); }}
      // full width + centered text while typing
      className={`w-full text-center bg-transparent outline-none ${className}`}
      style={{ boxSizing: "border-box" }}
    />
  ) : (
    <div
      ref={assignRef}
      className={`w-full text-center cursor-text ${className}`}
      onClick={() => setEditing(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") setEditing(true); }}
      style={{ cursor: "pointer" }}
    >
      {value || `[${field}]`}
    </div>
  );
});