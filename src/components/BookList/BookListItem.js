import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    maxHeight: '250px',
  },
  cardContent: {
    flexGrow: 1,
  },
}))

const BookListItem = ({ book }) => {
  const classes = useStyles()
  const { id, thumbnail, title, price, author } = book

  return (
    <Grid data-testid='book-list-item' item xs={12} sm={6} md={4}>
      <Card raised className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          src={thumbnail}
          title={title}
          alt={title}
          component='img'
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant='body1'
            component='h2'
            color='primary'
          >
            {title}
          </Typography>
          <Typography
            variant='body2'
            gutterBottom
          >{`By ${author.firstName} ${author.lastName}`}</Typography>
          <Typography variant='body2'>£{price.toFixed(2)}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            size='small'
            color='primary'
            component={RouterLink}
            to={`/book/${id}`}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

BookListItem.propTypes = {
  book: PropTypes.object.isRequired,
}

export default BookListItem
