import React, { useMemo, useState } from "react";
import { ProfileCard } from "./widget/profileCard";
import { BookCard } from "./widget/bookCard";
import UserDetailDrawer from "./widget/UserDetailDrawer";
import { useUserLoginStore } from "../hooks/store";
import Front_Cover from "../assets/Front_Cover.png";
import Back_Cover from "../assets/Back_Cover.png";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const numberOfUsers = useUserLoginStore((state) => state.numberOfUsers);
  

  const books = useMemo(
    () => [
      {
        id: "1",
        title: "Top 30 Interview Questions For Nurses and Midwifery students",
        author: "Erica Yeboah",
        category: "Education",
        language: "English",
        price: 50.00,
        publisher: "Erica Yeboah",
        pages: 100,
        releaseDate: "2023-01-01",
        description: "Description for Book Title 1",
        frontCover: Front_Cover,
        backCover: Back_Cover,
        fileUrl: "https://example.com/book1.pdf",
      },
    ],
    []
  );

  function CloseDrawer () {
    setSideDrawerOpen(false);
  }
  function OpenOrCloseDrawer(){
    setSideDrawerOpen((s) => !s);
}
  return (
    <>
      {<UserDetailDrawer
        onClose={CloseDrawer}
        open={sideDrawerOpen}
      />
      }
      <div className="min-h-screen bg-neutral-50 text-neutral-800">
        {/* Top bar (mobile) */}
        <div className="sticky top-0 z-40 flex items-center gap-3 bg-neutral-100 px-4 py-3 shadow-sm sm:hidden">
          <button
            className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm active:scale-[0.98]"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-expanded={sidebarOpen}
            aria-controls="admin-sidebar"
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-neutral-500">
              admin
            </span>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-3 py-4 sm:px-4 md:grid-cols-[360px,1fr] lg:grid-cols-[380px,1fr]">
          {/* Sidebar */}

          <aside
            id="admin-sidebar"
            className={` ${
              sidebarOpen ? "block" : "hidden sm:block"
            } rounded-2xl border border-neutral-200 bg-neutral-100 p-4 md:sticky md:top-4 md:h-[calc(100vh-2rem)] md:overflow-y-auto`}
          >
            <ProfileCard />

            <SectionTitle title="Book Title :" />
            <Input placeholder="Enter title" />

            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Category :" placeholder="e.g. Lifestyle" />
              <LabeledInput label="Language :" placeholder="e.g. English" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Price :" type="number" placeholder="0.00" />
              <LabeledInput label="Author :" placeholder="Author name" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Publisher :" placeholder="Publisher" />
              <LabeledInput label="Pages :" type="number" placeholder="100" />
            </div>

            <LabeledInput label="Release Date :" type="date" />

            <LabeledTextarea
              label="Description :"
              placeholder="Short description..."
              rows={4}
            />

            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Front Cover Image :" placeholder="URL" />
              <LabeledInput label="Back Cover Image :" placeholder="URL" />
            </div>

            <LabeledInput label="File URL :" placeholder="https://..." />

            <div className="mt-2 flex justify-end">
              <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]">
                Publish book
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-neutral-200" />

            {/* Video form */}
            <SectionTitle title="Video Title :" />
            <Input placeholder="Enter title" />

            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Video Url :" placeholder="https://..." />
              <LabeledInput label="Thumbnail Url :" placeholder="https://..." />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Creator :" placeholder="Creator name" />
              <LabeledInput label="Price :" type="number" placeholder="0.00" />
            </div>

            <LabeledTextarea
              label="Description :"
              placeholder="Brief details..."
              rows={3}
            />

            <div className="mt-2 flex justify-end">
              <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]">
                Publish video
              </button>
            </div>
          </aside>

          <main
            className={`${sidebarOpen ? "hidden" : "block"} space-y-4 md:py-2`}
          >
            {/* Header Row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-6">
                <Stat label="Books" value={50} />
                <Stat label="Users" value={numberOfUsers ?? 0} />
              </div>

              <div className="flex flex-1 items-center gap-3 sm:ml-auto">
                <div className="relative w-full max-w-lg">
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-neutral-300 bg-white px-10 py-2 text-sm shadow-sm outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-black/5"
                    placeholder="search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none text-neutral-400">
                    🔍
                  </span>
                </div>
                <button onClick={OpenOrCloseDrawer} className="whitespace-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm shadow-sm transition hover:bg-neutral-50">
                  View Users
                </button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
              {/* Empty state */}
              {books.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-500">
                  No results. Try another search.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <label className="mb-1 block text-sm text-neutral-600">{title}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-black/5 " +
        (props.className || "")
      }
    />
  );
}

function LabeledInput({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-sm text-neutral-600">{label}</label>
      <Input {...rest} />
    </div>
  );
}

function LabeledTextarea({
  label,
  rows = 3,
  ...rest
}: {
  label: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-sm text-neutral-600">{label}</label>
      <textarea
        rows={rows}
        {...rest}
        className={
          "w-full resize-y rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-black/5 " +
          (rest.className || "")
        }
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm shadow-sm">
      <span className="font-medium">{label}</span>
      <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-700">
        {value}
      </span>
    </div>
  );
}
