import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./single.css";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import Menu from "../../components/menu/Menu";

const Single = () => {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split(`/`)[2];
  console.log(postId);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log(`current user `, currentUser);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/posts/${postId}`, {
          // headers: { "Access-Control-Allow-Origin": "*" },
          // "Content-Type": "application/json",
          withCredentials: true,
        });
        await setPost(res.data);
        console.log(`single post -------`, post);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [postId]);

  function convertHtmlToString(html) {
    const doc = new DOMParser().parseFromString(html, `text/html`);
    return doc.body.textContent;
  }

  async function handleDelete() {
    try {
      const res = await axios.delete(`/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="singlepageContainer">
      {/* <div>left</div> */}
      {post?.map((p) => {
        const { title, desc } = p;
        return (
          <div className="single-page" key={p.id}>
            <div className="sidebar-left"></div>
            <div className="article-mid">
              <div className="writer-info flex">
                <div className="leftside-info flex">
                  <div className="writer-img">
                    <img src={p?.img} alt="$$" />
                  </div>
                  <div className="writer-info">
                    <div className="writer-name">{title.toUpperCase()}</div>
                    <div className="date-time">
                      Posted {moment(post.date).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="rightside-info">
                  <div className="rightside-box">Rightside</div>
                </div>
              </div>

              {p?.username === currentUser?.username && (
                <div className="" style={{ display: "flex", gap: "1rem" }}>
                  <span onClick={handleDelete}>delete</span>
                  <Link to={`/write?edit=${p.id}`} state={post}>
                    <span>edit</span>
                  </Link>
                </div>
              )}

              <div className="article-section">
                <div className="article">
                  <h2>Top 25 Sql questions.</h2>

                  {convertHtmlToString(desc)}
                </div>
              </div>
            </div>
            <div className="options-right">
              <Menu cat={p.category} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Single;
