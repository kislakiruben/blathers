import { Suspense } from "react";

import Header from "./components/Header";
import NftList from "./components/NftList";

const App = () => (
  <div className="App">
    <Header />
    <Suspense fallback={<pre>Loading</pre>}>
      <NftList />
    </Suspense>
  </div>
);

export default App;
