import Layout from "../components/Layouts";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "../context/authContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;
