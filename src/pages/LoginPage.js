import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { asyncSetAuthUser } from "../states/authUser/action";
import AuthForm from "../components/AuthForm";
import Container from "../components/Container";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);

  if (authUser) return <Navigate to="/" />;

  return (
    <Container className="max-w-md py-6">
      <h3>Login</h3>
      <AuthForm
        type="SIGNIN"
        onSubmit={(cradentials) => dispatch(asyncSetAuthUser(cradentials))}
      />
      <p className="mt-4">
        Belum punya akun? <Link to="/register">Daftar disini</Link>
      </p>
    </Container>
  );
}
