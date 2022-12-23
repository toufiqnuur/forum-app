import { IoThumbsDownOutline, IoThumbsUpOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Votes({
  threadId,
  upVote,
  downVote,
  onUpVote,
  onDownVote,
  className,
}) {
  const { authUser } = useSelector((state) => state);

  return (
    <div className={`inline-flex space-x-3 ${className}`}>
      <button
        className="inline-flex space-x-1"
        onClick={() => onUpVote(threadId)}
      >
        <IoThumbsUpOutline
          className={`${
            authUser && upVote.includes(authUser.id) && "text-blue-600"
          }`}
        />{" "}
        <span>{upVote?.length}</span>
      </button>
      <button
        className="inline-flex space-x-1"
        onClick={() => onDownVote(threadId)}
      >
        <IoThumbsDownOutline
          className={`${
            authUser && downVote.includes(authUser.id) && "text-blue-600"
          }`}
        />{" "}
        <span>{downVote?.length}</span>
      </button>
    </div>
  );
}
