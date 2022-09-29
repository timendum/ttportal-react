import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faFileExport,
  faRightFromBracket,
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons";
import { ttRss } from "../ttrss.js";

function Button({ onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className="inline-block rounded px-5 py-2.5 text-xs font-medium uppercase leading-tight transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
    >
      <FontAwesomeIcon icon={icon} /> {text}
    </button>
  );
}

export default function Topbar({ handleLogin, setAddWiget, toggleDark }) {
  return (
    <div className="flex bg-slate-700 px-4 py-1 text-white shadow-sm dark:text-gray-200">
      <h1 className="grow text-xl">Tiny Tiny RSS</h1>
      <button
        onClick={toggleDark}
        className="inline-block rounded px-5 py-2.5 text-xs uppercase leading-tight transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg dark:hidden"
      >
        <FontAwesomeIcon icon={faMoon} />
      </button>
      <button
        onClick={toggleDark}
        className="hidden rounded px-5 py-2.5 text-xs uppercase leading-tight transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg dark:inline-block"
      >
        <FontAwesomeIcon icon={faSun} />
      </button>
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
