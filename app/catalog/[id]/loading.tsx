import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <ClipLoader color="#3470ff" size={50} />
    </div>
  );
};

export default Loading;
