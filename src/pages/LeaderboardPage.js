import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountProfile from "../components/AccountProfile";
import Container from "../components/Container";
import { fetchLeaderboard } from "../store/leaderboard/action";

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboard } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <Container className="pt-6 pb-24">
      <div className="flex flex-col space-y-4">
        <h3>Klasemen Pengguna Aktif</h3>
        <div className="inline-flex justify-between border-b pb-3 text-lg font-bold text-zinc-500">
          <span>Pengguna</span>
          <span>Skor</span>
        </div>
        {leaderboard.map((account) => (
          <div key={account.user.id} className="flex items-center space-x-3">
            <AccountProfile
              avatar={account.user.avatar}
              name={account.user.name}
              size="LG"
              className="flex-1 text-lg"
            />
            <span className="text-2xl">{account.score}</span>
          </div>
        ))}
      </div>
    </Container>
  );
}