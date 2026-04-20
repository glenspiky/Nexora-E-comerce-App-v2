import HelpMenu from "./HelpMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      {/* 1. h-full ensures the inner div fills the header height.
          2. max-w-[1440px] (or 1268px) keeps content from spreading too far.
          3. mx-auto centers this container.
      */}
      <div className="flex justify-between items-center h-[70px] w-full max-w-[1440px] mx-auto px-4 lg:px-10">
        <Logo />
        <SearchBar />
      <HelpMenu></HelpMenu>
        <UserActions />
      </div>
    </header>
  );
}
