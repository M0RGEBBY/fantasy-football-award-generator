import SidebarMenu from "./components/Sidebar/SidebarMenu";
import CertificateCanvas from "./components/Canvas/CertificateCanvas";
import AppHeader from "./components/Header/AppHeader";

export default function App() {
  return (
    <div className="flex flex-col h-screen">

      <AppHeader />

      {/* Main layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <SidebarMenu />
        <CertificateCanvas />
      </div>

    </div>
  );
}


