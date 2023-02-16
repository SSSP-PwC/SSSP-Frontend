import React from "react";
import {
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  FooterLogo,
  SocialIcon,
  FooterSocialIcon,
  FooterWrapper,
  FooterAddress,
  FooterColumn,
  FooterGrid,
} from "./FooterStyles";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

import { footerData, footerSocialData } from "../../Data/FooterData";
import { Row } from "../../globalStyles";
import { FooterContainer } from "./FooterStyles";

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterGrid justify="space-between">
          <FooterColumn>
         

            <Row align="center" margin="auto  0 0 0" gap="3rem">
              <a href= "https://www.facebook.com" style={{textDecoration: "none"}} >
           
                <FaFacebook style={{color: "white"}} />
              </a>
              <a href="https://twitter.com">
           
                <FaTwitter style={{color: "white"}}/>
              </a>
              <a href="https://www.instagram.com">
           
           <FaInstagram style={{color: "white"}}/>
         </a>
         <a href="https://www.youtube.com">
           
           <FaYoutube style={{color: "white"}}/>
         </a>
            </Row>
          </FooterColumn>
          {footerData.map((footerItem, index) => (
            <FooterLinkItems key={index}>
              <FooterLinkTitle>{footerItem.title}</FooterLinkTitle>
              {footerItem.links.map((link, linkIndex) => (
                <FooterLink key={linkIndex} to="/">
                  {link}
                </FooterLink>
              ))}
            </FooterLinkItems>
          ))}
        </FooterGrid>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
