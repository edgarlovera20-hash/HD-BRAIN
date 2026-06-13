import { Bell, Search, User } from "../../design-system/icons";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[#111827] border-b border-white/[0.08] flex items-center justify-between px-6 shrink-0">
      {/* Left: page title */}
      <h1
        className="text-lg font-semibold text-white"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {title}
      </h1>

      {/* Right: search + bell + user */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 bg-[#161F33] border border-white/[0.08] rounded-xl text-sm text-[#94A3B8] placeholder-[#94A3B8] focus:outline-none focus:border-[#0066FF] focus:text-white transition-colors w-52"
          />
        </div>

        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-[#161F33] border border-white/[0.08] text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0066FF]" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00A3FF] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-white text-sm font-medium leading-none">{user?.name ?? "Brain"}</p>
            <p className="text-[#94A3B8] text-xs mt-0.5">{user?.role ?? "Admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
