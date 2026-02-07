import { Link } from "react-router-dom";
import { footerData, socialMediaData, footerSearchesData } from "../data/FooterLink";

function Footer(){
    return (
        <div>
            <div>
                {footerData.map((data) => (
                    <div key={data.id}>
                        <p>{data.title}</p>
                        <Link navigate={data.link}>{data.services}</Link>
                    </div>
                ))}
            </div>
            <hr/>
            <div>
                {socialMediaData.map((mediaData) => (
                    <Link navigate={mediaData.link} key={mediaData.id}>
                        {mediaData.icons}
                    </Link>
                ))}
            </div>
            <div>
                {footerSearchesData.map((searchData) => (
                    <div key={searchData.id}>
                        <p><b>{searchData.title}</b></p>
                        <div>
                            <p><b>{searchData.category}</b></p>
                            <div>
                                <Link navigate={searchData.link}>{searchData.products} | </Link>
                            </div>
                            <hr/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center">
                <p>MAST</p>
                <p>Designed with heart by Ashish Pal</p>
                <p>(c)Copyright</p>
            </div>
        </div>
    )
};

export {
    Footer
}