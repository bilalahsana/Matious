import React ,{ useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
 import Rating from '@material-ui/lab/Rating';

//styles
const useStyles = makeStyles((theme) => ({
    table: {
      
    },
    tableContainer: {
        borderRadius: 5,
        margin: '10px 10px',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: "#282c34",
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    name: {
        fontWeight: 'bold',
        color: "#282c34",
        fontSize:12
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

  //sort functions
  function descendingComparator(a, b, orderBy) {
    if(orderBy=="rate"){
        if (b.rating[orderBy] < a.rating[orderBy]) {
            return -1;
          }
          if (b.rating[orderBy] > a.rating[orderBy]) {
            return 1;
          }
    }
    else{
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  //filter fonctions
  function ftableFilter(array, category) {
      let rslt= [];
      array.forEach(el =>{
        if(category.includes(el.category))
              rslt.push(el);
      })
    return rslt;
  }

function CustomTable(props) {
  //style
  const classes = useStyles();
  //states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    setPage(0);
  }, [props.categories])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //handlers
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>ID</TableCell>
            <TableCell className={classes.tableHeaderCell}>title</TableCell>
            <TableCell className={classes.tableHeaderCell}>description</TableCell>
            <TableCell className={classes.tableHeaderCell}>image</TableCell>
            <TableCell className={classes.tableHeaderCell}>price</TableCell>
            <TableCell className={classes.tableHeaderCell}>category</TableCell>
            <TableCell className={classes.tableHeaderCell}>rate</TableCell>
            <TableCell className={classes.tableHeaderCell}>count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(ftableFilter(props.data,props.categories), getComparator(props.order,props.orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
              <TableCell>
                          <Typography className={classes.name}><strong>{row.title}</strong></Typography>
                </TableCell>
              <TableCell>
                  <Typography variant='body2'>{row.description}</Typography>
                </TableCell>
              <TableCell><img src={row.image} alt={row.title} width={50} /></TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.category === 'jewelery' && '#ffc400') ||
                        (row.category === 'electronics' && '#1de9b6') ||
                        (row.category === `men's clothing` && '#2979ff')||
                        (row.category === `women's clothing` && '#ff4569'))
                    }}
                  >{row.category}</Typography>
                </TableCell>
                <TableCell> <Rating name="size-small" defaultValue={row.rating.rate} size="small" /></TableCell>
                <TableCell>{row.rating.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5]}
            component="span"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;