/**
 * All the icons used in the App are here.
 * Changing here, will change it everywhere.
 */

import { BiSearchAlt, BiHomeCircle, BiCategoryAlt, BiCart, BiUser, BiLockOpen, BiLock, BiCog, BiMessageAltDetail } from "react-icons/bi"
import { GiEarrings, GiDiamondRing, GiPearlNecklace, GiRing } from 'react-icons/gi';
import { BsSunFill, BsMoonFill, BsCardText, BsCart, BsCartDash, BsCartPlus, BsArrowDownCircle, BsArrowUpCircle, BsImages, BsCartCheck, BsCartX, BsArrowRight, BsArrowLeft, BsCheckLg, BsCartCheckFill, BsBoxSeam, BsBoxSeamFill } from 'react-icons/bs';
import { FiInstagram, FiMail } from 'react-icons/fi';
import { GrAddCircle, GrCircleAlert, GrLinkNext, GrLinkPrevious, GrUserAdmin } from 'react-icons/gr';
import { TfiRulerAlt } from 'react-icons/tfi'
import { FaRuler } from 'react-icons/fa'
import { VscError } from 'react-icons/vsc';
interface IconBaseProps extends React.SVGAttributes<SVGElement | SVGSVGElement> {
  children?: React.ReactNode;
  size?: string | number
  color?: string;
  title?: string;
}
type IconType = (props: IconBaseProps) => JSX.Element;

export interface IconInfo {
  icon: IconType, name: string, color?: string, link?: string
}

