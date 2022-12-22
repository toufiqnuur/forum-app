import { useState } from "react";
import EditableInput from "./EditableInput";

export default function CommentForm({ locked, onSubmit }) {
  const [content, setContent] = useState("");
  const [reset, setReset] = useState(false);

  return (
    <div>
      <EditableInput
        initial={locked && "Login to comment"}
        disabled={locked}
        reset={reset}
        onFocus={() => setReset(false)}
        onChange={(value) => setContent(value)}
      />
      <button
        className="mt-2 bg-blue-500 px-8 py-2.5 text-right text-white disabled:bg-blue-300"
        type="button"
        onClick={() => {
          onSubmit(content);
          setReset(true);
        }}
        disabled={locked}
      >
        Kirim
      </button>
    </div>
  );
}
