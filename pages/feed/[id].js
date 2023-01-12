import { useRouter } from "next/router";
import axios from "axios";
import React, { useState } from "react";

import FeedLayout from "../../components/FeedLayout";
import FeedView from "../../components/feeds/FeedView";

export default function About({ data }) {
  const router = useRouter();
  const id = router.query.id;

  const [urlData, setUrlData] = useState(""); //url 입력 데이터

  const [urlInputModal, setInputUrlModal] = useState(false); //모달인풋데이터
  const [urlShowModal, setUrlShowModal] = useState(false); //모달쇼

  const urlModalOpenFunc = () => {
    setInputUrlModal(!urlInputModal);
  };

  console.log("데이터", data);
  return (
    <>
      <FeedLayout
        urlInputModal={urlInputModal}
        setInputUrlModal={setInputUrlModal}
        urlModalOpenFunc={urlModalOpenFunc}
      >
        <section className="text-gray-600 m-auto px-20 py-5">
          <div className="container">
            <div className="flex flex-wrap gap-5" />
            <FeedView
              urlInputModal={urlInputModal}
              setInputUrlModal={setInputUrlModal}
              urlModalOpenFunc={urlModalOpenFunc}
              urlData={urlData}
              setUrlData={setUrlData}
              urlShowModal={urlShowModal}
              setUrlShowModal={setUrlShowModal}
              links={data}
            />
          </div>
        </section>
      </FeedLayout>
      {/* ---------------------원래 피드----------------------- */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;
  console.log("context.params", id);
  const res = await axios.get(`http://localhost:3000/api/feed/${id}`);

  const data = await res.data;

  return { props: { data } };
}
