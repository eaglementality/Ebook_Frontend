import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import PDFViewer from "./PdfViewer";

export function BookCard({
  book,
}: {
  book: { id: string; title: string; author: string; cover: string };
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (modalOpen && window.matchMedia("(orientation: portrait)").matches) {
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
          width="100%"
          // height="150rem"
          // bodyStyle={{ padding: 0, height: "100vh" }}
          // style={{ top: 0, maxWidth: "100vw" , maxHeight:"100vh"}}
        >
          <PDFViewer />
        </Modal>
      }
      <div className="group relative rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition hover:shadow-md">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={book.cover}
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

        <div className="mt-3">
          <p className="truncate text-sm font-medium">{book.title}</p>
          <p className="truncate text-xs text-neutral-500">{book.author}</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-3 w-full rounded-xl bg-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-300"
        >
          View
        </button>
      </div>
    </>
  );
}
