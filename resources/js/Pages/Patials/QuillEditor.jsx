// QuillEditor.jsx
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(value);

  useEffect(() => {
    setEditorHtml(value);
  }, [value]);

  const handleQuillChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };

  return (
    <ReactQuill
      theme="snow"
      value={editorHtml}
      onChange={handleQuillChange}
      modules={{
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
        ],
      }}
    />
  );
};

export default QuillEditor;
