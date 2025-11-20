import SidebarMenu from "./components/Sidebar/SidebarMenu";
import CertificateCanvas from "./components/Canvas/CertificateCanvas";

export default function App() {
  return (
    <div className="flex h-screen">
      <SidebarMenu />
      <CertificateCanvas />
    </div>
  );
}
