const addMovie = movieID => {
    window.location.replace("./index.php?action=add&movie_id=" + movieID);
    return true;
};

const removeMovie = (title, movieID) => {
    let removeMoviePrompt = confirm("You are about to remove " + title);
    if (removeMoviePrompt) {
        window.location.replace("./index.php?action=remove&movie_id=" + movieID);
        return true;
    } else {
        return false;
    }
};

const confirmCheckout = () => {
    let checkoutPrompt = confirm("You are agreeing to checkout from myMovies Xpress.")
    if (checkoutPrompt) {
        window.location.replace("./index.php?action=checkout");
        return true;
    } else {
        return false;
    }
};

const confirmLogout = () => {
    let logoutPrompt = confirm("You are now logging off of myMovies Xpress.");
    if (logoutPrompt) {
        window.location.replace("./logon.php?action=logoff");
        return true;
    } else {
        return false;
    }
};

