import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AUTHPROVIDER/AuthProvider";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Signup = () => {
  const { createUser, googleSignIn, updateUserProfile, setUser } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [password, setPassword] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const showPassword = () => {
    setPassword(!password);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (fileList.length === 0) {
        toast.error("Please upload an image");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj);

      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      const imgData = await response.json();
      if (!imgData.success) {
        throw new Error("Image upload failed");
      }

      const imgUrl = imgData.data.url;

      const result = await createUser(data.email, data.password);
      console.log(result.user);
      toast.success("signup successful");

      await updateUserProfile(data.name, imgUrl);
      setUser((prevUser) => ({
        ...prevUser,
        displayName: data.name,
        photoURL: imgUrl,
      }));
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Signup unsuccessful");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        navigate(from, { replace: true });
        toast.success("Google SignIn successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google SignIn Unsuccessful");
      });
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div className="flex w-full mb-10 max-w-sm mx-auto py-20 overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
      <div className="hidden bg-cover lg:block lg:w-1/2 userauth rounded-md"></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <p className="mt-3 text-xl text-center text-black">Sign Up</p>

        <div
          onClick={handleGoogleSignIn}
          href="#"
          className="flex items-center justify-center mt-4 text-black transition-colors duration-300 transform border rounded-lg dark:border-gray-700  hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div className="px-4 py-2">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>

          <span className="w-5/6 px-4 py-3 font-bold text-center hover:text-white">
            Sign in with Google
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <a
            href="#"
            className="text-xs text-center text-black uppercase hover:underline"
          >
            or sign up with email
          </a>
          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" md:text-center w-full mt-4 md:flex justify-center items-center flex-col">
          <label className="block mb-2 text-sm font-medium text-black">
             Profile picture
            </label>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-black">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              name="name"
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
              {...register("email")}
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="mt-4 relative">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-black">
                Password
              </label>
            </div>

            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              name="password"
              placeholder="Password"
              autoComplete="off"
              className="input input-bordered w-full"
              type={password ? "text" : "password"}
            />
            <div
              className="flex justify-end p-1 absolute top-10 right-5"
              onClick={showPassword}
            >
              {password ? <FaEye /> : <FaEyeSlash />}
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-600">Password required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">
                Password must be 6 characters or more
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one uppercase, one lowercase, one number and
                one special character
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              disabled={isLoading}
              className="w-full bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <Link
            to="/Login"
            className="text-xs text-black uppercase hover:underline"
          >
            or <span className="text-blue-700">sign in</span>
          </Link>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
