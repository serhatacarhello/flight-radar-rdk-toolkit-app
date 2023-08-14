import { Button, ButtonGroup } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Auth({ colorMode, toggleColorMode }) {
  const handleClick = () => {
    toggleColorMode();
    const styleEl = document.createElement("style");
    const cssText = document.createTextNode(
      "html * { transition: color, background-color 0.3s ease-out!important }"
    );
    styleEl.appendChild(cssText);
    document.head.appendChild(styleEl);
    setTimeout(() => {
      document.head.removeChild(styleEl);
    }, 300);
  };

  return (
    <ButtonGroup me={2}>
      <Button
        variant={colorMode === "light" ? "outline" : "solid"}
        colorScheme={colorMode === "light" ? "purple" : "green"}
        onClick={handleClick}
      >
        {colorMode !== "light" ? <FaSun /> : <FaMoon />}
      </Button>
      <Button variant={"solid"} colorScheme="pink">
        Sign In
      </Button>
      <Button variant={"outline"} colorScheme="pink">
        Sign Up
      </Button>
    </ButtonGroup>
  );
}
