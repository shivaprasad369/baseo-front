import React from 'react'
// import './css/all.min.css'
// import './css/bootstrap.min.css'
// import './css/custom-bootstrap.css'
// import './css/style.css'
// import './css/animate.css'
export default function Header() {
  return (
    <header className="header">
    <div className="header-main">
        <div className="header-bar">
            <div className="container">
                <div className="header-bar-wrapper">
                    <div className="header-announcement">
                        <p>Free Delivery on orders above $50.00</p>
                    </div>
                    <div className="header-bar-btn">
                        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#auth-login">Login</a><span style={{padding: "0 4px;"}}>/</span><a
                            href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#auth-register">Register</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="header-main-wrapper">
            <div className="container">
                <div className="header-logo-search">
                    <div className="logo">
                        <a href="index.html">
                            <img src="./assets/images/logo.png" alt="logo"/>
                        </a>
                    </div>

                    <div className="header-search-and-btn">
                        <div className="search-box-wrapper">
                            <div className="search-box">
                                <input type="search" name="header_search" className="search-input"
                                    placeholder="Search for products and brands here..."/>
                                <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>

                        <div className="header-btns">
                            <button className="header-sell-btn primary-btn">Sell</button>
                            <div className="phone-cart-wrappper">
                                <div className="custom-drop user-dropdown">
                                    <button type="button" className="drop-toggle" data-toggle="dropdown">
                                        <img src="./assets/images/user-icon.svg" alt="User" width="32"
                                            height="32" />
                                    </button>
                                    <div className="drop-content">
                                        <ul className="drop-listing">
                                            <li>
                                                <button className="link" data-bs-toggle="modal" data-bs-target="#auth-login">Login</button>
                                            </li>
                                            <li>
                                                <button className="link" data-bs-toggle="modal" data-bs-target="#auth-register">Register</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <a className="phone-wrapper">
                                    <img src="./assets/images/telephone-icon.png" alt="telephone-icon"
                                        width="32" height="32" />
                                    <div className="text">
                                        <span>Need Help?</span>
                                        <p>+12 3456 7890</p>
                                    </div>
                                </a>

                                <button type="button" className="cart-wrapper bt-none" data-bs-toggle="modal" data-bs-target="#cart-drawer">
                                    <div className="cart-icon">
                                        <img src="./assets/images/cart-icon.png" alt="cart-icon" width="32"
                                            height="32" />
                                        <span className="cart-count">3</span>
                                    </div>
                                    <div className="text">
                                        <span>Cart</span>
                                        <p>$0.00</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="mobile-menu-btn">
                            <button><i className="fa-solid fa-bars"></i></button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div className="header-nav">
            <div className="header-nav-main">
                <div className="container">
                    <ul className="navigation">
                        <li className="nav-item nav-btn">
                            <a href="#" className="primary-btn">All Categories</a>
                            <div className="submenu">
                                <div className="row">
                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="#">Mobile Phones</a>
                            <div className="submenu">
                                <div className="row">
                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-3 col-md-12 col-12">
                                        <ul className="sub-nav">
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                            <li className="sub-nav-item sub-nav-title"><a href="#">Mobile Phone &
                                                    Accessories</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones</a></li>
                                            <li className="sub-nav-item"><a href="#">Mobile Phones Accessories</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item"><a href="#">Games And Consoles</a></li>
                        <li className="nav-item"><a href="#">Computing</a></li>
                        <li className="nav-item"><a href="#">Tablets & Accessories</a></li>
                        <li className="nav-item"><a href="#">Headphones</a></li>
                        <li className="nav-item nav-btn"><a href="#" className="primary-btn">Daily Deals</a></li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</header>

  )
}
