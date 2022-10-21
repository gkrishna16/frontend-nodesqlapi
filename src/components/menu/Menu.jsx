import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Menu.css";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState("");
  //   console.log(`cat menu page.`, cat);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [cat]);

  console.log(posts);

  return (
    <div>
      {posts &&
        posts.map((d) => (
          <div className="" key={d.id}>
            <div className="">
              <h1>New</h1>
            </div>
            <div className="">{d.title}</div>
          </div>
        ))}
    </div>
  );
};

export default Menu;
