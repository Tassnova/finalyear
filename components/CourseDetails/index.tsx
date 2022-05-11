import { db } from "../../utils/config";
import { useEffect, useState } from "react";
import styles from "../../pages/customers/styles.module.scss";

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    fetchMeetingDetails();
  }, []);

  const fetchMeetingDetails = async () => {
    await db.collection("courseDetails").onSnapshot((querySnapshot) => {
      let courseData = [] as any;
      querySnapshot.docs.forEach((item) => {
        courseData.push(item.data());
      });
      setCourseDetails(courseData);
    });
  };

  const renderCourseDetails =
    courseDetails &&
    courseDetails.map((item: any) => {
      return (
        <tr className="border border-green-200">
          <th scope="col" className="px-6 py-3">
            {item.courseName}
          </th>
          <th scope="col" className="px-6 py-3">
            {item.organisation}
          </th>
          <th scope="col" className="px-6 py-3">
            {item.enrolled}
          </th>
        </tr>
      );
    });

  return (
    <div className={`relative overflow-x-auto`}>
      <table className="w-full text-sm text-left ">
        <thead className="text-md text-gray-700 uppercase font-bold">
          <tr>
            <th scope="col" className="px-6 py-3">
              Course
            </th>
            <th scope="col" className="px-6 py-3">
              organisation
            </th>
            <th scope="col" className="px-6 py-3">
              enrolled
            </th>
          </tr>
        </thead>
        <tbody> {renderCourseDetails}</tbody>
      </table>
    </div>
  );
};

export default CourseDetails;
