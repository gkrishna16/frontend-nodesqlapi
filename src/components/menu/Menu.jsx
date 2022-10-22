import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu from "./Menu.module.css";

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
    <div className={menu.menuContainer}>
      {posts &&
        posts.map((d) => (
          <div className={menu.menuBox} key={d.id}>
            <Link to={`/post/${d.id}`}>
              <div className="">{/* <h1>New</h1> */}</div>
              <div className={menu.menuTitle}>{d.title}</div>
              <div className="desc">{d.desc.substring(0, 20)}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Menu;
