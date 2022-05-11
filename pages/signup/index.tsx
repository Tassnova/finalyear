import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";
import Link from "next/link";
import { db } from "../../utils/config";
import styles from "./styles.module.scss";

const Signup = () => {
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (event: any) => {
    const user = {
      department: department,
      fullname: fullname,
      email: email,
    };
    if (email && password) {
      createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          db.collection("users").add(user);
          router.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    event.preventDefault();
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
        <div className={`flex h-screen ${styles.rightSide}`}>
          <form action="" className={`m-auto ${styles.form}`}>
            <h1 className="text-3xl font-bold">Get started</h1>
            <p className="mt-4">
              Already have an accout?{" "}
              <span className="text-purple-400 ml-1">
                <Link href="/">Sign in</Link>
              </span>
            </p>

            <label className={`mt-8 ${styles.inputLabel}`}>Department</label>
            <select
              className="w-full py-2 h-10 pl-8 pr-3 mt-2 border border-purple-800 outline-none rounded"
              name="cars"
              id="cars"
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="" selected hidden>
                Select a department
              </option>
              <option value="Queen Mary Innovation">
                Queen Mary Innovation
              </option>
              <option value="Queen Mary Careers">Queen Mary Careers</option>
              <option value="Business And Management">
                Business And Management
              </option>
              <option value="EECS">EECS</option>
            </select>

            <label className={`mt-4 ${styles.inputLabel}`}>Full name</label>
            <div className="relative text-gray-700 mt-2">
              <input
                className="w-full py-6 h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded focus:shadow-outline"
                type="text"
                placeholder="John doe"
                onChange={(event) => setFullname(event.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
            </div>
            <label className={`mt-4 ${styles.inputLabel}`}>Email address</label>
            <div className="relative text-gray-700 mt-2">
              <input
                className="w-full py-6 h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded focus:shadow-outline"
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
            <div className="relative text-gray-700 mt-2">
              <input
                className="w-full py-6 h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded focus:shadow-outline"
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
            <label className={`mt-4 ${styles.inputLabel}`}>
              <input type="checkbox" />
              <span className="ml-2">I have read and agree to the terms</span>
            </label>
            <button className={`mt-4 rounded`} type="button" onClick={onSubmit}>
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Signup;
