import React from 'react'

const ReactContext = React.createContext({
    wishlist: [],
    WishlistAdd: () => { },
    WishListRemove: () => { },
    watchlist: [],
    watchlistAdd: () => { },
    watchlistRemove: () => { },
    searchname: '',
    search: () => { },
    loggedIn: false,
    loggedCheck: () => { }
})

export default ReactContext