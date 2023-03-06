import { React, useCallback, useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from'@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { Grid } from '@mui/material';
import axios from "axios";
import accessKey2 from "../key2";

export const FrontPage = () => { 
    const [searchValue, setSearchValue] = useState("");
    const [images, setImages] = useState([]);
    //const [loading, setLoading] = useState(false);

   
    const searchPhoto = useCallback(() => {
        axios.get(`https://api.unsplash.com/search/photos?per_page=12&client_id=${accessKey2}&query=${searchValue}`)
        .then((response) => {
          const newImages = response.data.results.map((result) => ({
            id: result.id ? result.id : "No id",
            description: result.description ? result.description : "No description",
            nameOfPicture: result.alt_description ? result.alt_description : "No name of picture",
            name: result.user.name ? result.user.name : "No name",
            url: result.urls.regular ? result.urls.regular : `https://api.unsplash.com/photos/random?client_id=${accessKey2}`,
          }))
          setImages(newImages);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [searchValue]);
    const inputChanged = (event) => {
        setSearchValue(event.target.value);
      }
  
    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" alignItems={"center"}>
                        FIND ANY PHOTO
                    </Typography>
                </Toolbar>
            </AppBar>
            <Stack spacing={2} mt={10} direction="row" justifyContent="center" alignItems="center">
                <TextField type={Text} label="search photo" variant="outlined" name="search" onChange={inputChanged} onKeyDown={(event) => { 
                    if (event.keyCode === 13)
                        searchPhoto();
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearchValue("")}>
                                    x
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    />
                <Button variant="contained" onClick={searchPhoto}>Search</Button>
            </Stack>
            <br />
            <br />
            <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {images.map((image) => (
                    <Grid item xs={4} sm={4} md={4} key={image.id}>
                        <img key={image.id} src={image.url} alt="Random" height={"300px"} width={"400px"} />
                        <p>
                            <span style={{ color: "red" }}>Description:</span>{" "}
                            <h3>{image.description}</h3>
                        </p>
                        <p>
                            <span style={{ color: "red" }}>Name of picture:</span>
                            <h3>{image.nameOfPicture}</h3>
                        </p>
                        <p>
                            <span style={{ color: "red" }}>Photographer's name:</span>
                            <h3>{image.name}</h3>
                        </p>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
