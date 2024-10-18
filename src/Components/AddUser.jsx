import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import toast from "react-hot-toast";

const AddUser = () => {
  const axiosPublic = UseAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email } = data;
    console.log(name, email);
    reset();
    const dataSend = {
      email: email,
      name: name,
    };

    try {
      const res = await axiosPublic.post("/users", dataSend);

      if (res.status === 200) {
        if (res.data.insertedId === null && res.data.message === "this user already exists") {
          console.log(res.data);
          toast.error("User already exists!");
        } else {
          console.log(res.data);
          toast.success("Data sent successfully!");
        }
        reset();
      } else {
        console.error("Error:", res.statusText);
        toast.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while sending email.");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          add user to the system
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-black">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-600 font-semibold">
                Name is required
              </span>
            )}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-black">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-600 font-semibold">
                Email is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;