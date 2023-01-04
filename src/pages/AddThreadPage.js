import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import EditableInput from "../components/EditableInput";
import useInput from "../hooks/input";
import { asyncAddNewThread } from "../states/threads/action";

export default function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);

  const [title, setTitle] = useInput("");
  const [category, setCategory] = useInput("");
  const [body, setBody] = useState("");
  const [clearForm, setClearForm] = useState(true);

  if (!authUser?.id) return navigate("/");

  return (
    <Container className="max-w-xl py-6">
      <h3>Buat Thread</h3>
      <div className="mt-4 flex max-w-xl flex-col space-y-4">
        <input
          className="form-input"
          type="text"
          placeholder="Judul"
          value={title}
          onChange={setTitle}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={setCategory}
        />
        <EditableInput
          initial=""
          disabled={!authUser?.id}
          reset={clearForm}
          onFocus={() => setClearForm(false)}
          onChange={(value) => setBody(value)}
        />
        <button
          className="button__primary mt-2"
          onClick={() => {
            dispatch(asyncAddNewThread({ title, body, category }));
            setClearForm(true);
            navigate("/");
          }}
        >
          Buat
        </button>
      </div>
    </Container>
  );
}
