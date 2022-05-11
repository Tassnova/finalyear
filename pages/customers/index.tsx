import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import styles from "./styles.module.scss";
import { db } from "../../utils/config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const optionValues = [
    "In Progress Stage-1",
    "In Progress Stage-2",
    "In Progress Stage-3",
    "Ongoing",
    "Completed",
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    await db.collection("customers").onSnapshot((querySnapshot) => {
      let customersData = [] as any;
      querySnapshot.docs.forEach((item) => {
        customersData.push({
          data: item.data(),
          id: item.id,
        });
      });
      setCustomers(customersData);
    });
  };

  const handleSearch = async (event: any) => {
    const searchTerm = event?.target.value;
    let customersData = [] as any;
    if (searchTerm === "") {
      fetchCustomers();
    } else {
      const q = query(
        collection(db, "customers"),
        where("fullname", "==", searchTerm)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((item) => {
        customersData.push({
          data: item.data(),
          id: item.id,
        });
      });
      setCustomers(customersData);
    }
  };

  const handleOpenModal = (val: boolean) => {
    setOpenModal(val);
  };

  const updateStatus = async (event: any, item: any) => {
    const customersCollection = db.collection("customers");
    customersCollection
      .where("organisation", "==", item.data.organisation)
      .get()
      .then((snapshots) => {
        snapshots.forEach((item) => {
          customersCollection
            .doc(item.id)
            .update({ status: event?.target.value });
        });
      });
  };

  const deleteCustomer = async (item: any) => {
    console.log(item.id);
    await db.collection("customers").doc(item?.id).delete();
  };

  const renderTableHead = () => {
    return (
      <thead className="text-md text-gray-700 uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Customer
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Organisation
          </th>
          <th scope="col" className="px-6 py-3">
            Department
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Program
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="">Options</span>
          </th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () =>
    customers &&
    customers.map((item: any) => (
      <tr className="border border-green-200">
        <th scope="col" className="px-6 py-3">
          {item.data?.fullname}
        </th>
        <th scope="col" className="px-6 py-3">
          {item.data?.email}
        </th>
        <th scope="col" className="px-6 py-3">
          {item.data?.organisation}
        </th>
        <th scope="col" className="px-6 py-3">
          {item.data?.department?.split('"').join("")}
        </th>
        <th scope="col" className="px-6 py-3">
          <form action="">
            <select name="" id="" onChange={(e) => updateStatus(e, item)}>
              <option>{item.data?.status}</option>
              {optionValues.map(
                (option) => option !== item?.status && <option>{option}</option>
              )}
            </select>
          </form>
        </th>
        <th scope="col" className="px-6 py-3">
          {item.data?.programme}
        </th>
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer hover:text-red-400"
          onClick={() => deleteCustomer(item)}
        >
          delete
        </th>
      </tr>
    ));

  return (
    <main className="mt-4">
      <section className={styles.container}>
        <div className="flex gap-4 mb-10">
          <div className="pt-2 w-full relative text-gray-600">
            <input
              className="border-2 w-full border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
          <button
            className="px-6 rounded bg-[#B39BE8]"
            onClick={() => setOpenModal(true)}
          >
            Add Customer
          </button>
        </div>
        <div
          className={`${styles.customerList} relative overflow-x-auto shadow-md sm:rounded-lg`}
        >
          <table className="w-full text-sm text-left">
            {renderTableHead()}
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>

        {openModal ? <Modal handleOpenModal={handleOpenModal} /> : null}
      </section>
    </main>
  );
};

export default Customers;
