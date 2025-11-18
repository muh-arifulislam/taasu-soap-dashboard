import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

type PropsType = {
  refetch?: () => void;
  isFetching?: boolean;
};

const RefreshButton = ({
  refetch = () => {},
  isFetching = false,
}: PropsType) => {
  return (
    <>
      <Button onClick={() => refetch()} variant="outline" disabled={isFetching}>
        <RefreshCw className={`${isFetching ? "animate-spin" : ""}`} />
        Refetch
      </Button>
    </>
  );
};

export default RefreshButton;
