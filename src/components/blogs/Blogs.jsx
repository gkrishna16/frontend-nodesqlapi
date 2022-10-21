import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "./blogs.module.css";
import Loading from "../loading/Loading";
import blogs from "./blogs.module.css";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const cat = useLocation().search;
  console.log(cat);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(`/api/posts${cat}`);
        console.log(`cat cat`, res.data);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [cat]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
      <div className={`${blogs.articleGrid}`}>
        {posts &&
          posts.map((d) => (
            <div className={`${blogs.card}`} key={d.id}>
              <Link to={`/post/${d.id}`}>
                <img src={d.img} alt="" />
                <div className={`${blogs.title}`}>
                  <p>{d.title}</p>
                </div>
                <div className={`${blogs.desc}`}>
                  {" "}
                  {d.desc.substring(0, 70)}...
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
