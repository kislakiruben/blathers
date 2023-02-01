import SearchBox from "./SearchBox";

const Header = () => (
  <header className="sticky top-0 flex border-b border-slate-400/20 items-center justify-center py-4 md:px-10 px-4 z-10 shadow-lg">
    <SearchBox />
    <div className="backdrop-blur-xl absolute left-0 right-0 top-0 bottom-0 bg-slate-900/80" />
  </header>
);

export default Header;
