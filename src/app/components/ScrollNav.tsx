"use client";

import styled from "@emotion/styled";

const Scroll = styled.div`
  width: 5px;
  height: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px #fff;
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
  @media (max-width: 767px) {
    background-color: #fff;
    box-shadow: 0px 0px 10px #fff;
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
  outline: 2px solid #fff;
  box-shadow: 0px 0px 10px #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  @media (max-width: 767px) {
    display: none;
  }
  &::after {
    content: "scroll";
    position: absolute;
    top: 120%;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: opacity 0.3s ease;
  }

  @media (any-hover: hover) {
    &:hover {
      outline-color: var(--main-site-color);
      box-shadow: 0px 0px 15px var(--main-site-color);
      div {
        background-color: var(--main-site-color);
        box-shadow: 0px 0px 15px var(--main-site-color);
      }
    }
  }
`;

export default function ScrollNav() {
  const handleClick = () => {
    const workSection = document.getElementById("works");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button onClick={handleClick}>
      <Scroll />
    </Button>
  );
}
