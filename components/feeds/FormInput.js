import React, { useState } from "react";
import axios from "axios";

export default function FormInput({ urlData, setUrlData, status, setStaus }) {
  const [inputData, setInputData] = useState("");

  return (
    <>
      <input
        type="text"
        name="contents"
        placeholder="URL을 붙여넣으세요"
        value={inputData}
        onChange={(e) => {
          {
            setInputData(e.target.value);
          }
        }}
      ></input>
      <button
        onClick={() => {
          setUrlData(inputData);
          setStaus(true);
        }}
      >
        버튼
      </button>
    </>
  );
}
