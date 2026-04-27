import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
const EditorInput = ({ value, onChange }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(value);
  }, [value]);
  return (
    <div className="editor_input">
      <label>Product Description</label>

      <Editor
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        initialValue={value}
        value={content}
        onEditorChange={(newValue) => {
          setContent(newValue);
          onChange(newValue);
        }}
        
        init={{
          height: 300,
          resize: false,
          menubar: true,
          skin: "oxide-dark",
          content_css: "dark",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image",
        }}
      />
    </div>
  );
};

export default EditorInput;