// Metanoia Brand SVG
type localSVGType = { strokeColor: string | undefined, strokeWidth: string | number | undefined, lineColor: string | undefined }
export const MetanoiaSVG = (props: localSVGType) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={"95%"}
      height={"95%"}
      fill={props.lineColor}
      version="1"
      viewBox="0 0 385 385"
      strokeWidth={props.strokeWidth}
      stroke={props.strokeColor}
    >
      <title>Home</title>
      <path
        d="M1797 3796c-173-64-252-262-168-423 71-138 251-197 393-129 224 106 223 429-1 538-57 28-168 35-224 14zm183-201c57-54 62-127 14-185-98-115-279 2-221 143 34 79 144 102 207 42zM1435 2936c-92-42-165-146-326-462-83-162-279-508-322-565-29-41-98-71-148-65-70 8-132 86-146 181l-6 45h-53c-50 0-54-2-54-24 0-42 38-150 70-198 53-80 144-126 226-113 85 12 154 54 204 122 48 65 230 382 298 518 142 285 234 430 292 460 61 32 146 10 174-44 34-65 39-154 33-589-7-473-3-544 43-637 36-72 82-110 157-126 151-34 273 58 302 227 7 37 11 248 11 546 0 538 2 563 61 612 40 34 118 37 149 6 11-11 24-20 28-20 22 0 145-207 260-435 91-182 284-511 325-554 37-39 114-78 173-87 138-20 269 109 298 294l6 42h-107l-12-52c-23-105-88-178-155-178-46 1-110 33-139 71-43 58-226 377-302 529-90 179-194 360-241 417-49 60-111 94-184 100-79 7-136-14-189-72-76-82-76-83-77-660-2-519-5-577-41-631-22-35-64-54-117-54-36 0-52 6-79 29-61 54-61 54-64 626-2 490-4 523-23 586-25 82-54 119-122 153-67 34-135 34-203 2z"
        transform="matrix(.1 0 0 -.1 0 385)"
      ></path>
      <path
        d="M3079 1495c-36-7-148-38-250-68-653-196-894-253-1001-236-87 14-402 103-594 169-254 87-320 106-435 126-141 23-259 16-335-21-67-33-149-112-186-180-96-181-18-415 170-507l67-33h2840l57 27c75 35 142 104 181 186 29 60 32 77 32 157 0 82-3 97-33 157-54 110-167 201-284 228-57 13-148 11-229-5zm274-125c58-29 121-95 148-153 56-124-10-291-138-350l-48-22H545l-50 27c-58 30-81 54-121 122-24 42-28 61-28 120-1 89 21 133 99 204 66 60 100 72 215 72 128 0 247-28 489-115 263-94 639-195 729-195 110 0 370 63 847 204 391 116 390 115 495 113 68-2 95-7 133-27zM1158 445c-3-74 12-88 36-30 16 37 42 49 92 43l29-3 3-163c3-176-3-202-43-202-16 0-25-6-25-15 0-12 18-15 105-15 85 0 105 3 105 14 0 9-12 16-32 18l-33 3-3 183-2 182h38c45 0 77-20 86-55 4-14 13-25 22-25 14 0 15 9 9 63-8 70-11 75-27 59-15-15-314-17-323-2-3 6-12 10-20 10-9 0-14-19-17-65zM1727 468c-8-18-42-103-77-188-68-165-82-190-112-190-10 0-18-7-18-15 0-12 16-15 80-15s80 3 80 15c0 8-9 15-19 15-30 0-34 16-16 71l17 50 71-3 70-3 18-54c18-52 18-53-1-58-10-3-21-11-24-19-4-11 12-14 84-14 73 0 90 3 90 15 0 8-8 15-19 15-10 0-23 6-29 13-5 6-40 93-77 192s-70 186-72 193c-9 23-33 12-46-20zm52-205c1-9-15-13-49-13-27 0-50 2-50 5s12 35 27 72l27 67 22-60c13-32 23-65 23-71zM2632 474c-85-42-124-107-124-205 0-137 113-231 259-216 80 8 139 48 176 117 25 48 28 63 25 122-3 55-9 75-33 110-65 93-198 125-303 72zm151-18c72-30 117-132 103-229-19-127-138-184-227-110-97 82-91 282 11 335 41 22 69 23 113 4zM3406 448c-13-29-50-118-82-197-50-123-63-146-86-155-16-6-28-16-28-23 0-9 21-13 75-13 60 0 75 3 75 15 0 9-9 15-21 15-19 0-21 4-16 32 3 18 10 45 16 61 10 26 13 27 80 27h69l16-47c21-61 20-73-4-73-11 0-20-7-20-15 0-12 17-15 90-15s90 3 90 15c0 8-9 15-20 15-28 0-40 23-117 227-40 109-73 183-81 183-7 0-23-24-36-52zm39-120c10-29 20-59 23-65 3-9-10-13-47-13-28 0-51 4-51 9 0 17 43 121 49 121 4 0 15-24 26-52zM197 484c-10-11 3-24 23-24 10 0 22-6 27-12 15-25-9-322-28-345-6-7-20-13-30-13-11 0-19-7-19-15 0-12 16-15 85-15 67 0 85 3 85 14 0 9-12 16-27 18l-28 3-2 104c-1 58 2 122 5 144 7 39 8 39 71-109 35-82 70-155 77-163 11-12 22 4 68 105 31 65 67 142 80 169l25 50-2-150c-2-147-2-150-24-153-13-2-23-10-23-18 0-11 19-14 95-14s95 3 95 14c0 9-12 16-27 18-26 3-29 7-36 63-4 33-6 114-5 180l3 120 28 3c15 2 27 9 27 18 0 11-15 14-63 14h-64l-74-156-75-156-73 156-74 156h-57c-31 0-60-3-63-6zM785 480c-3-6 1-12 9-15 9-3 23-7 31-10 13-4 15-30 13-182l-3-178-27-3c-16-2-28-9-28-18 0-12 26-14 167-12l168 3 11 52c15 65-4 80-35 27-23-38-54-54-108-54s-73 28-73 107v63h55c49 0 57-3 67-25 6-14 17-25 25-25 10 0 13 18 13 70 0 54-3 70-14 70-8 0-18-9-21-20-7-23-38-33-86-28l-34 3v150l44 3c65 5 85-3 104-43 24-50 37-43 37 20v55H946c-93 0-157-4-161-10zM1990 475c0-8 8-15 18-15s25-9 35-20c14-17 17-43 17-173 0-158-4-177-42-177-10 0-18-7-18-15 0-12 16-15 85-15s85 3 85 15c0 9-9 15-25 15-39 0-46 28-43 165l3 125 140-165c77-90 146-164 153-165 9 0 12 36 13 148 1 208 8 255 37 262 51 11 24 25-55 28-68 2-83 0-83-12 0-9 11-16 27-18 25-3 29-9 36-51 4-27 6-89 5-138l-3-90-138 155-138 156h-55c-41 0-54-4-54-15zM3010 476c0-9 12-16 28-18l27-3V95l-27-3c-16-2-28-9-28-18 0-11 19-14 95-14 78 0 95 3 95 15 0 8-8 15-18 15-38 0-42 19-42 185s4 185 42 185c10 0 18 7 18 15 0 12-17 15-95 15-76 0-95-3-95-14z"
        transform="matrix(.1 0 0 -.1 0 385)"
      ></path>
    </svg>
  )
}

