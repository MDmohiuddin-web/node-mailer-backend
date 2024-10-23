import { useState } from "react";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import toast from "react-hot-toast";

const EmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = UseAxiosPublic();
  const [collection, setCollection] = useState("users");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleCollectionChange = (e) => {
    setCollection(e.target.value);
    console.log("Collection:", e.target.value);
    axiosPublic.get(`/${e.target.value}`);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    console.log("Subject:", e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    console.log("Message:", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submitted with values:", {
      collection,
      subject,
      message,
    });
    try {
      const response = await axiosPublic.post("/email/send-email", {
        collection,
        subject,
        message,
      });
      console.log("Response:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send emails.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-96 mx-auto"
    >
      <div className="flex flex-col">
        <label htmlFor="collection">Select Collection:</label>
        <select
          id="collection"
          value={collection}
          onChange={handleCollectionChange}
        >
          <option value="users">Users</option>
          <option value="students">Students</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={handleSubjectChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Email"}
      </button>
    </form>
  );
};

export default EmailForm;
