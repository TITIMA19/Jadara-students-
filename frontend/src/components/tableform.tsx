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
import axios from 'axios';
import { Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddEvent  from "./addevent";
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

interface CalendarEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
}


export default function Tables() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:3000/events');
      setEvents(response.data.data.events);
    };
    fetchEvents();
  }, []);

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event); // Set the event to be edited
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      try {
        await axios.put(`http://localhost:3000/events/${editingEvent._id}`, editingEvent);
        setEvents(events.map(ev => (ev._id === editingEvent._id ? editingEvent : ev)));
        setEditingEvent(null); // Close the edit form
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/events/${id}`);
      setEvents(events.filter(event => event._id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  return (
    <div>
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableCaption>A list of your recent events.</TableCaption>
        <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <TableRow >
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map(event => (
            <TableRow key={event._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <TableCell>{event._id}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell className="text-right">
                <button onClick={() => handleDelete(event._id)}>
                  <Delete />
                </button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" onClick={() => handleEdit(event)}>
                      <Edit />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle>Edit Event</SheetTitle>
                      <SheetDescription>
                        Make changes to your event here. Click save when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleUpdate} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input
                          id="title"
                          value={editingEvent?.title || ""}
                          onChange={(e) => setEditingEvent({ ...editingEvent!, title: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input
                          id="description"
                          value={editingEvent?.description || ""}
                          onChange={(e) => setEditingEvent({ ...editingEvent!, description: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">Date</Label>
                        <Input
                          type="date"
                          id="date"
                          value={editingEvent?.date || ""}
                          onChange={(e) => setEditingEvent({ ...editingEvent!, date: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">Time</Label>
                        <Input
                          type="time"
                          id="time"
                          value={editingEvent?.time || ""}
                          onChange={(e) => setEditingEvent({ ...editingEvent!, time: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">Location</Label>
                        <Input
                          id="location"
                          value={editingEvent?.location || ""}
                          onChange={(e) => setEditingEvent({ ...editingEvent!, location: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Input
                          id="category"
                          value={editingEvent?.category || ""}
                          onChange={(e) => setEditingEvent({ ...editingEvent!, category: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                        <Button type="button" onClick={handleUpdate}>Save changes</Button>
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




