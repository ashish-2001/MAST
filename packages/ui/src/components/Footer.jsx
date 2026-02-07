function Footer({ footerData, socialMediaData, footerSearchesData }){
    return (
        <div>
            <div>
                {footerData.map((data) => (

                    <div key={data.id}>
                        <p>{footerData.title}</p>
                        <Link navigate={footerData.link}>{footerData.services}</Link>
                    </div>
                ))}
            </div>
            <hr/>
            <div>
                {socialMediaData.map((mediaData) => (
                    <Link navigate={socialMediaData.link} key={mediaData.id}>
                        {socialMediaData.link}
                    </Link>
                ))}
            </div>
            <div>
                {footerSearchesData.map((searchData) => (
                    <div key={searchData.id}>
                        <p><b>{footerSearchesData.title}</b></p>
                        <div>
                            <p><b>{footerSearchesData.category}</b></p>
                            <div>
                                <Link navigate={footerSearchesData.link}>{footerSearchesData.products} | </Link>
                            </div>
                            <hr/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center">
                <p>MAST</p>
                <p>Designed with {heart} by Ashish Pal</p>
                <p>(c)Copyright</p>
            </div>
        </div>
    )
};

export {
    Footer
}