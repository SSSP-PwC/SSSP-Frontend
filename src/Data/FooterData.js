import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const iconStyle = (Icon) => <Icon />;

export const footerSocialData = [
  {
    name: "Facebook",
    icon: iconStyle(FaFacebook),
  },
  {
    name: "Instagram",
    icon: iconStyle(FaInstagram),
  },
  {
    name: "YouTube",
    icon: iconStyle(FaYoutube),
  },
  {
    name: "Twitter",
    icon: iconStyle(FaTwitter),
  },
];

export const footerData = [
  {
    title: "Main",
    links: ["FAQs", "About us"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service"],
  },
];
