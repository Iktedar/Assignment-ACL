import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from "react";
import apiCall from "../services/rest";
import {  GetMovies } from '../actions/movies';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import { Grid, TextField, Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography, Drawer} from '@material-ui/core';
import {ExpandMore, FilterList, Favorite} from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    pageTitle: {
        fontSize: '24px',
        fontWeight: '600',
        fontFamily: 'Open Sans , sans-serif',
        color: '#030303'
    },

    Segment: {
        marginRight: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    typoLabel: {
        marginBottom: '0.5rem'
    },

    formLabelsinput: {
        height: 'auto',
        width: '100%',
        borderRadius: '3px',
        border: '1px solid #B0BAC9',
        padding: '0 4px',
    },
    textFieldStyle: {
        marginRight: '5px',
        '&:before': {
            borderBottom: '1px solid #fff',
        },
    },
    inputFieldWithBtn: {
        display: 'flex',
    },
    favouriteFilter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        width: '100%',
        alignItems: 'end',
    },
    Movies: {
        display: 'flex',
        width: '100%',
        height: '600px',
        overflowX: 'auto',
        background: '#000000',
        paddingLeft: '20px',
    },
    Poster: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        '& img': {
            height: '350px',
        }
    },
    FavouriteIcon: {
        display: 'flex',
        position: 'relative',
        top: '45px',
        zIndex: '9999',
        right: '20px',
        fontSize: '30px',   
        '& :hover': {
            color: '#3B87FF',
        }
    },
    Favourited: {
        color: '#3B87FF',
    },
    notFavourited: {
        color: 'white',
    },
    DetailsBtn: {
        color: '#fff',
        backgroundColor: 'lightcoral',
        position: 'relative',
        width: '100%',
    },
    MovieCard: {
        position: 'relative',
        display: 'block',
        width: '800px',
        height: '350px',
        margin: '80px auto', 
        overflow: 'hidden',
        borderRadius: '10px',
        transition: 'all 0.4s',
        boxShadow: '0px 0px 120px -25px rgba(0,0,0, 0.5)',
    },
    InfoSection: {
        position: 'relative',
        width: '100%',
        height: '100%',
        zIndex: '2',
        borderRadius: '10px',
    },
    MovieHeader: {
        position: 'relative',
      padding: '25px',
      height: '40%',
    },
    MovieDesc: {
        padding: '25px',
        height: '50%',
    },
    DetailPoster: {
        position: 'relative',
        float: 'left',
        marginRight: '20px',
        height: '120px',
        boxShadow: '0 0 20px -10px rgba(0,0,0,0.5)',
    }

}));

