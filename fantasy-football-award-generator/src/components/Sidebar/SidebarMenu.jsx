import { useRef, memo } from "react";
import { useAwardStore } from "../../store/UseAwardStore"; 

// Helper component for standard text inputs - WRAPPED IN memo()
const TextField = memo(({ field, label, type = "text", value, setField }) => {
  return (
    <div className="mb-4">
      {/* Updated Label Color */}
      <label className="block text-sm font-bold text-gray-300 mb-2">{label}</label>
      <input
        value={value ?? ""}
        onChange={(e) => setField(field, e.target.value)}
        type={type}
        // Updated Input Styling for Dark Mode
        className="border border-gray-600 bg-gray-800 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 w-full rounded-lg shadow-sm transition duration-150 ease-in-out"
      />
    </div>
  );
});

// Helper component for file inputs - WRAPPED IN memo()
const FileUploadField = memo(({ field, label, previewClasses, value, filename, handleFile, clearFile, fileRefs }) => {
  return (
    <div className="mb-6">
      {/* Updated Label Color */}
      <label className="block text-sm font-bold text-gray-300 mb-2">{label}</label>
      <div className="flex flex-col space-y-3">
        {/* File Input/Controls Row */}
        <div className="flex items-center gap-3">
          <input
            ref={(el) => (fileRefs.current[field] = el)}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(field, e)}
            className="hidden"
            id={`${field}Input`}
          />
          <label
            htmlFor={`${field}Input`}
            // Gold Button Styling
            className="bg-amber-500 text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-600 transition duration-150 ease-in-out cursor-pointer shadow-md"
          >
            {value ? "Change File" : "Upload File"}
          </label>

          {/* Updated Filename Text Color */}
          <div className="text-sm text-gray-400 truncate flex-1">
            {filename || (value ? "Uploaded" : "No file selected")}
          </div>

          {value && (
            <button
              onClick={() => clearFile(field)}
              // Remove Button remains red for destructive action
              className="ml-auto text-xs text-red-400 hover:text-red-500 font-medium transition duration-150 ease-in-out cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>
        {/* Image Preview - Updated BG and Border Color */}
        {value && (
          <div className="p-3 bg-gray-800 border border-gray-600 rounded-lg flex justify-center">
            <img 
              src={value} 
              alt={`${label} preview`} 
              className={`object-contain rounded ${previewClasses}`} 
            />
          </div>
        )}
      </div>
    </div>
  );
});


export default function SidebarMenu() {
  // Select the specific state variables needed for input values (Focus Fix)
  const setField = useAwardStore((s) => s.setField);
  const leagueName = useAwardStore((s) => s.leagueName);
  const awardName = useAwardStore((s) => s.awardName);
  const teamName = useAwardStore((s) => s.teamName);
  const coachName = useAwardStore((s) => s.coachName);
  const year = useAwardStore((s) => s.year);
  const description = useAwardStore((s) => s.description); 
  
  // Select the specific state variables needed for display (Logos)
  const leagueLogo = useAwardStore((s) => s.leagueLogo);
  const leagueLogoFilename = useAwardStore((s) => s.leagueLogoFilename);
  const awardLogo = useAwardStore((s) => s.awardLogo);
  const awardLogoFilename = useAwardStore((s) => s.awardLogoFilename);

  const fileRefs = useRef({});

  const handleFile = (field, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      if (fileRefs.current[field]) fileRefs.current[field].value = "";
      return;
    }
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
  
  // Map fields to their respective values for clean passing to TextField
  const fieldValues = {
    leagueName, awardName, teamName, coachName, year
  };

  return (
    // Main Container - Dark Background
    <div className="w-1/3 p-8 h-full overflow-auto bg-gray-900 overflow-y-auto border-r border-gray-700">
      {/* Header - Updated Text and Border Color */}
      <h2 className="font-extrabold text-2xl text-white mb-6 border-b border-gray-700 pb-3">
        Award Editor
      </h2>

      {/* Primary Details Card - Dark Card Background */}
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
        {/* Header - Updated Text and Border Color */}
        <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-600 pb-2">Basic Information</h3>
        
        {/* Basic Text Fields */}
        <TextField field="leagueName" label="League Name" value={fieldValues.leagueName} setField={setField} />
        <TextField field="awardName" label="Award Name" value={fieldValues.awardName} setField={setField} />
        <TextField field="teamName" label="Team Name" value={fieldValues.teamName} setField={setField} />
        <TextField field="coachName" label="Coach Name" value={fieldValues.coachName} setField={setField} />
        <TextField field="year" label="Year" type="number" value={fieldValues.year} setField={setField} />

        {/* Description Field - Updated Border Color */}
        <div className="mb-4 pt-4 border-t border-gray-600"> 
          <label className="block text-sm font-bold text-gray-300 mb-2">Description</label>
          <textarea
            value={description ?? ""}
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
                const lines = (description ?? "").split("\n");
                if (lines.length >= 2) e.preventDefault();
              }
            }}
            // Updated Textarea Styling for Dark Mode
            className="border border-gray-600 bg-gray-800 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 w-full rounded-lg resize-none shadow-sm transition duration-150 ease-in-out"
            rows={3}
            placeholder="Enter a short description (max 2 lines)"
          />
        </div>
      </div>

      {/* Logo Uploads Card - Dark Card Background */}
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
        {/* Header - Updated Text and Border Color */}
        <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-600 pb-2">Logo Uploads</h3>
        
        {/* File Upload Fields */}
        <FileUploadField 
          field="leagueLogo" 
          label="League Logo" 
          previewClasses="h-24 w-24"
          value={leagueLogo}
          filename={leagueLogoFilename}
          handleFile={handleFile}
          clearFile={clearFile}
          fileRefs={fileRefs}
        />
        <FileUploadField 
          field="awardLogo" 
          label="Award Logo" 
          previewClasses="h-32 w-full"
          value={awardLogo}
          filename={awardLogoFilename}
          handleFile={handleFile}
          clearFile={clearFile}
          fileRefs={fileRefs}
        />
      </div>
    </div>
  );
}