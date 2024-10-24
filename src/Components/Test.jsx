import { useState } from "react";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const EmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = UseAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Form submitted with values:", data);
    try {
      const response = await axiosPublic.post("/email/send-email", data);
      console.log("Response:", response.data);
      toast.success(response.data.message);
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send emails.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-96 mx-auto"
    >
      <div className="flex flex-col">
        <label htmlFor="collection">Select Collection:</label>
        <select {...register("collection", { required: true })} className="input input-bordered w-full">
          <option value="users">Users</option>
          <option value="students">Students</option>
        </select>
        {errors.collection && <span>This field is required</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("subject", { required: true })}
        />
        {errors.subject && <span>This field is required</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="message">Message:</label>
        <textarea
        className="input input-bordered w-full"
          {...register("message", { required: true })}
        ></textarea>
        {errors.message && <span>This field is required</span>}
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