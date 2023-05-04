import CheckIcon from "../../assets/svg/check.svg";
import CloseIcon from "../../assets/svg/close.svg";
import InfoIcon from "@mui/icons-material/InfoRounded";

import { useEffect, useState } from "react";
import apiEndpoints from "../../config/apiEndpoints";
import useAxiosLazy from "../../hooks/useAxiosLazy";

import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import useCommentContext from "../../hooks/Context/useCommentContext";
import {
  removeCommentAt,
  replaceComment,
} from "../../context/action/CommentAction";

import convertObjectToFormData from "../../utils/convertObjectToFormData";

const TopicCommentEditForm = ({
  comment: commentProp = {},
  setEdit = null,
}) => {
  const [comment, setComment] = useState("");

  const { comments, dispatch } = useCommentContext();

  const index = comments.findIndex((c) => c === commentProp);

  const [fetch, { data, status, error }] = useAxiosLazy({
    url: apiEndpoints.comment.concat(`${commentProp.id}/`),
    method: "patch",
  });

  const onUpdateComment = () => {
    if (!comment) return;

    const comm = comment.trim().replace(/\s+/g, " ");

    const form = convertObjectToFormData({
      content: comm,
    });

    fetch(form);
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(removeCommentAt(commentProp.id));
      dispatch(replaceComment(data, index));

      toast.success("Edit Comment Succeed");
      setEdit(false);
    }

    if (status === "rejected") {
      toast.error("Edit Comment Failed");
    }
  }, [status]);

  const onCloseEdit = () => {
    setEdit(false);
  };

  const handleCommentChanged = (e) => {
    setComment(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Tab" && !e.shiftKey) {
      e.preventDefault();
      setComment((curr) => `${curr}\t`);
    }

    if (e.code === "Enter" && e.ctrlKey) {
      onUpdateComment();
    }
  };

  const tooltip = (
    <Tooltip id={`tooltip-bottom`}>
      <InfoIcon color="warning" />
      <p>
        Click the Icon to Edit
        <br />
        <strong>Or</strong> use <em>Keystroke</em>:{" "}
        <strong>Ctrl + Enter</strong>
      </p>
    </Tooltip>
  );

  return (
    <div>
      <div className="input-container">
        <textarea
          name="comment"
          placeholder="Edit Your Reply Here"
          rows={5}
          wrap="hard"
          value={comment}
          onChange={handleCommentChanged}
          onKeyDown={handleKeyDown}
        />
        <OverlayTrigger
          key={"top"}
          placement="top"
          overlay={tooltip}
          delay={500}
          trigger={["hover", "focus"]}
        >
          <span className="actions">
            <img src={CloseIcon} height={40} width={40} onClick={onCloseEdit} />
            <img
              src={CheckIcon}
              height={40}
              width={40}
              onClick={onUpdateComment}
            />
          </span>
        </OverlayTrigger>
      </div>
    </div>
  );
};
export default TopicCommentEditForm;
