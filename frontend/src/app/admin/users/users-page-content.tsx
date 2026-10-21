"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";

type UserRole = "Traveler" | "Editor";
type UserStatus = "Active" | "Blocked";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  country: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  initials: string;
  avatarColor: string;
}

const initialUsers: AdminUser[] = [
  {
    id: 1,
    name: "Maya Lindqvist",
    email: "maya.lindqvist@example.com",
    country: "Sweden",
    role: "Traveler",
    status: "Active",
    joined: "Oct 2023",
    initials: "ML",
    avatarColor: "bg-rose-100 text-rose-700",
  },
  {
    id: 2,
    name: "Daniel Reyes",
    email: "daniel.reyes@example.com",
    country: "USA",
    role: "Traveler",
    status: "Active",
    joined: "Jan 2024",
    initials: "DR",
    avatarColor: "bg-sky-100 text-sky-700",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    email: "yuki.tanaka@example.com",
    country: "Japan",
    role: "Editor",
    status: "Active",
    joined: "Mar 2023",
    initials: "YT",
    avatarColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 4,
    name: "Amara Osei",
    email: "amara.osei@example.com",
    country: "Nigeria",
    role: "Traveler",
    status: "Blocked",
    joined: "Jun 2024",
    initials: "AO",
    avatarColor: "bg-violet-100 text-violet-700",
  },
  {
    id: 5,
    name: "Jonas Weber",
    email: "jonas.weber@example.com",
    country: "Germany",
    role: "Traveler",
    status: "Active",
    joined: "Feb 2025",
    initials: "JW",
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 6,
    name: "Priya Nair",
    email: "priya.nair@example.com",
    country: "India",
    role: "Traveler",
    status: "Active",
    joined: "Aug 2025",
    initials: "PN",
    avatarColor: "bg-orange-100 text-orange-700",
  },
];

export default function UsersPageContent() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editing, setEditing] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) =>
      `${user.name} ${user.email} ${user.country} ${user.role} ${user.status}`
        .toLowerCase()
        .includes(query),
    );
  }, [search, users]);

  function openUser(user: AdminUser, isEditing: boolean) {
    setSelectedUser(user);
    setEditing(isEditing);
  }

  function saveUser() {
    if (!selectedUser) return;
    setUsers((current) =>
      current.map((user) =>
        user.id === selectedUser.id ? selectedUser : user,
      ),
    );
    setSelectedUser(null);
    setEditing(false);
  }

  function removeUser(user: AdminUser) {
    if (!window.confirm(`Remove ${user.name} from this user list?`)) return;
    setUsers((current) => current.filter((item) => item.id !== user.id));
  }

  return (
    <div className="min-h-screen">
      <header className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-[#eae7e3] bg-white px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-heading text-lg font-bold leading-tight">Users</h1>
          <p className="mt-0.5 text-[10px] text-stone-500">
            48,210 registered · 312 new this week
          </p>
        </div>
        <label className="relative w-full sm:w-56">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
          />
          <span className="sr-only">Search name or email</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email..."
            className="h-9 w-full rounded-md border border-stone-200 bg-stone-50 pl-8 pr-3 text-[10px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </label>
      </header>

      <div className="p-3 sm:p-5">
        <div className="overflow-hidden rounded-lg border border-[#eae7e3] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-100 bg-white text-[9px] text-stone-500">
                  <th scope="col" className="px-4 py-3 font-medium">
                    User
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Country
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Role
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Joined
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-stone-100 last:border-0 hover:bg-stone-50/70"
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[9px] font-bold ${user.avatarColor}`}
                        >
                          {user.initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold text-stone-800">
                            {user.name}
                          </span>
                          <span className="block truncate text-[9px] text-stone-500">
                            {user.email}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-[10px] text-stone-600">
                      {user.country}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded-sm px-1.5 py-1 text-[9px] font-semibold ${
                          user.role === "Editor"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-teal-50 text-primary"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded-sm px-1.5 py-1 text-[9px] font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[10px] text-stone-600">
                      {user.joined}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          aria-label={`View ${user.name}`}
                          title="View user"
                          onClick={() => openUser(user, false)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition hover:border-primary hover:text-primary"
                        >
                          <Eye size={12} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Edit ${user.name}`}
                          title="Edit user"
                          onClick={() => openUser(user, true)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition hover:border-primary hover:text-primary"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Remove ${user.name}`}
                          title="Remove user"
                          onClick={() => removeUser(user)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-xs text-stone-500"
                    >
                      No users match “{search}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-stone-100 px-4 py-2.5 text-[9px] text-stone-500">
            <span>
              Showing {filteredUsers.length} of 48,210 users
            </span>
            <span className="hidden sm:inline">Page 1 of 8,035</span>
          </div>
        </div>
      </div>

      {selectedUser && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedUser(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-dialog-title"
            className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${selectedUser.avatarColor}`}
                >
                  {selectedUser.initials}
                </span>
                <div>
                  <h2
                    id="user-dialog-title"
                    className="font-heading text-base font-bold"
                  >
                    {editing ? "Edit user" : selectedUser.name}
                  </h2>
                  <p className="text-[10px] text-stone-500">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setSelectedUser(null)}
                className="rounded-md p-1 text-stone-500 hover:bg-stone-100"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="text-[10px] font-medium text-stone-600">
                Country
                <input
                  value={selectedUser.country}
                  readOnly={!editing}
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      country: event.target.value,
                    })
                  }
                  className="mt-1 h-9 w-full rounded-md border border-stone-200 px-2.5 text-xs text-stone-800 outline-none focus:border-primary"
                />
              </label>
              <label className="text-[10px] font-medium text-stone-600">
                Joined
                <input
                  value={selectedUser.joined}
                  readOnly
                  className="mt-1 h-9 w-full rounded-md border border-stone-200 bg-stone-50 px-2.5 text-xs text-stone-600"
                />
              </label>
              <label className="text-[10px] font-medium text-stone-600">
                Role
                <select
                  value={selectedUser.role}
                  disabled={!editing}
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      role:
                        event.target.value === "Editor" ? "Editor" : "Traveler",
                    })
                  }
                  className="mt-1 h-9 w-full rounded-md border border-stone-200 bg-white px-2.5 text-xs text-stone-800 outline-none focus:border-primary disabled:bg-stone-50"
                >
                  <option value="Traveler">Traveler</option>
                  <option value="Editor">Editor</option>
                </select>
              </label>
              <label className="text-[10px] font-medium text-stone-600">
                Status
                <select
                  value={selectedUser.status}
                  disabled={!editing}
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      status:
                        event.target.value === "Blocked" ? "Blocked" : "Active",
                    })
                  }
                  className="mt-1 h-9 w-full rounded-md border border-stone-200 bg-white px-2.5 text-xs text-stone-800 outline-none focus:border-primary disabled:bg-stone-50"
                >
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-md border border-stone-200 px-3 py-2 text-[10px] font-semibold text-stone-700 hover:bg-stone-50"
              >
                {editing ? "Cancel" : "Close"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={saveUser}
                  className="rounded-md bg-primary px-3 py-2 text-[10px] font-semibold text-white hover:bg-primary-dark"
                >
                  Save changes
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
