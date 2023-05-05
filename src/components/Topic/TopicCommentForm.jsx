import SendIcon from "../../assets/svg/send.svg";
import InfoIcon from "@mui/icons-material/InfoRounded";

import { useEffect, useState } from "react";
import useAxiosLazy from "../../hooks/useAxiosLazy";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import apiEndpoints from "../../config/apiEndpoints";

import { pushComment } from "../../context/action/CommentAction";
import useCommentContext from "../../hooks/Context/useCommentContext";
import { toast } from "react-toastify";

const TopicCommentForm = ({ topic }) => {
  const [comment, setComment] = useState("");

  const { dispatch } = useCommentContext();

  const [fetch, { data, status, error }] = useAxiosLazy({
    url: apiEndpoints.topic.concat(`${topic.id}/comment/`),
    method: "post",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment) return;

    const comm = comment.trim();

    const form = new FormData();
    form.append("content", comm);

    fetch(form);
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(pushComment(data));
      setComment("");
    }
    if (status === "rejected") {
      toast.error("Could not add Your Comment");
      setComment("");
    }
  }, [status]);

  const handleCommentChanged = (e) => {
    setComment(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Tab" && !e.shiftKey) {
      e.preventDefault();
      setComment((curr) => `${curr}\t`);
    }

    if (e.code === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  const tooltip = (
    <Tooltip id={`tooltip-bottom`}>
      <InfoIcon color="warning" />
      <p>
        Click the Icon to Reply
        <br />
        <strong>Or</strong> use <em>Keystroke</em>:{" "}
        <strong>Ctrl + Enter</strong>
      </p>
    </Tooltip>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          name="comment"
          placeholder="Reply to the Question Here"
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
          <span className="send-icon" onClick={handleSubmit}>
            <img src={SendIcon} height={30} width={30} />
          </span>
        </OverlayTrigger>
      </div>
    </form>
  );
};
export default TopicCommentForm;
