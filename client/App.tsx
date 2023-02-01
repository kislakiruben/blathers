import { useRecoilValue } from "recoil";
import { Suspense } from "react";

import { errorStatusState } from "./atoms/ui";
import ErrorGeneric from "./components/ErrorGeneric";
import ErrorAddressNotFound from "./components/ErrorAddressNotFound";
import Header from "./components/Header";
import NftList from "./components/NftList";

const App = () => {
  const errorStatus = useRecoilValue(errorStatusState);

  return (
    <div className="bg-slate-900 relative min-h-[100vh]">
      <div className="bg-[url('../public/bg.jpg')] bg-[center_-800px] opacity-50 fixed -top-10 -bottom-10 -left-10 -right-10 bg-cover blur-xl z-0" />
      <Header />
      <div className="px-10">
        {errorStatus === 404 ? (
          <ErrorAddressNotFound />
        ) : errorStatus !== null ? (
          <ErrorGeneric />
        ) : null}
        <Suspense fallback={<pre>Loading</pre>}>
          <NftList />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
