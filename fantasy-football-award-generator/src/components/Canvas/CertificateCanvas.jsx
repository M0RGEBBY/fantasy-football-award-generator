import { useRef } from "react";
import EditableText from "./EditableText";
import { useAwardStore } from "../../store/UseAwardStore";
import { Textfit } from "react-textfit";
import awardBg from "../../images/award background.png";

export default function CertificateCanvas() {
  const { leagueLogo, awardLogo, setField, awardName } = useAwardStore();
  const certRef = useRef();

  const upload = (field, file) => {
    const url = URL.createObjectURL(file);
    setField(field, url);
  };

  const handlePrint = () => {
    if (!certRef.current) return;

    const prevOverflow = document.body.style.overflow;
    const styleEl = document.createElement("style");
    styleEl.id = "temp-certificate-print-style";
    styleEl.innerHTML = `
      @page { size: 11in 8.5in; margin: 0; }
      @media print {
        body * { visibility: hidden !important; }
        .printable-certificate, .printable-certificate * { visibility: visible !important; }
        .printable-certificate { position: absolute !important; left: 0; top: 0; width: 100% !important; }
      }
      .printable-certificate { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `;
    document.head.appendChild(styleEl);

    certRef.current.classList.add("printable-certificate");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        certRef.current?.classList.remove("printable-certificate");
        const el = document.getElementById("temp-certificate-print-style");
        if (el) el.remove();
        document.body.style.overflow = prevOverflow;
      }, 500);
    }, 250);
  };

  const textSizes = {
    awardName: { min: 15, max: 60 },
    teamName: { min: 18, max: 80 },
    default: { min: 14, max: 72 },
  };

  const sizesFor = (field) => textSizes[field] || textSizes.default;

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 overflow-auto flex flex-col items-center">
      <div
        ref={certRef}
        className="relative p-8 rounded-xl overflow-hidden"
        style={{
          width: "11in",
          height: "8.5in",
          flex: "none",
          border: "12px solid",
          borderImage: "linear-gradient(45deg, #FFD75F, #FFD700, #FFCC33, #FFD75F) 1",
          boxShadow: `
            0 0 45px rgba(255, 215, 0, 0.7),
            inset 0 0 35px rgba(0,0,0,0.25)
          `,
          background: `
            linear-gradient(135deg, #FFEB80 0%, #FFD700 30%, #FFCC33 60%, #FFD700 85%, #FFEB80 100%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.01) 3px),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(0,0,0,0.03) 4px),
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 70%),
            radial-gradient(circle at 85% 70%, rgba(255,255,255,0.15), transparent 80%)
          `,
          backgroundBlendMode: "soft-light, overlay, overlay, normal",
        }}
      >
        {/* TOP LOGO ROW */}
        <div className="flex justify-between mb-4 items-center relative z-10">

          {/* LEFT LOGO */}
          <label
            htmlFor="left-logo"
            className={
              leagueLogo
                ? "cursor-pointer w-28 h-28 rounded-md overflow-hidden"
                : "cursor-pointer w-28 h-28 flex items-center justify-center rounded-md border-2 border-dashed border-yellow-800 bg-yellow-50/40 text-center text-sm text-yellow-900 shadow-sm hover:bg-yellow-50"
            }
          >
            {leagueLogo ? (
              <img src={leagueLogo} alt="League Logo" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center text-xs">Upload Logo</div>
            )}
          </label>
          <input
            id="left-logo"
            type="file"
            className="hidden"
            onChange={(e) => upload("leagueLogo", e.target.files[0])}
          />

          {/* MIDDLE TITLE */}
          <div className="flex flex-col items-center">
            <div className="font-bold text-center text-5xl tracking-wide drop-shadow-md">
              <EditableText field="leagueName" />
            </div>
            <p className="text-3xl font-bold mt-2 tracking-wide">Fantasy Football League</p>
          </div>

          {/* RIGHT LOGO (same leagueLogo) */}
          <label
            htmlFor="right-logo"
            className={
              leagueLogo
                ? "cursor-pointer w-28 h-28 rounded-md overflow-hidden"
                : "cursor-pointer w-28 h-28 flex items-center justify-center rounded-md border-2 border-dashed border-yellow-800 bg-yellow-50/40 text-center text-sm text-yellow-900 shadow-sm hover:bg-yellow-50"
            }
          >
            {leagueLogo ? (
              <img src={leagueLogo} alt="League Logo" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center text-xs">Upload Logo</div>
            )}
          </label>
          <input
            id="right-logo"
            type="file"
            className="hidden"
            onChange={(e) => upload("leagueLogo", e.target.files[0])}
          />
        </div>

        {/* AWARD LOGO */}
        <div className="mx-auto w-[25rem] h-[15rem] relative z-10">
          <label
            htmlFor="award-logo"
            className={
              awardLogo
                ? "cursor-pointer w-full h-full rounded-md overflow-hidden flex items-center justify-center"
                : "cursor-pointer w-full h-full flex items-center justify-center rounded-md border-2 border-dashed border-yellow-800 bg-yellow-50/40 text-center text-sm text-yellow-900 shadow-sm hover:bg-yellow-50"
            }
          >
            {awardLogo ? (
              <img src={awardLogo} alt="Award Logo" className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="text-center text-xs">Upload Award Logo</div>
            )}
          </label>
          <input
            id="award-logo"
            type="file"
            className="hidden"
            onChange={(e) => upload("awardLogo", e.target.files[0])}
          />
        </div>

        {/* TEXT SECTIONS */}
        <div className="italic mt-1 text-center text-xl tracking-wide relative z-10">
          <EditableText field="awardName" />
        </div>

        <div className="text-5xl font-bold mt-2 text-center tracking-wide relative z-10 drop-shadow-md">
          <EditableText field="teamName" />
        </div>

        <div className="italic pt-1 text-center text-lg relative z-10">- managed & coached by -</div>

        <div className="text-5xl font-bold text-center tracking-wide relative z-10 drop-shadow-md">
          <EditableText field="coachName" />
        </div>

        <div className="mt-4 italic font-bold text-center mx-auto w-[80%] text-xl tracking-wide relative z-10">
          <EditableText field="description" />
        </div>

        {/* YEAR WITH BACKGROUND */}
        <div className="absolute bottom-26 left-0 right-0 z-10 px-4">
          <div className="font-bold text-5xl tracking-wide drop-shadow-md text-center">
            <EditableText field="year" />
          </div>
        </div>

        <div className="absolute bottom-2 left-0 right-0 z-10 px-4">
          <img src={awardBg} alt="Award Background" className="w-full object-contain pointer-events-none select-none" />
          <div className="absolute inset-0 flex items-center justify-center px-[220px]">
            <Textfit
              key={awardName}
              mode="single"
              {...sizesFor("awardName")}
              className="font-bold uppercase text-center w-full tracking-wide drop-shadow-md"
            >
              <EditableText field="awardName" />
            </Textfit>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-800 transition tracking-wide"
      >
        Print Certificate
      </button>
    </div>
  );
}
