import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveThreads } from "../store/shared/action";
import Container from "../components/Container";
import Thread from "../components/Thread";

export default function HomePage() {
  const { threads } = useSelector((state) => state);
  const [filterCategory, setFilterCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveThreads());
  }, [dispatch]);

  return (
    <Container className="pt-6 pb-24">
      <h3>Daftar kategori</h3>
      <div className="mt-3 flex flex-wrap gap-3">
        {[...new Set(threads.map((thread) => thread.category))].map(
          (category, index) => (
            <button
              className={`badge__category ${
                filterCategory === category && "border-blue-600 text-blue-600"
              }`}
              onClick={() =>
                setFilterCategory(filterCategory === category ? null : category)
              }
              key={index}
            >
              {category}
            </button>
          )
        )}
      </div>
      <h3 className="mt-6">Diskusi tersedia</h3>
      {threads
        .filter((thread) =>
          filterCategory ? thread.category === filterCategory : thread
        )
        .map((thread) => (
          <Thread content={thread} key={thread.id} />
        ))}
    </Container>
  );
}
