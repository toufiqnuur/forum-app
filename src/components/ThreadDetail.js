import { useState } from "react";
import { useSelector } from "react-redux";
import parser from "html-react-parser";
import { postedAt } from "../utils";
import AccountProfile from "./AccountProfile";
import Votes from "./Votes";
import EditableInput from "./EditableInput";

export default function ThreadDetail({
  title,
  category,
  createdAt,
  owner,
  body,
  upVotesBy,
  downVotesBy,
  onLikeThread,
  onDislikeThread,
  comments,
  onAddComment,
  onLikeComment,
  onDislikeComment,
}) {
  const { authUser } = useSelector((state) => state);
  const [comment, setComment] = useState("");
  const [clearForm, setClearForm] = useState(false);

  return (
    <>
      <span className="badge__category"># {category}</span>
      <h3 className="mt-3">{title}</h3>
      <div className="mt-6">{parser(body || "")}</div>
      <div className="mt-4 flex items-center space-x-3 text-sm lg:text-base">
        <Votes
          like={upVotesBy?.length}
          isLiked={upVotesBy?.includes(authUser?.id)}
          onLike={onLikeThread}
          dislike={downVotesBy?.length}
          isDisliked={downVotesBy?.includes(authUser?.id)}
          onDislike={onDislikeThread}
        />
        <div className="flex items-center space-x-3">
          <span>Dibuat oleh</span>
          <AccountProfile avatar={owner?.avatar} name={owner?.name} size="SM" />
          <span>{postedAt(createdAt)}</span>
        </div>
      </div>

      <h5>Beri Komentar</h5>
      <div>
        <EditableInput
          initial={!authUser?.id && "Login to comment"}
          disabled={!authUser?.id}
          reset={clearForm}
          onFocus={() => setClearForm(false)}
          onChange={(value) => setComment(value)}
        />
        <button
          className="mt-2 bg-blue-500 px-8 py-2.5 text-right text-white disabled:bg-blue-300"
          onClick={(e) => {
            onAddComment(comment);
            setClearForm(true);
          }}
          disabled={!authUser?.id}
        >
          Kirim
        </button>
      </div>

      <h5 className="mt-6">Komentar ({comments?.length})</h5>
      {comments &&
        comments.map((comment, index) => (
          <div className="border-b py-3" key={index}>
            <div className="mt-3 flex items-center space-x-3">
              <AccountProfile
                avatar={comment?.owner?.avatar}
                name={comment?.owner?.name}
                className="flex-1"
              />
              <span className="text-sm">{postedAt(comment?.createdAt)}</span>
            </div>
            <div className="mt-2">{parser(comment?.content || "")}</div>
            <div className="mt-4 flex items-center space-x-3 text-sm lg:text-base">
              <Votes
                like={comment?.upVotesBy?.length}
                isLiked={comment?.upVotesBy.includes(authUser?.id)}
                onLike={() => onLikeComment(comment?.id)}
                dislike={comment?.downVotesBy?.length}
                isDisliked={comment?.downVotesBy.includes(authUser?.id)}
                onDislike={() => onDislikeComment(comment?.id)}
              />
            </div>
          </div>
        ))}
    </>
  );
}
