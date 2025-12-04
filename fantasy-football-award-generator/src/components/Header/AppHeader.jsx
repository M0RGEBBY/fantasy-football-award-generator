export default function AppHeader() {
  return (
    <header className="premium-header p-8 pb-10 text-center relative overflow-visible shadow-lg">
      {/* Title with shimmering gold text */}
      <h1 className="premium-title pb-3 premium-gold-text text-5xl md:text-6xl font-extrabold tracking-wide">
        Fantasy Football Award Generator
      </h1>

      {/* Animated gold underline */}
      <div className="premium-underline"></div>

      {/* Floating particle layer */}
      <div className="gold-particles"></div>
    </header>
  );
}
