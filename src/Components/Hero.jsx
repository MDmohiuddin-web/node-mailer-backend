const Hero = () => {
  return (
    <section className=" text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-10 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300  via-blue-500 hover:animate-pulse to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            SMTP Mails system using nodemailer and react.js
          </h1>

          <p className="mx-auto mt-4 max-w-xl  text-black ">
            With this setup, you can capture email data in your React app and
            send it to your backend server, which will handle the email sending
            using Nodemailer. This approach allows you to manage email
            functionalities efficiently within your application.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border hover:text-black border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent  focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className=" text-black block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium hover:text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
