import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { db } from "../../utils/config";
import Image from "next/image";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import CourseDetails from "../../components/CourseDetails";

const Dashboard = () => {
  const [currentChart, setCurrentChart] = useState(1);

  // programmes
  const [DA, setDA] = useState([]);
  const [Internship, setInternship] = useState([]);
  const [SC, setSC] = useState([]);
  const [completed, setCompleted] = useState([]);

  // departments
  const [QMI, setQMI] = useState([]);
  const [QMC, setQMC] = useState([]);
  const [BAM, setBAM] = useState([]);
  const [EECS, setEECS] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    await db.collection("customers").onSnapshot((querySnapshot) => {
      let DA = [] as any;
      let INTERNSHIP = [] as any;
      let SHORT_COURSE = [] as any;
      let COMPLETED = [] as any;

      // departments
      let QMI = [] as any;
      let QMC = [] as any;
      let BAM = [] as any;
      let EECS = [] as any;
      querySnapshot.docs.forEach((item) => {
        // THIS IS PROGRAMMES
        item.data().programme === "Degree Apprenticeship" &&
          DA.push(item.data());
        item.data().programme === "Internship" && INTERNSHIP.push(item.data());
        item.data().programme === "Short Course" &&
          SHORT_COURSE.push(item.data());
        item.data().status === "Completed" && COMPLETED.push(item.data().month);

        // THIS IS STORING DEPARTMENT
        item.data()?.department?.split('"').join("") ===
          "Queen Mary Innovation" && QMI.push(item.data());
        item.data()?.department?.split('"').join("") === "Queen Mary Careers" &&
          QMC.push(item.data());
        item.data()?.department?.split('"').join("") ===
          "Business And Management" && BAM.push(item.data());
        item.data()?.department?.split('"').join("") === "EECS" &&
          EECS.push(item.data());
      });

      // THIS IS PROGRAMMES
      setDA(DA);
      setInternship(INTERNSHIP);
      setSC(SHORT_COURSE);
      setCompleted(COMPLETED);

      // THIS STORING DEPARTMENT
      setQMI(QMI);
      setQMC(QMC);
      setBAM(BAM);
      setEECS(EECS);
    });
  };

  return (
    <main>
      <h1 className="text-4xl my-6">Dashboard</h1>
      <section className={styles.container}>
        <div className={styles.statistic}>
          <div className={styles.stats}>
            <div className="p-6 py-14 bg-[#C5CAFF] flex-1 rounded-lg">
              <Image
                src="/media/graduate.png"
                alt="me"
                width="40"
                height="40"
              />
              <p className="text-5xl font-bold">{DA && DA?.length}</p>
              <p className="mt-4">Degree Apprenticeship</p>
            </div>
            <div className="p-6 py-14 bg-[#E1E7E9] flex-1	 rounded-lg">
              <Image
                src="/media/working-woman.png"
                alt="me"
                width="40"
                height="40"
              />{" "}
              <p className="text-5xl font-bold">
                {Internship && Internship?.length}
              </p>
              <p className="mt-4">Internship Programmes</p>
            </div>
            <div className="p-6 py-14 bg-[#FBDAE5] flex-1	 rounded-lg">
              <Image
                src="/media/online-course.png"
                alt="me"
                width="40"
                height="40"
              />{" "}
              <p className="text-5xl font-bold">{SC && SC?.length}</p>
              <p className="mt-4">Short Courses</p>
            </div>
          </div>
          <div className={`p-4 ${styles.chart}`}>
            <LineChart completed={completed} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={`${styles.analytics} `}>
            {currentChart === 1 ? <PieChart data={QMC} view="QMC" /> : null}
            {currentChart === 2 ? <PieChart data={QMI} view="QMI" /> : null}
            {currentChart === 3 ? <PieChart data={BAM} view="BAM" /> : null}
            {currentChart === 4 ? <PieChart data={EECS} view="EECS" /> : null}

            <div className="flex flex-wrap px-4 pb-4">
              <button
                className={`p-4 mr-4 mt-4 rounded-md flex-1 ${
                  currentChart === 1 ? styles.active : ""
                }`}
                onClick={() => setCurrentChart(1)}
              >
                Queen Mary Innovation
              </button>
              <button
                className={`p-4 mr-4 mt-4 rounded-md flex-1 ${
                  currentChart === 2 ? styles.active : ""
                }`}
                onClick={() => setCurrentChart(2)}
              >
                Queen Mary Careers
              </button>
              <button
                className={`p-4 mr-4 mt-4 rounded-md flex-1 ${
                  currentChart === 3 ? styles.active : ""
                }`}
                onClick={() => setCurrentChart(3)}
              >
                Business And Management
              </button>
              <button
                className={`p-4 mr-4 mt-4 rounded-md flex-1 ${
                  currentChart === 4 ? styles.active : ""
                }`}
                onClick={() => setCurrentChart(4)}
              >
                EECS
              </button>
            </div>
          </div>

          <div className={`${styles.activity} overflow-y-auto`}>
            <CourseDetails />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
