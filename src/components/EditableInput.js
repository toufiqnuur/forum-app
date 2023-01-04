import { useEffect, useRef } from 'react';

export default function EditableInput({ initial, disabled, reset, onChange, onFocus }) {
  const wysiwyg = useRef('');

  useEffect(() => {
    if (wysiwyg.current) {
      if (reset) {
        wysiwyg.current.innerHTML = null;
      }
    }
  }, [reset]);

  return (
    <div
      ref={wysiwyg}
      data-testid="test-editableInput"
      className="form-textarea mt-3 min-h-[100px] w-full overflow-scroll"
      onInput={(e) => onChange(e.currentTarget.innerHTML)}
      onFocus={onFocus}
      contentEditable={!disabled}
      suppressContentEditableWarning
    >
      {initial}
    </div>
  );
}
