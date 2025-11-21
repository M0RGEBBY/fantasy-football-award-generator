import EditableText from "./EditableText";
import { useAwardStore } from "../../store/UseAwardStore";
import { Textfit } from "react-textfit";
import awardBg from '../../images/award background.png';

export default function CertificateCanvas() {
  const { leftLogo, rightLogo, awardLogo, setField, awardName } = useAwardStore();

  const upload = (field, file) => {
    const url = URL.createObjectURL(file);
    setField(field, url);
  };

  const textSizes = {
    awardName: { min: 15, max: 60 },
    teamName: { min: 18, max: 80 },
    default: { min: 14, max: 72 },
  };

  function sizesFor(field) {
    return textSizes[field] || textSizes.default;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 overflow-auto flex justify-center">
      <div
        className="relative p-8 rounded-xl overflow-hidden"
        style={{
          width: "11in",
          height: "8.5in",
          flex: "none",
          border: "12px solid",
          borderImage: "linear-gradient(45deg, #FFD700, #FFC107, #FFB300) 1",
          boxShadow:
            "0 0 40px rgba(255, 215, 0, 0.7), inset 0 0 30px rgba(255, 239, 180, 0.5)",
          background: "linear-gradient(to top right, #FFD700, #FFC107, #FFB300)",
        }}
      >
        {/* Static Shimmer / highlights */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15), transparent 60%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15), transparent 60%)
            `,
          }}
        ></div>

        {/* Logos */}
        <div className="flex justify-between mb-4 items-center">
          <div onClick={() => document.getElementById("left-logo").click()}>
            {leftLogo ? (
              <img src={leftLogo} className="w-25 h-25" />
            ) : (
              <span>[LOGO]</span>
            )}
            <input
              type="file"
              className="hidden"
              id="left-logo"
              onChange={(e) => upload("leftLogo", e.target.files[0])}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="font-bold text-center text-5xl">
              <EditableText field="leagueName" />
            </div>
            <p className="text-3xl font-bold mt-2">Fantasy Football League</p>
          </div>

          <div onClick={() => document.getElementById("right-logo").click()}>
            {rightLogo ? (
              <img src={rightLogo} className="w-25 h-25" />
            ) : (
              <span>[LOGO]</span>
            )}
            <input
              type="file"
              className="hidden"
              id="right-logo"
              onChange={(e) => upload("rightLogo", e.target.files[0])}
            />
          </div>
        </div>

        {/* Award Logo */}
        <div
          className="mx-auto w-[25rem] h-[15rem] flex items-center justify-center"
          onClick={() => document.getElementById("award-logo").click()}
        >
          {awardLogo ? (
            <img src={awardLogo} className="max-h-full" />
          ) : (
            <span>Award Logo (Upload)</span>
          )}
          <input
            type="file"
            className="hidden"
            id="award-logo"
            onChange={(e) => upload("awardLogo", e.target.files[0])}
          />
        </div>

        {/* Top Award Name */}
        <div className="italic mt-1 text-center text-xl">
          <EditableText field="awardName" />
        </div>

        {/* Team Name */}
        <div className="text-5xl font-bold mt-2 text-center">
          <EditableText field="teamName" />
        </div>

        <div className="italic pt-1 text-center text-lg">- managed & coached by -</div>

        {/* Coach Name */}
        <div className="text-5xl font-bold text-center">
          <EditableText field="coachName" />
        </div>

        {/* Description */}
        <div className="mt-4 italic font-bold text-center mx-auto w-[80%] text-xl">
          <EditableText field="description" />
        </div>

        {/* Year */}
        <div className="absolute bottom-26 left-0 w-full text-center">
          <div className="font-bold text-5xl">
            <EditableText field="year" />
          </div>
        </div>

        {/* Bottom Award Banner */}
        <div className="absolute bottom-2 left-0 w-full">
          <img
            src={awardBg}
            alt="Award Background"
            className="w-full object-contain pointer-events-none select-none"
          />

          <div className="absolute inset-0 flex items-center justify-center px-[220px]">
            <Textfit
              key={awardName}
              mode="single"
              {...sizesFor("awardName")}
              className="font-bold uppercase text-center w-full"
            >
              <EditableText field="awardName" />
            </Textfit>
          </div>
        </div>
      </div>
    </div>
  );
}
