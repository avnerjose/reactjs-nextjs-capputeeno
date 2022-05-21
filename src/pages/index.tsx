import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useProducts } from "../hooks";
import {
  Pagination,
  LoadingIndicator,
  NavLinks,
  ProductsList,
  Header,
} from "../components";
import Head from "next/head";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { page, category } = query;
  const filter =
    category !== "all" ? { category: String(category) } : undefined;
  const { products, loading, error } = useProducts(String(page), filter);

  if (error) return <h1>Error</h1>;

  return (
    <>
      <Head>
        <title>Home | Capputeeno</title>
      </Head>
      <Header />
      <div className="my-5 max-w-[1120px] flex align-center justify-between mx-auto mt-20">
        <NavLinks />
        <Pagination />
      </div>
      {loading ? <LoadingIndicator /> : <ProductsList products={products} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { page, category } = query;

  if (page === undefined || category === undefined) {
    return {
      redirect: {
        destination: "/?page=0&category=all",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
