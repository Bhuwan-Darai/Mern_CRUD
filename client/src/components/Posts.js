import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";

function Posts() {
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({});

  const toggleShow = () => setBasicModal(!basicModal);
  //to render data from database to page
  const [posts, setPosts] = useState([]);

  //to fetch data from backend useEffect
  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []); // to prevent continuos login add empty array in options

  const deletePost = (id) => {
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const updatePost = (post) => {
    setUpdatedPost(post);
    setBasicModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    axios
      .put(`/update/${updatedPost._id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setBasicModal(false);
    window.location.reload();
  };
  return (
    <div style={{ width: "90%", textAlign: "center", margin: "auto auto" }}>
      <h1>Posts page</h1>
      <Button
        style={{ width: "100%", marginBottom: "1rem" }}
        variant="outline-dark"
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update a Post</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                style={{ marginBottom: "1rem" }}
                id="typeText"
                type="text"
                placeholder="title"
                name="title"
                onChange={handleChange}
                value={updatedPost.title ? updatedPost.title : ""}
              />
              <MDBInput
                id="typeText"
                type="text"
                placeholder="description"
                name="description"
                value={updatedPost.description ? updatedPost.description : ""}
                onChange={handleChange}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn variant="primary" onClick={saveUpdatedPost}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {posts ? (
        <>
          {posts.map((post) => {
            return (
              <div
                key={post._id}
                style={{
                  border: "solid lightgray 1px",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              >
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    style={{ width: "100%", marginRight: "1rem" }}
                    variant="outline-info"
                    onClick={() => updatePost(post)}
                  >
                    UPDATE
                  </Button>
                  <Button
                    onClick={() => deletePost(post._id)}
                    style={{ width: "100%" }}
                    variant="outline-danger"
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Posts;
