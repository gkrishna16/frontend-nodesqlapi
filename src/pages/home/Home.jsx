import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
// import { useLocation, Link } from "react-router-dom";
import Blogs from "../../components/blogs/Blogs";
// import Navbar from "../../components/navbar/Navbar";
import home from "./home.module.css";

const Home = () => {
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

  return (
    // <div className="homepage">
    //   <div className="">Home Page</div>
    //   <div>
    //     <div className="top-container"></div>
    //     {/* <h1>Homepage.</h1> */}
    //   </div>
    //   <div className="posts">
    //     {posts &&
    //       posts?.map((post) => (
    //         <Link to={`/post/${post.id}`}>
    //           <div className="post-box" key={post.id}>
    //             <img src={post.img} alt="" />
    //             <div className="">{post.title}</div>
    //           </div>
    //         </Link>
    //       ))}
    //   </div>
    // </div>
    <div className={`${home.homeContainer}`}>
      <div className={`${home.hero}`}>
        <div className={`${home.heroImg}`}>
          <img
            src="https://images.unsplash.com/photo-1665606855702-144fd49af552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          {/* <div className={`${home.textPart}`}> */}
          <div className={`${home.textContainer}`}>
            <button>EXPLORE</button>
            <p className={`${home.textImg}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              .consectetur adipisicing elit.
            </p>
            {/* </div> */}
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className={`${home.articlesCol}`}>
        {posts.slice(0, 4).map((post) => (
          <div className={`${home.card}`} key={post.id}>
            <Link to={`/post/${post.id}`}>
              <img src={post.img} alt="" />
              <div className={home.cardTitle}>
                <h4>{post.title}</h4>
                <p>{post.desc.substring(0, 50)}...</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
