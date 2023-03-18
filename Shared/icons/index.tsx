/**
 * All the icons used in the App are here.
 * Changing here, will change it everywhere.
 */

import { BiSearchAlt, BiHomeCircle, BiCategoryAlt, BiCart, BiUser, BiLockOpen, BiLock, BiCog, BiMessageAltDetail, BiImageAdd, BiCodeAlt } from "react-icons/bi"
import { GiEarrings, GiDiamondRing, GiPearlNecklace, GiRing, GiPayMoney, GiExitDoor } from 'react-icons/gi';
import { BsSunFill, BsMoonFill, BsCardText, BsCart, BsCartDash, BsCartPlus, BsArrowDownCircle, BsArrowUpCircle, BsImages, BsCartCheck, BsCartX, BsArrowRight, BsArrowLeft, BsArrowDown, BsCheckLg, BsCartCheckFill, BsBoxSeam, BsBoxSeamFill, BsMailbox, BsCreditCard2Back, BsPaypal, BsTable, BsDiscord, BsCodeSlash } from 'react-icons/bs';
import { FiInstagram, FiMail } from 'react-icons/fi';
import { GrAddCircle, GrCircleAlert, GrDocumentUpdate, GrLinkNext, GrLinkPrevious, GrUserAdmin } from 'react-icons/gr';
import { TfiRulerAlt } from 'react-icons/tfi'
import { FaCode, FaEquals, FaGithub, FaLaptopCode, FaPlus, FaRuler, FaTimes, FaUserAstronaut } from 'react-icons/fa'
import { VscEdit, VscError } from 'react-icons/vsc';
import { MdDeleteForever, MdEmojiPeople, MdMarkEmailRead, MdOutlineMarkEmailRead, MdUpdate } from 'react-icons/md';
import { IoCashOutline, IoCash } from 'react-icons/io5'
import { AiOutlineCopyright, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { HiOutlineAtSymbol } from 'react-icons/hi'
import { SlOptionsVertical, SlOptions } from 'react-icons/sl'
import { TbInfoSquareRounded, TbUpload } from 'react-icons/tb'
import { CiSquareRemove } from 'react-icons/ci'



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
type localSVGType = {
  strokeColor: string | undefined,
  strokeWidth: string | number | undefined,
  lineColor: string | undefined,
  name?: string
}
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
      <title>{props.name ? props.name : "Home"}</title>
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

export const PostalServiceSVG = (props: localSVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={"100%"}
      height={"100%"}
      fill={props.lineColor}
      version="1"
      viewBox="0 0 1200 1432"
      strokeWidth={props.strokeWidth}
      stroke={props.strokeColor}
    >
      <title>Postal Service</title>
      <path
        d="M6540 14039c-1646-60-3588-541-5630-1392-370-154-704-301-694-304 5-1 216-23 469-48 4657-461 7710-1242 9070-2321 146-115 393-366 479-486 137-190 221-362 271-555 177-681-206-1455-1092-2207-51-43-93-80-93-82 0-7 186 132 313 233 400 318 813 722 1097 1073 509 630 841 1294 979 1961 88 429 94 876 15 1269-163 819-651 1513-1415 2013-937 613-2227 903-3769 846zM10228 5907l-658-201v-305c0-344-3-359-74-418-95-78-275-69-336 17-19 26-20 45-20 299 0 152-4 271-9 271-7 0-868-260-1293-391l-98-30V4044c0-1211 4-1134-59-1187-57-47-136-71-241-71-101-1-149 14-170 53-6 12-10 120-10 279v259l-652-199c-359-109-670-203-690-209l-38-10v-437c0-402 2-440 19-477 37-82 116-121 226-112 75 6 2674 796 2755 837 139 70 228 165 273 295 7 20 13 260 17 694l5 665 645 197c355 108 665 204 690 214 151 60 299 181 360 295l35 65 3 458c2 368 0 457-10 456-7 0-309-91-670-202z"
        transform="matrix(.1 0 0 -.1 0 1432)"
      ></path>
      <path
        d="M4665 5198c-396-121-721-221-721-222-1 0-5-375-9-833-9-950 0-869-102-919-50-25-70-29-145-29-72 0-91 3-115 21l-28 21-3 318c-2 246-5 316-15 313-6-3-335-103-730-223l-718-219 3-421 3-422 29-41c62-89 182-137 341-136l100 1 1005 307c553 169 1262 385 1575 481 314 95 869 264 1235 375 366 112 682 211 703 222 54 27 123 93 155 147l27 46 3 508c1 279 0 507-4 507-6 0-1304-393-1406-426l-47-15-3-319-3-319-34-35c-46-48-121-78-208-84-67-4-73-3-97 21l-26 26v1571l-22-1c-13-1-347-100-743-221zM10028 4076l-458-140v-203c0-112 3-203 6-203 15 0 900 272 907 279 4 4 6 97 5 207l-3 199-457-139zM5162 2740c-249-77-457-142-462-145-6-4-10-96-10-227 0-214 1-220 20-215 11 3 224 67 475 143l455 139v222c0 172-3 223-12 222-7 0-217-63-466-139zM4062 2360c-249-77-457-142-462-145-6-4-10-94-10-227 0-219 0-220 21-215 11 3 225 68 475 144l454 138v223c0 171-3 222-12 221-7 0-217-63-466-139zM4047 1140l-32-70h-135V390h431l-3 37-3 38-167 3-168 2v250h310v80h-310v190h341l-3 38-3 37-113 3-112 3 25 49c31 61 31 64-1 79-25 11-26 10-57-59zM7720 1125c-106-30-199-108-243-203-31-68-31-245 1-314 62-137 208-218 394-218 149 0 257 39 334 122 64 69 87 125 92 229 9 184-74 314-238 375-64 24-267 29-340 9zm213-126c92-25 139-105 139-234 0-131-43-203-138-231-75-22-142-6-193 45-44 44-61 96-61 186 0 86 15 136 54 181 48 55 122 75 199 53zM8700 1130c-77-16-171-70-204-118-54-77-37-190 37-246 44-34 99-53 236-82s163-43 159-86c-5-55-44-73-151-73-101 1-166 17-254 66-29 16-55 29-58 29s-5-40-5-90c0-49 2-90 4-90s41-10 87-22c122-32 316-32 415-1 233 73 263 313 51 392-33 12-111 32-174 46-124 26-156 44-151 83 10 86 213 96 368 17 27-14 52-25 55-25s5 38 5 84v84l-72 17c-85 20-283 28-348 15zM6630 766V400h220v237l113 5c133 7 203 29 270 88 101 89 102 245 3 327-70 57-116 66-373 71l-233 4V766zm395 210c41-17 55-42 55-96 0-71-45-98-170-103l-55-2-3 108-3 107h71c39 0 86-6 105-14zM9250 1060v-70h260l2-292 3-293 108-3 107-3v591h260v140h-740v-70zM10160 765V400h590v140h-370v190h340v130h-340v130h370v140h-590V765zM3201 1064c-138-37-217-141-228-302-12-169 43-287 162-350 46-25 60-27 160-27 91 1 120 5 168 24l57 22v299h-240v-80h150V471l-37-8c-21-4-67-8-103-7-82 1-139 30-180 93-36 54-45 93-44 191 1 160 86 259 222 260 62 0 151-29 198-65l34-26v112l-44 19c-50 21-143 40-190 39-17 0-55-7-85-15zM1765 1061c-9-15-225-650-225-662 0-6 19-9 42-7l42 3 30 93 30 92h264l32-95 32-95h44c29 0 44 4 43 13 0 6-51 158-112 337l-112 325-52 3c-28 2-54-2-58-7zm108-252c26-80 47-149 47-153 0-7-194-8-202 0-3 3 17 75 45 159 28 85 54 151 57 147 4-4 28-73 53-153zM2390 730V390h400v80h-310v600h-90V730zM4510 732V390h90v271l52-3 53-3 93-115c128-159 119-152 181-148l52 3-115 140c-64 77-116 142-116 145s17 15 38 28c60 37 86 84 90 164 4 60 1 73-21 107-42 63-89 79-255 87l-142 7V732zm264 244c63-26 84-94 52-171-21-50-54-66-146-72l-80-6v263h70c39 0 86-6 104-14zM5237 1063c-4-3-7-156-7-340V390h90v680h-38c-21 0-42-3-45-7zM5647 1063c-4-3-7-156-7-340V390h430v80h-340v250h320v80h-320v190h340v80h-208c-115 0-212-3-215-7z"
        transform="matrix(.1 0 0 -.1 0 1432)"
      ></path>
    </svg>
  );
}

