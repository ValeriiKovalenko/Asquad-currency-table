import { useDataGrid } from "../../hooks/useDataGrid";
import {
  Box,
  LinearProgress,
  Tooltip,
  Typography,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { epochToLocalDate } from "../../helpers/convertDate";
import { convertCurrencyCode } from "../../helpers/convertCurrencyCode";
import { LoadingButton } from "@mui/lab";

export const DataGrid = () => {
  const { rows, isFetching, setTimestamp, restart, refetch } = useDataGrid();

  if (!rows) {
    return <LinearProgress />;
  }
  if ("errorDescription" in rows) {
    console.log(rows.errorDescription);

    return <Typography>{rows.errorDescription}</Typography>;
  }

  return (
    <Box sx={{ position: "relative" }}>
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
      {isFetching && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>currencyCodeA</TableCell>
              <TableCell align="right">currencyCodeB</TableCell>
              <TableCell align="right">date</TableCell>
              <TableCell align="right">rateBuy</TableCell>
              <TableCell align="right">rateSell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Tooltip
                  title={convertCurrencyCode(row.currencyCodeA)?.currency}
                >
                  <TableCell component="th" scope="row">
                    {convertCurrencyCode(row.currencyCodeA)?.code ||
                      row.currencyCodeA}
                  </TableCell>
                </Tooltip>
                <Tooltip
                  title={convertCurrencyCode(row.currencyCodeB)?.currency}
                >
                  <TableCell align="right">
                    {convertCurrencyCode(row.currencyCodeB)?.code}
                  </TableCell>
                </Tooltip>
                <TableCell align="right">
                  {epochToLocalDate(row.date)}
                </TableCell>
                <TableCell align="right">{row.rateBuy ?? "-"}</TableCell>
                <TableCell align="right">{row.rateSell ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
