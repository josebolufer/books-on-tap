import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import BookListItem from './BookListItem'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}))

const BookList = ({ books, fetching }) => {
  const classes = useStyles()

  if (fetching) {
    return (
      <div data-testid='book-list-fetching' className={classes.root}>
        <LinearProgress color='secondary' />
      </div>
    )
  }

  if (books.length > 0) {
    return (
      <Container className={classes.cardGrid} maxWidth='xl'>
        <Grid container spacing={3}>
          {books.map((book) => (
            <BookListItem key={book.id} book={book} />
          ))}
        </Grid>
      </Container>
    )
  }

  return <Typography variant='body2'>There are 0 books to display.</Typography>
}

BookList.propTypes = {
  books: PropTypes.array,
  fetching: PropTypes.bool,
}

BookList.defaultProps = {
  books: [],
  fetching: false,
}

export default BookList
