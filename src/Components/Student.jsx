import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import { Button, Popconfirm } from "antd";

const Student = () => {
  const [users, setUsers] = useState([]);
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/student")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [axiosPublic]);

  const handleDelete = async (userId) => {
    try {
      const response = await axiosPublic.delete(`/student/${userId}`);
      console.log("User deleted:", response.data);
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
        toast.error(
          "An error occurred while deleting the user: " +
            error.response.data.message
        );
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response from the server. Please try again later.");
      } else {
        console.error("General error:", error.message);
        toast.error("An error occurred: " + error.message);
      }
    }
  };
  return (
    <table className="table ">
      {/* head */}
      <thead>
        <tr>
          <th>SL</th>
          <th>Name</th>
          <th>Email</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {users.map((user, index) => (
          <tr key={user._id}>
            <th>{index + 1}</th>
            <td>
              <div className="font-bold">{user.name}</div>
            </td>
            <td>{user.email}</td>

            <th>
              <Popconfirm
                title="Delete the user"
                description="Are you sure to delete this user?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete(user._id)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </th>
          </tr>
        ))}
      </tbody>
      {/* foot */}
    </table>
  );
};

export default Student;
