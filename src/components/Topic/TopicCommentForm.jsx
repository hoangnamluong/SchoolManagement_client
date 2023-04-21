import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/InfoRounded";

import { useRef, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TopicCommentForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment) return;

    console.log(comment);
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
    <form>
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
            <SendIcon />
          </span>
        </OverlayTrigger>
      </div>
    </form>
  );
};
export default TopicCommentForm;
