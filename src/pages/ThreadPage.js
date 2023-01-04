import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import ThreadDetail from "../components/ThreadDetail";
import {
  asyncAddNewComment,
  asyncReceiveThreadDetail,
  asyncToggleDislikeComment,
  asyncToggleDislikeThread,
  asyncToggleLikeComment,
  asyncToggleLikeThread,
} from "../states/threadDetail/action";

export default function ThreadPage() {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const { threadDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  if (!threadDetail) return null;

  return (
    <Container className="pt-6 pb-24">
      {threadDetail && (
        <ThreadDetail
          {...threadDetail}
          onLikeThread={() => dispatch(asyncToggleLikeThread())}
          onDislikeThread={() => dispatch(asyncToggleDislikeThread())}
          onAddComment={(content) =>
            dispatch(asyncAddNewComment({ threadId, content }))
          }
          onLikeComment={(commentId) =>
            dispatch(asyncToggleLikeComment(commentId))
          }
          onDislikeComment={(commentId) =>
            dispatch(asyncToggleDislikeComment(commentId))
          }
        />
      )}
    </Container>
  );
}
