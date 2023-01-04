import useInput from '../hooks/input';
import PropTypes from 'prop-types';

export default function AuthForm({ type, onSubmit }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(type === 'SIGNUP' ? { name, email, password } : { email, password });
  };

  return (
    <form className="mt-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
      {type === 'SIGNUP' && (
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={setName}
        />
      )}

      <input
        className="form-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />

      <button className="button__primary" type="submit">
        {type === 'SIGNUP' ? 'Daftar' : 'Login'}
      </button>
    </form>
  );
}

AuthForm.propTypes = {
  /** Form types return different field based on its types */
  type: PropTypes.oneOf(['SIGNIN', 'SIGNUP']).isRequired,
  /** Handle submit event callback */
  onSubmit: PropTypes.func.isRequired,
};
