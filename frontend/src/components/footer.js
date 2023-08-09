import React from "react";
import { styled } from "@mui/material/styles";

const FooterContainer = styled("footer")({
  backgroundColor: "#040303",
  color: "white",
  padding: "40px 0",
  textAlign: "center",
});

const ContactInfo = styled("div")({
  marginBottom: "20px",
});

const SocialMediaLinks = styled("div")({
  marginBottom: "20px",
});

const AdditionalLinks = styled("div")({
  marginBottom: "20px",
});

const FooterLink = styled("a")({
  color: "white",
  textDecoration: "none",
  margin: "0 10px",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <ContactInfo>
        <h3>Contact Us</h3>
        <p>Email: rjsaichandran@gmail.com</p>
        <p>Phone: 6303994057</p>
      </ContactInfo>

      <SocialMediaLinks>
        <h3>Follow Us</h3>
        <FooterLink href="#">Facebook</FooterLink>
        <FooterLink href="#">Twitter</FooterLink>
        <FooterLink href="#">Instagram</FooterLink>
      </SocialMediaLinks>

      <AdditionalLinks>
        <h3>Quick Links</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <FooterLink href="#">Home</FooterLink>
          </li>
          <li>
            <FooterLink href="#">About Us</FooterLink>
          </li>
          <li>
            <FooterLink href="#">Services</FooterLink>
          </li>
          <li>
            <FooterLink href="#">Contact</FooterLink>
          </li>
        </ul>
      </AdditionalLinks>

      <p style={{ margin: 0 }}>
        &copy; 2023 NewsWave. All rights reserved.
      </p>
    </FooterContainer>
  );
};

export default Footer;
