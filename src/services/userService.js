import axios from "../axios";

const userService = {
  handleLogin(email, password) {
    return axios.post("/api/login", {
      email: email,
      password: password,
    });
  },

  getAllUsers(id) {
    return axios.get(`/api/get-all-users`, {
      params: {
        id: id,
      },
    });
  },
};

export default userService;
