import { useEffect, useState } from "react";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import { Link } from "react-router-dom";

const Massages = () => {
  const axiosPublic = UseAxiosPublic();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiosPublic
      .get("/email-replies")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })

      .catch((error) => console.error("Error fetching users:", error));
  }, [axiosPublic]);

  return (
    <div className="mx-auto md:w-[80%] px-4 py-5 ">
      <Link className="btn btn-primary btn-sm" to="/SendEmail">
        Send mail
      </Link>

      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Response</th>
            <th>message</th>
            {/* <th>NewsLatter</th> */}
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user, index) => (
            <tr key={user?._id}>
              <th>{index + 1}</th>
              <td>{user?.from.match(/"([^"]+)"/)[1]}</td>
              <td>{user?.from.match(/<([^>]+)>/)[1]}</td>
              <td>{user.subject.replace(/^Re: /, "")}</td>

              {/* <td>{user?.receivedAt ? "Yes" : "No Response Yet"}</td> */}

              {/* <td>{user?.text.split("\n")[0]}</td> */}

              <td>
                <textarea>{user?.text.split("\n")[0]}</textarea>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default Massages;
