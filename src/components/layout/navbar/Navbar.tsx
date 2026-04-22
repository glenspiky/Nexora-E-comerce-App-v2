import HelpMenu from "./HelpMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function Navbar() {
  return (
    // Navbar.tsx
    <header className="sticky top-0 z-[100] w-full border-b bg-white shadow-sm">
      {/* Ensure this container DOES NOT have overflow-hidden */}
      <div className="flex justify-between items-center h-[70px] w-full max-w-[1440px] mx-auto px-4 lg:px-10 relative">
        <Logo />
        <SearchBar />
        <HelpMenu/>
        <UserActions />
      </div>
    </header>
  );
}
