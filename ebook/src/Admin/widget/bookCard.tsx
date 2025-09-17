import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import PDFViewer from "./PdfViewer";
import badge from "../../assets/badge.png";
export function BookCard({
  book,
}: {
  book: {
    id: string;
    title: string;
    author: string;
    frontCover: string;
    price: number | string;
  };
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [options, setOptions] = useState<"read" | "view">("read");
  useEffect(() => {
    if (
      modalOpen &&
      options === "read" &&
      window.matchMedia("(orientation: portrait)").matches
    ) {
      messageApi.open({
        type: "info",
        content: "change to landscape",
      });
      setModalOpen(false);
    }
    return () => {};
  }, [modalOpen]);

  return (
    <>
      {contextHolder}
      {
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          centered
          width={options === "read" ? "100%" : "60%"}
          // height="150rem"
          // bodyStyle={{ padding: 0, height: "100vh" }}
          // style={{ top: 0, maxWidth: "100vw" , maxHeight:"100vh"}}
        >
          {options === "read" ? <PDFViewer /> : <BookDetails book={book} />}
        </Modal>
      }
      <div
        onClick={() => {
          setModalOpen(true);
          setOptions("view");
        }}
        className="group relative rounded-lg cursor-pointer w-[18rem] border border-neutral-200 bg-white p-2 shadow-sm transition hover:shadow-md"
      >
        <div className="relative aspect-[3/4] h-[18rem] w-full overflow-hidden rounded-lg bg-neutral-100">
          <img
            src={book.frontCover}
            alt={book.title}
            className="h-full w-full object-cover"
          />
          <button
            className="absolute right-2 top-2 rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs shadow-sm"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            ⋮
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute right-2 top-9 z-10 w-28 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 text-sm shadow-lg"
            >
              <button className="block w-full px-3 py-1.5 text-left hover:bg-neutral-50">
                Edit
              </button>
              <button className="block w-full px-3 py-1.5 text-left text-red-600 hover:bg-red-50">
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 text-center">
          <p className="truncate text-sm font-medium">{book.title}</p>
          <p className="truncate text-xs text-neutral-500 py-2">
            {book.author}
          </p>
          <div className="flex justify-center items-center gap-1">
            <p className="truncate text-md font-semibold">{book.price}</p>
            <img src={badge} alt={"badge"} className="h-10 w-10 object-cover" />
          </div>
        </div>
        <button
          onClick={() => {
            setModalOpen(true);
            setOptions("read");
          }}
          className="mt-3 w-full rounded-xl bg-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-300"
        >
          Read
        </button>
      </div>
    </>
  );
}

function BookDetails({ book }: { book: any }) {
  return (
    <main>
      <aside className="flex space-x-[12%] ">
        <div className="flex gap-2">
          <img
            src={book?.frontCover}
            alt="Front Cover"
            className="h-75 w-60 object-cover"
          />
          <img
            src={book?.backCover}
            alt="Back Cover"
            className="h-75 w-60 object-cover"
          />
        </div>
        <ul className="decoration-none list-none font-semibold text-lg pt-10">
          <li>Author: {book?.author}</li>
          <li>Category: {book?.category}</li>
          <li>Language: {book?.language}</li>
          <li>Price: {book?.price}</li>
          <li>Format: {book?.format}</li>
          <li>Publisher: {book?.publisher}</li>
          <li>Pages: {book?.pages}</li>
          <li>Release Date: {book?.releaseDate}</li>
        </ul>
      </aside>
      <aside>
        <h2 className="text-2xl font-bold mt-4 mb-2">{book?.title}</h2>
        <p className="text-[12px] ">{book?.description}</p>
        <p className="mt-8 font-semibold">
          Nb : This eBook is read-only within the platform and cannot be
          downloaded. Your purchase grants lifetime access from any device via
          your account.
        </p>
      </aside>
    </main>
  );
}
