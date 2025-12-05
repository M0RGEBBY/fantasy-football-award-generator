import { useRef, useEffect } from "react";
import EditableText from "./EditableText";
import { useAwardStore } from "../../store/UseAwardStore";
import { Textfit } from "@dalee9000/react19-ts-textfit";
import awardBg from "../../images/award background.png";
import footballBg from "../../images/footballbackground.png";

export default function CertificateCanvas() {
  const { leagueLogo, awardLogo, setField, awardName } = useAwardStore();
  const certRef = useRef();
  const textfitRef = useRef(null);

  const upload = (field, file) => {
    const url = URL.createObjectURL(file);
    if (field === "leagueLogo") {
      setField("leagueLogo", url);
      setField("leagueLogoFilename", file.name);
    } else if (field === "awardLogo") {
      setField("awardLogo", url);
      setField("awardLogoFilename", file.name);
    } else {
      setField(field, url);
    }
  };

  useEffect(() => {
    textfitRef.current?.fit?.();
  }, [awardName]);

  const handlePrint = () => {
    if (!certRef.current) return;

    const prevOverflow = document.body.style.overflow;

    const styleEl = document.createElement("style");
    styleEl.id = "temp-certificate-print-style";
    styleEl.innerHTML = `
      @page { 
        size: 11in 8.5in; 
        margin: 0 !important; 
      }

      @media print {
        /* Force margin/padding removal on root elements */
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
        
        body * {
          visibility: hidden !important;
        }
        .printable-certificate, .printable-certificate * {
          visibility: visible !important;
        }
        .printable-certificate {
          /* Set precise dimensions with border-box for cross-browser consistency */
          position: absolute !important; 
          left: 0 !important;
          top: 0 !important;
          width: 11in !important;
          height: 8.5in !important;
          box-sizing: border-box !important; 
          
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }

      .printable-certificate {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
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
  function sizesFor(field) {
    return textSizes[field] || textSizes.default;
  }

  const requestTextfit = () => setTimeout(() => textfitRef.current?.fit?.(), 40);

  const goldTextStyle = {
    color: "#996515", 
    textShadow: `
      0 1px 1px rgba(0,0,0,0.7),
      0 1px 3px rgba(0,0,0,0.5),
      0 0 1px rgba(153,101,21,0.3)
    `,
  };

  return (
    <div
      // FIX: Changed classes here to ensure scrolling works within the App's container
      className="w-full py-10 overflow-auto flex flex-col items-center bg-cover bg-center bg-no-repeat flex-1"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(255,255,255,0) 60%, rgba(0,0,0,0.9) 100%),
          url(${footballBg})
        `,
        backgroundBlendMode: "overlay",
      }}
    >
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
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent), linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))`,
            mixBlendMode: "soft-light",
          }}
        />

        <div className="flex justify-between mb-4 items-center relative z-10">
          <div className="flex items-center">
            <label
              htmlFor="league-logo"
              className={leagueLogo ? "cursor-pointer w-28 h-28 rounded-md overflow-hidden" : "cursor-pointer w-28 h-28 flex items-center justify-center rounded-md border-2 border-dashed border-yellow-800 bg-yellow-50/40 text-center text-sm text-yellow-900 shadow-sm hover:bg-yellow-50"}
              title="Upload league logo"
            >
              {leagueLogo ? (
                <img src={leagueLogo} alt="League logo" className="w-full h-full object-contain rounded-md" />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold">Upload</div>
                  <div className="text-xs -mt-1">League Logo</div>
                </div>
              )}
            </label>
            <input type="file" className="hidden" id="league-logo" onChange={(e) => upload("leagueLogo", e.target.files[0])} accept="image/*" />
          </div>

          <div className="flex flex-col items-center">
            <div className="font-bold text-center text-5xl tracking-wide drop-shadow-md" style={goldTextStyle}>
              <EditableText field="leagueName" />
            </div>
            <p className="text-3xl font-bold mt-2 tracking-wide" style={goldTextStyle}>Fantasy Football League</p>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="league-logo"
              className={leagueLogo ? "cursor-pointer w-28 h-28 rounded-md overflow-hidden" : "cursor-pointer w-28 h-28 flex items-center justify-center rounded-md border-2 border-dashed border-yellow-800 bg-yellow-50/40 text-center text-sm text-yellow-900 shadow-sm hover:bg-yellow-50"}
              title="Upload league logo"
            >
              {leagueLogo ? (
                <img src={leagueLogo} alt="League logo" className="w-full h-full object-contain rounded-md" />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold">Upload</div>
                  <div className="text-xs -mt-1">League Logo</div>
                </div>
              )}
            </label>
            <input type="file" className="hidden" id="league-logo" onChange={(e) => upload("leagueLogo", e.target.files[0])} accept="image/*" />
          </div>
        </div>

        <div className="mx-auto w-[25rem] h-[15rem] relative z-10">
          <label
            htmlFor="award-logo"
            className={awardLogo ? "cursor-pointer w-full h-full rounded-md overflow-hidden flex items-center justify-center" : "cursor-pointer w-full h-full flex items-center justify-center rounded-md border-2 border-dashed border-yellow-800 bg-yellow-50/40 text-center text-sm text-yellow-900 shadow-sm hover:bg-yellow-50 overflow-hidden"}
            title="Upload award logo"
          >
            {awardLogo ? (
              <img src={awardLogo} alt="Award logo" className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-lg font-semibold">Upload</div>
                <div className="text-xs -mt-1">Award Logo</div>
                <div className="text-xs mt-2 text-gray-700">Click to upload</div>
              </div>
            )}
          </label>
          <input type="file" className="hidden" id="award-logo" onChange={(e) => upload("awardLogo", e.target.files[0])} />
        </div>

        <div className="italic mt-1 text-center text-xl tracking-wide relative z-10" style={goldTextStyle}>
          <EditableText field="awardName" />
        </div>

        <div className="text-5xl font-bold mt-2 text-center tracking-wide relative z-10 drop-shadow-md" style={goldTextStyle}>
          <EditableText field="teamName" />
        </div>

        <div className="italic pt-1 text-center text-lg relative z-10" style={goldTextStyle}>- managed & coached by -</div>

        <div className="text-5xl font-bold text-center tracking-wide relative z-10 drop-shadow-md" style={goldTextStyle}>
          <EditableText field="coachName" />
        </div>

        <div
          className="mt-4 italic text-center mx-auto w-[80%] text-xl tracking-wide relative z-10"
          style={{
            ...goldTextStyle,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            textShadow: "0 1px 1px rgba(0,0,0,0.5)",
          }}
        >
          <EditableText field="description" />
        </div>

        <div className="absolute bottom-26 left-0 right-0 z-10 px-4">
          <div className="font-bold text-5xl tracking-wide drop-shadow-md text-center" style={goldTextStyle}>
            <EditableText field="year" />
          </div>
        </div>

        <div className="absolute bottom-2 left-0 right-0 z-10 px-4">
          <img src={awardBg} alt="Award Background" className="w-full object-contain pointer-events-none select-none" />
          <div className="absolute inset-0 flex items-center justify-center px-[220px]">
            <Textfit key={awardName} mode="single" {...sizesFor("awardName")} className="font-bold uppercase text-center w-full tracking-wide drop-shadow-md" style={goldTextStyle}>
              <EditableText field="awardName" />
            </Textfit>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="
          mt-10   /* FIX: Reduced margin-top from mt-20 to mt-10 */
          cursor-pointer
          w-[11in]
          text-3xl
          font-bold
          py-5
          rounded-2xl
          tracking-wide
          shadow-[0_0_25px_rgba(255,215,0,0.6)]
          transition
          bg-gradient-to-br
          from-yellow-300
          via-yellow-400
          to-yellow-600
          text-yellow-900
          hover:brightness-110
          hover:shadow-[0_0_35px_rgba(255,215,0,0.8)]
        "
      >
        Print Award Certificate
      </button>
    </div>
  );
}