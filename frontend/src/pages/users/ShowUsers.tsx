import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from 'react';
import { Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Define the User interface
interface User {
  _id: string;
  username: string;
  email: string;
  password: string; // Optional for editing
  role: 'user' | 'admin';
  createdAt: string;
}

export default function ShowUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
    
        setUsers(data.users); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user); // Set the user to be edited
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      try {
        const response = await fetch(`http://localhost:3000/users/${editingUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingUser),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setUsers(users.map(usr => (usr._id === editingUser._id ? editingUser : usr)));
        setEditingUser(null); // Close the edit form
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter(user => user._id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableCaption>A list of your registered users.</TableCaption>
        <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user,index) => (
            <TableRow key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <TableCell>{index+1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <button onClick={() => handleDelete(user._id)}>
                  <Delete />
                </button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" onClick={() => handleEdit(user)}>
                      <Edit />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle>Edit User</SheetTitle>
                      <SheetDescription>
                        Make changes to the user here. Click save when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleUpdate} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">Username</Label>
                        <Input
                          id="username"
                          value={editingUser?.username || ""}
                          onChange={(e) => setEditingUser({ ...editingUser!, username: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">Save changes</Button>
                        </SheetClose>
                      </SheetFooter>
                    </form>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}