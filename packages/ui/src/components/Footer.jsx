import { Link } from "react-router-dom";

function Footer({ footerData, footerSearchesData, children, socialMediaData }){
    return (
        <div>
            <div>
                {footerData.map((data) => (
                    <div key={data.id}>
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
                {footerSearchesData.map((searchData, i) => (
                    <div key={i}>
                        <p>{searchData.category}</p>
                        {searchData.products.map((product, j) => (
                            <Link key={j} to={product.link}>
                                {product.name} { (j !== searchData.products.length - 1) ? "|" : "" } 
                            </Link>
                        ))}
                        {( i !== footerSearchesData.length - 1) ?  <hr/> : ""}
                    </div>
                ))}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
};

export {
    Footer
}