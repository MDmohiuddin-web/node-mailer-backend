import axios from "axios";

const AxiosPublic = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosPublic = () => {
  return AxiosPublic;
};

export default UseAxiosPublic;