// NAVBAR
// export const home: IconInfo = { icon: BiHomeCircle, name: "Home" }
export const search: IconInfo = { icon: BiSearchAlt, name: "Search" }
export const categories: IconInfo = { icon: BiCategoryAlt, name: "Categories" }
export const cart: IconInfo = { icon: BsCart, name: "Cart" }
export const settings: IconInfo = { icon: BiCog, name: "Settings" }
export const contactInfo: IconInfo = { icon: BiMessageAltDetail, name: "Contact Info" }

// export const user: IconInfo = { icon: BiUser, name: "Account" }


export const admin: IconInfo = { icon: GrUserAdmin, name: "Admin" }

// NAVBAR CATEGORIES
export const earrings: IconInfo = { icon: GiEarrings, name: "earrings" }
export const rings: IconInfo = { icon: GiDiamondRing, name: "rings" }
export const necklaces: IconInfo = { icon: GiPearlNecklace, name: "necklaces" }
export const bracelets: IconInfo = { icon: GiRing, name: "bracelets" }

// NAVBAR LOCK BUTTON
export const navLock: IconInfo = { icon: BiLock, name: "Lock Navbar" }
export const navUnlock: IconInfo = { icon: BiLockOpen, name: "Unlock Navbar" }

// NAVBAR SEARCH DRAWER INPUT TOOLTIP
export const circleAlert: IconInfo = { icon: GrCircleAlert, name: "CircleAlert" }

// HEADER THEME SWITCHER
export const lightThemeIcon: IconInfo = { icon: BsSunFill, name: "Light Theme" }
export const darkThemeIcon: IconInfo = { icon: BsMoonFill, name: "Dark Theme" }

// SOCIAL ICONS
export const mail: IconInfo = { icon: FiMail, name: "Mail", link: "mailto:metanoia.js@gmail.com" }
export const instagram: IconInfo = { icon: FiInstagram, name: "Instagram", link: "https://www.instagram.com/metanoia_.co/" }

// ITEM CARDS ICONS
export const itemDescription: IconInfo = { icon: BsCardText, name: "Item Description" }
export const itemDescriptionShowMore: IconInfo = { icon: BsArrowDownCircle, name: "Show more" }
export const itemDescriptionShowLess: IconInfo = { icon: BsArrowUpCircle, name: "Show less" }
export const cartAdd: IconInfo = { icon: BsCartPlus, name: "Add to Cart" }
export const cartRemove: IconInfo = { icon: BsCartDash, name: "Remove from Cart" }
export const showAllImages: IconInfo = { icon: BsImages, name: "Show all images" }

// CART CHECKOUT STEPPER
export const cartCheck: IconInfo = { icon: BsCartCheck, name: "Go to checkout" }
export const cartEmpty: IconInfo = { icon: BsCartX, name: "Empty your cart" }
export const arrowNext: IconInfo = { icon: BsArrowRight, name: "Go to next step" }
export const arrowPrevious: IconInfo = { icon: BsArrowLeft, name: "Go to previous step" }
export const checkoutStepChecked: IconInfo = { icon: BsCheckLg, name: "Step checked" }
export const cartStepChecked: IconInfo = { icon: BsCartCheckFill, name: "Cart checked" }
export const deliveryStep: IconInfo = { icon: BsBoxSeam, name: "Choose a delivery option" }
export const deliveryStepChecked: IconInfo = { icon: BsBoxSeamFill, name: "Delivery option checked" }
export const measurementsStep: IconInfo = { icon: TfiRulerAlt, name: "Delivery option checked" }
export const measurementsStepChecked: IconInfo = { icon: FaRuler, name: "Delivery option checked" }

// 
export const errorIcon: IconInfo = { icon: VscError, name: "Error" }