const Movies = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [movies, setMovies] = useState([]);
    const [isChecked, setChecked] = useState(false);
    const moviesState = useSelector((state) => state.MoviesState);
    const [favMovies, setFavMovies] = useState([]);
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [movieDetail, setMovieDetail] = useState(null);

    useEffect(() => {
        if(!moviesState.error) {
            setMovies(moviesState.data);
        }
    }, [moviesState]);

    const fetchMovies = (filterType, searchKey) => {
        apiCall(filterType, {value: searchKey})
        .then((movies)=>{
            const MoviesData = Array.isArray(movies) ? movies : [{...movies}]
            dispatch(GetMovies.success(MoviesData));
        })
        .catch(err=>{
            dispatch(GetMovies.failure(err))
            console.log("err", err)
        });
    }

    useEffect(() => {
        dispatch(GetMovies.request())
        fetchMovies('MoviesListById', 'tt2911666');
    }, []);

    const favouritedMovie = (movieId) => {
        if (favMovies.includes(movieId)) {
            const favMov = favMovies.filter((mov) => mov !== movieId);
            setFavMovies([
                ...favMov,
            ])
        } else {
            setFavMovies([
                ...favMovies,
                movieId
            ])
        }
    }

    const handleFavorites = (e) => {
        setChecked(e.target.checked);
    }

    const searchById = () => {
        const inputElem = document.getElementById('searchById')
        fetchMovies('MoviesListById', inputElem.value);
    }

    const searchByTitle = () => {
        const inputElem = document.getElementById('searchByTitle')
        fetchMovies('MoviesListByTitle', inputElem.value);
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const viewDetail = (movie) => {
        console.log(movie)
        setMovieDetail(movie);
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Typography className={classes.pageTitle} color="textPrimary" gutterBottom>
                            Movies
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <FilterList style={{width: '20px'}} />
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                <b> &nbsp;Filters</b>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{display: 'flex', width: '100%'}}>
                                <div className={`${classes.SearchItem} ${classes.Segment}`} >
                                    <Typography variant="body1" className={classes.typoLabel}>
                                        Search by IMDB Id
                                    </Typography>
                                    <div className={classes.inputFieldWithBtn}>
                                        <TextField
                                            id="searchById"
                                            type="text"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            className={clsx(classes.formLabelsinput, classes.textFieldStyle)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <Button variant="contained" color="primary" onClick={searchById}>Search</Button>
                                    </div>
                                </div>
                                <div className={`${classes.SearchItem} ${classes.Segment}`} >
                                    <Typography variant="body1" className={classes.typoLabel}>
                                        Search by Title
                                    </Typography>
                                    <div className={classes.inputFieldWithBtn}>
                                        <TextField
                                            id="searchByTitle"
                                            type="text"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            className={clsx(classes.formLabelsinput, classes.textFieldStyle)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <Button variant="contained" color="primary" onClick={searchByTitle} >Search</Button>
                                    </div>
                                </div>
                            </div>    
                            <div className={`${classes.favouriteFilter} ${classes.Segment}`} >
                                <Typography variant="body1" className={classes.typoLabel}>
                                    My Favourites
                                </Typography>
                                <Checkbox onChange={handleFavorites} {...label} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item sm={12}>
                    <div className={classes.Movies}>
                        {
                            movies && movies.map((m) => {
                                if (isChecked && favMovies.includes(m.imdbID)) {
                                    return <div key={m.imdbID} className={classes.Poster} >
                                        <Favorite className={`${classes.FavouriteIcon} ${favMovies.includes(m.imdbID) ? classes.Favourited : classes.notFavourited  }`} onClick={() => favouritedMovie(m.imdbID)}/>
                                        <img src={m.Poster} alt="" className="posterImg" onClick={()=>viewDetail(m)}/>
                                    </div>
                                } else if(!isChecked){
                                    return <div key={m.imdbID} className={classes.Poster} >
                                        <Favorite className={`${classes.FavouriteIcon} ${favMovies.includes(m.imdbID) ? classes.Favourited : classes.notFavourited  }`} onClick={() => favouritedMovie(m.imdbID)}/>
                                        <img src={m.Poster} alt="" className="posterImg" onClick={()=>viewDetail(m)}/>
                                    </div>
                                }
                                
                            })
                        }
                    </div>
                </Grid>
            </Grid>
            {movieDetail && <Drawer
                anchor={'bottom'}
                open={isOpenDialog}
                onClose={handleDialogClose}
            >
                <div className={classes.MovieCard}>
                    <div className={classes.InfoSection}>
                        <div className={classes.MovieHeader}>
                            <img className={classes.DetailPoster} alt="" src={movieDetail.Poster} />
                            <h1>{movieDetail.Title}</h1>
                            <h4>{movieDetail.Year}, {movieDetail.Actors}</h4>
                            <span>{movieDetail.Runtime}</span>
                            <p>{movieDetail.Genre}</p>
                        </div>
                        <div className={classes.MovieDesc}>
                            <p>{movieDetail.Plot}</p>
                        </div>
                    </div>
                </div>
            </Drawer>}
        </div>
    )
}

export default Movies;