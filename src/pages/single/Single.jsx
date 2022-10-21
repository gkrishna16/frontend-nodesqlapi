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
    <div className="">
      <div>left</div>
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
                  {/* {desc} */}
                  {/* <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati incidunt quia, officiis nam vel rem minus dicta
                    fuga fugiat explicabo quam tempore quae aperiam.
                    Exercitationem vel expedita eum ut quia! Lorem ipsum dolor
                    sit amet consectetur, adipisicing elit. Adipisci quos
                    consequuntur, esse, alias aliquid quam tempora corporis
                    fugit aspernatur quod sunt accusamus cupiditate quibusdam
                    enim aut cumque. Praesentium, consectetur voluptatum!
                  </p>

                  <h3>Next important section </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Saepe quis reprehenderit enim, aspernatur beatae repudiandae
                    amet ut similique facere, vitae magnam? Blanditiis, enim
                    laborum? Consequuntur aut quasi repudiandae! Eligendi,
                    similique! Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Voluptatum, ducimus! Enim deserunt dolor
                    dignissimos, laudantium cumque amet at eum accusamus id!
                    Quidem tenetur doloremque eligendi optio. Libero beatae
                    numquam magni?Illum a, delectus modi dicta consequuntur
                    possimus, illo reprehenderit veniam excepturi at facilis
                    dolorem enim repellendus consectetur eum accusamus!
                    Repudiandae, obcaecati pariatur.
                  </p>
                  <h3>Next important section </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Saepe quis reprehenderit enim, aspernatur beatae repudiandae
                    amet ut similique facere, vitae magnam? Blanditiis, enim
                    laborum? Consequuntur aut quasi repudiandae! Eligendi,
                    similique! Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Voluptatum, ducimus! Enim deserunt dolor
                    dignissimos, laudantium cumque amet at eum accusamus id!
                    Quidem tenetur doloremque eligendi optio. Libero beatae
                    numquam magni? Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Omnis hic dolorem nostrum doloribus atque,
                    dignissimos adipisci incidunt iure delectus consectetur
                    magnam reiciendis, nisi quam inventore maiores repellendus
                    dolores saepe qui! Sapiente alias dolore, corrupti eum ad
                    temporibus esse pariatur minus voluptate expedita
                    reprehenderit quis voluptates neque nobis sequi autem nihil
                    qui totam tenetur officia quibusdam aut! Error dolores
                    reprehenderit rem. Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Id quod, hic molestias fugiat non quis,
                    eum, impedit assumenda quisquam eius doloremque delectus
                    illo. Corporis dolorem eos, quaerat reprehenderit ad
                    praesentium! Omnis expedita, distinctio vitae nihil soluta
                    perferendis deleniti et impedit debitis vero quam natus in
                    modi minima ipsam! Nesciunt, voluptatem. Necessitatibus,
                    provident! Corrupti perspiciatis ex aut inventore rerum
                    molestiae ad? Quasi quis ullam aliquid libero, veniam minima
                    quo.
                  </p> */}
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
