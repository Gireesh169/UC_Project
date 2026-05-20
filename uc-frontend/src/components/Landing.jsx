import { memo, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-10 bg-blue-600 text-amber-50">
        <h1>
            welcome to the service
        </h1>
        <ul>
            <li>
                <a href="/login">login</a>
            </li>
            <li>
                <a href="/signup">signup</a>
            </li>
        </ul>
      </div>
    </>
  );
}
