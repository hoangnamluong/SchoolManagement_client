import { dateParsedLongDateTime } from "../../utils/dateParse";

import Avatar from "../User/Avatar";
import EditIcon from "../../assets/svg/edit.svg";
import { useState } from "react";
import TopicCommentEditForm from "./TopicCommentEditForm";

const TopicComment = ({ comment, userId, topicTitle }) => {
  const [edit, setEdit] = useState(false);

  const createdAt = dateParsedLongDateTime(comment.created_date);

  const loggedUser = userId === comment.user.id;

  const onEditClicked = () => {
    setEdit((curr) => !curr);
  };

  return (
    comment && (
      <div className="topic-detail__comment">
        <div className="topic-detail-comment__title">
          <div className="title__inner">
            <Avatar img={comment.user.image} username={comment.user.username} />
            <div className="title__content">
              <h5>{comment.user.first_name + " " + comment.user.last_name}</h5>
              <p>
                Answer To: <b>{topicTitle}</b>
              </p>
            </div>
          </div>
          <p>{createdAt}</p>
        </div>
        {!edit ? (
          <div className="topic-detail-comment__content">
            <p className="fw-400">{comment.content}</p>
          </div>
        ) : (
          <div className="topic-detail-comment__edit">
            <TopicCommentEditForm comment={comment} setEdit={setEdit} />
          </div>
        )}
        {loggedUser && !edit && (
          <div className="topic-detail-comment__action">
            <img
              src={EditIcon}
              width={20}
              height={20}
              onClick={onEditClicked}
            />
          </div>
        )}
      </div>
    )
  );
};
export default TopicComment;
