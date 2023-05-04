import { Suspense, lazy } from "react";

import SpinnerComponent from "../misc/SpinnerComponent";

const TopicActionModal = lazy(() => import("./TopicActionModal"));
const TopicForm = lazy(() => import("./TopicForm"));

const TopicAdd = () => {
  return (
    <Suspense fallback={<SpinnerComponent />}>
      <TopicActionModal title="Add New Topic" Form={TopicForm}>
        <button className="secondary-btn">Add Topic +</button>
      </TopicActionModal>
    </Suspense>
  );
};
export default TopicAdd;
