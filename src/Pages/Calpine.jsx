import { useForm } from "react-hook-form";

const Calpine = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { FromName, Subject, SMTPServer, Mails } = data;
    console.log(FromName, Subject, SMTPServer, Mails);

    reset();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          add calpine
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div className="mt-4">
            <label
              htmlFor="FromName"
              className="block mb-2 text-sm font-medium text-black"
            >
              From Name
            </label>
            <input
              {...register("FromName", { required: true })}
              type="text"
              id="FromName"
              placeholder="From Name"
              className="input input-bordered w-full"
            />
            {errors.FromName && (
              <span className="text-red-600 font-semibold">
                Name is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="Subject"
              className="block mb-2 text-sm font-medium text-black"
            >
              Subject
            </label>

            <div className="relative">
              <input
                type="text"
                id="Subject"
                {...register("Subject", { required: true })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
                placeholder="Subject"
              />
              {errors.Subject && (
                <span className="text-red-600 font-semibold">
                  Subject is required
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="SMTPServer"
              className="block mb-2 text-sm font-medium text-black "
            >
              SMTP Server
            </label>

            <div className="relative">
              <select
                {...register("SMTPServer", { required: true })}
                id="SMTPServer"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              >
                <option value="">Select SMTP Server</option>
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
              {errors.SMTPServer && (
                <span className="text-red-600 font-semibold">
                  SMTP Server is required
                </span>
              )}
            </div>
          </div>
          {/*  */}
          <div>
            <label
              htmlFor="Mails"
              className="block mb-2 text-sm font-medium text-black "
            >
              Mail list
            </label>

            <div className="relative">
              <select
                {...register("Mails", { required: true })}
                id="Mails"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md hover:border-gray-300"
              >
                <option value="">Select Mail list</option>
                <option value="students">Emails (students)</option>
                <option value="users">Emails (users)</option>
              </select>
              {errors.Mails && (
                <span className="text-red-600 font-semibold">
                  Mail list is required
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Add Calpine
          </button>
        </form>
      </div>
    </div>
  );
};
export default Calpine;
