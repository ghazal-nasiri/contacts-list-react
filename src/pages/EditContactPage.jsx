import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./EditContactPage.module.css"
import { useEffect, useState } from "react";
import api from "../configs/api";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "sonner";
import { IoIosArrowBack } from "react-icons/io";


function EditContactPage() {
  const {contactId} = useParams()
  const [contactData, setContactData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`${contactId}`)
    .then(res => {
      if(res.status == 200){
        setContactData(res.data)
      }
    })
    .catch((error) => {
      setError(error.message)
    })
    setIsLoading(false)
  }, [])

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setContactData({...contactData, [name]: value})
  }

  const updateHandler = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!contactData.name.trim()) {
      validationErrors.name = "name is required";
    }
    if (!contactData.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      validationErrors.email = "email is not valid";
    }
    if (!contactData.mobile.trim()) {
      validationErrors.mobile = "mobile is required";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0){
      api.put(`${contactId}`, contactData)
      .then(res => {
        if(res.status == 200){
          toast.success("Contact edited successfuly", {
            className: "toast",
            duration: 2000,
          });
          navigate(`/view-contact/${contactId}`)
      }
    })
    .catch(() => {
      toast.error("Something went wrong!", {
        className: "toast",
        duration: 2000,
      });
    })
    }
    
  }
  return (
    <>
    {isLoading ? <div className="loader"><RotatingLines /></div> : error ?  <p className={styles.error}><span>Something went wrong!</span><Link to="/"><IoIosArrowBack /> back to home</Link></p> :     <div className={styles.container}>
    <h2>Edit Contact</h2>
    <form className={styles.form} onChange={changeHandler} onSubmit={updateHandler}>
      <input type="text" placeholder="Name*" name="name" value={contactData.name} />
      {errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )}
      <input type="text" placeholder="Email*" name="email" value={contactData.email} />
      {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      <input type="text" placeholder="Mobile*" name="mobile" value={contactData.mobile} />
      {errors.mobile && (
          <span className={styles.errorMessage}>{errors.mobile}</span>
        )}
      <input type="text" placeholder="Job" name="job" value={contactData.job} />
      <input type="text" placeholder="Company" name="company" value={contactData.company} />
      <div className={styles.actions}>
        <Link to={`/view-contact/${contactId}`}>Cancel</Link>
        <input type="submit" value="Done" />
      </div>
    </form>
  </div>}
</>
  )
}

export default EditContactPage
