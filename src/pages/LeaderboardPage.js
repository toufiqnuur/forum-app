import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountProfile from "../components/AccountProfile";
import Container from "../components/Container";
import { asyncGetLeaderboards } from "../states/leaderboards/action";

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards, authUser } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <Container className="pt-6 pb-24">
      <div className="flex flex-col space-y-4">
        <h3>Klasemen Pengguna Aktif</h3>
        <div className="inline-flex justify-between border-b pb-3 text-lg font-bold text-zinc-500">
          <span>Pengguna</span>
          <span>Skor</span>
        </div>
        {leaderboards.map((account) => (
          <div key={account.user.id} className="flex items-center space-x-3">
            <AccountProfile
              avatar={account.user.avatar}
              name={`${account.user.name} ${
                authUser?.id === account.user.id ? "(Anda)" : ""
              }`}
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
