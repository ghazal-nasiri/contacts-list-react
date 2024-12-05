import { FaUserPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "./ContactsListPage.module.css"
import { useEffect, useState } from "react";
import api from "../configs/api";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { toast } from "sonner";


function ContactsListPage() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [arrayIds, setArrayIds] = useState([]);
  const [deleteBtnShow, setDeleteBtnShow] = useState(false);
  const [filterContacts, setFilterContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try{
        const res = await api.get("");

        setContacts(res.data)
        setFilterContacts(res.data)
      }
      catch(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      setIsLoading(false)
    }
    fetchContacts()



  }, [])



  const checkboxHandler = (e) => {
    if(e.target.checked){
      setArrayIds([...arrayIds, e.target.value])
    } else{
      setArrayIds(() => arrayIds.filter(item => item !== e.target.value));
    }
  }

  const deleteGroupHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!"
    }).then((result) => {
      if (result.isConfirmed) {
        arrayIds.map((id) => {
          api.delete(`${id}`)
        })
        setContacts(contacts.filter(contact => !arrayIds.includes(contact.id)));

        toast.warning(`${arrayIds.length} contact(s) deleted`, {
          className: "toast",
          duration: 2000,
        });
        setArrayIds([])
        setDeleteBtnShow(false)

      }
    })
    .catch(err => {
      toast.error("Something went wrong!", {
        className: "toast",
        duration: 2000,
      });
      console.log(err.message)
    })
  }



  const searchHandler = (e) => {
        setFilterContacts(contacts.filter(contact => contact.name.toLowerCase().includes(e.target.value.toLowerCase().trim())));
  }
  filterContacts.sort((a,b) => a.name.localeCompare(b.name))


  // console.log(filterContacts.sort((a,b) => a.name.localeCompare(b.name)))

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {deleteBtnShow ? <div><button className={`${styles.deleteBtn} ${arrayIds.length ? "" : styles.disable}`} onClick={deleteGroupHandler}>delete</button><button onClick={() => setDeleteBtnShow(!deleteBtnShow)}>cencel</button></div> : <button onClick={() => setDeleteBtnShow(!deleteBtnShow)}>select</button>}
        <Link to="/add-contact">
          <FaUserPlus size="25px" color="green" className={styles.addUserBtn} />
        </Link>
      </div>
      <h1>Contacts</h1>
      <div className={styles.searchBox}>
        <IoSearch color="#a8a8a8" size="20px" />
        <input type="text" placeholder="Search" onChange={searchHandler} />
      </div>
      {isLoading ? <div className="loader"><RotatingLines /></div> : <ul className={styles.contactsList}>
        {filterContacts.length > 0 && filterContacts.map(contact => (
          <li key={contact.id}>
          {deleteBtnShow && <input type="checkbox" value={contact.id} onChange={checkboxHandler} />}
          <Link to={`/view-contact/${contact.id}`}>
            <span>{contact.name}</span>
            <span className={styles.email}>{contact.email}</span>
          </Link>
        </li> 
        ))} 
      </ul>}
    </div>
  );
}

export default ContactsListPage;
