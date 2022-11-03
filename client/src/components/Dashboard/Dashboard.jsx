import React, { useState } from "react";
import FileBase64 from "react-file-base64";

function Dashboard() {
  const user = localStorage.getItem("profile");
  const [image, setImagae] = useState("");

  return (
    <div>
      {user ? (
        <form>
          <div>
            <input type="text" name="title" placeholder="Title of the task" />
          </div>
          <div>
            <input type="text" name="todo" placeholder="Description" />
          </div>
          <div>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => {
                setImagae(base64);
              }}
            />
          </div>
        </form>
      ) : (
        "Log in first!"
      )}
    </div>
  );
}

export default Dashboard;
