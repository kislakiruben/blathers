import { Suspense } from "react";

import Header from "./components/Header";
import NftList from "./components/NftList";

const App = () => (
  <div className="bg-slate-900 relative min-h-[100vh]">
    <div className="bg-[url('../public/bg.jpg')] bg-[center_-800px] opacity-50 fixed -top-10 -bottom-10 -left-10 -right-10 bg-cover blur-xl z-0" />
    <Header />
    <Suspense fallback={<pre>Loading</pre>}>
      <NftList />
    </Suspense>
  </div>
);

export default App;
