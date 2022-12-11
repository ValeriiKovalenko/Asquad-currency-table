import { LoadingButton } from "@mui/lab";

type Props = {
  refetch: () => void;
  setTimestamp: (time: number) => void;
  restart: (newTimestamp: Date, autostart: boolean) => void;
  isFetching: boolean;
};

export const RefetchButton = ({
  refetch,
  setTimestamp,
  restart,
  isFetching,
}: Props) => {
  const onRefetchData = () => {
    const hourFromNow = Date.now() + 3.6e6;
    refetch();
    setTimestamp(hourFromNow);
    restart(new Date(hourFromNow), true);
  };

  return (
    <LoadingButton
      onClick={onRefetchData}
      loading={isFetching}
      variant="contained"
      sx={{ position: "fixed", right: 50, bottom: 50 }}
    >
      Refetch data
    </LoadingButton>
  );
};
