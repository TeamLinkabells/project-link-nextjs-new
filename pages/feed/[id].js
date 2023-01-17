import { useRouter } from "next/router";
import axios from "axios";
import React, { useState } from "react";

import FeedLayout from "../../components/FeedLayout";
import FeedView from "../../components/feeds/FeedView";

export default function Feed({ data }) {
  const router = useRouter();

  const id = router.query.id || ["로딩중"];

  const [urlData, setUrlData] = useState(""); //url 입력 데이터

  return (
    <>
      <section className="text-gray-600 m-auto px-[60px] md:pl-[100px] md:pr-[60px] py-10">
        <div>
          <div className="flex flex-wrap gap-5" />
          <FeedLayout setUrlData={setUrlData} urlData={urlData} links={data}>
            <FeedView links={data} />
          </FeedLayout>
        </div>
      </section>
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
