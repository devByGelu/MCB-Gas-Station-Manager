import { SubmissionError } from "redux-form";
import UserAPI from "../../../apis/UserAPI";
import AuthAPI from "../../../apis/AuthAPI";

const submitAuthForm = async (values, dispatch, props) => {
  const { signInMode } = props;
  if (!signInMode)
    try {
      const response = await UserAPI.post("/", values);
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
    } catch (error) {
      await dispatch({ type: "REGISTER_FAIL" });
      if (error.response.status === 400)
        throw new SubmissionError(error.response.data.errors);
      else {
        dispatch(
          props.returnErrors(
            error.response.data,
            error.response.status,
            "REGISTER_FAIL"
          )
        );
      }
    }
  else
    try {
      const response = await AuthAPI.post("/", values);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      await dispatch({ type: "LOGIN_FAIL" });
      if (error.response.status === 400)
        // throw new SubmissionError(error.response.data.errors);
        throw new SubmissionError({ _error: "Invalid credentials" });
      else {
        await dispatch(
          props.returnErrors(
            error.response.data,
            error.response.status,
            "LOGIN_FAIL"
          )
        );
        throw new SubmissionError({ _error: error.response.status });
      }
    }
};

export default submitAuthForm;
