import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Container from "../components/Container";
import { authSignUp } from "../store/auth/action";

export default function RegisterPage() {
  const { authorized } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (authorized) return <Navigate to="/" />;

  return (
    <Container className="max-w-md py-6">
      <h3>Register</h3>
      <AuthForm
        type="SIGNUP"
        onSubmit={(cradentials) => dispatch(authSignUp(cradentials))}
      />
      <p className="mt-4">
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </Container>
  );
}
