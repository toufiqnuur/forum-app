import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveThreads } from "../store/shared/action";
import Container from "../components/Container";
import Thread from "../components/Thread";

export default function HomePage() {
  const { threads } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveThreads());
  }, [dispatch]);

  return (
    <Container className="pt-6 pb-24">
      <h3>Diskusi tersedia</h3>
      {threads.map((thread) => (
        <Thread content={thread} key={thread.id} />
      ))}
    </Container>
  );
}
