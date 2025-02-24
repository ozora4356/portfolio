"use client";

import styled from "@emotion/styled";

const Scroll = styled.div`
  width: 5px;
  height: 10px;
  border-radius: 10px;
  background-color: rgb(150, 150, 150);
  box-shadow: 0px 0px 10px rgb(150, 150, 150);
  animation: scroll_animation 2s linear infinite;
  transform: translateY(40%);
  @keyframes scroll_animation {
    0% {
      transform: translateY(40%);
    }
    50% {
      transform: translateY(90%);
    }
  }
  @media (max-width: 768px) {
    background-color: rgb(256, 256, 256);
    box-shadow: 0px 0px 10px rgb(256, 256, 256);
    width: 5px;
    height: 10px;
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 96px;
  right: 64px;
  width: 48px;
  height: 80px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: 2px solid rgb(150, 150, 150);
  box-shadow: 0px 0px 10px rgb(150, 150, 150);
  cursor: pointer;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    outline: 2px solid rgb(256, 256, 256);
    box-shadow: 0px 0px 10px rgb(256, 256, 256);
    bottom: 44px;
    right: 40px;
    width: 32px;
    height: 56px;
  }
  &::after {
    content: "scroll";
    position: absolute;
    top: 120%;
    color: whitesmoke;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: opacity 0.3s ease;
  }

  @media (any-hover: hover) {
    &:hover {
      outline-color: white;
      box-shadow: 0px 0px 15px white;
      div {
        background-color: white;
        box-shadow: 0px 0px 15px white;
      }
    }
  }
`;

export default function ScrollNav() {
  const handleClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button onClick={handleClick}>
      <Scroll />
    </Button>
  );
}
