import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { Link, useNavigate } from "react-router-dom";
import { asyncUnsetAuthUser } from "../states/authUser/action";
import AccountProfile from "./AccountProfile";
import Container from "./Container";

export default function Header() {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 w-full border-b bg-white">
      <Container className="flex max-w-screen-lg items-center justify-between py-4">
        <Link
          className="text-2xl font-bold text-black hover:no-underline"
          to="/"
        >
          Forum App
        </Link>
        <div className="inline-flex space-x-3">
          {!!authUser && (
            <AccountProfile avatar={authUser.avatar} name={authUser.name} />
          )}
          <button
            onClick={() =>
              !!authUser ? dispatch(asyncUnsetAuthUser()) : navigate("/login")
            }
          >
            {!!authUser ? "(logout)" : "Login"}
          </button>
        </div>
      </Container>
      <LoadingBar style={{ backgroundColor: "royalblue" }} />
    </header>
  );
}
