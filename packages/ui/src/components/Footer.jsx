import { Link } from "react-router-dom";
import { footerData, socialMediaData, footerSearchesData } from "../data/FooterLink";

function Footer(){
    return (
        <div>
            <div >
                {footerData.map((data) => (
                    <div key={data.id} className="gap-10">
                        <p>{data.title}</p>
                        {data.links?.map((item, i) => (
                            <Link key={i} to={item.path}>
                                <p>{item.label}</p>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
            <hr/>
            <div>
                {socialMediaData.map(({ id, icon: Icon, link }) => (
                    <a key={id} href={link} target="_blank" rel="noopener noreferrer">
                        <Icon size={20}/>
                    </a>
                ))}
            </div>
            <div>
                {footerSearchesData.map((searchData) => (
                    <div key={searchData.id}>
                        <p className="font-bold">{searchData.category}</p>
                        {searchData.products.map((product, i) => (
                            <Link key={i} to={product.link}>
                                {product.name} { product.length === 7 ? "" : "|" } 
                            </Link>
                        ))}
                        <hr/>
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