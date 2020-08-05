import { SubmissionError } from "redux-form";
import ShiftFormAPI from "../../../apis/ShiftFormAPI";
import FileSaver from "file-saver";
import validate from "./validate";
const submitDownloadShiftReports = async (values, dispatch, props) => {
  return new Promise(async (resolve, reject) => {
    const errors = validate(values);
    if (errors) {
      reject(new SubmissionError(errors));
    } else {
      try {
        const { startDate, endDate } = values;
        const response = await ShiftFormAPI.get(`/download`, {
          responseType: "blob",
          params: { startDate, endDate },
        });
        const fileNameHeader = "x-suggested-filename";
        const suggestedFileName = response.headers[fileNameHeader];
        // Let the user save the file.
        FileSaver.saveAs(response.data, suggestedFileName);
        resolve();
      } catch (error) {
        reject(new SubmissionError({ _error: "Failed to download workbook" }));
      }
    }
  });
};

export default submitDownloadShiftReports;
