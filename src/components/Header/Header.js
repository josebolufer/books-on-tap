import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { showShoppingBag } from '../../redux/actions/shoppingBagActions'
import { getShoppingBagTotalNumberOfItems } from '../../selectors/shoppingBag'
import logo from '../../img/logo192-svg.png'

const useStyles = makeStyles(() => ({
  iconButton: {
    position: 'absolute',
    right: '30px',
  },
  logo: {
    color: '#fff',
  },
}))

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}))(Badge)

const Header = ({ showShoppingBag, totalNumberOfItems }) => {
  const classes = useStyles()

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Link
          className={classes.logo}
          underline='none'
          color='textPrimary'
          component={RouterLink}
          to='/'
        >
          <img src={logo} alt='Books on tap' />
        </Link>

        <IconButton
          aria-label='cart'
          className={classes.iconButton}
          onClick={() => {
            showShoppingBag(true)
          }}
        >
          <StyledBadge
            showZero
            badgeContent={totalNumberOfItems}
            color='secondary'
          >
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const mapDispatchToProps = {
  showShoppingBag,
}

const mapStateToProps = (state) => ({
  totalNumberOfItems: getShoppingBagTotalNumberOfItems(state),
})

Header.propTypes = {
  showShoppingBag: PropTypes.func.isRequired,
  totalNumberOfItems: PropTypes.number,
}

Header.defaultProps = {
  totalNumberOfItems: 0,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
