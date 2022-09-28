import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faFileExport, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { ttRss } from "../ttrss.js";

function Button({ onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className="inline-block px-5 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      <FontAwesomeIcon icon={icon} /> {text}
    </button>
  );
}

export default function Topbar({ handleLogin, setAddWiget }) {
  return (
    <div className="flex bg-slate-700 text-white px-4 py-1 shadow-sm">
      <h1 className="grow text-xl">Tiny Tiny RSS</h1>
      <Button onClick={() => setAddWiget(true)} icon={faSquarePlus} text="Add Widget" />
      <Button icon={faFileExport} text="Export" />
      <Button
        onClick={() => {
          ttRss.logout().then((resp) => {
            if (resp) {
              handleLogin(false);
            }
          });
        }}
        icon={faRightFromBracket}
        text="Logout"
      />
    </div>
  );
}
