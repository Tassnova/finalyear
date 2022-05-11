import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/styles.module.scss";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/config";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const onSubmit = (event: any) => {
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        getUserInfo(email);
      })
      .catch((error) => {
        console.log(error.message);
      });
    event.preventDefault();
  };

  const getUserInfo = async (email: any) => {
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((item) => {
      localStorage.setItem("userInfo", JSON.stringify(item.data()));
      localStorage.setItem(
        "department",
        JSON.stringify(item.data().department)
      );
    });

    localStorage.setItem("email", email);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (localStorage) {
      const email = localStorage.getItem("email");
      email && router.push("/dashboard");
    }
  }, []);

  return (
    <main>
      <section className={styles.container}>
        <div className={`${styles.leftSide} flex justify-center`}>
          <img src="/media/login.png" alt="" />
        </div>
        <div className={`${styles.rightSide} flex items-center`}>
          <form action="" className={styles.form}>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="mt-4">Welcome back! Please enter your details</p>
            <label className={`mt-8 ${styles.inputLabel}`}>Email address</label>
            <div className="relative text-gray-700">
              <input
                className="w-full h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="email"
                placeholder="email@example.com"
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
            </div>
            <label className={`mt-4 ${styles.inputLabel}`}>Password</label>
            <div className="relative text-gray-700">
              <input
                className="w-full h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="password"
                placeholder="password123"
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                >
                  <title>Password</title>
                  <path
                    data-name="layer1"
                    d="M53.5 0h-43A10.5 10.5 0 0 0 0 10.5v43A10.5 10.5 0 0 0 10.5 64h43A10.5 10.5 0 0 0 64 53.5v-43A10.5 10.5 0 0 0 53.5 0zm-15 48h-13l2.2-17.1a9 9 0 1 1 8.7 0z"
                    fill="#1f1f1f"
                  ></path>
                </svg>
              </div>
            </div>
            <button className={`mt-4`} type="button" onClick={onSubmit}>
              Sign in
            </button>

            <p className="mt-4">
              Don't have an account?
              <span className="text-purple-400 ml-1">
                <Link href="/signup">Sign up</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
