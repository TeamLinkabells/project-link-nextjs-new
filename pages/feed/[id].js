import { useRouter } from "next/router";
import axios from "axios";
import React, { useState } from "react";

import Layout from "../../components/common/Layout";
import FeedView from "../../components/feeds/FeedView";
import { useCookies } from "react-cookie";

export default function Feed({ data }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  const id = router.query.id || ["로딩중"];

  const [urlData, setUrlData] = useState(""); //url 입력 데이터4

  return (
    <>
      <section className="text-gray-600 m-auto px-[60px] md:pl-[100px] md:pr-[60px] py-10">
        <div>
          <div className="flex flex-wrap gap-5" />
          <Layout setUrlData={setUrlData} urlData={urlData} links={data}>
            <FeedView links={data} />
          </Layout>
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
