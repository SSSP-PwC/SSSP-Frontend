import React from "react";

import { BsFillCameraFill } from "react-icons/bs";
import { IoIosOptions, IoMdWallet } from "react-icons/io";
import { AiFillSecurityScan } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";

const iconStyle = (Icon) => <Icon size="8rem" color="#0b0c0c" />;

export const aboutData = [
  {
    name: "Wallet Management",
    description:
      "A digital wallet to store and manage your credentials, allowing you to make transactions without the need to enter your information each time.",
    icon: iconStyle(IoMdWallet),
    imgClass: "one",
  },
  {
    name: "Secure Communication",
    description:
      "The reassurance that your information will be kept confidential at all times.",
    icon: iconStyle(AiFillSecurityScan),
    imgClass: "two",
  },
  {
    name: "Empowered Online Presence",
    description:
      "Build and Deploy Your Own Services with Our User-Friendly Page Builder.",
    icon: iconStyle(CgWebsite),
    imgClass: "three",
  },
  
];