// NAVBAR
// export const home: IconInfo = { icon: BiHomeCircle, name: "Home" }
export const search: IconInfo = { icon: BiSearchAlt, name: "Search" }
export const categories: IconInfo = { icon: BiCategoryAlt, name: "Categories" }
export const cart: IconInfo = { icon: BsCart, name: "Cart" }
export const settings: IconInfo = { icon: BiCog, name: "Settings" }
export const contactInfo: IconInfo = { icon: BiMessageAltDetail, name: "Contact Info" }

// export const user: IconInfo = { icon: BiUser, name: "Account" }

// ADMIN


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

// NAVBAR SLIDE LEFT 
export const navSlideLeft: IconInfo = { icon: AiOutlineDoubleLeft, name: "Hide navbar" }
export const navSlideRight: IconInfo = { icon: AiOutlineDoubleRight, name: "Unhide navbar" }

// HEADER THEME SWITCHER
export const lightThemeIcon: IconInfo = { icon: BsSunFill, name: "Light Theme" }
export const darkThemeIcon: IconInfo = { icon: BsMoonFill, name: "Dark Theme" }

// SOCIAL ICONS
export const mail: IconInfo = { icon: FiMail, name: "Mail", link: "mailto:metanoia.js@gmail.com" }
export const instagram: IconInfo = { icon: FiInstagram, name: "Instagram", link: "https://www.instagram.com/metanoia_.co/" }

