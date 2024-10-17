import axios from "axios";

const AxiosPublic = axios.create({
  baseURL: "http://localhost:9585",
});

const UseAxiosPublic = () => {
  return AxiosPublic;
};

export default UseAxiosPublic;
