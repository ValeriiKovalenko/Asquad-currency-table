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
  return (
    <LoadingButton
      onClick={() => {
        refetch();
        setTimestamp(Date.now() + 3.6e6);
        restart(new Date(Date.now() + 3.6e6), true);
      }}
      loading={isFetching}
      variant="contained"
      sx={{ position: "fixed", right: 50, bottom: 50 }}
    >
      Refetch data
    </LoadingButton>
  );
};
