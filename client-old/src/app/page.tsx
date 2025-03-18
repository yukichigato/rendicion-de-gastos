export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
}

const Home = () => {
  return null;
};

export default Home;
