import { useState } from "react";
import toast from "react-hot-toast";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";

const Dataform = () => {
  const [emailFields, setEmailFields] = useState([{ id: 0, value: "" }]);
  const axiosPublic = UseAxiosPublic();

  const handleAddEmail = () => {
    const newField = { id: emailFields.length, value: "" };
    setEmailFields([...emailFields, newField]);
  };

  const handleEmailChange = (id, value) => {
    const updatedFields = emailFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setEmailFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emails = emailFields.map((field) => field.value);
    const name = form.name.value;
    const subject = form.subject.value;
    const message = form.Message.value;
    console.log(emails, name, subject, message);

    const dataSend = {
      emails: emails,
      subject: subject,
      name: name,
      message: message,
    };

    try {
      const res = await axiosPublic.post('/email/send-email', dataSend);

      if (res.status === 200) {
        console.log(res.data);
        toast.success("Email sent successfully!");
        form.reset();
        setEmailFields([{ id: 0, value: "" }]);
      } else {
        console.error("Error:", res.statusText);
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while sending email.");
    }
  };

  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Sending Emails with Nodemailer
            </h1>

            <form
              onSubmit={handleSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                Send a message to multiple emails
              </p>

              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
                    placeholder="Name"
                  />
                </div>
              </div>

              {emailFields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={`email-${field.id}`} className="sr-only">
                    Email address
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      name={`email-${field.id}`}
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
                      placeholder="Email"
                      value={field.value}
                      onChange={(e) =>
                        handleEmailChange(field.id, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddEmail}
                className="inline-block shadow-md w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition duration-300 ease-in-out transform hover:bg-blue-600 hover:shadow-lg hover:scale-105"
              >
                + Add Email
              </button>

              <div>
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
                    placeholder="Subject"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="Message" className="sr-only">
                  Message
                </label>

                <div className="relative">
                  <textarea
                    placeholder="Enter message"
                    name="Message"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="inline-block shadow-md rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full transition duration-300 ease-in-out transform hover:bg-blue-600 hover:shadow-lg hover:scale-105"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dataform;