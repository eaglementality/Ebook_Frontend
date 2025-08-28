import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// ✅ Correct: use import.meta.url so Vite bundles the worker from node_modules

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [width, setWidth] = useState<number>(600);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setWidth(window.innerWidth - 40); // mobile
      } else if (window.innerWidth < 1024) {
        setWidth(700); // tablet
      } else {
        setWidth(900); // desktop
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <>
      <div className="w-full h-full flex flex-col items-center bg-gray-50 p-2 sm:p-4 overflow-auto">
        <Document
          file="/sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
        >
          <Page pageNumber={pageNumber} width={width} height={1000}/>
        </Document>

        <p className="text-center mt-2 text-sm sm:text-base">
          Page {pageNumber} of {numPages}
        </p>

        <div className="flex justify-center gap-3 mt-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm sm:text-base disabled:opacity-50"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm sm:text-base disabled:opacity-50"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {/* // </div> */}
    </>
  );
}

export default PDFViewer;
