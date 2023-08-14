import { Box, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Step,
  //   StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
export default function Navbar() {
  const navigate = useNavigate();

  const steps = [
    { title: "Map View", link: "/" },
    { title: "List View", link: "/list" },
    { title: "Flights", link: "/flights" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const handleClick = ({ index, step }) => {
    navigate(step.link);
    setActiveStep(index + 1);
  };
  const getStepIcon = (link) => {
    if (link === "/") {
      return <FaMapMarkerAlt />;
    } else if (link === "/list") {
      return <GoChecklist />;
    } else if (link === "/flights") {
      return <BiSolidPlaneTakeOff />;
    } else {
      return <StepIcon />;
    }
  };
  return (
    <HStack justifyContent={"center"} my={3}>
      <Box minW={"600px"}>
        <Stepper size="lg" colorScheme="blue" index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => handleClick({ index, step })}>
              <StepIndicator>
                <StepStatus
                  complete={getStepIcon(step.link)}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                {/* <StepDescription>{step.description}</StepDescription> */}
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    </HStack>
  );
}
