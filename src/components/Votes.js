import { IoThumbsDownOutline, IoThumbsUpOutline } from "react-icons/io5";

export default function Votes({
  upVote,
  downVote,
  onUpVote,
  onDownVote,
  className,
}) {
  return (
    <div className={`inline-flex space-x-3 ${className}`}>
      <button className="inline-flex space-x-1" onClick={onUpVote}>
        <IoThumbsUpOutline /> <span>{upVote}</span>
      </button>
      <button className="inline-flex space-x-1" onClick={onDownVote}>
        <IoThumbsDownOutline /> <span>{downVote}</span>
      </button>
    </div>
  );
}
