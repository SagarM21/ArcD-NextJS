import React, { useEffect, useState } from "react";
import {
	AppBar,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Menu,
	MenuItem,
	SwipeableDrawer,
	Tab,
	Tabs,
	useTheme,
} from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

function ElevationScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: "3em",
		[theme.breakpoints.down("md")]: {
			marginBottom: "2em",
		},
		[theme.breakpoints.down("xs")]: {
			marginBottom: "1.25em",
		},
	},
	logo: {
		textTransform: "none",
		textDecoration: "none",
		height: "8em",
		[theme.breakpoints.down("md")]: {
			height: "7em",
		},
		[theme.breakpoints.down("xs")]: {
			height: "5.5em",
		},
	},
	logoContainer: {
		padding: 0,
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	tabContainer: {
		marginLeft: "auto",
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: "25px",
	},
	button: {
		...theme.typography.estimate,
		borderRadius: "50px",
		marginLeft: "50px",
		marginRight: "25px",
		height: "45px",
		"&:hover": {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	menu: {
		backgroundColor: theme.palette.common.blue,
		color: "white",
		borderRadius: "0px",
	},
	menuItem: {
		...theme.typography.tab,
		opacity: 0.7,
		"&:hover": {
			opacity: 1,
		},
	},
	drawerIcon: {
		height: "50px",
		width: "50px",
	},
	drawerIconContainer: {
		marginLeft: "auto",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	drawer: {
		backgroundColor: theme.palette.common.blue,
	},
	drawerItem: {
		...theme.typography.tab,
		color: "white",
		opacity: 0.7,
	},
	drawerItemEstimate: {
		backgroundColor: theme.palette.common.orange,
	},
	drawerItemSelected: {
		"& .MuiListItemText-root": {
			opacity: 1,
		},
	},
	appbar: {
		zIndex: theme.zIndex.modal + 1,
	},
}));

const Header = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const iOS =
		typeof navigator !== "undefined" &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);

	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const [openDrawer, setOpenDrawer] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);

	const handleChange = (e, newValue) => {
		props.setValue(newValue);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setOpenMenu(true);
	};

	const handleMenuItemClick = (e, i) => {
		setAnchorEl(null);
		setOpenMenu(false);
		props.setSelectedIndex(i);
	};

	const handleClose = (e) => {
		setAnchorEl(null);
		setOpenMenu(false);
	};

	const menuOptions = [
		{ name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
		{
			name: "Custom Software Development",
			link: "/customsoftware",
			activeIndex: 1,
			selectedIndex: 1,
		},
		{
			name: "iOS/Android App Development",
			link: "/mobileapps",
			activeIndex: 1,
			selectedIndex: 2,
		},
		{
			name: "Website Development",
			link: "/websites",
			activeIndex: 1,
			selectedIndex: 3,
		},
	];

	const routes = [
		{ name: "Home", link: "/", activeIndex: 0 },
		{
			name: "Services",
			link: "/services",
			activeIndex: 1,
			ariaOwns: anchorEl ? "simple-menu" : undefined,
			ariaPopup: anchorEl ? "true" : undefined,
			mouseOver: (event) => handleClick(event),
		},
		{ name: "Revolution", link: "/revolution", activeIndex: 2 },
		{ name: "About Us", link: "/about", activeIndex: 3 },
		{ name: "Contact Us", link: "/contact", activeIndex: 4 },
	];

	useEffect(() => {
		[...menuOptions, ...routes].forEach((route) => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (props.value !== route.activeIndex) {
						props.setValue(route.activeIndex);
						if (
							route.selectedIndex &&
							route.selectedIndex !== props.selectedIndex
						) {
							props.setSelectedIndex(route.selectedIndex);
						}
					}
					break;
				case "/estimate":
					props.setValue(5);
					break;
				default:
					break;
			}
		});
	}, [props.value, menuOptions, props.selectedIndex, routes, props]);

	const tabs = (
		<React.Fragment>
			<Tabs
				value={props.value}
				onChange={handleChange}
				indicatorColor='primary'
				className={classes.tabContainer}
			>
				{routes.map((route, index) => (
					<Tab
						key={`${route}${index}`}
						className={classes.tab}
						component={Link}
						to={route.link}
						label={route.name}
						aria-owns={route.ariaOwns}
						aria-haspopup={route.ariaPopup}
						onMouseOver={route.mouseOver}
					/>
				))}
			</Tabs>
			<Button
				component={Link}
				to='/estimate'
				variant='contained'
				color='secondary'
				className={classes.button}
				onClick={() => props.setValue(5)}
			>
				Free Estimate
			</Button>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleClose}
				classes={{ paper: classes.menu }}
				MenuListProps={{ onMouseLeave: handleClose }}
				elevation={0}
				style={{ zIndex: 1302 }}
				keepMounted
			>
				{menuOptions.map((option, i) => (
					<MenuItem
						key={`${option}${i}`}
						component={Link}
						to={option.link}
						classes={{ root: classes.menuItem }}
						onClick={(event) => {
							handleMenuItemClick(event, i);
							props.setValue(1);
							handleClose();
						}}
						selected={i === props.selectedIndex && props.value === 1}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	);

	const drawer = (
		<React.Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbarMargin} />
				<List disablePadding>
					{routes.map((route) => (
						<ListItem
							onClick={() => {
								setOpenDrawer(false);
								props.setValue(route.activeIndex);
							}}
							key={`${route}${route.activeIndex}`}
							divider
							button
							component={Link}
							to={route.link}
							selected={props.value === route.activeIndex}
							classes={{ selected: classes.drawerItemSelected }}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								{route.name}
							</ListItemText>
						</ListItem>
					))}

					<ListItem
						onClick={() => {
							setOpenDrawer(false);
							props.setValue(5);
						}}
						divider
						button
						component={Link}
						to='/estimate'
						selected={props.value === 5}
						classes={{
							root: classes.drawerItemEstimate,
							selected: classes.drawerItemSelected,
						}}
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Free Estimate
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
				className={classes.drawerIconContainer}
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position='fixed' className={classes.appbar}>
					<Toolbar disableGutters>
						<Button
							component={Link}
							to='/'
							disableRipple
							className={classes.logoContainer}
							style={{ textDecoration: "none" }}
							onClick={() => props.setValue(0)}
						>
							<svg
								className={classes.logo}
								id='Layer_1'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 480 139'
							>
								<style>{`.st0{fill:none}.st1{fill:#fff}.st2{font-family:Raleway; font-weight: 300;}.st6{fill:none;stroke:#000;stroke-width:3;stroke-miterlimit:10}`}</style>
								<path d='M448.07-1l-9.62 17.24-8.36 14.96L369.93 139H-1V-1z' />
								<path class='st0' d='M-1 139h479.92v.01H-1z' />
								<text
									transform='translate(261.994 65.233)'
									className='st1 st2'
									fontSize='57'
								>
									Arc
								</text>
								<text
									transform='translate(17.692 112.015)'
									className='st1 st2'
									fontSize='54'
								>
									Development
								</text>
								<path
									className='st0'
									d='M382.44 116.43l47.65-85.23 8.36-14.96M369.83 139l-.01.01L362 153'
								/>
								<path
									d='M438.76 15.76l-56.42 100.91c-12.52-10.83-20.45-26.82-20.45-44.67 0-32.58 26.42-59 59-59 6.23 0 12.24.97 17.87 2.76z'
									fill='#0b72b9'
								/>
								<path d='M479.89 72c0 32.58-26.42 59-59 59-14.73 0-28.21-5.4-38.55-14.33l56.42-100.91c23.85 7.57 41.13 29.89 41.13 56.24z' />
								<g id='Group_186' transform='translate(30.153 11.413)'>
									<g id='Group_185'>
										<g id='Words'>
											<path
												id='Path_59'
												class='st1'
												d='M405.05 14.4l-.09 80.38-7.67-.01.06-52.25-29.4 52.21-7.94-.01 45.04-80.32z'
											/>
										</g>
									</g>
								</g>
								<path
									class='st0'
									d='M457-17l-8.93 16-9.62 17.24-8.36 14.96L369.93 139l-.01.01L361 155'
								/>
							</svg>
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
