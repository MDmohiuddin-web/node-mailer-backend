const Dataform = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.Message.value;
    console.log(email, subject, message);

    const dataSend = {
      email: email,
      subject: subject,
      message: message,
    };

    const baseUrl = "http://localhost:3000";

    try {
      const res = await fetch(`${baseUrl}/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        alert("Email sent successfully!");
        form.reset();
      } else {
        console.error("Error:", res.statusText);
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while sending email.");
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
              <p className="text-center text-lg font-medium">Send a message</p>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">
                  subject
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter subject"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="Message" className="sr-only">
                  Message
                </label>

                <div className="relative">
                  <textarea
                    placeholder="Enter text"
                    name="Message"
                    id=""
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  ></textarea>
                </div>
              </div>

              <button
                type="primary"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
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
