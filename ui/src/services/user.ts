import { history, makeRequest, showErrorMessage, showSuccessMessage } from "./common";
import { IS_LOGGED_IN, LOGIN, REGISTER } from "./endpoints";

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
    history.push("/home?path=%2Froot");
  } catch (e) {
    showErrorMessage("Authentication Error", "Invalid username or password");
  }
};

export const isLoggedIn = async () => {
  try {
    const loginStatus = await makeRequest(IS_LOGGED_IN, "GET");
    return loginStatus;
  } catch (e) {
    console.log("Unauthorized user!");
    return false;
  }
};

export const handleRegistration = async (values: any) => {
  try {
    const registrationResponse = await makeRequest(REGISTER, "POST", {
      body: {
        username: values.username,
        password: values.password,
		    botToken: values.botToken,
		    chatId	: values.chatId
      },
    });
    const { data } = registrationResponse;
    showSuccessMessage("User : "+ data.username+" registered successfully.. Continue Login");
    history.push("/login");
  } catch (e) {
    showErrorMessage("Authentication Error", "Couldn't register"+values.username);
  }
};

