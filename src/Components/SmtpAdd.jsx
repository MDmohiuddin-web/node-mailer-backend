import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import { useNavigate } from "react-router-dom";

const SmtpAdd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const axiosPublic=UseAxiosPublic()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
      console.log(data);
      const { SMTPServer, port, security, email, password } = data;
    
      reset();
      const dataSend = {
        SMTPServer,
        port,
        security,
        email,
        password
      };

    try {
      setIsLoading(true);
      const res = await axiosPublic.post("/hosting", dataSend);

      if (res.status === 200) {
        if (res.data.insertedId === null && res.data.message === "this user already exists") {
          console.log(res.data);
          toast.error("User already exists!");
        } else {
          console.log(res.data);
          toast.success("Data sent successfully!");
        }
        navigate('/SmtpPage')
        reset();
      } else {
        console.error("Error:", res.statusText);
        toast.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while sending email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="my-20 mx-auto md:w-[48%]
  bg-gray-50 p-8 rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="SMTPServer"
            className="block mb-2 text-sm font-medium text-black "
          >
            SMTP Host Name
          </label>

          <div className="relative">
            <select
              {...register("SMTPServer", { required: true })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
            >
              <option value="">Select SMTP Host Name</option>
              <option value="smtp.gmail.com">Gmail (smtp.gmail.com)</option>
              <option value="smtp.mail.yahoo.com">
                Yahoo (smtp.mail.yahoo.com)
              </option>
              <option value="smtp-mail.outlook.com">
                Hotmail (smtp-mail.outlook.com)
              </option>
              <option value="smtp.hostingmail.com">
                HostingMail (smtp.hostingmail.com)
              </option>
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
                min={465}
                {...register("port", { required: true })}
                type="number"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
                placeholder="Enter Port"
              />
            </div>
          </div>
          {/* for security */}
          <div className="md:w-[48%]">
            <label
              htmlFor="security"
              className="block mb-2 text-sm font-medium text-black "
            >
              Security
            </label>

            <div className="relative">
              <select
                {...register("security", { required: true })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              >
                <option value="none">None</option>
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
              </select>
            </div>
          </div>
        </div>

        <div className="md:flex justify-between ">
          <div
            className="md:w-[48%]
  "
          >
            <label className="block mb-2 text-sm font-medium text-black  ">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              type="email"
            />
            {errors.email && (
              <span className="text-red-600 font-semibold">
                Email Address is required
              </span>
            )}
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
              {...register("password", { required: true })}
              autoComplete="off"
              placeholder="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              type={showPassword ? "text" : "password"}
            />
            {errors.password && (
              <span className="text-red-600 font-semibold">
                Password is required
              </span>
            )}
            <div
              className="flex justify-end p-1 absolute top-10 right-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
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

export default SmtpAdd;