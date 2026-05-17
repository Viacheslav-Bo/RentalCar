import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <ClipLoader color="var(--button)" size={50} />
    </div>
  );
};

export default Loading;
