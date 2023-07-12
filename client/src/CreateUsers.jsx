import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    }
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name); // Add name field to the form data
    formData.append("email", email); // Add email field to the form data
    formData.append("age", age);
    formData.append("file", file);
    axios
      .post("http://localhost:4000/createUser", formData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Create User</h2>
          <div>
            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Email">Email:</label>
            <input
              type="Email"
              placeholder="Enter Email"
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
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUsers;
