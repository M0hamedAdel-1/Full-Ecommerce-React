import React, { useEffect } from 'react'
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
const EditorInput = ({value,onChange}) => {

    const [content, setContent] = useState("");
useEffect(()=>{
  setContent(value)
},[value])
  return (
    <div className='editor_input'>
      <label>Product Description</label>

      <Editor
        apiKey="bjsubl80vjt0uunley7vmydowm2rq50x4po0omr619gajkkg" 
        initialValue={value}
        value={content}
        onEditorChange={(newValue) =>
          {
            
            setContent(newValue)
            onChange(newValue)
          }
        }
        init={{
          height: 300,
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
  
}

export default EditorInput


// import { Editor } from "@tinymce/tinymce-react";
// import { memo } from "react";



// function EditorInput({ editorRef, value, onchange }) {

//   const onInit = (_evt, editor) => {
//     if(editorRef)
//     editorRef.current = editor;
//   };

//   return (
//     <>
//       <Editor
//         apiKey={import.meta.env.VITE_TINY_API_KEY}
//         onInit={onInit}
//         value={value}
//         onEditorChange={(value) => {
//           if (onchange) onchange(value);
//         }}
//         init={
//           {
//           height: 350,
//           menubar: true,

//           plugins: [
//             "advlist",
//             "autolink",
//             "lists",
//             "link",
//             "image",
//             "charmap",
//             "preview",
//             "anchor",
//             "searchreplace",
//             "visualblocks",
//             "code",
//             "fullscreen",
//             "insertdatetime",
//             "media",
//             "table",
//             "code",
//             "help",
//             "wordcount",
//           ],
//           toolbar:
//             "undo redo | blocks | link image" +
//             "bold italic forecolor | alignleft aligncenter " +
//             "alignright alignjustify | bullist numlist outdent indent | " +
//             "removeformat | help | code",
//         }}
//       />
//     </>
//   );
// }

// export default memo(EditorInput);
