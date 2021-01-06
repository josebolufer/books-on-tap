import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import {
  showShoppingBag,
  addToShoppingBag,
  removeFromShoppingBag,
} from '../../redux/actions/shoppingBagActions'
import {
  getTotalAmount,
  getShoppingBagItems,
  getShow,
  getShoppingBagTotalNumberOfItems,
} from '../../selectors/shoppingBag'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '20px',
  },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  alert: {
    marginBottom: '25px',
  },
  buttons: {
    position: 'relative',
    top: '10px',
    left: '10px',
  },
}))

const ShoppingBag = ({
  show,
  showShoppingBag,
  items,
  totalAmount,
  addToShoppingBag,
  removeFromShoppingBag,
  totalNumberOfItems,
}) => {
  const classes = useStyles()

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    showShoppingBag(open)
  }

  const renderWithItems = () => {
    return (
      <>
        <Typography component='h5' variant='h5'>
          My Bag ({totalNumberOfItems})
        </Typography>

        <List className={classes.root}>
          {items.map((item) => {
            const cannotAdd = item.quantity === item.stockAmount

            return (
              <React.Fragment key={item.id}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      variant='square'
                      alt='Remy Sharp'
                      src={item.thumbnail}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <>
                        <Typography
                          component='span'
                          variant='body2'
                          className={classes.inline}
                          color='textPrimary'
                        >
                          {`${item.quantity} X £${item.price.toFixed(2)}`}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <ListItemSecondaryAction className={classes.buttons}>
                  <IconButton
                    size='small'
                    edge='end'
                    aria-label='remove'
                    color='primary'
                    onClick={() => {
                      removeFromShoppingBag(item)
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    size='small'
                    edge='end'
                    aria-label='add'
                    color='primary'
                    disabled={cannotAdd}
                    onClick={() => {
                      addToShoppingBag(item)
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                {cannotAdd && (
                  <Alert
                    className={classes.alert}
                    variant='outlined'
                    severity='warning'
                  >
                    Max reached for this item.
                  </Alert>
                )}

                <Divider component='li' />
              </React.Fragment>
            )
          })}
        </List>
        <Typography component='h6' variant='h6'>
          Total to pay: £{totalAmount.toFixed(2)}
        </Typography>
      </>
    )
  }

  return (
    <Drawer anchor={'right'} open={show} onClose={toggleDrawer(false)}>
      <div className={classes.wrapper}>
        {items.length > 0 ? (
          renderWithItems()
        ) : (
          <Typography
            component='span'
            variant='body2'
            className={classes.inline}
            color='textPrimary'
          >
            There are no items in your shopping bag.
          </Typography>
        )}
      </div>
    </Drawer>
  )
}

const mapStateToProps = (state) => ({
  show: getShow(state),
  items: getShoppingBagItems(state),
  totalAmount: getTotalAmount(state),
  totalNumberOfItems: getShoppingBagTotalNumberOfItems(state),
})

const mapDispatchToProps = {
  showShoppingBag,
  addToShoppingBag,
  removeFromShoppingBag,
}

ShoppingBag.propTypes = {
  show: PropTypes.bool,
  items: PropTypes.array,
  totalAmount: PropTypes.number,
  totalNumberOfItems: PropTypes.number,
  addToShoppingBag: PropTypes.func.isRequired,
  removeFromShoppingBag: PropTypes.func.isRequired,
  showShoppingBag: PropTypes.func.isRequired,
}

ShoppingBag.defaultProps = {
  show: false,
  items: [],
  totalAmount: 0,
  totalNumberOfItems: 0,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingBag)
