import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";

import { searchTextState, searchHistoryState } from "../atoms/ui";
import { PLACEHOLDER_ADDRESSES } from "../constants";

type SearchBoxHistoryProps = {
  hideHistory: Function;
};

const SearchBoxHistory = ({ hideHistory }: SearchBoxHistoryProps) => {
  const setSearchText = useSetRecoilState(searchTextState);
  const entries = useRecoilValue(searchHistoryState);
  const resetSearchHistory = useResetRecoilState(searchHistoryState);
  const onClickEntry = (event: React.FormEvent<HTMLButtonElement>) => {
    setSearchText((event.target as HTMLButtonElement).value);
    hideHistory();
  };
  const onClickClearHistory = () => {
    resetSearchHistory();
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/70 border border-slate-400/20 rounded-lg text-slate-400 text-md w-full text-sm">
      {entries.length > 0 ? (
        <div className="flex flex-col min-h-[160px]">
          <div className="flex-grow">
            <ul className="max-h-[260px] overflow-auto">
              {entries.map((entry) => (
                <li className="w-full" key={entry}>
                  <button
                    className="text-pink-500 hover:bg-slate-400/10 py-2 px-4 w-full text-left first"
                    onClick={onClickEntry}
                    type="button"
                    value={entry}
                  >
                    {entry}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="py-2 px-4 border-t border-slate-400/20 flex items-center justify-end">
            <button
              className="text-pink-500/70 text-xs hover:text-pink-500"
              onClick={onClickClearHistory}
              type="button"
            >
              Clear history
            </button>
          </div>
        </div>
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
            {PLACEHOLDER_ADDRESSES.map((address) => (
              <li className="w-full" key={address}>
                <button
                  className="text-pink-500 hover:bg-slate-400/10 py-2 px-4 w-full text-left"
                  onClick={onClickEntry}
                  type="button"
                  value={address}
                >
                  {address}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBoxHistory;
