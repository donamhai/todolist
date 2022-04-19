import axiosClient from "./axiosClient";

const taskApi = {
  async getAll() {
    const url = `/tasks/`;
    return await axiosClient.get(url);
  },
  async get(id) {
    const url = `/tasks/${id}`;
    return await axiosClient.get(url);
  },
  async add(data) {
    const url = "/tasks";
    return await axiosClient.post(url, data);
  },
  async update(data) {
    const url = `/tasks/${data.id}`;
    return await axiosClient.put(url, data);
  },
  async remove(id) {
    const url = `/tasks/${id}`;
    return await axiosClient.delete(url);
  },
};

export default taskApi;
