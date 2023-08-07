import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <div style={{ widows: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1>Create a Post</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            placeholder="Title"
            style={{ margin: "1rem" }}
            value={post.title}
            onChange={handleChange}
          />
          <Form.Control
            name="description"
            placeholder="Description"
            value={post.description}
            onChange={handleChange}
            style={{ margin: "1rem" }}
          />
        </Form.Group>
        <Button
          onClick={handleClick}
          style={{ width: "100%", margin: "1rem" }}
          variant="outline-success"
        >
          CREATE POST
        </Button>
      </Form>
      <Button
        style={{ width: "100%", margin: "1rem" }}
        variant="outline-dark"
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
    </div>
  );
}

export default CreatePost;
