import { useRef } from "react";
import { useAwardStore } from "../../store/UseAwardStore";

export default function SidebarMenu() {
  const store = useAwardStore();
  const setField = useAwardStore((s) => s.setField);
  const fileRefs = useRef({});

  // description no longer has a character limit

  const handleFile = (field, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setField(field, url);
    setField(field + "Filename", file.name);
    if (fileRefs.current[field]) fileRefs.current[field].value = "";
  };

  const clearFile = (field) => {
    setField(field, "");
    setField(field + "Filename", "");
    if (fileRefs.current[field]) fileRefs.current[field].value = "";
  };

  const handleLeagueLogo = (e) => handleFile("leagueLogo", e);
  const clearLeagueLogo = () => clearFile("leagueLogo");

  return (
    <div className="w-1/3 p-6 border-r h-screen bg-white overflow-auto">
      <h2 className="font-bold text-xl mb-4">Enter Award Details:</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">League Name</label>
        <input
          value={store.leagueName ?? ""}
          onChange={(e) => setField("leagueName", e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">League Logo</label>
        <div className="flex items-center gap-2">
          <input
            ref={(el) => (fileRefs.current["leagueLogo"] = el)}
            type="file"
            accept="image/*"
            onChange={handleLeagueLogo}
            className="hidden"
            id="leagueLogoInput"
          />
          <label htmlFor="leagueLogoInput" className="bg-yellow-600 text-white px-3 py-2 rounded cursor-pointer">
            Upload
          </label>
          <div className="text-sm text-gray-700">
            {store.leagueLogoFilename || (store.leagueLogo ? "Uploaded" : "No file selected")}
          </div>
          {store.leagueLogo ? (
            <button onClick={clearLeagueLogo} className="ml-auto text-xs text-red-600 hover:underline">
              Remove
            </button>
          ) : null}
        </div>
        {store.leagueLogo ? (
          <img src={store.leagueLogo} alt="league preview" className="mt-2 w-24 h-24 object-contain rounded" />
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Award Logo</label>
        <div className="flex items-center gap-2">
          <input
            ref={(el) => (fileRefs.current["awardLogo"] = el)}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile("awardLogo", e)}
            className="hidden"
            id="awardLogoInput"
          />
          <label htmlFor="awardLogoInput" className="bg-yellow-600 text-white px-3 py-2 rounded cursor-pointer">
            Upload
          </label>
          <div className="text-sm text-gray-700">
            {store.awardLogoFilename || (store.awardLogo ? "Uploaded" : "No file selected")}
          </div>
          {store.awardLogo ? (
            <button onClick={() => clearFile("awardLogo")} className="ml-auto text-xs text-red-600 hover:underline">
              Remove
            </button>
          ) : null}
        </div>
        {store.awardLogo ? (
          <img src={store.awardLogo} alt="award preview" className="mt-2 w-full h-32 object-contain rounded" />
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Award Name</label>
        <input
          value={store.awardName ?? ""}
          onChange={(e) => setField("awardName", e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Team Name</label>
        <input
          value={store.teamName ?? ""}
          onChange={(e) => setField("teamName", e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Coach Name</label>
        <input
          value={store.coachName ?? ""}
          onChange={(e) => setField("coachName", e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Year</label>
        <input
          value={store.year ?? ""}
          onChange={(e) => setField("year", e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          value={store.description ?? ""}
          onChange={(e) => {
            // limit explicit newlines to 2 lines
            let v = e.target.value;
            const lines = v.split("\n");
            if (lines.length > 2) v = lines.slice(0, 2).join("\n");
            setField("description", v);
          }}
          onKeyDown={(e) => {
            // prevent Enter adding a 3rd explicit line
            if (e.key === "Enter") {
              const lines = (store.description ?? "").split("\n");
              if (lines.length >= 2) e.preventDefault();
            }
          }}
          className="border p-2 w-full rounded resize-none"
          rows={2}
        />
        <div className="text-xs text-gray-500 mt-1">Note: description display is limited to 2 lines on the certificate.</div>
      </div>
    </div>
  );
}
