"use client"

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      {/* Empty div to balance the layout and center the nav */}
      <div className="flex-1" />

      {/* Navigation */}
      <nav className="flex items-center space-x-2">
        <a
          href="#"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Home
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Team
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Events
        </a>
      </nav>

      {/* Login Button Group */}
      <div
        id="gooey-btn-header"
        className="relative flex flex-1 items-center justify-end group"
        style={{ filter: "url(#gooey-filter)" }}
      >
        
        
      </div>
    </header>
  )
}