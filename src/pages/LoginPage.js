import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Container from "../components/Container";
import { authSignIn } from "../store/auth/action";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { authorized } = useSelector((state) => state);

  if (authorized) return <Navigate to="/" />;

  return (
    <Container className="max-w-md py-6">
      <h3>Login</h3>
      <AuthForm
        type="SIGNIN"
        onSubmit={(cradentials) => dispatch(authSignIn(cradentials))}
      />
      <p className="mt-4">
        Belum punya akun? <Link to="/register">Daftar disini</Link>
      </p>
    </Container>
  );
}
