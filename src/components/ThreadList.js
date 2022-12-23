import { IoArrowUndoOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";
import Votes from "./Votes";

export default function ThreadList({ threads, onUpVote, onDownVote }) {
  return (
    <>
      {threads.map((thread) => (
        <div className="border-b pt-6 pb-4" key={thread.id}>
          <span className="badge__category"># {thread.category}</span>
          <h5 className="mt-3">
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
          </h5>
          <div className="mt-2 flex items-center space-x-3 text-sm">
            <Votes
              upVote={thread.upVotesBy}
              downVote={thread.downVotesBy}
              onUpVote={onUpVote}
              onDownVote={onDownVote}
            />
            <div className="inline-flex space-x-1">
              <IoArrowUndoOutline /> <span>{thread.totalComments}</span>
            </div>
            <span>{postedAt(thread.createdAt)}</span>
            <span>
              oleh <strong>{thread.ownerName}</strong>
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
