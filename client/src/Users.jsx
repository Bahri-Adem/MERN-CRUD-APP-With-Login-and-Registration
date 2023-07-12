import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Users() {
  const [User, setUser] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setName(localStorage.getItem("username"));
    } else {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/list")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:4000/delete/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    //navigate("/login");
    window.location.reload();
  };
  const handleDeleteAjax = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:4000/delete/${id}`)
            .then(() => {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your Student has been deleted.",
                "success"
              );
              window.location.reload(); // Refresh the page after successful deletion
            })
            .catch((err) => {
              console.log(err);
              Swal.fire(
                "Error",
                "An error occurred while deleting the student.",
                "error"
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Student file is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Welcome {name}</h2>
        <Link to="/" className="btn btn-sucess" onClick={() => handleLogout()}>
          Logout
        </Link>
        <Link to="/create" className="btn btn-sucess">
          Add +{" "}
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Image</th>
              <th align="justify">Action</th>
            </tr>
          </thead>
          <tbody>
            {User.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
                <td>
                  <img
                    src={`../Images/${data.image}`}
                    alt="profile"
                    width="45"
                    height="55"
                  />
                </td>
                <td>
                  <Link
                    to={`../update/${data._id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(data._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteAjax(data._id)}
                  >
                    Delete-Ajax
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
