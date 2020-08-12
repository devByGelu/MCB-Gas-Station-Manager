import { SubmissionError } from "redux-form";
import ShiftFormAPI from "../../../apis/ShiftFormAPI";
import FileSaver from "file-saver";
const submitDownloadShiftReports = async (values, dispatch, props) => {
  try {
    const { startDate, endDate } = values;
    alert(startDate);
    const response = await ShiftFormAPI.get(`/download`, {
      // responseType: "blob",
      params: { startDate, endDate },
    });
    const fileNameHeader = "x-suggested-filename";
    const suggestedFileName = response.headers[fileNameHeader];
    // Let the user save the file.
    FileSaver.saveAs(response.data, suggestedFileName);
  } catch (error) {
    if (!error.response) throw new SubmissionError({ _error: "BRUH" });
    else throw new SubmissionError(error.response.data.errors);
  }
};

export default submitDownloadShiftReports;
