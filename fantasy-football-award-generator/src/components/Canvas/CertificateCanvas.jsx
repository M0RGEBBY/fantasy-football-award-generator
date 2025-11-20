import EditableText from "./EditableText";
import { useAwardStore } from "../../store/UseAwardStore";
import { Textfit } from "react-textfit"; // Use the Next version for React 19

export default function CertificateCanvas() {
  const { leftLogo, rightLogo, awardLogo, setField, awardName } = useAwardStore();

  const upload = (field, file) => {
    const url = URL.createObjectURL(file);
    setField(field, url);
  };

  const textSizes = {
    awardName: { min: 20, max: 60 }, // tweak these numbers (px)
    teamName: { min: 18, max: 80 },
    default: { min: 14, max: 72 },
  };

  function sizesFor(field) {
    return textSizes[field] || textSizes.default;
  }

  return (
    <div className="flex-1 p-8 text-center h-screen overflow-auto flex justify-center items-start bg-gray-100">
      {/* Certificate Wrapper */}
      <div
        className="relative w-full max-w-4xl mt-10 p-8 rounded-xl shadow-2xl border-2 border-yellow-800
                   bg-gradient-to-tr from-yellow-800 via-yellow-400 via-yellow-300 to-yellow-200 overflow-hidden"
      >
        {/* Shimmer overlay */}
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] 
                     bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)]
                     rotate-45 pointer-events-none"
        ></div>

        {/* Logos */}
        <div className="flex justify-between mb-4 items-center">
          <div onClick={() => document.getElementById("left-logo").click()}>
            {leftLogo ? (
              <img src={leftLogo} className="w-20 h-20" />
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
              <img src={rightLogo} className="w-20 h-20" />
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
          className="mx-auto w-[20rem] h-[15rem] flex items-center justify-center"
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
        <div className="italic mt-1 text-center">
          <EditableText field="awardName" />
        </div>

        {/* Team Name */}
        <div className="text-4xl font-bold mt-2 text-center">
          <EditableText field="teamName" />
        </div>

        <div className="italic pt-1">- managed & coached by -</div>

        {/* Coach Name */}
        <div className="text-4xl font-bold pt-1 text-center">
          <EditableText field="coachName" />
        </div>

        {/* Description */}
        <div className="mt-4 italic text-center">
          <EditableText field="description" />
        </div>

        {/* Year */}
        <div className="font-bold mt-3 text-5xl text-center">
          <EditableText field="year" />
        </div>

        {/* Second Award Name (with Textfit and overflow safeguard) */}
        <div className="w-full overflow-hidden pl-20 pr-20">
          <Textfit
            key={awardName}
            mode="single"
            {...sizesFor("awardName")}
            className="font-bold mt-4 uppercase text-center"
          >
            <EditableText field="awardName" />
          </Textfit>
        </div>
      </div>
    </div>
  );
}
