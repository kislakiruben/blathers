import { useSetRecoilState } from "recoil";

import { searchTextState } from "../atoms/ui";

const ErrorAddressNotFound = () => {
  const setSearchText = useSetRecoilState(searchTextState);
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    setSearchText((event.target as HTMLButtonElement).value);
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-700/60 rounded-lg text-slate-300 flex flex-col shadow-xl shadow-slate-900/40 px-10 py-16 mx-auto max-w-screen-md">
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
          <li>
            <button
              className="text-pink-500 hover:underline"
              onClick={onClick}
              type="button"
              value="0xe468ce99444174bd3bbbed09209577d25d1ad673"
            >
              0xe468ce99444174bd3bbbed09209577d25d1ad673
            </button>
          </li>
          <li>
            <button
              className="text-pink-500 hover:underline"
              onClick={onClick}
              type="button"
              value="0xce1c7037b8737b911704d6c21c01675f6c047f1a"
            >
              0xce1c7037b8737b911704d6c21c01675f6c047f1a
            </button>
          </li>
          <li>
            <button
              className="text-pink-500 hover:underline"
              onClick={onClick}
              type="button"
              value="ix-shells.eth"
            >
              ix-shells.eth
            </button>
          </li>
          <li>
            <button
              className="text-pink-500 hover:underline"
              onClick={onClick}
              type="button"
              value="jacbo.eth"
            >
              jacbo.eth
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorAddressNotFound;
