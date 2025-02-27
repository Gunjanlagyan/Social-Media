import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";

const Rte = ({ label, name, control, defaultValue }) => {
  return (
    <div className="w-full">
      {label && (
        <label className=" text-center w-full text-lg inline-block font-medium mb-1 pl-1">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          // EDITOR
          <Editor
            apiKey="lhq0ragg4htp90vmk7t87w4k82bppbecynw3pobn8k9xvyk1"
            initialValue={defaultValue}
            init={{
              initialValue: { defaultValue },
              branding: false,
              height: 350,
              menubar: true,
              plugins: [
                // Core editing features
                "anchor",
                "advlist",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default Rte;
