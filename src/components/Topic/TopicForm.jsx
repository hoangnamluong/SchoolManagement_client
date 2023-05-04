import "./topicScss/topicForm.scss";

import { useEffect, useRef } from "react";

import CloseIcon from "../../assets/svg/close.svg";

import { useDispatch } from "react-redux";
import { appendAddedTopic } from "../../features/topic/topicSlice";

import { useParams } from "react-router-dom";
import useAxiosLazy from "../../hooks/useAxiosLazy";

import convertObjectToFormData from "../../utils/convertObjectToFormData";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import apiEndpoints from "../../config/apiEndpoints";

const TopicForm = ({ handleClose = null }) => {
  const { courseId } = useParams();

  const dispatch = useDispatch();

  const titleRef = useRef();
  const contentRef = useRef();

  const [fetch, { data, status, error }] = useAxiosLazy({
    url: apiEndpoints.course.concat(`${courseId}/topic/`),
    method: "post",
  });

  const handleSubmit = () => {
    const title = titleRef.current.value.trim().replace(/\s+/g, " ");
    const content = contentRef.current.value.trim().replace(/\s+/g, " ");

    if (!title || !content) return;

    const form = convertObjectToFormData({
      title,
      content,
    });

    fetch({
      title,
      content,
    });
  };

  useEffect(() => {
    if (status === "fulfilled") {
      if (!data) {
        toast.error("Add Topic Failed");
        return;
      }
      dispatch(appendAddedTopic(data));

      toast.success("Add Topic Succeed");

      handleClose();

      titleRef.current.value = "";
      contentRef.current.value = "";
    } else if (status === "rejected") {
      toast.error("Add Topic Failed");
    }
  }, [status]);

  return (
    <div className="topic-add__form">
      <div className="topic-add__input-container">
        <input type="text" name="title" required ref={titleRef} />
        <label>Title</label>
      </div>
      <div className="topic-add__input-container">
        <textarea name="content" required ref={contentRef} />
        <label>Content</label>
      </div>
      <div className="topic-add__action">
        <button
          className="border-0 svg-btn svg-error-outlined-btn"
          onClick={handleClose}
          disabled={status === "pending"}
        >
          <img src={CloseIcon} width={30} height={30} />
        </button>
        <button
          className="secondary-btn"
          onClick={handleSubmit}
          disabled={status === "pending"}
        >
          {status === "pending" ? (
            <Spinner style={{ width: "20px", height: "20px" }} />
          ) : (
            "Add Topic"
          )}
        </button>
      </div>
    </div>
  );
};
export default TopicForm;
