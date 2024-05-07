import axios from "axios";
import { toast } from "react-toastify";
import { setCars, setCar } from "../reducers/car";

export const getCars = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/api/car`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setCars(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const getCar = (navigate, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/api/car/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setCar(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
    navigate("/");
  }
};

export const addCar =
  (
    navigate,
    name,
    cartype_id,
    rentPerDay,
    manufacture_id,
    photo,
    setIsLoading
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;

    setIsLoading(true);

    let data = new FormData();
    data.append("name", name);
    data.append("cartype_id", cartype_id);
    data.append("manufacture_id", manufacture_id);
    data.append("photo", photo);
    data.append("rentPerDay", rentPerDay);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}/api/car`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      navigate("/");
      if (response?.data?.message === "Add Car Success!") {
        toast.success(response?.data?.message);
        dispatch(getCars());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      navigate("/");
    }
    setIsLoading(false);
  };

export const editCar =
  (id, navigate, name, cartype_id, rentPerDay, manufacture_id, photo) =>
  async (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;

    let data = new FormData();
    data.append("name", name);
    data.append("cartype_id", cartype_id);
    data.append("manufacture_id", manufacture_id);
    data.append("photo", photo);
    data.append("rentPerDay", rentPerDay);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}/api/car/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      if (response?.data?.message === "Update Success!") {
        toast.success(response?.data?.message);
        dispatch(getCars());
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      navigate("/");
    }
  };

export const deleteCar = (id) => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/api/car/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    if (response?.data?.message === "Car deleted successfully") {
      toast.success(response?.data?.message);
      dispatch(getCars());
      navigate("/");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
