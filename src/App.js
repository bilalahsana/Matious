import React ,{ useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import StarIcon from '@material-ui/icons/Star';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import Test from './components/Test';
import Filter from './components/Filter';

import './App.css';
import logo from './logo.svg';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  price:{
    color:"#ffc107",
    '&:hover': {
      color:"white",
      backgroundColor:"#ffc107"
    }
  },
  rate:{
    color: "#4caf50",
    '&:hover': {
      color:"white",
      backgroundColor:"#4caf50",
  },       
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, category, theme) {
    return {
        fontWeight:
        category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    };
}

function App() {

  const classes = useStyles();
  const theme = useTheme();
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState([]);
  const [category, setcategory] = React.useState([]);
  const [categories, setcategories] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response =>{
        if(response.ok){
          return response.json();
        }
        throw response;
      })
      .then(resp =>{setData(resp);
        setcategories([...new Set(resp.map(el=>el.category))])
        setcategory([...new Set(resp.map(el=>el.category))])})
      .catch(error => console.error("error fetching data:",error))
      .finally(()=> setLoading(false));
  }, [])

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const handelArrow = (order) =>{
    return order=="desc"?<ArrowDropDownIcon/>:<ArrowDropUpIcon/>
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Test #1 : Front-end Development</h1>
      </header>
      <div className="App-body-container">
      <Box display="flex" justifyContent={"space-around"} marginTop={5} bgcolor="background.paper">
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Filter by category</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={category}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={category.indexOf(name) > -1}  color="primary"/>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" justifyContent={"space-around"} bgcolor="background.paper">
      <ButtonGroup  aria-label="outlined primary button group">
        <Button startIcon={<MonetizationOnIcon />} className={classes.price} onClick={()=>{order=="asc"?setOrder("desc"):setOrder("asc");setOrderBy("price")}}>{handelArrow(order)} Sort by price</Button>
        <Button startIcon={<StarIcon />} className={classes.rate} onClick={()=>{order=="asc"?setOrder("desc"):setOrder("asc");setOrderBy("rate")}}>{handelArrow(order)} Sordt by rating</Button>
        </ButtonGroup>
      </Box>
      </Box>
      <Box display="flex" justifyContent="center" m={5} bgcolor="background.paper">
        <Test data={data} order={order} orderBy={orderBy} categories ={category}/>
      </Box>
      </div>
    </div>
  );
}

export default App;
