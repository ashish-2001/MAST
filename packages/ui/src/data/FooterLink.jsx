import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const footerData = [
    {
        id: 1,
        title: "MAST STYLE PVT LTD."
    },
    {
        id: 2, 
        title: "Policy",
        links: [
            { label: "Shipping Policy", path: "/shippingPolicy" },
            { label: "Delivery Policy", path: "/deliveryPolicy" },
            { label: "Payment Policy", path: "/paymentPolicy" },
            { label: "Grievance Redressal Policy", path: "/grievanceRedressalPolicy"}
        ]
    },
    {
        id: 3,
        title: "Help",
        links: [
            { label: "FAQ's", path: "/faq"},
            { label: "Contact Us", path: "/contactUs" } ,
            { label: "Terms Of Service", path: "/termsOfService" },
            { label: "Privacy Policy", path: "/paymentPolicy" },
            { label: "Return & Exchange", path: "/return&Exchange" }
        ]
    },
    {
        id: 4,
        title: "About Us",
        links: [
            { label: "About Us", path: "/aboutUs" }, 
            { label: "Blogs", path: "/blogs" }, 
            { label: "Contact Us", path: "/contactUs" }, 
            { label: "Stores & Service", path: "/stores&Service" }
        ]
    }
];

const socialMediaData = [
    { id: 1, icon: <FaInstagram/>, link: "#" },
    { id: 2, icon: <FaFacebook/>, link: "#" },
    { id: 3, icon: <FaLinkedin/>, link: "#" },
    { id: 4, icon: <FaTwitter/>, link: "#" },
    { id: 5, icon: <FaYoutube/>, link: "#" },
];

const footerSearchesData = [
    {
        id: 1, 
        category: "For Women",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    },
    {
        id: 2, 
        category: "For Men",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    },
    {
        id: 3, 
        category: "For Men",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    },
    {
        id: 4, 
        category: "For Men",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    },
    {
        id: 5, 
        category: "For Men",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    },
    {
        id: 6, 
        category: "For Men",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    },
    {
        id: 7, 
        category: "For Men",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    },
    {
        id: 8, 
        category: "For Men",
        products: [
            { name: "Demifine", path: "/demifine" },
            { name: "Jewellery", path: "/jwellery" }, 
            { name: "Rings For Women", path: "/ringsForWomen" }, 
            { name: "Bracelets For Women", path: "/braceletsForWomen" }, 
            { name: "Earings for women", path: "/earingForWOmen" },
            { name: "Pendants For Women", path: "/pendantsForWomen" },
            { name: "Necklace For Women", path: "/necklaceForWomen" }
        ]
    }
];

export {
    footerData,
    socialMediaData,
    footerSearchesData
}