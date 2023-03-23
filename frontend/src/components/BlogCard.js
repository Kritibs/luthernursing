import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import moment from "moment";

const BlogCard = ({
  isAuthenticated,
  is_admin,
  blog_id,
  blog_title,
  blog_content,
  pub_date,
}) => {
  return (
    <div className="container-fluid">
      <div className="row content">
        <div>
          <h2>{blog_title}</h2>
          <h5>
            <span className="glyphicon glyphicon-time"></span> Post by Admin,{" "}
            {moment(pub_date).format("MM-DD-YYYY")}.
          </h5>
          <p>{blog_content}</p>
        </div>
        <div>
          <Link
            to={"/blog-detail/" + blog_id + "/"}
            state={{
              blog_id: blog_id,
              blog_title: blog_title,
              blog_content: blog_content,
            }}
          >
            <Button size="small">Learn More</Button>
          </Link>
          <br />
          <br />
        </div>
        <hr />
      </div>
    </div>
  );
};

export default BlogCard;
