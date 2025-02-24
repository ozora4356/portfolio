"use client";

import styled from "@emotion/styled";
import Link from "next/link";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 24px 32px;
  z-index: 20;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

const NavList = styled.ul`
  display: flex;
  gap: 32px;
  list-style: none;
`;

const NavLink = styled(Link)`
  color: #d1d5db;
  font-size: 16px;
  transition: color 0.3s ease;

  @media (any-hover: hover) {
    &:hover {
      color: white;
    }
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <Container>
        <Logo>Portfolio</Logo>
        <NavList>
          <li>
            <NavLink href="#about">About</NavLink>
          </li>
          <li>
            <NavLink href="#works">Works</NavLink>
          </li>
          <li>
            <NavLink href="#contact">Contact</NavLink>
          </li>
        </NavList>
      </Container>
    </Nav>
  );
}
