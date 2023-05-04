import { useEffect, useRef, useState } from "react";

const NUM_REGEX = /^\d{1,}(\.\d{0,2})?$/;

const useStudentState = ({ selectedStudent = null }) => {
  const [final, setFinal] = useState(0);
  const [mid1, setMid1] = useState(0);
  const [mid2, setMid2] = useState(0);
  const [mid3, setMid3] = useState(0);
  const [mid4, setMid4] = useState(0);
  const [mid5, setMid5] = useState(0);

  const marks_detail = selectedStudent?.marks_detail || false;

  const checkValue = (setData, value) => {
    if (value === "" || NUM_REGEX.test(value)) {
      if (value > 10)
        setData((curr) => ({
          ...curr,
          value: 10,
        }));
      else
        setData((curr) => ({
          ...curr,
          value: value,
        }));
    }
  };

  const handleFinalChanged = (e) => {
    checkValue(setFinal, e.target.value);
  };

  const handleMid1Changed = (e) => {
    checkValue(setMid1, e.target.value);
  };

  const handleMid2Changed = (e) => {
    checkValue(setMid2, e.target.value);
  };

  const handleMid3Changed = (e) => {
    checkValue(setMid3, e.target.value);
  };

  const handleMid4Changed = (e) => {
    checkValue(setMid4, e.target.value);
  };

  const handleMid5Changed = (e) => {
    checkValue(setMid5, e.target.value);
  };

  useEffect(() => {
    setFinal(marks_detail && marks_detail.final ? marks_detail.final : "");
    setMid1(
      marks_detail && marks_detail.midterm[0] ? marks_detail.midterm[0] : ""
    );
    setMid2(
      marks_detail && marks_detail.midterm[1] ? marks_detail.midterm[1] : ""
    );
    setMid3(
      marks_detail && marks_detail.midterm[2] ? marks_detail.midterm[2] : ""
    );
    setMid4(
      marks_detail && marks_detail.midterm[3] ? marks_detail.midterm[3] : ""
    );
    setMid5(
      marks_detail && marks_detail.midterm[4] ? marks_detail.midterm[4] : ""
    );
  }, [selectedStudent]);

  return {
    final,
    mid1,
    mid2,
    mid3,
    mid4,
    mid5,
    handleFinalChanged,
    handleMid1Changed,
    handleMid2Changed,
    handleMid3Changed,
    handleMid4Changed,
    handleMid5Changed,
  };
};
export default useStudentState;
