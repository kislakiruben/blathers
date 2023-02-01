import { useRecoilValue } from "recoil";

import { errorStatusState, isLoadingEntriesState } from "./atoms/ui";
import ErrorGeneric from "./components/ErrorGeneric";
import ErrorAddressNotFound from "./components/ErrorAddressNotFound";
import Header from "./components/Header";
import LoadingIndicator from "./components/LoadingIndicator";
import NftList from "./components/NftList";

const App = () => {
  const errorStatus = useRecoilValue(errorStatusState);
  const isLoadingEntries = useRecoilValue(isLoadingEntriesState);

  return (
    <div className="bg-slate-900 relative min-h-[100vh] flex flex-col">
      <div className="bg-[url('../public/bg.jpg')] bg-[center_-800px] opacity-50 fixed -top-10 -bottom-10 -left-10 -right-10 bg-cover blur-xl z-0 shrink-0 grow-0" />
      <Header />
      <div className="grow flex flex-col items-center max-w-screen-2xl mx-auto relative pb-[120px] px-10">
        {errorStatus === 404 ? (
          <ErrorAddressNotFound />
        ) : errorStatus !== null ? (
          <ErrorGeneric />
        ) : isLoadingEntries ? (
          <LoadingIndicator />
        ) : (
          <NftList />
        )}
      </div>
    </div>
  );
};

export default App;
