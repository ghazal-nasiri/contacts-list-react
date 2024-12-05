import { Link, useNavigate } from "react-router-dom";
import styles from "./AddContactPage.module.css";
import { useState } from "react";
import api from "../configs/api";
import { toast } from "sonner";
function AddContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    job: "",
    company: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!form.name.trim()) {
      validationErrors.name = "name is required";
    }
    if (!form.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validationErrors.email = "email is not valid";
    }
    if (!form.mobile.trim()) {
      validationErrors.mobile = "mobile is required";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      api
        .post("", form)
        .then((res) => {
          if (res.status == 201) {
            toast.success("Contact added successfuly", {
              className: "toast",
              duration: 2000,
            });
            navigate("/");
          }
        })
        .catch(() => {
          toast.error(`Something went wrong.`, {
            className: "toast",
            duration: 2000,
          });
        });
    }
  };
  return (
    <div className={styles.container}>
      <h2>New Contact</h2>
      <form
        className={styles.form}
        onChange={changeHandler}
        onSubmit={submitHandler}
      >
        <input type="text" placeholder="Name*" name="name" />
        {errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )}
        <input type="text" placeholder="Email*" name="email" />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
        <input type="text" placeholder="Mobile*" name="mobile" />
        {errors.mobile && (
          <span className={styles.errorMessage}>{errors.mobile}</span>
        )}
        <input type="text" placeholder="Job" name="job" />
        <input type="text" placeholder="Company" name="company" />
        <div className={styles.actions}>
          <Link to="/contacts-list">Cancel</Link>
          <input type="submit" value="Done" />
        </div>
      </form>
    </div>
  );
}

export default AddContactPage;
