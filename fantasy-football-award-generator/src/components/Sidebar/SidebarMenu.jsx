import { useAwardStore } from "../../store/UseAwardStore";

export default function SidebarMenu() {
  const fields = useAwardStore();
  const setField = useAwardStore((s) => s.setField);

  return (
    <div className="w-1/3 p-6 border-r h-screen bg-white overflow-auto">
      <h2 className="font-bold text-lg mb-4">Menu To Enter Values</h2>

      {Object.keys(fields)
        .filter((key) => typeof fields[key] === "string")
        .map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-semibold capitalize">
              {field}
            </label>
            <input
              value={fields[field]}
              onChange={(e) => setField(field, e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ))}
    </div>
  );
}
