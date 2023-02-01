import { useRecoilValue, useSetRecoilState } from "recoil";

import { searchTextState, searchHistoryState } from "../atoms/ui";

type SearchBoxHistoryProps = {
  hideHistory: Function;
};

const SearchBoxHistory = ({ hideHistory }: SearchBoxHistoryProps) => {
  const setSearchText = useSetRecoilState(searchTextState);
  const entries = useRecoilValue(searchHistoryState);
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    setSearchText((event.target as HTMLButtonElement).value);
    hideHistory();
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/70 border border-slate-400/20 rounded-lg text-slate-400 text-md w-full text-sm">
      <div>
        {entries.length > 0 ? (
          <>
            <ul>
              {entries.map(() => (
                <pre>entry</pre>
              ))}
            </ul>
            <div className="py-2 px-4 border-t border-slate-400/20 flex items-center justify-end">
              <button
                className="text-pink-500/70 text-xs hover:text-pink-500"
                type="button"
              >
                Clear history
              </button>
            </div>
          </>
        ) : (
          <div className="items-center">
            <div className="px-4 py-5 text-center text-xs leading-6">
              <p>
                <em>We'll keep track of your searches here.</em>
              </p>
              <p>
                <em>
                  If you don't know what to search for, you can try out the
                  examples from below.
                </em>
              </p>
            </div>
            <ul className="text-slate-400/80 text-sm border-t border-slate-400/20">
              <li className="w-full">
                <button
                  className="text-pink-500 hover:bg-slate-400/10 py-2 px-4 w-full text-left"
                  onClick={onClick}
                  type="button"
                  value="0xe468ce99444174bd3bbbed09209577d25d1ad673"
                >
                  0xe468ce99444174bd3bbbed09209577d25d1ad673
                </button>
              </li>
              <li className="w-full">
                <button
                  className="text-pink-500 hover:bg-slate-500/10 py-2 px-4 w-full text-left"
                  onClick={onClick}
                  type="button"
                  value="0xce1c7037b8737b911704d6c21c01675f6c047f1a"
                >
                  0xce1c7037b8737b911704d6c21c01675f6c047f1a
                </button>
              </li>
              <li className="w-full">
                <button
                  className="text-pink-500 hover:bg-slate-400/10 py-2 px-4 w-full text-left"
                  onClick={onClick}
                  type="button"
                  value="ix-shells.eth"
                >
                  ix-shells.eth
                </button>
              </li>
              <li className="w-full">
                <button
                  className="text-pink-500 hover:bg-slate-400/10 py-2 px-4 w-full text-left rounded-b-lg"
                  onClick={onClick}
                  type="button"
                  value="jacbo.eth"
                >
                  jacbo.eth
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBoxHistory;
