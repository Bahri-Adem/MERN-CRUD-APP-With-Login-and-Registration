import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUsers() {
  var { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getUser/" + id)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setAge(res.data.age);
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);
  function handleSubmit(event) {
    const formData = new FormData();
    formData.append("name", name); // Add name field to the form data
    formData.append("email", email); // Add email field to the form data
    formData.append("age", age);
    formData.append("file", image);
    event.preventDefault();
    axios
      .put("http://localhost:4000/updateUser/" + id, formData)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div>
            <label htmlFor="Name">Name:</label>
            <input
              id="Name"
              type="text"
              placeholder="Enter Name"
              value={name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Email">Email:</label>
            <input
              id="Email"
              type="Email"
              placeholder="Enter Email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Age">Age:</label>
            <input
              id="Age"
              type="text"
              name="Age"
              placeholder="Enter Age"
              value={age}
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Image">Image:</label>
            <input
              id="Image"
              type="file"
              name="Image"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button type="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUsers;
