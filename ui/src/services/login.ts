import { history, makeRequest, showErrorMessage } from "./common";
import { LOGIN } from "./endpoints";

export const handleLogin = async (values: any) => {
  try {
    const loginRequest = await makeRequest(LOGIN, "POST", {
      body: {
        username: values.username,
        password: values.password,
      },
    });
    const { data } = loginRequest;
    localStorage.setItem("accessToken", data.token);
    history.push("/home");
  } catch (e) {
    showErrorMessage("Authentication Error", "Invalid username or password");
  }
};
