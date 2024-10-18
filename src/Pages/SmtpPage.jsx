import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SmtpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your form submission logic here
    // Once the submission is complete, set isLoading back to false
  };

  return (
    <div
      className="my-20 mx-auto md:w-[48%]
 bg-gray-50 p-8 rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="SMTPServer"
            className="block mb-2 text-sm font-medium text-black "
          >
            SMTP Server
          </label>

          <div className="relative">
            <select
              name="SMTPServer"
              id="SMTPServer"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              required
            >
              <option value="">Select SMTP Server</option>
              <option value="smtp.gmail.com">Gmail (smtp.gmail.com)</option>
              <option value="smtp.mail.yahoo.com">Yahoo (smtp.mail.yahoo.com)</option>
              <option value="smtp-mail.outlook.com">Hotmail (smtp-mail.outlook.com)</option>
              <option value="smtp.hostingmail.com">HostingMail (smtp.hostingmail.com)</option>
            </select>
          </div>
        </div>
        <div className="md:flex justify-around ">
          {/* for port */}
          <div className="md:w-[48%]">
            <label
              htmlFor="port"
              className="block mb-2 text-sm font-medium text-black "
            >
              Port
            </label>

            <div className="relative ">
              <input
                type="text"
                name="port"
                id="port"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
                placeholder="Enter Port"
                required
              />
            </div>
          </div>
          {/* for security */}
          <div  className="md:w-[48%]">
            <label
              htmlFor="security"
              className="block mb-2 text-sm font-medium text-black "
            >
              Security
            </label>

            <div className="relative">
              <select
                id="security"
                name="security"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
                required
              >
                <option value="none">None</option>
                <option value="ssl">SSL</option>
                <option value="tls">TLS</option>
              </select>
            </div>
          </div>
        </div>

        <div className="md:flex justify-between ">
          <div
            className="md:w-[48%]"
          >
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-black "
            >
              Name
            </label>

            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
                placeholder="Enter Name"
                required
              />
            </div>
          </div>

          <div
            className=" relative md:w-[48%]
"
          >
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-black  ">
                Password
              </label>
            </div>

            <input
              required
              name="password"
              autoComplete="off"
              placeholder="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              type={showPassword ? "text" : "password"}
            />
            <div
              className="flex justify-end p-1 absolute top-10 right-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <div className="md:flex justify-between ">
          {/* for from email  */}
          <div
            className="md:w-[48%]
"
          >
            <label className="block mb-2 text-sm font-medium text-black  ">
              From Email Address
            </label>
            <input
              required
              name="Fromemail"
              placeholder="From Email Address"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              type="email"
            />
          </div>
          {/* for from email  */}
          <div
            className="md:w-[48%]
"
          >
            <label className="block mb-2 text-sm font-medium text-black  ">
              To Email Address
            </label>
            <input
              required
              name="Toemail"
              placeholder="To Email Address"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              type="email"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:mt-4 bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
        >
          {isLoading ? "Sending In..." : "Send Mail"}
        </button>
      </form>
    </div>
  );
};

export default SmtpPage;
