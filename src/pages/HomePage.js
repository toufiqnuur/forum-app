import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../components/CategoryList";
import Container from "../components/Container";
import ThreadList from "../components/ThreadList";
import {
  asyncGetThreadsAndUsers,
  asyncToggleDislikeThread,
  asyncToggleLikeThread,
} from "../states/threads/action";

export default function HomePage() {
  const dispatch = useDispatch();
  const { threads } = useSelector((state) => state);
  const [filterCategory, setFilterCategory] = useState(null);

  useEffect(() => {
    dispatch(asyncGetThreadsAndUsers());
  }, [dispatch]);

  return (
    <Container className="pt-6 pb-24">
      <h3>Daftar kategori</h3>
      <CategoryList
        categories={[...new Set(threads.map((thread) => thread.category))]}
        current={filterCategory}
        onChange={(selected) => setFilterCategory(selected)}
      />
      <h3 className="mt-6">Diskusi tersedia</h3>
      <ThreadList
        threads={threads.filter((thread) =>
          filterCategory ? thread.category === filterCategory : thread
        )}
        onUpVote={(id) => dispatch(asyncToggleLikeThread(id))}
        onDownVote={(id) => dispatch(asyncToggleDislikeThread(id))}
      />
    </Container>
  );
}
