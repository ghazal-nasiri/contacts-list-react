import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ContactsListPage from "./pages/ContactsListPage"
import AddContactPage from "./pages/AddContactPage"
import EditContactPage from "./pages/EditContactPage"
import ViewContactPage from "./pages/ViewContactPage"
import PageNotFound from "./pages/404"
import { Toaster } from "sonner"


function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster richColors position="top-center" className="toaster"  />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts-list" />} />
          <Route path="/contacts-list" element={<ContactsListPage />} />
          <Route path="/add-contact" element={<AddContactPage />} />
          <Route path="/edit-contact/:contactId" element={<EditContactPage />} />
          <Route path="/view-contact/:contactId" element={<ViewContactPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
