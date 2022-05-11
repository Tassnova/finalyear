import SideNav from "../SideNav";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export default function Layout({ children }: any) {
  const router = useRouter();

  return (
    <div className={styles.mainContent}>
      {router?.asPath !== "/" && router?.asPath !== "/signup" ? (
        <div>
          <SideNav />
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
