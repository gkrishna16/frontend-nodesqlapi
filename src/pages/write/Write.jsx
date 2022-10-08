import React, { useState } from "react";
import "./write.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;

  console.log(useLocation());
  // console.log(`state--------`, state[0]);
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState(state?.category || "");
  const [file, setFile] = useState("");

  console.log(`value, category, ------`, value, category);

  async function handleClick(e) {
    e.preventDefault();
    console.log(`published`);
    try {
      state
        ? await axios.put(
            `https://gopalblogsapi.herokuapp.com/api/posts/${state[0].id}`,
            {
              title,
              desc: value,
              category,
              img,
            },
            { withCredentials: true }
          )
        : await axios.post(
            `https://gopalblogsapi.herokuapp.com/api/posts`,
            {
              title,
              desc: value,
              category,
              date: moment(Date.now()).format("YYYY-MM-DD HH-MM-SS"),
              img,
            },
            {
              withCredentials: true,
            }
          );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="write">
      <div className="content">
        <input
          type="text"
          placeholder={state[0].title}
          style={{ width: "99%", margin: "1em 0", height: "2em" }}
          onChange={(e) => setTitle(e.target.value)}
          // value={state.title || title}
          value={title}
        />
        <input
          type="text"
          placeholder={state[0].img}
          style={{ width: "99%", margin: "0.3em 0", height: "2em" }}
          onChange={(e) => setImg(e.target.value)}
          value={img}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            placeholder={state[0].desc}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status : </b> Draft
          </span>
          <span>
            <b>Visible : </b> Draft
          </span>
          <div className="">
            {/* <input
              style={{
                display: "none",
              }}
              type="file"
              name=""
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">Upload Image</label> */}
            <div className="buttons">
              {/* <button>Save as a draft</button> */}
              <button onClick={handleClick}>Publish</button>
            </div>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <input
            type="radio"
            name="cat"
            value="react"
            id="react"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "react"}
          />
          <label htmlFor="react">React</label>
          <input
            type="radio"
            name="cat"
            value="node"
            id="node"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "node"}
          />
          <label htmlFor="node">Node</label>
          <input
            type="radio"
            name="cat"
            value="java"
            id="java"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "java"}
          />
          <label htmlFor="java">Java</label>
          <input
            type="radio"
            name="cat"
            value="sql"
            id="sql"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "sql"}
          />
          <label htmlFor="sql">SQL</label>
        </div>
      </div>
    </div>
  );
};

export default Write;
