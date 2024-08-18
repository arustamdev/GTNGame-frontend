import { Circle, ScaleFade, Box } from '@chakra-ui/react';

interface MatchesCountProps {
  isSubmitting: boolean;
  matches: number | null;
}

function MatchesCount({ isSubmitting, matches }: MatchesCountProps) {
  return (
    <Circle size="6rem" bg="slategrey" color="white">
      <ScaleFade initialScale={0.1} in={!isSubmitting}>
        <Box as="span" fontWeight="bold" fontSize="xx-large">
          {matches !== null ? matches.toString() : '?'}
        </Box>
      </ScaleFade>
    </Circle>
  );
}

export default MatchesCount;