// DEV SOCIAL ICONS
export const devMail: IconInfo = { icon: FiMail, name: "Mail", link: "mailto:sehabiamir1@gmail.com" }
export const devInstagram: IconInfo = { icon: FiInstagram, name: "Instagram", link: "https://www.instagram.com/_amir_shb/" }
export const devDiscord: IconInfo = { icon: BsDiscord, name: "Discord", link: "https://discord.com/users/270635271563902976" }
export const devGithub: IconInfo = { icon: FaGithub, name: "Github", link: "https://github.com/ToxyBorg" }
export const developerInfo: IconInfo = { icon: FaLaptopCode, name: "Developer" }

// ITEM CARDS ICONS
export const itemDescription: IconInfo = { icon: BsCardText, name: "Item Description" }
export const itemDescriptionShowMore: IconInfo = { icon: BsArrowDownCircle, name: "Show more" }
export const itemDescriptionShowLess: IconInfo = { icon: BsArrowUpCircle, name: "Show less" }
export const cartAdd: IconInfo = { icon: BsCartPlus, name: "Add to Cart" }
export const cartRemove: IconInfo = { icon: BsCartDash, name: "Remove from Cart" }
export const showAllImages: IconInfo = { icon: BsImages, name: "Show all images" }

// CHECKOUT STEPPER
export const cartEmpty: IconInfo = { icon: BsCartX, name: "Empty your cart" }

export const arrowNext: IconInfo = { icon: BsArrowRight, name: "Go to next step" }
export const arrowPrevious: IconInfo = { icon: BsArrowLeft, name: "Go to previous step" }
export const arrowDown: IconInfo = { icon: BsArrowDown, name: "Go to next step" }

export const cartStep: IconInfo = { icon: BsCartCheck, name: "Go to checkout" }
export const cartStepChecked: IconInfo = { icon: BsCartCheckFill, name: "Cart checked" }

export const measurementsStep: IconInfo = { icon: TfiRulerAlt, name: "Enter your measurements" }
export const measurementsStepChecked: IconInfo = { icon: FaRuler, name: "Measurements checked" }

export const deliveryStep: IconInfo = { icon: BsBoxSeam, name: "Choose a delivery option" }
export const deliveryStepChecked: IconInfo = { icon: BsBoxSeamFill, name: "Delivery option checked" }
export const inPersonDelivery: IconInfo = { icon: MdEmojiPeople, name: "In-person delivery" }
export const shippingDelivery: IconInfo = { icon: BsMailbox, name: "Shipping delivery" }


export const paymentStep: IconInfo = { icon: IoCashOutline, name: "Payment method" }
export const paymentStepChecked: IconInfo = { icon: IoCash, name: "Payment method checked" }
export const cashPayment: IconInfo = { icon: GiPayMoney, name: "Cash payment method" }
export const bankTransferPayment: IconInfo = { icon: BsCreditCard2Back, name: "Bank transfer payment method" }
export const paypalIcon: IconInfo = { icon: BsPaypal, name: "Paypal" }

export const multiplicationIcon: IconInfo = { icon: FaTimes, name: "Multiplication" }
export const equalsIcon: IconInfo = { icon: FaEquals, name: "Equals" }
export const plusIcon: IconInfo = { icon: FaPlus, name: "Plus" }


export const emailVerificationStep: IconInfo = { icon: MdOutlineMarkEmailRead, name: "Email verification" }
export const emailVerificationStepChecked: IconInfo = { icon: MdMarkEmailRead, name: "Email verification checked" }
export const emailAtSymbol: IconInfo = { icon: HiOutlineAtSymbol, name: "Enter your email" }


export const checkoutStepChecked: IconInfo = { icon: BsCheckLg, name: "Step checked" }


export const errorIcon: IconInfo = { icon: VscError, name: "Error" }
export const moreInfoIcon: IconInfo = { icon: TbInfoSquareRounded, name: "Info" }


// ADMIN ICONS
export const admin: IconInfo = { icon: FaUserAstronaut, name: "Admin" }
export const adminLogout: IconInfo = { icon: GiExitDoor, name: "Admin Logout" }
export const adminOptions: IconInfo = { icon: SlOptions, name: "Admin options" }
export const adminAddItem: IconInfo = { icon: BiImageAdd, name: "Add an item" }
export const adminUploadImage: IconInfo = { icon: TbUpload, name: "Upload an image" }
export const adminRejectImageUpload: IconInfo = { icon: CiSquareRemove, name: "Rejected image upload" }
export const adminEditButton: IconInfo = { icon: VscEdit, name: "Edit Item" }
export const adminUpdateButton: IconInfo = { icon: MdUpdate, name: "Update Item" }
export const adminDeleteImage: IconInfo = { icon: MdDeleteForever, name: "Delete image" }
export const adminDeleteOrder: IconInfo = { icon: MdDeleteForever, name: "Delete order" }
export const adminViewOrdersButton: IconInfo = { icon: BsTable, name: "See orders" }


// FOOTER
export const copyright: IconInfo = { icon: AiOutlineCopyright, name: "Copyright" }
