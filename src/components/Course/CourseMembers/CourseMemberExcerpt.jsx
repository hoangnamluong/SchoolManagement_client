import ChatIcon from "../../../assets/svg/chat3.svg";

import { useDispatch } from "react-redux";
import { displayChat, setPartner } from "../../../features/chat/chatSlice";

import useUserSelector from "../../../hooks/Selectors/useUserSelector";

const CourseMemberExcerpt = ({ student }) => {
  const dispatch = useDispatch();

  const name = student.user.first_name.concat(" ", student.user.last_name);
  const { currentUser } = useUserSelector();

  const handleClickedChatIcon = (e) => {
    dispatch(setPartner(student.user));
    dispatch(displayChat());
  };

  return (
    student && (
      <tr className="course-members__table-item">
        <td>{student.code}</td>
        <td>{name}</td>
        <td>{student.user.email}</td>
        <td>
          {!(currentUser.email === student.user.email) ? (
            <img
              src={ChatIcon}
              width={40}
              height={40}
              onClick={handleClickedChatIcon}
              className="cursor-pointer"
            />
          ) : (
            <span style={{ width: "40px" }}></span>
          )}
        </td>
      </tr>
    )
  );
};
export default CourseMemberExcerpt;
