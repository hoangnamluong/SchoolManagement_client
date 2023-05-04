import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useGradeSelector from "../../hooks/Selectors/useGradeSelector";
import { lockGrade, updateGrade } from "../../features/grade/gradeSlice";

import { Spinner } from "react-bootstrap";
import ImportCSVModal from "./ImportCSVModal";
import ExportDropdown from "./ExportDropdown";

import LockIcon from "../../assets/svg/lock.svg";

const GradingAction = () => {
  const dispatch = useDispatch();

  const { courseId } = useParams();

  const { students, gradeLock, status } = useGradeSelector();

  const handleSaveStudentsGrade = (e) => {
    dispatch(updateGrade({ form: students, courseId }));
  };

  const handleLockGrade = (e) => {
    if (confirm("Are you sure you want to lock grade?")) {
      dispatch(lockGrade({ courseId }));
    }
  };

  return (
    <div className="grading-actions_button">
      <div className="import-export-action">
        <ImportCSVModal />
        <ExportDropdown />
      </div>
      <div className="grading-final-actions">
        <button
          className="secondary-btn w-100"
          onClick={handleSaveStudentsGrade}
          disabled={status === "pending" || gradeLock === "LOCKED"}
        >
          {status === "pending" ? (
            <Spinner style={{ width: "20px", height: "20px" }} />
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          className="error-btn w-100 lock-btn"
          onClick={handleLockGrade}
          disabled={status === "pending" || gradeLock === "LOCKED"}
        >
          <div>
            {status === "pending" ? (
              <Spinner style={{ width: "30px", height: "30px" }} />
            ) : (
              <>
                <span>
                  <img src={LockIcon} height={30} width={30} />
                </span>
                <p className="fw-400 m-0">Lock Grade</p>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
export default GradingAction;
