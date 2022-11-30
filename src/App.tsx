import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling, { FileExtension } from "qr-code-styling";
import icon from "./assets/logo.svg";
import { ReactComponent as Logo } from "./assets/mp.svg";

const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  image: icon,
  margin: 5,
  type: "svg",
  dotsOptions: {
    color: "#7D00FF",
    type: "dots",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 15,
    hideBackgroundDots: true,
  },
  cornersSquareOptions: {
    type: "dot",
    color: "#7D00FF",
  },
  cornersDotOptions: {
    type: "dot",
  },
});

function App() {
  const [url, setUrl] = useState("https://buy.moonpay.com");
  const [fileExt, setFileExt] = useState<FileExtension>("png");

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  const onUrlChange = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <div className="flex justify-center items-center h-full flex-col gap-y-5">
      <Logo />
      {/* <div className="bg-gray-900 p-10 w-4/5 rounded-3xl">
        <div ref={ref} className="justify-center flex" />
        <input
          value={url}
          onChange={onUrlChange}
          className="border p-2 w-full mt-4 bg-gray-800 text-white rounded-xl"
          type="text"
        />
        <button
          onClick={onDownloadClick}
          className="p-4 h-15 w-full rounded-full relative block text-base text-center text-white font-medium flex justify-center items-center mt-4 xs:mt-8 bg-purple-700"
        >
          Download
        </button>
      </div> */}
    </div>
  );
}

export default App;
