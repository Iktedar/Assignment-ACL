import React, { useEffect, useState } from 'react';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Link, TextField, Fade, Paper, ThemeProvider} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import Popper from '@material-ui/core/Popper';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    pageTitle: {
        fontSize: '24px',
        fontWeight: '600',
        fontFamily: 'Open Sans , sans-serif',
        color: '#030303'
    },
    CardContent: {
        display: 'flex'
    },
    inputSec: {
        height: '42px',
        border: '1px solid #DEDEDE',
        color: '#272727',
        padding: '5px 8px',
        fontSize: '14px',
        '&::before': {
            borderBottom: 'none !important'
        },
        '&::after': {
            borderBottom: 'none !important'
        }
    },
    Segment: {
        marginRight: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    typoLabel: {
        marginBottom: '1rem'
    },
    TotalRow:{
        background: '#F6F7FB 0% 0% no-repeat padding-box'
    },
    HeadRow:{
        background: '#EEEEF0 0% 0% no-repeat padding-box',
        border: '2px solid white !important',
        color: '#666666',
        '& tr, th': {
            border: '2px solid white !important',
        }
    }
}));

const Report = () => {
    const classes = useStyles();
    const theme = createTheme({
		typography: {
			fontFamily: [
			  'Open Sans', 
			  'sans-serif'
			].join(',')
		},
		palette: {
			primary: {
				main: "#3B87FF",
			},
			secondary: {
				main: "#ffa500"
			},
			submit: {
				'&:hover': {
					backgroundColor: 'black',
					color: '#FFF'
				}
			},
			MyCard: {
				boxShadow: '0px 4px 10px #03030329'
			}
		}
	});
    const options = ['All', 'Search Item 1', 'Search Item 2'];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [dateRange, setRange] = useState("");
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const [tableData,setTableData] = useState(null) 
    const [filteredRows, setFilteredrows] = useState(null)
    const [sumValues, setSumValues] = useState({
        tbl1_item1: 0,
        tbl1_item2: 0,
        tbl2_item1: 0,
        tbl2_item2: 0,
    })
    const [state, setState] = useState([
        {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
        value: ''
        }
    ]);

    useEffect(() => {
        if(value === 'All'){
            setFilteredrows(tableData)
            resetSumValues()

        } else if(value !== null){
            const updatedRows = tableData && tableData.filter((row) => row.name === value)
            setFilteredrows(updatedRows)
            resetSumValues()

        } else {
            setFilteredrows(tableData)
        }

    }, [value])

    const resetSumValues = () => {
        setSumValues({
            tbl1_item1: 0,
            tbl1_item2: 0,
            tbl2_item1: 0,
            tbl2_item2: 0,
        })
    }

    useEffect(() => {
        if(filteredRows) {
            
            const updatedTotal = filteredRows.reduce((sum, current) => {
                return{
                    tbl1_item1: parseInt(sum.tbl1_item1) + parseInt(current.tbl1_item1),
                    tbl1_item2: parseInt(sum.tbl1_item2) + parseInt(current.tbl1_item2),
                    tbl2_item1: parseInt(sum.tbl2_item1) + parseInt(current.tbl2_item1),
                    tbl2_item2: parseInt(sum.tbl2_item2) + parseInt(current.tbl2_item2),
                }
              }, sumValues);
              setSumValues(updatedTotal)
        }
        
    }, [filteredRows])

    useEffect(() => {
        const rows = [
            createData('Search Item 1', 159, 60, 24, 40),
            createData('Search Item 2', 237, 90, 37, 43),
            createData('Search Item 3', 262, 16.0, 24, 60),
            createData('Search Item 4', 305, 37, 67, 43),
            createData('Search Item 5', 356, 16.0, 49, 39),
        ];
        setTableData(rows)
        setFilteredrows(rows)
    }, [])

    useEffect(() => {
        const date1 = new Date(state[0].startDate);
        const date2 = new Date(state[0].endDate);
        const range = date1.getDate()+" "+monthNames[date1.getMonth()]+" to "+date2.getDate()+" "+monthNames[date2.getMonth()];
        setRange(range)
    }, [state])

    function createData(name, tbl1_item1, tbl1_item2, tbl2_item1, tbl2_item2) {
        return { name, tbl1_item1, tbl1_item2, tbl2_item1, tbl2_item2 };
    }

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpen((isOpen) => !isOpen)
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <Typography className={classes.pageTitle} color="textPrimary" gutterBottom>
                             Reports
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Card className={classes.root}>
                            <CardContent className={classes.CardContent}>
                                <div className={`${classes.SearchItem} ${classes.Segment}`} >
                                    <Typography variant="body1" className={classes.typoLabel}>
                                        Search Item
                                    </Typography>
                                    <Autocomplete
                                        id="custom-input-demo"
                                        options={options}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <div ref={params.InputProps.ref}>
                                                <input placeholder="Search" style={{ width: 180, height: '42px',border: '1px solid #DEDEDE', color: '#272727',padding: '5px 8px', fontSize: '14px',}} type="text" {...params.inputProps} />
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={`${classes.Segment}`}>
                                    <Typography variant="body1" className={classes.typoLabel}>
                                        Duration
                                    </Typography>
                                    <TextField
                                        type="text"
                                        disabled
                                        className={`${classes.inputSec}`}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onClick={handleClick}
                                        value={dateRange}
                                        InputProps={{
                                            endAdornment: (
                                              <InputAdornment position="start">
                                                <DateRangeIcon/>
                                              </InputAdornment>
                                            ),
                                          }}
                                    />
                                    <Popper id="daterangePopper" open={open} anchorEl={anchorEl} placement="bottom" transition>
                                        {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                                <DateRange
                                                    editableDateInputs={true}
                                                    onChange={item => setState([item.selection])}
                                                    moveRangeOnFirstSelection={false}
                                                    ranges={state}
                                                />
                                            </Paper>
                                        </Fade>
                                        )}
                                    </Popper>
                                </div>
                                <div className={`${classes.Segment}`}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        size="large"
                                        startIcon={<SearchIcon />}
                                        >
                                        Search
                                    </Button>
                                </div>
                            
                            </CardContent>
                       </Card>
                   </Grid>
                   <Grid item sm={12}>
                        <Card className={classes.root}>
                            <TableContainer>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead className={classes.HeadRow}>
                                        <TableRow rowSpan={2}>
                                            <TableCell rowSpan={2} align="center">Search Item</TableCell>
                                            <TableCell align="center" colSpan={2}>Table 1</TableCell>
                                            <TableCell align="center" colSpan={2}>Table 2</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">tbl1_item1</TableCell>
                                            <TableCell align="center">tbl1_item2</TableCell>
                                            <TableCell align="center">tbl2_item1</TableCell>
                                            <TableCell align="center">tbl2_item2</TableCell>
                                        </TableRow>
                                        <TableRow component="th" scope="row" className={classes.TotalRow}>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center">{sumValues.tbl1_item1}</TableCell>
                                            <TableCell align="center">{sumValues.tbl1_item2}</TableCell>
                                            <TableCell align="center">{sumValues.tbl2_item1}</TableCell>
                                            <TableCell align="center">{sumValues.tbl2_item2}</TableCell>
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {filteredRows && filteredRows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                <Link>{row.name}</Link>
                                            </TableCell>
                                            <TableCell align="center">{row.tbl1_item1}</TableCell>
                                            <TableCell align="center">{row.tbl1_item2}</TableCell>
                                            <TableCell align="center">{row.tbl2_item1}</TableCell>
                                            <TableCell align="center">{row.tbl2_item2}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default Report;