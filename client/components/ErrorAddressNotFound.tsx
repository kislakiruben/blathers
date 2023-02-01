import { useSetRecoilState } from "recoil";

import { searchTextState } from "../atoms/ui";
import { PLACEHOLDER_ADDRESSES } from "../constants";

const ErrorAddressNotFound = () => {
  const setSearchText = useSetRecoilState(searchTextState);
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    setSearchText((event.target as HTMLButtonElement).value);
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-400/20 rounded-lg text-slate-300 flex flex-col shadow-xl shadow-slate-900/40 px-10 py-16 mx-auto max-w-screen-md">
      <h2 className="font-bold text-xl text-center mb-4">
        Address or ENS domain not found
      </h2>
      <p className="text-center text-slate-400/80 mb-10">
        Oops! The wallet address or ENS domain you were looking for couldn't be
        found.
      </p>
      <div className="mx-auto">
        <p className="text-slate-400/80 leading-7 text-sm">
          Check out these owners in the mean time:
        </p>
        <ul className="text-slate-400/80 leading-7 text-sm">
          {PLACEHOLDER_ADDRESSES.map((address) => (
            <li key={address}>
              <button
                className="text-pink-500 hover:underline"
                onClick={onClick}
                type="button"
                value={address}
              >
                {address}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ErrorAddressNotFound;
