import { useSetRecoilState } from "recoil";
import { useState } from "react";

import { searchTextState } from "../atoms/ui";

const SearchBox = () => {
  const [text, setText] = useState("");
  const setSearchText = useSetRecoilState(searchTextState);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText((event.target as HTMLInputElement).value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchText(text);
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} type="text" value={text} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
