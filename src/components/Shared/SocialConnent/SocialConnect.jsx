import React from "react";
import { AiFillGithub, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";

const SocialConnect = () => {
  return (
    <div className=" d-flex align-items-center justify-content-center gap-2 mt-3">
      <a href="https://github.com/mamaruf04?tab=repositories">
        <ImFacebook className="fs-3" />
      </a>
      <a href="https://github.com/mamaruf04?tab=repositories">
        <AiOutlineTwitter className="fs-3" />
      </a>
      <a href="https://github.com/mamaruf04?tab=repositories">
        <AiFillGithub className="fs-3" />
      </a>
      <a href="https://github.com/mamaruf04?tab=repositories">
        <FaLinkedinIn className="fs-3" />
      </a>
      <a href="https://github.com/mamaruf04?tab=repositories">
        <AiFillYoutube className="fs-3" />
      </a>
    </div>
  );
};

export default SocialConnect;
