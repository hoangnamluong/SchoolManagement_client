import "./postExcerpt.scss";

import DateTime from "../misc/DateTime";

import Pic from "../../assets/img/signup.png";

const PostExcerpt = ({ post }) => {
  return (
    <div className="post">
      <div
        className="post-pic"
        style={{
          backgroundImage: `url(${Pic})`,
        }}
      ></div>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <DateTime className="post__date-time" timestamp={post.created_date} />
      <button className="primary-outlined-btn ">Read More &nbsp; &rarr;</button>
    </div>
  );
};
export default PostExcerpt;
