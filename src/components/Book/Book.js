import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'

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

const Book = ({ book, addToShoppingBag, fetching }) => {
  const { author, thumbnail, title, description, price = 0, stockAmount } = book
  const { firstName = '', lastName = '' } = author || {}
  const classes = useStyles()

  const handleAddToBag = () => {
    book.quantity = 1
    addToShoppingBag(book)
  }

  if (fetching)
    return (
      <div data-testid='book-list-fetching' className={classes.root}>
        <LinearProgress color='secondary' />
      </div>
    )

  return (
    <Container className={classes.cardGrid} maxWidth='xl'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia
            alt={title}
            component='img'
            src={
              thumbnail
                ? thumbnail
                : 'https://via.placeholder.com/400.png?text=Loading...'
            }
            title={title}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant='h4' gutterBottom color='primary'>
            <Box fontWeight='fontWeightBold' m={1}>
              {title}
            </Box>
          </Typography>
          <Typography variant='h5' gutterBottom>
            <Box fontWeight='fontWeightLight' m={1} display='inline'>
              Price:
            </Box>
            <Box fontWeight='fontWeightBold' m={1} display='inline'>
              £{price.toFixed(2)}
            </Box>
          </Typography>
          <Typography variant='h5' gutterBottom>
            <Box fontWeight='fontWeightLight' m={1} display='inline'>
              Author:
            </Box>
            <Box fontWeight='fontWeightBold' m={1} display='inline'>
              {`${firstName} ${lastName}`}
            </Box>
          </Typography>
          <Typography variant='body1' gutterBottom>
            {description}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {stockAmount < 1 ? 'Out of stock' : `In stock: ${stockAmount}`}
          </Typography>
          <Button
            onClick={() => handleAddToBag()}
            size='large'
            fullWidth
            disabled={stockAmount < 1}
            variant='outlined'
            color='primary'
          >
            ADD TO BAG
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  addToShoppingBag: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
}

Book.defaultProps = {
  fetching: false,
}

export default Book
