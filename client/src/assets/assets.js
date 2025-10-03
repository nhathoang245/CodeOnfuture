import cof_logo from "./CoF_logo (1).png"
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import RAM_icon from "./RAM_icon.svg"
import deviceIcon from "./device_icon (4).svg"
import location_icon from "./location_icon.svg"
import storage_icon from "./storage_icon.svg"
import addIcon from "./addIcon.svg"
import deviceIconColored from "./device_icon_colored (2).svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import avatar_image_1 from "./avatar_image_1.png"
import avatar_image_2 from "./avatar_image_2.png"
import main_device from "./SamsungS25Ultra (1).png"
import banner_device_image from "./Iphone26ProMax_banner.png"
import user_avatar from "./user_avatar.png"
import upload_icon from "./upload_icon.svg"


export const addressList = ['HUST', 'NEU', 'PTIT', 'FPT']

export const assets = {
    cof_logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    RAM_icon,
    edit_icon,
    location_icon,
    storage_icon,
    addIcon,
    deviceIcon,
    deviceIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    avatar_image_1,
    avatar_image_2,
    main_device,
    banner_device_image,
    upload_icon,
    user_avatar,
}

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Devices", path: "/devices" },
    { name: "My Bookings", path: "/my-bookings" },
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add device", path: "/owner/add-device", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Devices", path: "/owner/manage-devices", icon: deviceIcon, coloredIcon: deviceIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]
