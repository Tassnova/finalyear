import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const SideNav = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [currentNav, setCurrentNav] = useState(1);

  const router = useRouter();
  const logout = () => {
    localStorage.setItem("email", "");
    router.push("/");
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem("userInfo")));
  }, []);

  return (
    <nav className={styles.sideNav}>
      <h1 className="text-3xl text-center mt-6">{currentUser?.fullname}</h1>
      <h1 className="text-lg text-center my-6">{currentUser?.department}</h1>
      <ul className={styles.menuList}>
        <Link href="/">
          <li
            className={`${styles.menuItem} ${
              currentNav === 1 ? styles.active : ""
            }`}
            onClick={() => setCurrentNav(1)}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/customers">
          <li
            className={`${styles.menuItem} ${
              currentNav === 2 ? styles.active : ""
            }`}
            onClick={() => setCurrentNav(2)}
          >
            Organisations
          </li>
        </Link>
        <Link href="/meetings">
          <li
            className={`${styles.menuItem} ${
              currentNav === 3 ? styles.active : ""
            }`}
            onClick={() => setCurrentNav(3)}
          >
            Meetings
          </li>
        </Link>
        <Link href="/">
          <li className={styles.menuItem} onClick={logout}>
            Logout
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default SideNav;
