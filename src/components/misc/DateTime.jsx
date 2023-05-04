import Moment from "react-moment";

const DateTime = ({ timestamp, ...args }) => {
  return timestamp ? (
    <Moment format="DD-MM-yyyy" {...args}>
      {timestamp}
    </Moment>
  ) : (
    <p {...args}>Unknown Date</p>
  );
};
export default DateTime;
