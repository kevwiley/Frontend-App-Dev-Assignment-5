import Hero from "../components/Hero";

//homepage will contain a hero will image and link to products. Short introduction will be under
function HomePage() {
    return (
        <div className="home-page">

            <Hero title="High Quality Tech Products" subtitle="Search for Tech Products Perfect for your Setup." calltoaction="Browse All"/>

            <section>
                <h2>Why Shop with Us?</h2>
                <p>
                    We offer high quality technology products at affordable prices.
                    Whether you are upgrading your setup or looking for new accessories,
                    we have products to fit all of your tech needs.
                </p>

                <p>
                    Browse our selection of the best tech products and find something perfect
                    for your setup.
                </p>
            </section>
        </div>
    );
}

export default HomePage;