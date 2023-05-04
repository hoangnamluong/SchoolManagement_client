import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";

import { updateGrade } from "../../features/grade/gradeSlice";
import useGradeSelector from "../../hooks/Selectors/useGradeSelector";

import { Spinner } from "react-bootstrap";

const EXCEL_EXTENSION = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

const ImportCSVForm = () => {
  const { courseId } = useParams();

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const { status } = useGradeSelector();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (!EXCEL_EXTENSION.some((ex) => ex === e.dataTransfer.files[0].type)) {
        return toast.info("Incorrect file type");
      }

      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChangedFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (!EXCEL_EXTENSION.some((ex) => ex === e.target.files[0].type)) {
        return toast.info("Incorrect file type");
      }
      setFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const convertObject = (obj) => {
    let final = {
      id: 0,
      is_final: true,
      is_midterm: false,
      value: +obj.Final,
    };

    let midterm = obj.Midterm.split(",").map((mid) => {
      return {
        id: 0,
        is_final: false,
        is_midterm: true,
        value: +mid,
      };
    });

    return {
      id: +obj.id,
      student: {
        code: obj.Student_Id,
        user: {
          first_name: obj.First_Name,
          last_name: obj.Last_Name,
        },
      },
      marks_detail: [final, ...midterm],
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) return toast.info("File is Empty");

    let data = {
      course_id: courseId,
      mark_list: [],
    };

    const reader = new FileReader();

    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data || [];

      parsedData.forEach((obj, i) => {
        if (i !== parsedData.length - 1)
          data.mark_list.push(convertObject(obj));
      });

      dispatch(updateGrade({ form: data, courseId }));
    };

    reader.readAsText(file);
  };

  return (
    <form
      className="import-csv-form"
      onDragEnter={handleDragEnter}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        id="input-csv-file"
        type="file"
        onChange={handleChangedFile}
        accept="text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <label
        className={dragActive ? "drag-active" : ""}
        htmlFor="input-csv-file"
      >
        <div>
          {file ? (
            <p className="uploaded-file fw-400">{file.name}</p>
          ) : (
            <p className="fw-400">Drag and Drop your CSV file here Or</p>
          )}
          <button onClick={handleButtonClick}>Upload a file</button>
        </div>
      </label>
      {dragActive && (
        <div
          className="drag-mask"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragEnter}
          onDragOver={handleDragEnter}
          onDrop={handleDrop}
        ></div>
      )}
      <button className="primary-btn" disabled={status === "pending"}>
        {status === "pending" ? (
          <Spinner style={{ width: "30px", height: "30px" }} />
        ) : (
          "Submit CSV"
        )}
      </button>
    </form>
  );
};
export default ImportCSVForm;
