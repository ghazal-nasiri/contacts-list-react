import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./ViewContactPage.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import api from "../configs/api";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { toast } from "sonner";
function ViewContactPage() {
  const {contactId} = useParams()
  const [contactData, setContactData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("")
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


  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`${contactId}`)
        .then(res => {
          if(res.status == 200){
            toast.warning("Contact deleted successfully", {
              className: "toast",
              duration: 2000,
            });
            navigate("/")

          }
        })
        .catch(() => {
          toast.error("Something went wrong!", {
            className: "toast",
            duration: 2000,
          });
        })
      }
    });
  }

  const {name, email, mobile, job, company} = contactData

  return (
    <>
    {isLoading ? <div className="loader"><RotatingLines /></div> : error ?  <p className={styles.error}><span>Something went wrong!</span><Link to="/"><IoIosArrowBack /> back to home</Link></p> : <div className={styles.container}>
    <div className={styles.actions}>
      <Link to="/contacts-list"><IoIosArrowBack size="25px" color="green" /></Link>
      <Link to={`/edit-contact/${contactId}`}><FaUserEdit size="25px" color="green" /></Link>
    </div>
    <ul>
      <li>Name: <b>{name}</b></li>
      <li>Email: <b>{email}</b></li>
      <li>Mobile: <b>{mobile}</b></li>
      <li>Job: <b>{job}</b></li>
      <li>Company: <b>{company}</b></li>
    </ul>
    <div className={styles.deleteContact}>
    <button className={styles.deleteContactBtn} onClick={deleteHandler}><AiOutlineUserDelete /> Delete Contact</button>
    </div>
  </div>}
    </>
  )
}


export default ViewContactPage
