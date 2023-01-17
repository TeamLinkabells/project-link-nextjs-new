import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";

import FeedLayout from "../../../components/FeedLayout";
import FeedView from "../../../components/feeds/FeedView";

export default function Search({ data }) {
  const router = useRouter();

  const id = router.query.id || ["로딩중"];

  const [urlData, setUrlData] = useState(""); //url 입력 데이터
  const [favoriteData, setFavoriteData] = useState(""); //url 입력 데이터

  console.log("데이터 입니다.", data)

  useEffect(()=> {
    // router.reload()
  },[data])

  return (
    <>
      <section className="text-gray-600 m-auto px-[60px] md:pl-[100px] md:pr-[60px] py-10">
        <div>
          <div className="flex flex-wrap gap-5" />
          <FeedLayout setUrlData={setUrlData} urlData={urlData}>
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
  console.log("context.params", id[0]);
  const res = await axios.get(
    `http://localhost:3000/api/search/${id[1]}/${id[0]}`
  );

  const data = await res.data;

  return { props: { data } };
}
