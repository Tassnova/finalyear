import { db } from "../../utils/config";
import { useEffect, useState } from "react";
import styles from "../customers/styles.module.scss";

const Meetings = () => {
  const [meetingDetails, setMeetingDetails] = useState([]);

  useEffect(() => {
    fetchMeetingDetails();
  }, []);

  const fetchMeetingDetails = async () => {
    await db.collection("meetings").onSnapshot((querySnapshot) => {
      let meetingsData = [] as any;
      querySnapshot.docs.forEach((item) => {
        if (
          item.data().fullname ===
          JSON.parse(localStorage?.getItem("userInfo")).fullname
        ) {
          meetingsData.push({
            data: item.data(),
            id: item.id,
          });
        }
      });
      setMeetingDetails(meetingsData);
    });
  };

  const updateNote = async (event: any, item: any) => {
    await db.collection("meetings").doc(item.id).update({
      notes: event?.target.value,
    });
  };

  const renderMeetings = () =>
    meetingDetails &&
    meetingDetails.map((items: any) => (
      <tr className="border border-green-200">
        <th scope="col" className="px-6 py-3">
          {items.data?.customerName}
        </th>
        <th scope="col" className="px-6 py-3">
          {items.data?.fullname}
        </th>
        <th scope="col" className="px-6 py-3">
          {items.data.meetingHeld?.toDate().toDateString()}
        </th>
        <th scope="col" className="px-6 py-3">
          <input
            onChange={(event) => updateNote(event, items)}
            type="text"
            className=" border-2 border-[#B39BE8] p-2 rounded-md"
            value={items.data?.notes}
            placeholder="write notes here..."
          />
        </th>
      </tr>
    ));

  return (
    <main className="mt-8">
      <div
        className={`${styles.customerList} relative overflow-x-auto shadow-md sm:rounded-lg`}
      >
        <table className="w-full text-sm text-left">
          <thead className="text-md text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Staff Name
              </th>
              <th scope="col" className="px-6 py-3">
                Meeting date
              </th>
              <th scope="col" className="px-6 py-3">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>{renderMeetings()}</tbody>
        </table>
      </div>
    </main>
  );
};

export default Meetings;
