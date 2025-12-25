/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Footer = () => (
  <footer className="bg-gray-200 p-4 text-center">
    <p>&copy; ${new Date().getFullYear()} ACK. All rights reserved.</p>
  </footer>
);
