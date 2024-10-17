import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AUTHPROVIDER/AuthProvider";
import userLogo from "../assets/profile.png";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Profile = () => {
  const { updateUserProfile, user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { name } = data;

    try {
      let imageUrl = user?.photoURL;

      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj);

        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const imgData = await response.json();
        if (imgData.success) {
          imageUrl = imgData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      await updateUserProfile(name, imageUrl);

      setUser((prevUser) => ({
        ...prevUser,
        displayName: name,
        photoURL: imageUrl,
      }));

      toast.success("Profile updated successfully!");
      reset({ name: name });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Profile update failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:py-5">
      <div className="flex m-auto flex-col justify-center max-w-2xl p-6 shadow-md rounded-xl sm:px-12 bg-white dark:bg-white text-gray-100 dark:text-gray-800">
        <img
          className="rounded-lg w-48 h-48 mx-auto object-cover"
          src={user?.photoURL || userLogo}
          alt="User profile"
        />

        <div className="space-y-4 text-center divide-y divide-gray-700 dark:divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {user?.displayName || "User name not found"}
            </h2>
            <p className="px-5 text-xs sm:text-base text-gray-400 dark:text-gray-600">
              {user?.email || "User email not found"}
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            <div className="w-full m-auto p-8 space-y-3 rounded-xl bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-400 dark:text-gray-600 w-full text-left font-bold">
                    Update Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 focus:border-my_color-400 focus:dark:border-my_color-600"
                    onChange={(e) => setValue("name", e.target.value)}
                  />
                  <small className="text-danger text-red-500">
                    {errors.name && "This field is required"}
                  </small>
                </div>
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-400 dark:text-gray-600 w-full text-left font-bold">
                    Update Profile Picture
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
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white btn border-none inline-block shadow-md w-full rounded-lg px-5 py-3 text-sm font-medium transition duration-300 ease-in-out transform hover:bg-blue-600 hover:shadow-lg hover:scale-105"
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;