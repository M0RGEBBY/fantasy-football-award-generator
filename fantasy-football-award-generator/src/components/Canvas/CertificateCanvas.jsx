import EditableText from "./EditableText";
import { useAwardStore } from "../../store/UseAwardStore";

export default function CertificateCanvas() {
  const { leftLogo, rightLogo, awardLogo, setField } = useAwardStore();

  const upload = (field, file) => {
    const url = URL.createObjectURL(file);
    setField(field, url);
  };

  return (
    <div className="flex-1 bg-white p-8 text-center h-screen overflow-auto flex justify-center items-start">
      {/* Certificate Preview Wrapper */}
      <div className="bg-amber-200 shadow-2xl border border-amber-400 rounded-xl p-8 w-full max-w-4xl mt-10">
        
        {/* LOGOS */}
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
            <EditableText field="leagueName" className="text-5xl font-bold" />
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

        {/* AWARD LOGO */}
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

        {/* TEXT FIELDS */}
        <EditableText field="awardName" className="italic mt-1" />        
        <EditableText field="teamName" className="text-4xl font-bold mt-2" />
        <div className="italic pt-1">- managed & coached by -</div>
        <EditableText field="coachName" className="text-4xl font-bold pt-1" />

        <EditableText field="description" className="mt-4 italic" />
        <EditableText field="year" className="font-bold mt-3 text-5xl" />
        <EditableText field="awardName" className="text-4xl font-bold mt-4 uppercase" />
      </div>
    </div>
  );
}
