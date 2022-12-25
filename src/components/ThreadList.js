import {
  IoCalendarClearOutline,
  IoChatbubblesOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";
import Votes from "./Votes";

export default function ThreadList({ threads, onLike, onDislike, userId }) {
  return (
    <>
      {threads.map((thread) => (
        <div className="border-b pt-6 pb-4" key={thread.id}>
          <span className="badge__category"># {thread.category}</span>
          <h5 className="mt-3">
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
          </h5>
          <div className="mt-2 flex flex-wrap items-center space-x-3 text-sm lg:text-base">
            <Votes
              like={thread.upVotesBy?.length}
              isLiked={thread.upVotesBy.includes(userId)}
              onLike={() => onLike(thread.id)}
              dislike={thread.downVotesBy?.length}
              isDisliked={thread.downVotesBy.includes(userId)}
              onDislike={() => onDislike(thread.id)}
            />
            <div className="flex items-center space-x-1">
              <IoChatbubblesOutline /> <span>{thread.totalComments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <IoPersonOutline /> <span>{thread.ownerName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <IoCalendarClearOutline />{" "}
              <span>{postedAt(thread.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
