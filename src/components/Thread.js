import parser from "html-react-parser";
import { IoArrowUndoOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { diffTimeUpload } from "../utils/days";
import Votes from "../components/Votes";

export default function Thread({ content }) {
  return (
    <div className="border-b pt-6 pb-4">
      <span className="badge__category"># {content.category}</span>
      <h5 className="mt-3">
        <Link to={`/threads/${content.id}`}>{content.title}</Link>
      </h5>
      <div className="mt-2">{parser(content.body.split("</div>")[0])}</div>
      <div className="mt-2 flex items-center space-x-3 text-sm">
        <Votes
          upVote={content.upVotesBy?.length}
          downVote={content.downVotesBy?.length}
        />
        <div className="inline-flex space-x-1">
          <IoArrowUndoOutline /> <span>{content.totalComments}</span>
        </div>
        <span>{diffTimeUpload(content.createdAt)}</span>
        <span>
          Dibuat oleh <b>{content.owner}</b>
        </span>
      </div>
    </div>
  );
}
