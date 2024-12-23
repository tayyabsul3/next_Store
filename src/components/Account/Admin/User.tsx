import axios from "axios";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditUserManage from "./EditUser";

const User = () => {
  const [users, setUsers] = useState<any[]>([]); // State for users
  const [doFetching, setDoFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state for user search
  const [userToEdit, setUserToEdit] = useState({}); // User data for editing

  const dialogRef = useRef<any>();
  const dialogRef3 = useRef<any>();

  // Fetch the users list from the server
  const fetchUsers = async (url: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(url || "http://localhost:4000/users", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const usersData = Array.isArray(data.users) ? data.users : [data.users];
      setUsers(usersData); // Set users data or an empty array
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      setLoading(false);
    }
  };

  // Call fetch users when the component mounts or when doFetching changes
  useEffect(() => {
    fetchUsers("");
  }, [doFetching]);

  // Handle user deletion
  const handleDeleteUser = async (userId: string) => {
    const choice = confirm(`Are you sure you want to delete user ${userId}?`);
    if (!choice) return;

    try {
      await axios.delete(`http://localhost:4000/users/${userId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDoFetching(!doFetching); // Trigger re-fetch of users
    } catch (e) {
      console.error("Error deleting user:", e);
    }
  };

  // Handle searching for a user by name or email
  function getUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchUsers(`http://localhost:4000/users/${searchQuery}`);
  }

  return (
    <div>
      <div className="flex justify-between max-sm:flex-col gap-2 sm:items-center">
        <h1 className="font-semibold">All Users</h1>
        <div className="buttons flex gap-2 items-center">
          <form
            onSubmit={getUser}
            className="search w-full  flex bg-gray-50 text-gray-800 items-center px-2 rounded-md"
          >
            <input
              type="search"
              placeholder="Search by id"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm max-sm:w-full sm:min-w-[250px]  p-2 border-none outline-none"
            />
            <Search size={15} />
          </form>
        </div>
      </div>

      {/* Table view - only visible on lg screens */}
      <div className="usersTable xl:block hidden">
        {!loading ? (
          <Table className="full my-5 rounded-md">
            <TableCaption>
              {users.length === 0 ? "No Users Found" : ""}
            </TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="border-b-2 border-gray-400 text-sm">
                  Id
                </TableHead>
                <TableHead className="border-b-2 p-2 border-gray-400 text-sm">
                  Name
                </TableHead>
                <TableHead className="border-b-2 border-gray-400 text-sm">
                  Email
                </TableHead>
                <TableHead className="border-b-2 border-gray-400 text-sm">
                  Role
                </TableHead>
                <TableHead className="border-b-2 border-gray-400 text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className="break-words">
                  <TableCell className="border-gray-400 text-sm">
                    {user._id}
                  </TableCell>
                  <TableCell className="border-gray-400 text-sm p-5">
                    {user.name}
                  </TableCell>
                  <TableCell className="border-gray-400 text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell className="border-gray-400 text-sm">
                    {user.role}
                  </TableCell>
                  <TableCell className="border-gray-400 text-sm flex items-center">
                    <button
                      onClick={() => {
                        setUserToEdit(user);
                        dialogRef3.current.click();
                      }}
                      className="p-1 text-sm hover:underline rounded-sm hover:text-black text-gray-400 font-semibold px-3 bg-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      className="p-1 text-sm hover:bg-red-400 bg-red-500 text-gray-50 font-semibold rounded-md mx-2 px-3"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex p-20 justify-center items-center">
            <p className="animate-spin">
              <Loader2 />
            </p>
          </div>
        )}
      </div>

      {/* Grid view - visible on smaller screens */}
      <div className="xl:hidden grid grid-cols-1 lg:grid-cols-2 gap-6 my-5 ">
        {!loading ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 shadow-md rounded-md space-y-2"
            >
              <h2 className="font-normal text-sm">Order ID: {user._id}</h2>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm">{user.role}</p>
              </div>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="mt-2 flex  items-center">
                <button
                  onClick={() => {
                    setUserToEdit(user);
                    dialogRef3.current.click();
                  }}
                  className="p-1 text-sm hover:underline rounded-sm hover:text-black text-gray-400 font-semibold px-3 bg-gray-200"
                >
                  Edit
                </button>
                <button
                  className="p-1 text-sm hover:bg-red-400 bg-red-500 text-gray-50 font-semibold rounded-md mx-2 px-3"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex p-20 justify-center items-center">
            <p className="animate-spin">
              <Loader2 />
            </p>
          </div>
        )}
      </div>

      {/* Dialog for editing a user */}
      <Dialog>
        <DialogTrigger ref={dialogRef3} />
        <DialogContent className="max-h-[80vh] p-10 overflow-auto">
          <EditUserManage setDoFetching={setDoFetching} userData={userToEdit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default User;
